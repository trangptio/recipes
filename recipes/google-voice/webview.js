const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = (Ferdium, settings) => {
  function parseQuery(query) {
    const el = document.querySelector(query);
    return el && Ferdium.safeParseInt(el.textContent);
  }

  const getMessages = () => {
    const el = document.querySelector('.msgCount');
    let count;

    if (el && el.textContent) {
      count = Ferdium.safeParseInt(el.textContent.replace(/[ ()]/gi, ''));
    } else {
      const count_messages = parseQuery(
        'gv-nav-tab[tooltip="Messages"] div[aria-label="Unread count"]',
      );
      const count_calls = parseQuery(
        'gv-nav-tab[tooltip="Calls"] div[aria-label="Unread count"]',
      );
      const count_voicemails = parseQuery(
        'gv-nav-tab[tooltip="Voicemail"] div[aria-label="Unread count"]',
      );
      count = count_messages + count_calls + count_voicemails;
    }

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
  loadTailwindcss();
  const insertDom = () => {
    const dom = document.querySelector(".unijump-toolbox")
    if (dom) {
      return;
    }
    const parent = document.querySelector("div[ng-if='ctrl.shouldShowMessageEntry()']")
    if (!parent) {
      return;
    }
    parent.insertAdjacentHTML("afterend", `<div style="width: 100%; position: relative;">
    <div class="relative flex w-full bg-slate-100 p-2 items-center" id="transSuggest">
      <p class="flex-1 m-0 overflow-hidden text-blue-800 text-sm text-slate-500" id="transSuggestContent">
      </p>
      <div class="flex space-x-1 flex-initial">
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
                <ul class="flex !flex-none gap-2">
                    <li class="flex !flex-none items-center rounded-md">
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
                    <li class="flex !flex-none items-center rounded-md">
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
    addKeyDownAndTran();
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
            let msgDom = document.querySelector("textarea[gv-test-id='gv-message-input']");
            // console.log('sendMsg', sendMsg)
            if (msgDom.value) {
              clickSendBtn();
              document.querySelector("#text_input").value = ''
            } else {
              handleSendMessage(await Ferdium.getTran(msg, settings.apiBase, settings.token, document.querySelector("#modes").value, document.querySelector("#tones").value))
              // Ferdium.typeString("Hello, World!你好，世界")
              //   handleSendMessage("Hello, World!你好，世界")
            }
            setTimeout(() => {
              document.querySelector("#text_input").focus()
            }, 200);
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
   */
  const handleSendMessage = async (msg) => {
    console.log('handleSendMessage', msg)
    let msgDom = document.querySelector("textarea[gv-test-id='gv-message-input']");
    msgDom.value = msg
    const event = new Event('input', { bubbles: true });
    msgDom.dispatchEvent(event);
    // document.querySelector(classnameCfg.iptSpan).focus()
    // setTimeout(() => {
    //   // 点击发送
    //   // setTimeout(() => {
    //     clickSendBtn();
    //   // }, 200);
    // }, 200);


  };
  const clickSendBtn = () => {
    let sendBtn = document.querySelector('#ib2');
    let evtClick = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    sendBtn.dispatchEvent(evtClick);
  };
  const newMessages = () => {
    let peerIdDom = document.querySelector(".gvMessageListHeader-title")
    if (!peerIdDom) {
      return;
    }
    let peerId = peerIdDom.textContent
    let rows = document.querySelectorAll(".messages-container li.ng-star-inserted");
    for (const row of rows) {
      const trans = row.querySelector('.trans')
      // console.log(trans)
      if (!trans) {
        const contentDom = row.querySelector(".content")
        if (!contentDom) {
          continue;
        }
        const text = contentDom.textContent
        const tranKey = `trans@${peerId}@${text}`;
        const tranCache = localStorage.getItem(tranKey);
        if (!tranCache) {
          contentDom.insertAdjacentHTML('beforeend', '<div class="trans">翻译中...</div>')
          Ferdium.getTran2(text, settings.apiBase, settings.token).then((res) => {
            // console.log('res', res)
            contentDom.querySelector('.trans').textContent = res
            localStorage.setItem(tranKey, res)
          })
        } else {
          contentDom.insertAdjacentHTML('beforeend', '<div class="trans">' + tranCache + '</div>')

        }

      }
    }
  }
  const lastMessages = (num = 10) => {
    let newMessages = []
    let peerIdDom = document.querySelector(".gvMessageListHeader-title")
    if (!peerIdDom) {
      return;
    }
    let peerId = peerIdDom.textContent
    let rows = document.querySelectorAll(".messages-container li.ng-star-inserted");
    for (const row of rows) {
      const contentDom = row.querySelector(".content")
      if (!contentDom || contentDom.childNodes.length === 0) {
        continue;
      }
      const text = contentDom.childNodes[0].textContent.trim();
      if (!text) {
        continue;
      }
      newMessages.push({
        message: text,
        type: row.querySelector('.message-row.outgoing') ? 1 : 0
      })
    }
    return {messages: newMessages.slice(-1 * num)}

  };
  setTimeout(() => {
    let loop2 = setInterval(() => {
      insertDom();
      newMessages();
    }, 500);
  }, 500)
  const suggest = (msg) => {
    const transSuggest = document.querySelector('#transSuggest')
    Ferdium.getSuggest(settings.apiBase, settings.token, {msg}).then((res) => {
      transSuggest.querySelector('#transSuggestContent').textContent = res
    })
  }
};
