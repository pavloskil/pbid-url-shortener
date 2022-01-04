export type Url = {
  full: string;
  short: string;
}

export type APIResponse = {
  data: Object | null;
  error: Object | null | unknown;
}

export default function useAddUrl(): Function {
  return async function addUrl(url: string): Promise<APIResponse> {
    try {      
      const {
        REACT_APP_API_PORT = 5000,
        REACT_APP_APP_DOMAIN = 'http://localhost',
      } = process.env;
      const uri = `${REACT_APP_APP_DOMAIN}:${REACT_APP_API_PORT}/url/add`;
      
      // Add timeout support to fetch
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      clearTimeout(id);

      const results = await response.json();
      const { data } = results;

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error
      };    
    }
  };
}