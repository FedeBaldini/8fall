import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { RouterContext } from "next/dist/shared/lib/router-context";

import "../styles/globals.css";

import { initializeTranslations } from "../i18n";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

initializeTranslations();

export const decorators = [
  (Story) => (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  ),
];
