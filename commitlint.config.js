module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
      ],
    ],
    "header-max-length": [2, "always", 100],
    "subject-case": [0, "never"],
    "subject-full-stop": [0, "never"],
    "subject-min-length": [2, "always", 10],
    "body-max-line-length": [0, "always", 100],
    "footer-max-line-length": [0, "always", 100],
    // Custom rule to enforce branch name in the footer
    "footer-leading-blank": [1, "always"],
    "footer-max-length": [2, "always", 100],
    "signed-off-by": [0, "always"],
  },
};
