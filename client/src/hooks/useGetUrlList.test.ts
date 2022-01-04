
import { renderHook } from '@testing-library/react-hooks';
import useGetUrlList from './useGetUrlList';
import type { HookResponse } from './useGetUrlList';

describe('useGetUrlList', () => {
  it('fetches the list', async () => {
    const apiResponse = {
      data: [{ full: 'http://example.com', short: 'https://pbid.io/abcdef12' }],
      error: null,
      success: true
    };
    const hookResponse: HookResponse = {
      data: [{ full: 'http://example.com', short: 'https://pbid.io/abcdef12' }],
      error: null,
      isLoading: false,
      addData: () => {},
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponse),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() => useGetUrlList());

    await waitForNextUpdate();
    
    const {
      data,
      addData,
      isLoading,
      error
    } = result.current;

    expect(data).toStrictEqual(hookResponse.data);
    expect(typeof addData).toBe('function');
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
  });
});