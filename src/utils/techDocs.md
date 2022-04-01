# perosnal website tech docs

<br />
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29092e57c0aa49be99cfdc7c8b3f5ae8~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?" width="100%" />
<br />
<br />

## 1.上传文章
***
<br />

**url: /writeArticle**  
**请求方式: POST**  
**入参:**  
```javascript
  // 入参类型
  interface WriteArticleInputType {
    // 文章类型
    type: ArticleType,
    // 文章子类型
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
    cover: binary // 二进制文件
  }

```
**出参:**
```javascript
  interface WriteArticleOutputType {
    // 接口调用是否成功
    success: boolean,
    // 文章上传成功
    upload: true
  }
```

## 2. 获取文章列表
***
<br/>

**url: /getArticleList**  
**请求方式: GET**  
**入参:**
``` javascript
  // 入参类型
interface GetArticleListInputType {
  // 文章类型, 枚举类型同上传接口
  type: ArticleType
}

```
**出参:**
```javascript
  // 每个文章的类型
  interface Article {
    // 文章发布时间
    time: number,
    // 标题
    title: string, 
    // 简介
    brief?: string,
    // 封面图片地址
    cover: string,
    // 文章类型, 枚举类型同上传接口
    type: ArticleType,
    // 文章子类型
    subtype?: string,
    // 浏览次数
    view: number,
    // 标识文章唯一的 id
    id: string,
  }

  // 出参类型
  interface GetArticleListOutputType {
    // 文章类型, 枚举类型同上传接口
    articleList: Article[],
    // // 接口调用是否成功
    success: boolean
  }

  // 出参示例
  {
    articleList: [
      {
        time: 1648800014254,
        title: '把李立凯献祭给上帝',
        breif: '',
        cover: 'https://www.baidu.com',
        type: 3,
        view: 123123,
        id: 1
      },
      {
        time: 1648800014254,
        title: '李立凯油炸好吃吗',
        breif: '这篇文章教大家怎么油炸李立凯.',
        cover: 'https://www.google.com',
        type: 2,
        view: 1231423,
        id: 2
      }
    ], 
    success: true
  }
}

```

## 3. 获取文章内容
***
<br/>

**url: /getArticle**  
**请求方式: GET**  
**入参:**  
```javascript
  // 入参类型
  interface GetArticleInputType {
    // 标识文章唯一的 id
    id: number
  }

```
**出参:**
```javascript
  // 出参类型
  interface GetArticleOutputType {
    // 文章内容, 类型同文章列表
    article: Article,
    // // 接口调用是否成功
    success: boolean
  }
```

## 4. 身份校验
***
<br/>

**url: /checkIdentify**  
**请求方式: POST**  
**入参:** 
```javascript
  // 入参类型
  interface CheckIdentifyInputType {
    // 一个动态 code 码, 用来标志身份
    code: string
  }
```
**出参:**
```javascript
  // 出参类型
  interface CheckIdentifyOutputType {
    // 身份校验是否通过
    pass: true,
    // // 接口调用是否成功
    success: boolean
    // 
  }
```


## 5. 获取查询列表(搜索)  
***
<br/>

**url: /getSearchList**  
**请求方式: GET**  
**入参:**
```javascript
  // 入参类型
  interface SearchArticleInputType {
    // 输入框内容
    content: string
  }
```

**出参:**
```javascript
  // 输入框信息
  interface SearchInfo {
    // 文章标题
    title: '',
    // 标识文章唯一的 id
    id: '',
  }

  // 出参类型
  interface SearchArticleOutputType {
    // 输入框内容
    searchList: SearchInfo[],
    // // 接口调用是否成功
    success: boolean
  }
```

## 6. 增加文章浏览量
***
<br/>

**url: /viewArticle**  
**请求方式: GET**  
**入参:**
```javascript
  // 入参类型
  interface ViewArticleInputType {
    // 标识文章唯一的 id
    id: number
  }
```

**出参:**
```javascript
  // 出参类型
  interface ViewArticleOutputType {
    // // 接口调用是否成功
    success: true,
  }
```
