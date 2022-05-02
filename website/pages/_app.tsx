import type { AppProps } from "next/app";

import { initializeTranslations } from "../i18n/initializeTranslations";
import "../styles/globals.css";

initializeTranslations();

export default function Application({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
