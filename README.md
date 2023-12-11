# workers-ai
一个调用Cloudflare Workers AI多种模型API的AI网站项目
# 功能
- 文本生成（@cf/meta/llama-2-7b-chat-int8）
- 文本翻译（@cf/meta/m2m100-1.2b）
- 图像分类（@cf/microsoft/resnet-50）
- 文本生图（@cf/stabilityai/stable-diffusion-xl-base-1.0）
# 部署方法
## 准备工作
1. 登陆Cloudflare后访问 [https://dash.cloudflare.com](https://dash.cloudflare.com/)，地址栏会出现`https://dash.cloudflare.com/xxxxxxxxx`，`xxxxxxxxx`即是你的`{ACCOUNT_ID}`，复制保存

2. 访问Cloudflare的 [API Tokens](https://dash.cloudflare.com/profile/api-tokens)，依次点击 `Create Token`--->`Workers AI (Beta) Use template`--->`Continue to summary`--->`Create Token`
**请保存好生成的Token**

## 使用 Vercel Deploy 部署
1. 点击下面的 Deploy 图标 

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/barkure/workers-ai)

2. 你需要输入一个仓库名，例如：Workers-AI，点击 `Create`，等待一两分钟，构建完成后，点击`Continue to Dashboard`

3. 依次点击`Settings`--->`Environment Variables`. 
添加下面两个环境变量（请根据自己的`ACCOUNT_ID`和`Token`进行修改）：
```
REACT_APP_ACCOUNT_ID='abcdef'
REACT_APP_API_TOKEN='123456'
```

4. 环境变量添加后，点击`Deployments`，然后`Redeploy`，重新部署

5. 等待两分钟，部署完成，就可以使用了

如需自定义域名，请自行研究。

### ⚠注意
 **由于Vercel对单个请求的时长有限制（10s），而画图需要二十至三十秒，因此此种方法部署的文本转图功能无法使用**

一个可行的解决办法：你可以自行反代 Cloudflare Workers AI 的 API，然后 Fork 本项目，修改 `src\components\AxiosInstance.js` 中的baseURL 为反代后的地址。然后使用 Vercel 部署或者自行使用服务器部署前端网站

反代方法可参考下面的**反代 Cloudflare Workers AI API**
## 使用 Nginx 部署
### 反代 Cloudflare Workers AI API
你可能需要对 Nginx 的配置有所了解，在你的 Nginx 配置中插入如下配置：
```nginx
    add_header 'Access-Control-Allow-Headers' 'Origin,X-Requested-With,Content-Type,Accept,Authorization,token' always;
    add_header 'Access-Control-Allow-Origin' 'https://ai.barku.re';
    # 修改为你的前端网站地址
    if ($request_method = 'OPTIONS') {
    	return 204;
    }
  
     location / {
		 proxy_pass  https://api.cloudflare.com/client/v4/accounts/abcdef/ai/run/;
         # 请替换 abcdef 为你的 ACCOUNT_ID
		 proxy_set_header Host $proxy_host; # 
		 proxy_set_header X-Real-IP $remote_addr;
		 proxy_set_header Authorization 'Bearer 123456';
         # 请替换 123456 为你的 Token
		 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}
```
### Nginx 服务器部署前端网站
首先，你需要从GitHub上拉取这个仓库。你可以使用以下命令（亦或是下载本仓库）：

```bash
git clone https://github.com/barkure/workers-ai.git
```
然后打开项目，修改相关的配置：
1. 打开 `src\components\AxiosInstance.js`，将第 4 行的`baseURL`修改为自己的后端地址，示例如下：
```javascript
const AxiosInstance = axios.create({
    baseURL: `https://api.ai.barku.re`,
    timeout: 30000,
});
```

2. 在项目的根目录，即`workers-ai\`目录下，运行如下命令（分两次）：
```bash
npm install
npm run build
```
运行结束后，根目录会出现一个`build`文件夹，上传这个目录下的所有目录和文件到站点根目录，部署完成

注意：此处假设你的电脑已经安装了 [**Node.js**](https://nodejs.org/).
# 截图预览
![截图](./screenshots/2023-12-10%20231250.png)