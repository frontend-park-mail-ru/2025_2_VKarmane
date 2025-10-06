import { API_URL } from "./consts.js";
export async function apiFetch(url, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
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
