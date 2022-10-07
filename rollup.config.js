import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/pugin.ts",
  output: {
    format: "es",
    file: "dist/pugin.js",
  },
  plugins: [typescript()],
};
