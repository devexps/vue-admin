import type { Alias, ConfigEnv, Plugin, UserConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import { TreeNode } from '@devexps/utils'
import { find, split, join, isEmpty } from 'lodash-es'
import { bold, cyan, gray, green } from 'picocolors'

export type Options = Omit<Alias, 'customResolver'>
/** Cache for package.json resolution and package.json contents */
export type PackageCache = Map<string, PackageData>
export interface PackageData {
  dir: string
  componentCache: TreeNode<string>
  data: {
    [field: string]: any
    name: string
    type: string
    version: string
    main: string
    module: string
    browser: string | Record<string, string | false>
    exports: string | Record<string, any> | string[]
    imports: Record<string, any>
    dependencies: Record<string, string>
  }
}

export function loadPackageData(pkgPath: string): PackageData {
  const data = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  const pkgDir = path.dirname(pkgPath)
  const pkg: PackageData = {
    dir: pkgDir,
    componentCache: new TreeNode<string>(),
    data,
  }
  return pkg
}

export function findNearestPackageData(
  basedir: string,
  packageCache?: PackageCache,
): PackageData | null {
  const originalBasedir = basedir
  while (basedir) {
    if (packageCache) {
      const cached = getFnpdCache(packageCache, basedir, originalBasedir)
      if (cached) return cached
    }

    const pkgPath = path.join(basedir, 'package.json')
    try {
      if (fs.statSync(pkgPath, { throwIfNoEntry: false })?.isFile()) {
        const pkgData = loadPackageData(pkgPath)

        if (packageCache) {
          setFnpdCache(packageCache, pkgData, basedir, originalBasedir)
        }

        return pkgData
      }
    } catch {}

    const nextBasedir = path.dirname(basedir)
    if (nextBasedir === basedir) break
    basedir = nextBasedir
  }

  return null
}

/**
 * Get cached `findNearestPackageData` value based on `basedir`. When one is found,
 * and we've already traversed some directories between `basedir` and `originalBasedir`,
 * we cache the value for those in-between directories as well.
 *
 * This makes it so the fs is only read once for a shared `basedir`.
 */
function getFnpdCache(
  packageCache: PackageCache,
  basedir: string,
  originalBasedir: string,
) {
  const cacheKey = getFnpdCacheKey(basedir)
  const pkgData = packageCache.get(cacheKey)
  if (pkgData) {
    traverseBetweenDirs(originalBasedir, basedir, (dir) => {
      packageCache.set(getFnpdCacheKey(dir), pkgData)
    })
    return pkgData
  }
}

function setFnpdCache(
  packageCache: PackageCache,
  pkgData: PackageData,
  basedir: string,
  originalBasedir: string,
) {
  packageCache.set(getFnpdCacheKey(basedir), pkgData)
  traverseBetweenDirs(originalBasedir, basedir, (dir) => {
    packageCache.set(getFnpdCacheKey(dir), pkgData)
  })
}

// package cache key for `findNearestPackageData`
function getFnpdCacheKey(basedir: string) {
  return `fnpd_${basedir}`
}

/**
 * Traverse between `longerDir` (inclusive) and `shorterDir` (exclusive) and call `cb` for each dir.
 * @param longerDir Longer dir path, e.g. `/User/foo/bar/baz`
 * @param shorterDir Shorter dir path, e.g. `/User/foo`
 */
function traverseBetweenDirs(
  longerDir: string,
  shorterDir: string,
  cb: (dir: string) => void,
) {
  while (longerDir !== shorterDir) {
    cb(longerDir)
    longerDir = path.dirname(longerDir)
  }
}

export const createAlias = (
  config: UserConfig,
  env: ConfigEnv,
  options: Options,
): Alias => {
  return {
    ...options,
    customResolver(updatedId, importerId, _resolveOptions) {
      const pkgData = findNearestPackageData(importerId || '')
      if (!pkgData) {
        throw new Error(
          `MonoRepoResolverPlugin can not resolve Module from: ${importerId}`,
        )
      }
      let pkgPath = pkgData.dir
      const dirPath = path.parse(pkgPath)
      let baseRoot = dirPath.root
      if (baseRoot) {
        if (process.platform === 'win32') {
          // E://aaa/bbb/
          // baseRoot = E:
          baseRoot = baseRoot.replace(path.sep, '')
          // //aaa//bbb
          pkgPath = pkgPath.replace(baseRoot, '')
          // baseRoot = E:/
          baseRoot = baseRoot + '/'
        }
      }
      const paths = split(pkgPath, path.sep).filter((p) => p !== '')
      const componentPaths = split(updatedId, '/').filter((p) => p !== '')
      const componentNode = pkgData.componentCache.findByPath(
        componentPaths,
        true,
      )
      if (componentNode) {
        if (isEmpty(componentNode.val)) {
          let realPath
          const componentPath =
            baseRoot + join([...paths, ...componentPaths], '/')
          if (fs.existsSync(componentPath)) {
            if (fs.statSync(componentPath).isDirectory()) {
              const components = glob.sync(`${componentPath}/index.*`, {
                onlyFiles: true,
                deep: 1,
                caseSensitiveMatch: false,
              })
              if (components.length === 1) {
                realPath = components[0]
              } else {
                const fileTsOrJs = find(
                  components,
                  (c) => c.endsWith('.ts') || c.endsWith('.js'),
                )
                if (fileTsOrJs) {
                  realPath = fileTsOrJs
                } else {
                  throw new Error(
                    `MonoRepoResolverPlugin can not resolve Module <${updatedId}> at: ${importerId}, find ${
                      components.length === 0 ? 'none' : 'multiple'
                    } files at: ${componentPath}/index.(ts|js), please check it. components: ${components}`,
                  )
                }
              }
            } else {
              realPath = componentPath
            }
          } else {
            const components = glob.sync(`${componentPath}.*`, {
              onlyFiles: true,
              deep: 1,
              caseSensitiveMatch: false,
              cwd: path.resolve(componentPath, '../'),
            })
            if (components.length === 1) {
              realPath = components[0]
            } else {
              throw new Error(
                `MonoRepoResolverPlugin can not resolve Module <${updatedId}> at: ${importerId}, find ${
                  components.length === 0 ? 'none' : 'multiple'
                } files at: ${componentPath}, please check it. components: ${components}`,
              )
            }
          }
          componentNode.val = realPath
          console.debug(
            `${bold(cyan('[MonoRepoResolverPlugin]'))} ${green(
              `resolve Component from "${updatedId}" to ${realPath} at:`,
            )} ${gray(importerId)}`,
          )
        }
        return componentNode.val
      } else {
        throw new Error(
          `MonoRepoResolverPlugin can not resolve Module at: ${importerId}, cache module tree is empty`,
        )
      }
    },
  }
}

export default function configMonoRepoResolverPlugin(
  rawOptions: Options = {
    find: '#',
    replacement: 'src',
  },
): Plugin {
  return {
    name: 'MonoRepoResolver',
    config: (config, env) => ({
      resolve: {
        alias: [createAlias(config, env, rawOptions)],
      },
    }),
  }
}
