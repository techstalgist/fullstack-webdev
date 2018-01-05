module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jest": true
    },
    "globals": {
      "process": true,
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "rules": {
      "indent": [
        "error",
        4
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "never"
      ],
      "eqeqeq": "error",
      "no-console": 0,
      "no-process-env": 0
    }
}  