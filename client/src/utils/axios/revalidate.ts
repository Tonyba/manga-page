import axios from "axios";

const url = globalThis.window?.location.origin;

export const revalidate = (path: string) => {
  if (process.env.NODE_ENV === "development") return;
  return axios.get(
    `${url}/api/revalidate/?path=${path}?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`
  );
};
