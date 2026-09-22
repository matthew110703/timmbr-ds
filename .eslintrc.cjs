module.exports = {
  root: true,
  extends: ["@timmbr/eslint-config"],
  ignorePatterns: [
    "**/dist/**",
    "**/storybook-static/**",
    "**/node_modules/**",
    "**/.turbo/**",
    "**/coverage/**"
  ]
};
