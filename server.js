import fs from "fs";
import express from "express";
import { matchRoutes } from 'react-router-config';

const app = express();
// 通过 vite 创建 server 服务
import { createServer } from "vite";
// 判断是否为生产环境
const isProduction = process.env.NODE_ENV === "production";

const ssrManifest = isProduction
  ? fs.readFileSync("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;

//创建 vite 服务实例
let vite;
if (!isProduction) {
  // 开发环境下
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base: "/",
  });
  // 使用 vite 中间件
  app.use(vite.middlewares);
} else {
  // 生产环境下，设置静态目录
  app.use(express.static("./dist/client"));
}

app.get("*", async (req, res) => {
  let template;
  let render;

  if (!isProduction) {
    template = fs.readFileSync("index.html", "utf8");
    // 路由变化，更新 html，更新 template
    template = await vite.transformIndexHtml(req.url, template);
    // 在 src 下创建 server-entry.tsx 文件做为 ssr 的入口文件，前端启动的入口文件为 main.tsx，已经添加到了 index.html 中
    render = (await vite.ssrLoadModule("/src/server-entry.jsx")).render;
  } else {
    template = fs.readFileSync("./dist/client/index.html", "utf-8");
    render = (await import("./dist/server/index.js")).render;
  }
  //   console.log(req.url, template,"render");
  const html = await render(req.url, ssrManifest);
  if (ssrManifest.url) {
    res.redirect(301, ssrManifest.url);
    return;
  }
  // 给index.html的id为root标签中添加 <!--APP_HTML-->，做为后边要替换的标志
  const responseHtml = template.replace("<!--APP_HTML-->", html);
  res.status(200).set({ "Content-Type": "text/html" }).end(responseHtml);
});

app.listen(4000);
