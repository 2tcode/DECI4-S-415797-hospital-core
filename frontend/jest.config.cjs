module.exports = {
  testEnvironment: "jsdom",

  moduleFileExtensions: ["js", "jsx"],

  testMatch: ["**/?(*.)+(test).[jt]sx"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
