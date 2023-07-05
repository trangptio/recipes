const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (Ferdium, settings) => {
  const classnameCfg = {
    ipt: '.public-DraftStyleDefault-block',
    sendBtn: '.tiktok-d7yhdo-StyledSendButton',
    main: '.tiktok-1ckpdrf-DivChatBox',
    allMsg: '.tiktok-1rdxtjl-PText',
    friendList: '.etdtmal5',
    iptSpan:
        ".DraftEditor-editorContainer .public-DraftEditor-content span[data-text='true']",
  }
  const getMessages = () => {
    const selNotifications =  document.querySelector("div.tiktok-1b4xcc5-DivHeaderInboxContainer.e18kkhh40 > sup");
    const selDM = document.querySelector("div.tiktok-1ibfxbr-DivMessageIconContainer.e1nx07zo0 > sup");

    const countNotifications = (selNotifications != null) ? Ferdium.safeParseInt(selNotifications.outerText) : 0;
    const countDM = (selDM != null) ? Ferdium.safeParseInt(selDM.outerText) : 0;

    const count = countNotifications + countDM;

    Ferdium.setBadge(count);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  const loadTailwindcss = () => {
    var head = document.head;
    var s1 = document.createElement("script");
    s1.src = "https://cdn.tailwindcss.com";
    head.append(s1);

  }
  loadTailwindcss()
  const insertDom = () => {
    const dom = document.querySelector(".unijump-toolbox")
    if (dom) {
      return;
    }
    const parent = document.querySelector(".tiktok-fqfkc9-DivChatBottom")
    parent.insertAdjacentHTML("afterend", `<div style="width: 100%; position: relative;">
<div class="relative flex w-full bg-slate-100 p-2 items-center" id="transSuggest">
      <p class="flex-1 m-0 overflow-hidden text-blue-800 text-sm text-slate-500" id="transSuggestContent">
      </p>
      <div class="flex space-x-1">
      <button id="transSuggestBtn" class="text-blue-500 text-xs px-1 hover:bg-blue-500 h-5 rounded hover:text-white">
        使用
      </button>
    <button class="text-blue-500 text-xs px-1 hover:bg-white h-5 rounded  flex items-center justify-center hover:text-white" id="transSuggestRefreshBtn">
<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 383.748 383.748" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z"></path> <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"></path> </g> </g></svg>
    </button>
      </div>
    </div>
    <div class="unijump-toolbox" style="opacity: 1 !important;transition: opacity 0.4s ease 0s;z-index: 999;">
        <div class="toolbox text-left w-full flex gap-3 items-center px-2 py-1 text-white font-sans antialiased !opacity-100 !static svelte-ihi54f"
            style="background: linear-gradient(270deg, #4d29b2 0%, #311fa3 100%);position: absolute; ">
            <div class="flex-1">
                <ul class="flex gap-2">
                    <li class="flex items-center rounded-md">
                        <select id="modes" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="">调整场景</option>
                            <option value="formal">👔 正式</option>
                            <option value="fluent">🐬 流利</option>
                            <option value="serious">🧐 严肃</option>
                            <option value="professional">🥸 专业</option>
                            <option value="motivating">⚡ 激励</option>
                            <option value="respectful">🙏 尊重</option>
                            <option value="assertive">💪 武断</option>
                            <option value="captivating">😍 迷人</option>
                            <option value="urgent">🚨 紧急</option>
                        </select>
                    </li>
                    <li class="flex items-center rounded-md">
                        <select id="tones" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="">调整语气</option>
                            <option value="neutral">😐
                                中性</option>
                            <option value="confident">😌
                                自信</option>
                            <option value="direct">👉
                                直接</option>
                            <option value="friendly">🥰
                                友好</option>
                            <option value="smiley">😊
                                笑意</option>
                            <option value="polite">🙂
                                礼貌</option>
                            <option value="helpful">👍
                                合意</option>
                            <option value="angry">😡
                                愤怒</option>
                            <option value="funny">😂
                                搞笑</option>
                        </select>

                    </li>
                    <li class="flex-1">
                        <input id="text_input" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="请输入文字提示,回车后调用ChatGPT生成回复，再次回车发送回复" required>

                    </li>
                </ul>

            </div>
            <div class="toolbox-menu relative"><button
                class="p-1 bg-white/8 rounded-full hover:bg-white/15 transition-all toolbox-menu-button rounded-md"><svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M1.793 6.5a1.707 1.707 0 0 1 2.414 0l.293.293a1.707 1.707 0 0 1 0 2.414l-.293.293a1.707 1.707 0 0 1-2.414 0L1.5 9.207a1.707 1.707 0 0 1 0-2.414l.293-.293Zm5 0a1.707 1.707 0 0 1 2.414 0l.293.293a1.707 1.707 0 0 1 0 2.414l-.293.293a1.707 1.707 0 0 1-2.414 0L6.5 9.207a1.707 1.707 0 0 1 0-2.414l.293-.293Zm5 0a1.707 1.707 0 0 1 2.414 0l.293.293a1.707 1.707 0 0 1 0 2.414l-.293.293a1.707 1.707 0 0 1-2.414 0l-.293-.293a1.707 1.707 0 0 1 0-2.414l.293-.293Z"
                        clip-rule="evenodd"></path>
                </svg> <span class="sr-only">Toolbox Options</span></button> </div>
        </div>
    </div>
</div>`)
    addKeyDownAndTran()
    document.querySelector('#transSuggestBtn').addEventListener('click', function() {
      handleSendMessage(document.querySelector('#transSuggestContent').textContent.trim())
    });
    document.querySelector('#transSuggestRefreshBtn').addEventListener('click', function() {
      suggest(lastMessages())
    });
  }
  const addKeyDownAndTran = () => {
    document.querySelector('#text_input').addEventListener(
        'keydown',
        async event => {

          let key = event.key;
          if (key === 'Enter') {
            let msg = document.querySelector("#text_input").value;
            let sendMsg = document.querySelector(".public-DraftStyleDefault-block").textContent;
            // console.log('sendMsg', sendMsg)
            if (sendMsg) {
              clickSendBtn();
            } else {
              handleSendMessage(await Ferdium.getTran(msg, settings.apiBase, settings.token, document.querySelector("#modes").value, document.querySelector("#tones").value))
            }
            document.querySelector("#text_input").focus()
            // handleSendMessage('test')
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
          }
        },
        true,
    );
  };
  /**
   * 发送消息
   * !本输入框使用的是textarea  修改innerHtml innerText均无效
   */
  const handleSendMessage = async (msg) => {
    console.log('handleSendMessage', msg)
    let inputDom = document.querySelector(".DraftEditor-editorContainer .public-DraftEditor-content");
    // 获取元素

// 创建文本节点
    const textNode = document.createTextNode(msg);

// 创建 Range 对象
    const range = document.createRange();

// 获取选区
    const selection = window.getSelection();

// 将 Range 对象设置为选区
    range.selectNodeContents(inputDom);
    range.collapse(false);

// 将文本节点插入到 Range 对象中
    range.insertNode(textNode);

// 重置选区
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

// 分派 input 事件
    const event = new Event('input', { bubbles: true });
    inputDom.dispatchEvent(event);
    inputDom.childNodes[1].remove()
    // document.querySelector(classnameCfg.iptSpan).focus()
    // setTimeout(() => {
    //   // 点击发送
    //   // setTimeout(() => {
    //     clickSendBtn();
    //   // }, 200);
    // }, 200);


  };
  const clickSendBtn = () => {
    let sendBtn = document.querySelector('.tiktok-d7yhdo-StyledSendButton');
    let evtClick = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    sendBtn.dispatchEvent(evtClick);
  };
  const newMessages = () => {
    let peerIdDom = document.querySelector('p[data-e2e="chat-uniqueid"]')
    if (!peerIdDom || peerIdDom.childNodes.length !== 2) {
      return;
    }
    let peerId = peerIdDom.childNodes[1].textContent
    let rows = [...document.querySelectorAll('div[data-e2e="chat-item"] .tiktok-qkrs52-DivMessageContainer .tiktok-19jlons-DivTextContainer'), ...document.querySelectorAll('div[data-e2e="chat-item"] .tiktok-101150x-DivMessageContainer .tiktok-19jlons-DivTextContainer')];
    if (rows.length === 0) {
      //深色模式
      rows = [...document.querySelectorAll('div[data-e2e="chat-item"] .tiktok-qkrs52-DivMessageContainer .tiktok-1p8b86x-DivTextContainer'), ...document.querySelectorAll('div[data-e2e="chat-item"] .tiktok-15vjuep-DivMessageContainer .tiktok-1p8b86x-DivTextContainer')];
    }
    for (const row of rows) {
      const trans = row.querySelector('.trans')
      // console.log(trans)
      if (!trans) {
        const text = row.textContent
        const tranKey = `trans@${peerId}@${text}`;
        const tranCache = localStorage.getItem(tranKey);
        if (!tranCache) {
          row.insertAdjacentHTML('beforeend', '<div class="trans">翻译中...</div>')
          Ferdium.getTran2(text, settings.apiBase, settings.token).then((res) => {
            // console.log('res', res)
            row.querySelector('.trans').textContent = res
            localStorage.setItem(tranKey, res)
          })
        } else {
          row.insertAdjacentHTML('beforeend', '<div class="trans">' + tranCache + '</div>')

        }

      }
    }
  }
  const lastMessages = (num = 10) => {
    let peerIdDom = document.querySelector('p[data-e2e="chat-uniqueid"]')
    if (!peerIdDom || peerIdDom.childNodes.length !== 2) {
      return;
    }
    let peerId = peerIdDom.childNodes[1].textContent
    let newMessages = []

    let rows = document.querySelectorAll('div[data-e2e="chat-item"] .tiktok-19jlons-DivTextContainer');
    let className = 'tiktok-qkrs52-DivMessageContainer'
    if (rows.length === 0) {
      //深色模式
      rows = document.querySelectorAll('div[data-e2e="chat-item"]  .tiktok-1p8b86x-DivTextContainer');
    }
    for (const row of rows) {
        const text = row.querySelector('p').textContent
      if (!text) {
        continue;
      }
      newMessages.push({
        message: text,
        type: row.parentElement.classList.contains('tiktok-qkrs52-DivMessageContainer') ? 0 : 1,
      })

    }
    return {peerTitle: peerId, messages: newMessages.slice(-1 * num)}

  }
  setTimeout(() => {
    let loop2 = setInterval(() => {
      let chat = document.querySelector(".tiktok-fqfkc9-DivChatBottom")
      if (chat) {
        insertDom()
        newMessages()
        // clearInterval(loop2);
      }
    }, 500);
  }, 500)
  const suggest = (msg) => {
    const transSuggest = document.querySelector('#transSuggest')
    Ferdium.getSuggest(settings.apiBase, settings.token, {msg}).then((res) => {
      transSuggest.querySelector('#transSuggestContent').textContent = res
    })
  }
};
