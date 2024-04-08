module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@routers": "./src/routers",
            "@assets": "./src/assets",
            "@icons": "./src/assets/icons",
            "@hooks": "./src/hooks",
            "@services": "./src/services",
            "@utils": "./src/utils",
            "@interfaces": "./src/ts/interfaces",
            "@firebasecore": "./src/firebase",
            "@context": "./src/context",
            "@constants": "./src/constants"
          },
        },
      ],
    ],
  };
};
