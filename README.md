# SwaggerNetModule
## 使用方式：
```
config.EnableSwaggerUi(c =>
{
    c.DocumentTitle("WebApi");
    c.DocExpansion(DocExpansion.List);
    c.InjectJavaScript(typeof(WebApiConfig).Assembly, "WebApi.Common.Config.SwaggerUi.js");
});
```
