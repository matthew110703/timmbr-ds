import { describe, expect, it } from 'vitest';
import { mapTree } from './tree';

interface Node {
  id: string;
  extra: string;
  children?: Node[] | null;
}

const tree: Node[] = [
  { id: 'a', extra: 'x', children: [{ id: 'a1', extra: 'x', children: [{ id: 'a1a', extra: 'x' }] }] },
  { id: 'b', extra: 'x', children: null },
];

describe('mapTree', () => {
  it('maps every node bottom-up, keeping the shape', () => {
    const result = mapTree(tree, (node, children) => ({ id: node.id, children }));
    expect(result).toEqual([
      { id: 'a', children: [{ id: 'a1', children: [{ id: 'a1a', children: [] }] }] },
      { id: 'b', children: [] },
    ]);
  });

  it('passes already-mapped children, so parents can aggregate them', () => {
    const counts = mapTree(tree, (node, children: { id: string; size: number }[]) => ({
      id: node.id,
      size: 1 + children.reduce((sum, child) => sum + child.size, 0),
    }));
    expect(counts).toEqual([
      { id: 'a', size: 3 },
      { id: 'b', size: 1 },
    ]);
  });

  it('returns an empty array for an empty tree', () => {
    expect(mapTree([], (node) => node)).toEqual([]);
  });
});
