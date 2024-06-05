# SwaggerNetModule
## 1. 使用方式：
```
config.EnableSwaggerUi(c =>
{
    c.DocumentTitle("WebApi");
    c.DocExpansion(DocExpansion.List); // 要设置为展开
    c.InjectJavaScript(typeof(WebApiConfig).Assembly, "WebApi.Common.Config.SwaggerUi.js");
});
```
在VS中把 js 的“属性” > “生成操作”改成“嵌入的资源”。
## 2. 效果：
### 模块 1
#### Controller 1
##### 接口 1
##### 接口 2

### 模块2
#### Controller 2
##### 接口 3
##### 接口 4

---
基于 [Swagger-Net](https://github.com/heldersepu/Swagger-Net)
