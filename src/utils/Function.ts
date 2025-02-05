"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const fetchDogs = async (next: string) => {
  try {
    const session: any = await getServerSession(authOptions);

    const res = await fetch(`${process.env.BACKEND_API_URL}${next}`, {
      method: "GET",
      headers: {
        "Cookie": `fetch-access-token=${session?.user?.accessToken}`, // Manually set the cookie
      },
      cache: "no-cache"
    });

    if (res.ok) {
      const data = await res.json();

      const resDogs = await fetch(`${process.env.BACKEND_API_URL}/dogs`, {
        method: "POST",
        headers: {
          "Cookie": `fetch-access-token=${session?.user?.accessToken}`, // Manually set the cookie
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.resultIds),
        cache: "no-cache"
      });
      if (resDogs.ok) {
        const dataDogs = await resDogs.json();
        return {
          next: data?.next ? data?.next : null,
          data: dataDogs,
          prev: data?.prev ? data?.next : null
        }
      }
    } else {
      console.error("Failed to fetch dogs:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error fetching dogs:", error);
  }
}
export const fetchBreads = async () => {
  try {
    const session: any = await getServerSession(authOptions);
    const res = await fetch(`${process.env.BACKEND_API_URL}/dogs/breeds`, {
      method: "GET",
      headers: {
        "Cookie": `fetch-access-token=${session?.user?.accessToken}`, // Manually set the cookie
      },
      cache: "no-cache"
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Failed to fetch Breads:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error fetching Breads:", error);
  }
}

export const findMatch = async (ids: string) => {
  try {
    const session: any = await getServerSession(authOptions);



    const res = await fetch(`${process.env.BACKEND_API_URL}/dogs/match`, {
      method: "POST",
      headers: {
        "Cookie": `fetch-access-token=${session?.user?.accessToken}`, // Manually set the cookie
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
      cache: "no-cache"
    });
    if (res.ok) {
      const dataDogs = await res.json();
      return dataDogs;
    }
  } catch (error) {
    console.error("Error fetching Breads:", error);
  }
}
export const getDogDetail = async (id: string) => {
  try {
    const session: any = await getServerSession(authOptions);
    const res = await fetch(`${process.env.BACKEND_API_URL}/dogs`, {
      method: "POST",
      headers: {
        "Cookie": `fetch-access-token=${session?.user?.accessToken}`, // Manually set the cookie
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id]),
      cache: "no-cache"
    });
    if (res.ok) {
      const dataDogs = await res.json();
      return dataDogs[0] ? dataDogs[0] : null;
    }
  } catch (error) {
    console.error("Error fetching Breads:", error);
  }
}