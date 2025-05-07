# Tencent-LKE-Demo

#### [中文文档](https://github.com/Faide-cyber/Tencent-LKE-Demo/blob/main/REMEDE_ch.md)

![Static Badge](https://img.shields.io/badge/%40Github-Faide-%2300FFFF) ![Static Badge](https://img.shields.io/badge/Platform-Windows-%238c37dc) ![Static Badge](https://img.shields.io/badge/Version-1.0.0-%23e87435) ![Static Badge](https://img.shields.io/badge/License-GNU3.0-%2314bbc1)

### 1. Project Overview

**Tencent-LKE-Demo** is a Large Language Model Knowledge Engine (LLM Knowledge Engine) targeting enterprise customers and partners. It is a platform for building knowledge-based applications powered by large language models. By combining proprietary enterprise data, it provides application paradigms such as knowledge Q\&A to help accelerate the implementation of LLM-powered services in business scenarios.

This project demonstrates how to interact with the Tencent-LKE knowledge base model using HTTP SSE streaming. See the [demo page](https://faide.top/myproject/index.php) for more details.

Since Tencent-LKE does not currently provide an OpenAI-compatible API, this demo is implemented based on its official API documentation.

<img src="https://github.com/Faide-cyber/Tencent-LKE-Demo/blob/main/assets/Demo.png" width="800px">

### 2. System Architecture and File Structure

Main project structure:

```
├── css/                         # CSS files
│   └── (user-uploaded files)
├── js/                          # JavaScript files
│   └── remarkable.js            # Markdown parser
├── assets/                      # Static resources
│   └── Demo.png                 # Screenshot
├── LICENSE                      # License file
├── README.md                    # Project description
├── REMEDE_ch.md                 # Chinese version of README
├── index.php                    # Main entry file
├── phpinfo.php                  # PHP info page
├── setsession.php               # Session config file
└── stream.php                   # Server-Sent Events logic
```

### 3. Environment & Dependencies

**Server Requirements**

* PHP >= 7.4 (8.1+ recommended)
* PHP extensions: `curl`, `json`, `mbstring`
* Web server (Apache/Nginx) with SSE long connection support

**Frontend Dependencies**

* jQuery 3.6.0+
* Markdown parser (built-in `remarkable.js`)

**API Requirements**

* Valid Tencent Cloud API Key
* A deployed knowledge base App ID

---

### 4. Installation & Deployment

#### 4.1 Get the Source Code

* Clone or download the latest source code from the GitHub repository to your local development environment.

#### 4.2 Configure Parameters

* Go to [Tencent LKE Console](https://lke.cloud.tencent.com/lke#/app/home/), create and publish a knowledge base app, and obtain the corresponding `bot_app_key`.
* Open the `setsession.php` file and set the `bot_app_key` variable with the key obtained above.
* (Optional) In `stream.php`, configure your `SecretId`, `SecretKey`, and other API settings if needed.

#### 4.3 Deploy to Server

* Upload the fully configured project directory to the web server root (Apache or Nginx), and ensure PHP 7.4+ with SSE support is enabled.

---

### 5. Features

#### 5.1 Smart Q\&A System

* Integrates DeepSeek V3/R1 chat model with local knowledge base Q\&A.
* User messages and knowledge context are sent to LKE for intelligent response.
* Session includes system, user, and assistant roles with context trimming to prevent token overflow.

#### 5.2 Real-Time SSE Streaming

* Clean and intuitive chat layout supporting multi-turn conversations.
* Frontend supports Markdown rendering for structured knowledge display.
* Responsive UI supports both desktop and mobile devices.

#### 5.3 Session Management

* Utilizes native `session_start()` in PHP to manage conversation context.
* Basic chat history and user context persistence included.
* Each query contains prior chat history for better context understanding.

---

### 6. Development & Extension

* Core logic resides in `stream.php` handling the SSE streaming.
* API Key and model parameters can be configured directly in `stream.php`.
* For high-concurrency environments, reverse proxy and caching strategies are recommended.

---

### 7. License

You may redistribute and/or modify this software under the terms of the GNU General Public License as published by the Free Software Foundation—either version 3 of the License, or (at your option) any later version.

This software is distributed in the hope that it will be useful, but **WITHOUT ANY WARRANTY**; without even the implied warranty of **MERCHANTABILITY** or **FITNESS FOR A PARTICULAR PURPOSE**. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see [http://www.gnu.org/licenses/](http://www.gnu.org/licenses/).

---

### 8. Disclaimer

**Tencent-LKE-Demo** (hereinafter referred to as "this project") is for educational and research purposes only and must not be used for any illegal activities.

The author shall not be liable for any loss or damage caused by the use of this project. Users assume all risks and responsibilities for using any part of this project.

The author reserves the right to pursue legal action against anyone using this project for unlawful purposes. Illegal use may result in lawsuits or penalties.

Users must comply with relevant laws and regulations and respect the author's intellectual property rights. Any legal disputes arising from violations shall be the sole responsibility of the user.

The interpretation of this statement belongs to the author.

---

### 9. Additional Info

* **Latest Source & Docs**
  Visit the GitHub repository for the latest updates: [https://github.com/Faide-cyber/](https://github.com/Faide-cyber/)

* **Tencent-LKE-Demo API Docs**
  See [SSE API Documentation](https://cloud.tencent.com/document/product/1759/105561/)

---

### 10. Contact

WeChat or Email: [1350038426@qq.com](mailto:1350038426@qq.com)

For questions or feedback, feel free to open an issue on GitHub.

When opening an issue, please provide clear descriptions and sufficient context so we can better understand and address your concern.

![QQ Screenshot](https://github.com/Faide-cyber/MouseCopy/assets/148406475/8b7ac122-d438-4d64-b6d0-330b514e4389)

---

如果你希望我也帮你做成独立的 `.md` 文件格式，可以告诉我文件名，我可以为你生成。是否还需要英文徽章图表或国际化支持建议？
