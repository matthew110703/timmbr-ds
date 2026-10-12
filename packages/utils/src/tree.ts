/** Any node with optional children of its own kind (categories, menus, comments…). */
export interface TreeNode<T> {
  children?: T[] | null;
}

/**
 * Maps a tree bottom-up: `fn` receives each node and its already-mapped
 * children, and returns the new node. Handy for copying a tree with fewer
 * fields (e.g. before passing it to a client component) or reshaping it.
 *
 * @example
 * mapTree(categories, (c, children) => ({ id: c.id, name: c.name, children }));
 */
export function mapTree<T extends TreeNode<T>, R>(nodes: readonly T[], fn: (node: T, children: R[]) => R): R[] {
  return nodes.map((node) => fn(node, mapTree(node.children ?? [], fn)));
}
