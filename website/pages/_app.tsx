import type { AppProps } from "next/app";
import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import { initializeTranslations } from "../i18n/initializeTranslations";
import "../styles/globals.css";

initializeTranslations();

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3(provider)}>
      <Head>
        <title>8 Fall - The NFT collection</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
