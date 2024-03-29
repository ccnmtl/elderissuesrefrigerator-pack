module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "jquery": true
    },
    "plugins": [
        "security"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:security/recommended-legacy"
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        }
    },
    "globals": {
        "_": true,
        "Backbone": true,
        "google": true,
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-unused-vars": [
            "error",
            {"vars": "all", "args": "none"}
        ],
        "quotes": [
            "error",
            "single"
        ],
        "security/detect-object-injection": "off",
        "semi": [
            "error",
            "always"
        ]
    }
};
