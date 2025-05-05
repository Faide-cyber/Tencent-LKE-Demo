var contextarray = [];

var defaults = {
    html: false,        // Enable HTML tags in source
    xhtmlOut: false,        // Use '/' to close single tags (<br />)
    breaks: false,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks
    linkify: true,         // autoconvert URL-like texts to links
    linkTarget: '',           // set target to open link in
    typographer: true,         // Enable smartypants and other sweet transforms
    _highlight: true,
    _strict: false,
    _view: 'html'
};
defaults.highlight = function (str, lang) {
    if (!defaults._highlight || !window.hljs) { return ''; }

    var hljs = window.hljs;
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(lang, str).value;
        } catch (__) { }
    }

    try {
        return hljs.highlightAuto(str).value;
    } catch (__) { }

    return '';
};
mdHtml = new window.Remarkable('full', defaults);

mdHtml.renderer.rules.table_open = function () {
    return '<table class="table table-striped">\n';
};

mdHtml.renderer.rules.paragraph_open = function (tokens, idx) {
    var line;
    if (tokens[idx].lines && tokens[idx].level === 0) {
        line = tokens[idx].lines[0];
        return '<p class="line" data-line="' + line + '">';
    }
    return '<p>';
};

mdHtml.renderer.rules.heading_open = function (tokens, idx) {
    var line;
    if (tokens[idx].lines && tokens[idx].level === 0) {
        line = tokens[idx].lines[0];
        return '<h' + tokens[idx].hLevel + ' class="line" data-line="' + line + '">';
    }
    return '<h' + tokens[idx].hLevel + '>';
};
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}

function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['iphone', 'ipod', 'ipad', 'android', 'windows phone', 'blackberry', 'nokia', 'opera mini', 'mobile'];
    for (let i = 0; i < mobileKeywords.length; i++) {
        if (userAgent.indexOf(mobileKeywords[i]) !== -1) {
            return true;
        }
    }
    return false;
}

function insertPresetText() {
    $("#kw-target").val($('#preset-text').val());
    autoresize();
}

function initcode() {
    console['\x6c\x6f\x67']("");
}

function copyToClipboard(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

function copycode(obj) {
    copyToClipboard($(obj).closest('code').clone().children('button').remove().end().text());
    layer.msg("复制完成！");
}

function autoresize() {
    var textarea = $('#kw-target');
    var width = textarea.width();
    var content = (textarea.val() + "a").replace(/\\n/g, '<br>');
    var div = $('<div>').css({
        'position': 'absolute',
        'top': '-99999px',
        'border': '1px solid red',
        'width': width,
        'font-size': '15px',
        'line-height': '20px',
        'white-space': 'pre-wrap'
    }).html(content).appendTo('body');
    var height = div.height();
    var rows = Math.ceil(height / 20);
    div.remove();
    textarea.attr('rows', rows);
    $("#article-wrapper").height(parseInt($(window).height()) - parseInt($("#fixed-block").height()) - parseInt($(".layout-header").height()) - 80);
}

function randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
    
$(document).ready(function () {
    initcode();
    autoresize();

    $("#ai-btn").click(function () {
        if ($("#kw-target").is(':disabled')) {
            clearInterval(timer);
            $("#kw-target").val("");
            $("#kw-target").attr("disabled", false);
            autoresize();
            $("#ai-btn").html('<i class="iconfont icon-wuguan"></i>发送');
            if (!isMobile()) $("#kw-target").focus();
        } else {
            send_post();
        }
        return false;
    });

    async function send_post() {
        var prompt = $("#kw-target").val();
        console.log("发送内容:", prompt);

        if (($('#key').length) && ($('#key').val().length != 51)) {
            layer.msg("请输入正确的API-KEY", { icon: 5 });
            return;
        }

        if (prompt == "") {
            layer.msg("请输入您的问题", { icon: 5 });
            return;
        }

        var loading = layer.msg('AI助手正在组织语言，请稍等片刻...', {
            icon: 16,
            shade: 0.4,
            time: false // 取消自动关闭
        });

        try {
            // 获取session_id, visitor_biz_id 和 bot_app_key
            const response = await fetch('setsession.php', {
                method: 'POST',
                body: new URLSearchParams({
                    model_type: $('#model_type').val()
                })
            });
            const data = await response.json();
            const session_id = data.session_id;
            const bot_app_key = data.bot_app_key;
            const visitor_biz_id = data.visitor_biz_id;

            // 发送AI请求
            const response2 = await fetch("https://wss.lke.cloud.tencent.com/v1/qbot/chat/sse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    session_id: session_id,
                    bot_app_key: bot_app_key,
                    visitor_biz_id: visitor_biz_id,
                    content: prompt,
                    incremental: false,
                    streaming_throttle: 10,
                    visitor_labels: [],
                    custom_variables: {}
                })
            });

            const reader = response2.body.getReader();
            const decoder = new TextDecoder();
            let done, value;
            let allText = '';  // 存储最终文本
            let currentText = ''; // 记录已渲染文本，防止重复渲染
            let answerId = randomString(16); // 生成唯一 ID

            // 在页面中显示问题
            $("#article-wrapper").append(`<li class="article-title" id="q${answerId}"><pre>${prompt}</pre></li>`);
            $("#article-wrapper").append(`<li class="article-content" id="${answerId}"></li>`);

            while (true) {
                ({ done, value } = await reader.read());
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                console.log("流式数据:", chunk);

                // 只解析 JSON 数据，忽略 event 头部
                const jsonMatch = chunk.match(/data:({.*})/);
                if (jsonMatch) {
                    try {
                        const json = JSON.parse(jsonMatch[1]);
                        if (json && json.type === 'reply' && json.payload && json.payload.content) {
                            const content = json.payload.content;
                            if (content !== currentText) {  // 仅渲染新内容
                                let newContent = content.substring(currentText.length); // 计算增量
                                allText += newContent;  // 只追加新增内容
                                currentText = content; // 更新当前文本

                                // 渲染 Markdown 并更新页面
                                let newHtml = mdHtml.render(allText);
                                $("#" + answerId).html(newHtml);

                                // 处理代码块，添加复制按钮
                                $("#" + answerId + " pre code").each(function () {
                                    $(this).html("<button onclick='copycode(this);' class='codebutton'>复制</button>" + $(this).html());
                                });

                                // 滚动到最新消息
                                document.getElementById("article-wrapper").scrollTop = 100000;
                            }
                        }
                    } catch (error) {
                        console.error("无法解析JSON:", error);
                    }
                }
            }

            // 任务完成，重置 UI
            layer.close(loading);
            $("#kw-target").val(""); // 清空输入框
            $("#kw-target").attr("disabled", false); // 启用输入框
            autoresize();
            $("#ai-btn").html('<i class="iconfont icon-wuguan"></i>发送');
        } catch (error) {
            console.error("请求失败:", error);
            layer.close(loading);
            layer.msg("请求失败，请稍后再试", { icon: 5 });
        }
    }
});




