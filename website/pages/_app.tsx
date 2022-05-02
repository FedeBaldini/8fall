import type { AppProps } from "next/app";

import { initializeTranslations } from "../i18n/initializeTranslations";
import "../styles/globals.css";

initializeTranslations();

function Application({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Application;
