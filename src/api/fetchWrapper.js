const API_URL = import.meta.env.VITE_API_URL;
export async function apiFetch(url, options = {}) {
  const isFormData = options.body instanceof FormData;

  const defaultHeaders = isFormData
    ? {}
    : { "Content-Type": "application/json;charset=utf-8" };

  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
      credentials: "include",
    },
    credentials: "include",
  };

  try {
    const response = await fetch(API_URL + url, finalOptions);
    const contentType = response.headers.get("Content-Type");
    let data = null;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return {
      ok: false,
      status: null,
      data: null,
      error,
    };
  }
}
