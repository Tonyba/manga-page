import AppLayout from "@/components/layouts/AppLayout";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/utils/types";
import "@splidejs/react-splide/css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppLayout className={poppins.className}>
      {getLayout(<Component {...pageProps} />)}
    </AppLayout>
  );
}
