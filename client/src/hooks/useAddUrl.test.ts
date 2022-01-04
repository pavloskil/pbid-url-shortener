
import { renderHook } from '@testing-library/react-hooks';
import useAddUrl from './useAddUrl';

describe('useAddUrl', () => {
  it('adds the assigned url', async () => {
    const apiResponse = { data: { full: 'http://example.com', short: 'https://pbid.io/abcdef12' }, error: null, success: true };
    const hookResponse = { data: { full: 'http://example.com', short: 'https://pbid.io/abcdef12' }, error: null };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponse),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAddUrl());
    const addUrl = result.current;
    const obj = await addUrl('http://example.com');
    
    expect(obj).toStrictEqual(hookResponse);
  });
});