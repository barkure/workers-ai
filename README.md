# workers-ai
一个调用Cloudflare Workers AI多种模型API的AI网站项目
# 功能
- 文本生成（@cf/meta/llama-2-7b-chat-int8）
- 文本翻译（@cf/meta/m2m100-1.2b）
- 图像分类（@cf/microsoft/resnet-50）
- 文本生图（@cf/stabilityai/stable-diffusion-xl-base-1.0）
# 部署方法
## 生成网页文件
首先，你需要从GitHub上拉取这个仓库。你可以使用以下命令（亦或是下载本仓库）：
```bash
https://github.com/barkure/workers-ai.git
```
然后打开项目，修改相关的配置：
1. 打开`src\components\AxiosInstance.js`，将第4行的`baseURL`修改为自己的反代地址，比如：
```javascript
    baseURL: `https://api.ai.barku.re`,
```
2. 在项目的根目录，即`workers-ai\`目录下，运行如下命令（分两次）：
```bash
npm install
npm run build
```
运行结束后，根目录会出现一个`build`文件夹，这是后面需要用到的.
注意：此处假设你的电脑已经安装了 [**Node.js**](https://nodejs.org/).

## 配置API反代
此处以**宝塔面板**为例，以供参考.
1. 访问Cloudflare的[API Tokens](https://dash.cloudflare.com/profile/api-tokens)，依次点击`Create Token`--->`Workers AI (Beta) Use template`--->`Continue to summary`--->`Create Token`.

**请保存好生成的Token.**

2. 登陆后访问[https://dash.cloudflare.com/](https://dash.cloudflare.com/)，地址栏会出现`https://dash.cloudflare.com/xxxxxxxxx`，`xxxxxxxxx`即是你的`{ACCOUNT_ID}`，复制保存.

3. 宝塔面板新建站点，域名填写API地址，比如`api.ai.barku.re`，配置好SSL.

添加`反向代理`，目标URL填写`https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/`，代理名称自己填，然后点击`提交`.

点击刚刚的反向代理的`配置文件`，清空内容，复制下面内容，根据个人情况修改并保存：
```nginx
    add_header 'Access-Control-Allow-Headers' 'Origin,X-Requested-With,Content-Type,Accept,Authorization,token' always;
    add_header 'Access-Control-Allow-Origin' 'https://ai.barku.re';
    # 此处修改为你的前端网页地址
    if ($request_method = 'OPTIONS') {
    	return 204;
    }
  
     location / {
		 proxy_pass  https://api.cloudflare.com/client/v4/accounts/xxxxxxxxx/ai/run/;
         # 此处修改xxxxxxxxx为你Cloudflare ACCOUNT_ID
		 proxy_set_header Host $proxy_host; # 
		 proxy_set_header X-Real-IP $remote_addr;
		 proxy_set_header Authorization 'Bearer abc';
         # 此处修改abc为你的Token，Bearer与Token间有一个空格
		 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}
```

4. 点击**站点修改**的`配置文件`，插入下面的规则：
```nginx
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
```

完成
# 截图预览
![截图](./screenshots/2023-12-10%20231250.png)