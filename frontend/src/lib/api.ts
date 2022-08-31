

export const getCookie = (name: string) =>
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;


export const fetchApi = async (
    endpoint: string,
    options?: RequestInit,
    csrfTk?: string | null
  ): Promise<Response> => {
    const csrfToken = csrfTk ? csrfTk : getCookie('csrftoken');
    const defaultOptions = { ...options };
  
    defaultOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...defaultOptions.headers
    };
  
    if (csrfToken) {
      defaultOptions.headers = { 'X-CSRFToken': csrfToken, ...defaultOptions.headers };
    }
    defaultOptions.credentials = 'include';
    return await fetch(`${window.location.origin}/api/${endpoint}`, defaultOptions);
  };