import AppLayout from "@/components/layouts/AppLayout";
import "@/styles/globals.css";
import "@splidejs/react-splide/css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout className={poppins.className}>
      <Component {...pageProps} />
    </AppLayout>
  );
}
