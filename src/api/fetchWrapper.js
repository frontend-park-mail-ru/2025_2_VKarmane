const API_URL = import.meta.env.VITE_API_URL;
export let csrfToken = "";

const safeMethods = {
  GET: "GET",
  OPTIONS: "OPTIONS",
};

export async function fetchCSRFToken() {
  const res = await fetch(`${API_URL}/auth/csrf`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Не удалось получить CSRF токен");

  const data = await res.json();
  csrfToken = data.csrf_token;
}

export async function apiFetch(url, options = {}) {
  if (!(options?.method in safeMethods)) {
    await fetchCSRFToken();
  }
  const isFormData = options.body instanceof FormData;

  const defaultHeaders = isFormData
    ? {}
    : { "Content-Type": "application/json;charset=utf-8" };

  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
      "X-CSRF-Token": csrfToken,
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
