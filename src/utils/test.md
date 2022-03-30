<br />
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29092e57c0aa49be99cfdc7c8b3f5ae8~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?" width="100%" />
<br />
<br />

## 上传文章
***
<br />

url: /writeArticle  
请求方式: POST  
入参:  
```javascript
  // 入参类型
  interface WriteArticleInputType {
    // 文章类型
    type: ArticleType,
    // 文章子类型.
    subType?: string,
    // 文章内容
    text: string,
    // 标题
    title: string,
    // 封面
    cover: any
  }

  // 文章枚举类型
  enum ArticleType {
    // 前端
    frontend = 0,
    // 计算机网络
    network = 1,
    // 算法
    algorithm = 2,
    // 生活
    life = 3,
    // 其他
    other = 4
  }

  // 请求示例
  {
    type: "frontend",
    subType: "react",
    text: "这是文章的内容, 讲述了 react 的使用方法, 以及一些进阶教程.",
    title: "react 怎么学?",
    cover: binary // 二进制文件.
  }

```
出参:
```
  interface WriteArticleOutputType {
    success: boolean
  }
```