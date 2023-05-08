import axios from "axios";

const url = globalThis.window?.location.origin;

export const revalidate = (path: string) =>
  axios.get(
    `${url}/api/revalidate/?path=${path}?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`
  );
