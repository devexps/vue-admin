import { find, isEmpty } from 'lodash-es'

export class TreeNode<T> {
  val?: T
  path: string
  treePath: string[]
  children: TreeNode<T>[]
  constructor(path?: string, val?: T, parentNode?: TreeNode<T>) {
    this.val = val
    this.path = path || ''
    this.children = []
    if (parentNode) {
      if (parentNode.isRoot()) {
        this.treePath = []
      } else {
        this.treePath = [...parentNode.treePath, parentNode.path]
      }
    } else {
      this.treePath = []
    }
  }

  isRoot(): boolean {
    return this.treePath.length === 0 && this.path === ''
  }

  addChild(child: TreeNode<T>) {
    this.children.push(child)
  }

  removeChild(child: TreeNode<T>) {
    const index = this.children.indexOf(child)
    if (index > -1) {
      this.children.splice(index, 1)
    }
  }

  isNodeValEqual(val: T): boolean {
    return this.val === val
  }

  dfs(val: T): TreeNode<T> | null {
    if (this.isNodeValEqual(val)) {
      return this
    }
    for (let i = 0; i < this.children.length; i++) {
      const node = this.children[i].dfs(val)
      if (node) {
        return node
      }
    }
    return null
  }

  findByPath(
    paths: string[],
    createWhenNotFound = false,
    _parentNode?: TreeNode<T>,
  ): TreeNode<T> | null {
    for (let i = 0; i < paths.length; i++) {
      const [currentPath, ...nextPaths] = paths
      const child = find(this.children, (node) => node.path === currentPath)
      if (child) {
        if (isEmpty(nextPaths)) {
          return child
        } else {
          return child.findByPath(nextPaths, createWhenNotFound)
        }
      } else if (createWhenNotFound) {
        const childNode = new TreeNode<T>(currentPath, undefined, this)
        this.addChild(childNode)
        if (isEmpty(nextPaths)) {
          return childNode
        } else {
          return childNode.findByPath(nextPaths, createWhenNotFound)
        }
      } else {
        return null
      }
    }
    return null
  }
}
