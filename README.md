## 技术栈

前端：vue2 + webpack + ES6

后端：koa1

数据库： mongodb
## 项目运行

#### 源码地址:  [https://github.com/forprogram/bookstore](https://github.com/forprogram/bookstore) 

#### 如何运行

运行前请先安装`nodejs`及`mongodb`

`clone`项目到本地

```shell
git clone https://github.com/lybenson/bilibili-vue.git
```

修改访问IP

为了在局域网内可正常使用
修改client/index和client/admin 内的index.js 的全局变量的IP为你的本地IP

数据库运行

```shell
mongod
mongo
```

后端运行

```shell
cd bookstore/server
npm install
node index.js
```

前端运行

```shell
cd bookstore/client
npm install
npm run dev
```

为了确保运行正确，请先运行数据库服务，再运行后端服务。最后前端，之后访问 http://{{你的IP}}:8090
