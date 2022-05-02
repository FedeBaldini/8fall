module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "hooks/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
    "utils/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.stories.{ts,tsx}",
    "!**/*.type.ts",
    "!**/*.interface.ts",
    "!**/*.enum.ts",
    "!**/index.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
