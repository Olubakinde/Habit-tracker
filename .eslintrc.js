module.exports = {
    env: {
        es2022: true,
        node: true,
    },
    extends: ["eslint:recommended"],
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    overrides: [
        {
            files: ["test/**/*"],
            env: {
                jest: true,
            },
        },
    ],
    parserOptions: {
        project: ["./tsconfig.json"],
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        // https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript
        // Use typescript's checker for unused vars (critical for Enums)
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        // https://typescript-eslint.io/rules/no-use-before-define
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "error",

        // https://typescript-eslint.io/rules/ban-ts-comment
        // Disallow @ts-<directive> comments or require descriptions after directives.
        "@typescript-eslint/ban-ts-comment": "error",

        // https://typescript-eslint.io/rules/no-explicit-any
        // Disallow the any type.
        //"@typescript-eslint/no-explicit-any": "error",

        // https://typescript-eslint.io/rules/no-unsafe-assignment
        // Disallow assigning a value with type any to variables and properties.
        "@typescript-eslint/no-unsafe-assignment": "error",

        // https://typescript-eslint.io/rules/no-unsafe-return
        // Disallow returning a value with type any from a function.
        "@typescript-eslint/no-unsafe-return": "error",

        // https://typescript-eslint.io/rules/ban-types
        // Disallow certain types.
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    unknown: "That is not allowed in this course.",
                    any: "That is not allowed in this course.",
                },
            },
        ],
        // https://typescript-eslint.io/rules/no-array-constructor
        // Disallow generic Array constructors.
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": "error",

        // https://typescript-eslint.io/rules/no-base-to-string
        // Require .toString() to only be called on objects which provide useful information when stringified.
        "@typescript-eslint/no-base-to-string": "error",

        // https://typescript-eslint.io/rules/no-confusing-void-expression
        // Require expressions of type void to appear in statement position.
        "@typescript-eslint/no-confusing-void-expression": "error",

        // https://typescript-eslint.io/rules/no-for-in-array
        // Disallow iterating over an array with a for-in loop. (Force for-of instead!)
        "@typescript-eslint/no-for-in-array": "error",

        // https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
        // Disallow unnecessary equality comparisons against boolean literals.
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

        // https://typescript-eslint.io/rules/no-unnecessary-condition
        // Disallow conditionals where the type is always truthy or always falsy.
        "@typescript-eslint/no-unnecessary-condition": "error",
    },
};
