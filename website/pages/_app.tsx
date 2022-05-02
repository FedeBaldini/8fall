import type { AppProps } from "next/app";
import Head from "next/head";

import { initializeTranslations } from "../i18n/initializeTranslations";
import "../styles/globals.css";

initializeTranslations();

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>8 Fall - The NFT collection</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
