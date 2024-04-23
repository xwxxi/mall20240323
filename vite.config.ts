import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Pages from "vite-plugin-pages";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: "src/views/module",
      extensions: ["vue"],
      exclude: ["**/components/**"],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        // auto-import内置了vue、vue-router、react这些常见基本库的引入规则 
        "vue",
        "vue-router",
        // 自定义的自动引入库 {"库名":["方法名",...]}
        { vue: ["defineModel"] },
        { dayjs: [["default", "dayjs"]] },
        { delay: [["default", "delay"]] },
        { "@vueuse/integrations/useAxios": ["useAxios"] },
        { "@vueuse/core": ["useVModels"] },
        { qs: [["default", "qs"]] },
        { "decimal.js": [["default", "Decimal"]] },
        { from: "dayjs", imports: ["Dayjs"], type: true },
        {
          from: "@form-create/ant-design-vue",
          imports: ["FormRule"],
          type: true,
        },
        { from: "ant-design-vue", imports: ["TableColumnsType"], type: true },
        {
          from: "@vueuse/integrations/useAxios",
          imports: ["useAxios", "UseAxiosOptions"],
          type: true,
        },
        { from: "@vueuse/core", imports: ["useVModels"], type: true },
      ],
      eslintrc: {
        enabled: true,
      },
      dts: "./src/types/auto-imports.d.ts",
      // 配置本地哪些目录支持自动引入
      dirs: ["./src/components/page/", "./src/views/module/*"],
    }),
    Components({
      dts: "./src/types/components.d.ts",
      resolvers: [AntDesignVueResolver({ importStyle: "less" })],
      globs: ["src/views/*"],
    }),
  ],
  base: "./", // 设置打包路径
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      assets: resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    port: 8888,
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "http://192.168.31.108:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
});
