import uniqueId from './uniqueId';

describe('uniqueId', () => {
  it('generates URL friendly strings', () => {
    const base36 = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const id = uniqueId();
    expect(typeof id).toBe('string');
    expect(id).toHaveLength(8);
    for (const char of id) {
      expect(base36).toContain(char);
    }
  });

  it('has no collisions', () => {
    const used: Record<string, unknown> | null = {};
    // `for` loop needs to be used to test if there are any collisions
    for (let i = 0; i < 500; i += 1) {
      const id = uniqueId();
      expect(used[id]).toBeUndefined();
      used[id] = true;
    }
  });
});
