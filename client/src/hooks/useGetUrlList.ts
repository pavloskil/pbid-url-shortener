
import { useEffect, useState } from 'react';

export type Url = {
  full: string;
  short: string;
}

export type APIResponse = {
  success: boolean;
  data: Url | null;
  error: Error | null | unknown;
}

export type HookResponse = {
  isLoading: boolean;
  data: Url[] | Object[] | null;
  error: Error | null | unknown;
  addData?: Function;
}

export default function useGetUrlList() {
  const [response, setResponse] = useState<HookResponse>({
    data: null,
    isLoading: true,
    error: null,
  });

  const addData = (state: HookResponse['data']): void => {
    setResponse((old: HookResponse): HookResponse => {
      const { data } = old;
      if (data && state) {        
        return { ...old, data: [state, ...data] };
      }
      return old;
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const {
      REACT_APP_API_PORT = 5000,
      REACT_APP_APP_DOMAIN = 'http://localhost'
    } = process.env;
    const uri = `${REACT_APP_APP_DOMAIN}:${REACT_APP_API_PORT}/url/list`;

    (async () => {
      try {
        // Add timeout support to fetch
        const id = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(uri, { signal });
        clearTimeout(id);

        const list = await res.json();

        setResponse({
          data: list.success ? list.data : null,
          error: list.error,
          isLoading: false,
        });
      } catch (err) {
        setResponse({
          data: null,
          error: err,
          isLoading: false,
        });
      }
    })();

    return () => {
      if (controller) {
        controller.abort();
      }
    }
  }, []);
  return {
    ...response,
    addData,
  };
}
