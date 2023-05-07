import "@splidejs/react-splide/css";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";

import { AppWrapper } from "@/utils/context/AppContext";
import { AppPropsWithLayout } from "@/utils/types";
import AppLayout from "@/components/layouts/AppLayout";
import { setCookie, getCookie } from "cookies-next";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  if (!getCookie("apiUrl"))
    setCookie("apiUrl", process.env.NEXT_PUBLIC_API_URL);

  return (
    <AppWrapper>
      <AppLayout className={poppins.className}>
        {getLayout(<Component {...pageProps} />)}
      </AppLayout>
    </AppWrapper>
  );
}
