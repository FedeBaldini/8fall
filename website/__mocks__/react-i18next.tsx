/**
 * This is a mock for the default t method.
 * It transforms parameters into a stringified version to help testing.
 *
 * Examples:
 *
 * t("signIn") => "signIn"
 * t("viewsCount", { count: 3 }) => "viewsCount { count: 3 }"
 * t("messages", { count: 7, replies: 42 }) => "messages { count: 7, replies: 42 }"
 *
 */
function t(key: string, params?: Record<string, unknown>): string {
  if (!params) return key;

  const stringifiedParams = Object.keys(params)
    .map((name) => `${name}: ${params[name]}`)
    .join(", ");

  return `${key} { ${stringifiedParams} }`;
}

module.exports = {
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({ t }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <>{i18nKey}</>,
};

export {};
