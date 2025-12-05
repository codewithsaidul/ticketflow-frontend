/* eslint-disable @typescript-eslint/no-explicit-any */

const getBaseUrl = () => {
  // ১. যদি সার্ভার সাইড হয় (Server Component / Server Action)
  if (typeof window === "undefined") {
    return process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_BACKEND_URL
      : process.env.NEXT_PUBLIC_PROD_BACKEND_URL;
  }

  // ২. যদি ক্লায়েন্ট সাইড হয় (Browser) -> Rewrite ব্যবহার করবে
  return "/api/v1";
};

export async function fetcher<T>(
  endpoint: string,
  singleId?: string
): Promise<{ data: T }> {
  const baseUrl = getBaseUrl(); // 🔥 স্মার্ট URL

  if (!baseUrl && typeof window === "undefined") {
    throw new Error("Backend URL is not defined in environment variables.");
  }

  const url = singleId
    ? `${baseUrl}${endpoint}/${singleId}`
    : `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Fetch failed: ${res.status} ${res.statusText}`, errorBody);
      throw new Error(`Failed to fetch data ${endpoint}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`Fetcher error for ${url}:`, error.message || error);
    throw error;
  }
}

export async function poster<T>(endpoint: string, payload: any): Promise<T> {
  const baseUrl = getBaseUrl(); // 🔥 স্মার্ট URL

  if (!baseUrl)
    throw new Error("Backend URL is not defined in environment variables.");

  const url = `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Post failed: ${res.status} ${res.statusText}`, errorBody);
      throw new Error(`Failed to POST ${endpoint}: ${res.statusText}`);
    }

    const data = await res.json();
    return data as T;
  } catch (error: any) {
    console.error(`Poster error for ${url}:`, error.message || error);
    throw error;
  }
}
