# Tencent-LKE-Demo

#### [English Doc](https://github.com/Faide-cyber/Tencent-LKE-Demo)

![Static Badge](https://img.shields.io/badge/%40Github-Faide-%2300FFFF) ![Static Badge](https://img.shields.io/badge/PlatForm-Windows-%238c37dc) ![Static Badge](https://img.shields.io/badge/Version-1.0.0-%23e87435) ![Static Badge](https://img.shields.io/badge/License-GNU3.0-%2314bbc1)
### 1. 项目概述

**Tencent-LKE-Demo** 大模型知识引擎（LLM Knowledge Engine），是面向企业客户及合作伙伴的，基于大语言模型的知识应用构建平台，结合企业专属数据，提供知识问答等应用范式，更快更高效地完成大模型应用的构建，推动大语言模型在企业服务场景的应用落地。该项目使用HTTP SSE方式进行知识库模型的流式调用 详见 [示例页面](https://faide.top/myproject/index.php)。
由于Tencent-LKE目前并未开放OpenAI API，因此根据其接口文档简要实现其Demo页面。

<img src="https://github.com/Faide-cyber/Tencent-LKE-Demo/blob/main/assets/Demo.png" width="800px">

### 2. 系统架构与文件结构

项目主要包含以下几个部分：

```
├── css/                         # CSS文件目录
│   └── (通过上传添加的文件)
├── js/                          # JavaScript文件目录
│   └── remarkable.js            # 创建的remarkable.js文件
├── assets/                      # 静态资源
│   └── Demo.png                 # 示例截图
├── LICENSE                      # 项目许可证文件
├── README.md                    # 项目说明文件
├── REMEDE_ch.md                 # 创建的REMEDE_ch.md文件
├── index.php                    # 主入口PHP文件
├── phpinfo.php                  # PHP信息展示文件
├── setsession.php               # 会话设置PHP文件
└── stream.php                   # 流处理PHP文件
```

### 3. 环境要求与依赖
**服务器要求**
- PHP >= 7.4（推荐8.1+）
- 启用以下PHP扩展：curl、json、mbstring
- Web服务器（Apache/Nginx）支持SSE长连接

**前端依赖**
- jQuery 3.6.0+
- Markdown解析器（内置remarkable.js）

**API要求**
- 有效的腾讯云API密钥
- 已创建的知识库应用ID


### 4. 安装与部署

#### 4.1获取源码
- 从 GitHub 仓库克隆或下载最新版本源码至本地开发环境。
#### 4.2配置参数
- 登录[大模型知识引擎](https://lke.cloud.tencent.com/lke#/app/home/)创建知识库应用并发布，获取对应的 bot_app_key。添加至setsession.php的bot_app_key变量中。
- 打开 setsession.php 文件，将获取的appkey添加至setsession.php的bot_app_key变量中。
#### 4.3部署至服务器
- 将配置完成的项目目录上传至 Web 服务器根目录（如 Apache 或 Nginx），确保服务器支持 PHP 7.4+ 且启用了 SSE 长连接功能。

### 5. 功能说明

#### 5.1 智能对话系统

- 基于 DeepSeek V3/R1 聊天模型实现结合本地知识库问答功能。
- 用户输入消息后，系统将用户信息与预设知识库内容作为上下文发送至LKE中，返回智能应答结果。
- 对话中包含系统、用户与助手角色信息，通过裁剪策略防止传输数据超限。

#### 5.2 SSE 实时响应

- 页面布局简洁直观，支持多轮问答。
- 前端支持 Markdown 渲染，便于展示结构化知识。
- 响应式布局适配桌面与移动端访问。

#### 5.3 会话维护机制

- 使用 PHP 原生 session_start() 管理对话上下文。
- 支持基本历史记录存储与用户上下文传递。
- 每轮提问均包含先前会话内容，增强上下文理解。

### 6. 开发与扩展

- 核心逻辑集中在 stream.php，用于处理 SSE 推送。
- API Key、模型参数等可直接在 stream.php 中设置。
- 对于高并发应用场景，可启用反向代理并配置缓存策略。

### 7. 许可

您可以根据自由软件基金会发布的GNU通用公共许可证的条款进行再分发和/或修改。您可以选择使用第3版许可证，或者任何更高版本的许可证。

本程序是以希望它会有用的方式发布，但不提供任何明示或暗示的保证，包括但不限于适销性或特定用途的适用性。请参阅GNU通用公共许可证以获取更多详细信息。

您应该已经随此程序收到了GNU通用公共许可证的副本。如果没有，请参阅http://www.gnu.org/licenses/。


### 8. 免责声明

**Tencent-LKE-Demo**（以下简称“本项目”）（以下简称“本项目”）仅供学习和研究使用，禁止将其用于任何非法用途。如果您选择使用本项目的任何部分，您必须遵守所有相关法律和规定，并承担由此产生的所有责任。

作者不对因使用本项目而导致的任何损失或损害负责。如果您选择使用本项目的任何部分，您应该自己承担所有风险和责任。

本人保留追究任何非法使用本项目的人的法律责任的权利。如果您选择使用本项目的任何部分进行非法活动，您将面临法律诉讼和其他惩罚。

使用者应遵守相关法律法规，尊重作者的知识产权。任何因违反上述规定而引起的法律纠纷，由使用者承担全部责任。

本声明的解释权归作者所有。

### 9. 附加信息

- **最新源码与文档**
   请访问 GitHub 仓库获取最新的源码及文档更新：https://github.com/Faide-cyber/
- **Tencent-LKE-Demo API 相关文档**
   详见 [对话端接口文档（HTTP SSE）](https://cloud.tencent.com/document/product/1759/105561/)

### 10. 联系方式

微信或邮箱1350038426@qq.com

如果您有任何问题或疑问，也可以通过提交issue的方式与我进行交流。

在提交issue时，请确保描述清楚您的问题或反馈，并提供足够的上下文信息，以便我能够更好地理解和回答您的问题。

![QQ图片202310251908231](https://github.com/Faide-cyber/MouseCopy/assets/148406475/8b7ac122-d438-4d64-b6d0-330b514e4389)
