const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (Ferdium, settings) => {
  // console.log("telegram webview", Ferdium, settings)
  const telegramVersion = document
    .querySelector('meta[property="og:url"]')
    ?.getAttribute('content');

  const isWebK = telegramVersion?.includes('/k/');

  // There are two different Telegram versions for internal competition
  // Read more: https://bugs.telegram.org/c/4002/public
  const webZCount = () => {
    let directCount = 0;
    let groupCount = 0;

    const directCountSelector = document.querySelectorAll(
      '.chat-list .ListItem.private .Badge.unread:not(.muted)',
    );
    const groupCountSelector = document.querySelectorAll(
      '.chat-list .ListItem.group .Badge.unread:not(.muted)',
    );

    for (const badge of directCountSelector) {
      directCount += Ferdium.safeParseInt(badge.textContent);
    }

    for (const badge of groupCountSelector) {
      groupCount += Ferdium.safeParseInt(badge.textContent);
    }

    Ferdium.setBadge(directCount, groupCount);
  };

  const webKCount = () => {
    let directCount = 0;
    let groupCount = 0;

    const elements = document.querySelectorAll('.rp:not(.is-muted)');

    for (const element of elements) {
      const subtitleBadge = element.querySelector('.dialog-subtitle-badge');

      if (subtitleBadge) {
        const parsedValue = Ferdium.safeParseInt(subtitleBadge.textContent);

        if (element.dataset.peerId > 0) {
          directCount += parsedValue;
        } else {
          groupCount += parsedValue;
        }
      }
    }

    Ferdium.setBadge(directCount, groupCount);
  };

  const getMessages = () => {
    if (isWebK) {
      webKCount();
    } else {
      webZCount();
    }
  };

  const getActiveDialogTitle = () => {
    let element;

    element = isWebK ? document.querySelector('.top .peer-title') : document.querySelector('.chat-list .ListItem .title > h3');

    Ferdium.setDialogTitle(element ? element.textContent : '');
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdium.loop(loopFunc);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  // TODO: See how this can be moved into the main ferdium app and sent as an ipc message for opening with a new window or same Ferdium recipe's webview based on user's preferences
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="http"]');
    const button = event.target.closest('button[title^="http"]');

    if (link || button) {
      const url = link ? link.getAttribute('href') : button.getAttribute('title');

      if (!Ferdium.isImage(link)) {
        event.preventDefault();
        event.stopPropagation();

        if (settings.trapLinkClicks === true) {
          window.location.href = url;
        } else {
          Ferdium.openNewWindow(url);
        }
      }
    }
  }, true);

  // 文件名
  let classname = {
    friendList: '.chat-list.custom-scroll',
    ipt: '.input-message-input',
    main: '.bubbles',
    allMsg: '.text-content.with-meta',
    allMsgTimeTxt: '.text-content.with-meta>.MessageMeta>.message-time',
    sendBtn: '.btn-send-container .c-ripple',
    groupflagEl: '.ChatInfo .group-status'
  };

  //获取主消息列表
  const getMainView = () => {
    return document.querySelector('#text_input');
  };

  // eslint-disable-next-line no-unused-vars
  const getIptSendMsg = () => {
    console.log("getIptSendMsg")
    return document.querySelector(classname.ipt).textContent;
  };

  const getPromptMsg = () => {
    return document.querySelector("#text_input").value;
  };

  /**发送消息 */
  const handleSendMessage = async (documents) => {
    // documents.textContent = context;
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    documents.dispatchEvent(evt);
    setTimeout(() => {
      clickSendBtn();
    }, 500);
  };

  /**删除所有HTML */
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const replaceAllHtml = data => {
    // return data;
    data = data.replace(/<\/?[^>]+>/g, ''); // 过滤所有html
    data = data.replace(/&lt;/gi, '<'); // 过滤所有的&lt;
    data = data.replace(/&gt;/gi, '>'); // 过滤所有的&gt;
    // data = data.replace(/\s+/g, '\n'); // 过滤所有的空格
    return data;
  };
  const clickSendBtn = () => {
    const sendBtn = document.querySelector(classname.sendBtn);
    sendBtn.click();
  };
  // 掩饰
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const setTimeForFunc = (func, time) => {
    setTimeout(func, time);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const addFreshEvent = () => {
  };

  const addKeyDownAndTran = () => {
    document.querySelector('#text_input').addEventListener(
      'keydown',
       async event => {
         let key = event.key;
         if (key === 'Enter') {
           let msg = getPromptMsg();
           let sendMsg = getIptSendMsg();
           if (sendMsg) {
             handleSendMessage(document.querySelector(classname.ipt));
             document.querySelector("#text_input").value = ''
           } else {
             document.querySelector(classname.ipt).textContent = replaceAllHtml(await Ferdium.getTran(msg, settings.apiBase, settings.token, document.querySelector("#modes").value, document.querySelector("#tones").value))
           }
           event.preventDefault();
           event.stopPropagation();
           event.stopImmediatePropagation();
         } else {
           document.querySelector(classname.ipt).textContent = ''
         }
       },
      true,
    );
  };

  const loadTailwindcss = () => {
    const parent = document.querySelector(".chat-input")
    var head = document.querySelectorAll('head')[0];

    var s1 = document.createElement("script");
    s1.src = "https://cdn.tailwindcss.com";
    head.append(s1);
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
</div>`);
  }

  const chatType = () => {
    let el = document.querySelector('#column-center .chat-input')
    if (!el || document.querySelector('#column-center .bubbles>.preloader-container')) {
      return 0;//没有打开右侧栏
    }
    if (document.querySelector('#column-center .is-channel.is-chat')) {
      return 1;//群聊
    } else if (document.querySelector('#column-center .is-channel')) {
      return 3;//频道
    } else {
      return 2;
    }
  }
  let currentPeerId = ''

  const newMessages = () => {
    let peerTitle = document.querySelector("#column-center .peer-title")
    let peerId = peerTitle.dataset.peerId
    let isFirst = false;
    if (currentPeerId !== peerId) {
      isFirst = true;
      currentPeerId = peerId;
    }
    const localKey = "message3@"+peerId
    let localMessages = localStorage.getItem(localKey)
    localMessages = localMessages ? JSON.parse(localMessages) : [];
    let newMessages = []
    let bubblesGroup =document.querySelectorAll('#column-center .bubbles-group');
    for (const element of bubblesGroup) {
      let bubbles = element.querySelectorAll(".bubble")
      for (const bubble of bubbles) {
        let mid = bubble.dataset.mid
        // console.log(localMessages, mid, localMessages.includes(mid))

        let timestamp = bubble.dataset.timestamp
        let message = bubble.querySelector('.message')
        let text = ''
        for (const node of message.childNodes) {
          if (node.classList && node.classList.contains('time')) {
            continue;
          }
          text += node.nodeType !== 3 ? node.textContent : node.nodeValue.trim();
        }
        text = text.trim()
        console.log('text', text)
        if (!text) {
          continue;
        }
        const trans = bubble.querySelector('.trans')
        // console.log('trans', trans)
        if (!trans) {
          const tranKey = `trans@${peerId}@${mid}`;
          const tranCache = localStorage.getItem(tranKey)
          if (!tranCache) {
            message.insertAdjacentHTML('beforebegin', '<div class="trans">翻译中...</div>')
            Ferdium.getTran2(text, settings.apiBase, settings.token).then((res) => {
              // console.log('res', res)
              bubble.querySelector('.trans').textContent = res
              localStorage.setItem(tranKey, res)
            })
          } else {
            message.insertAdjacentHTML('beforebegin', '<div class="trans">' + tranCache + '</div>')
          }

        }

        if (localMessages.includes(mid)) {
          continue;
        }
        localMessages.push(mid)
        localStorage.setItem(localKey, JSON.stringify([...(new Set(localMessages))]))
        // console.log(text);
        newMessages.push({
          mid: mid,
          message: text,
          timestamp: timestamp,
          type: bubble.classList.contains('is-in') ? 0 : 1,
        })
      }
    }
    let title = peerTitle.textContent
    const phoneDom = document.querySelector("#column-right .profile-content .tgico-phone  .row-title")
    if (phoneDom) {
      title = `${title}(${phoneDom.textContent})`;
    }
    return {peerId, peerTitle: title, serviceId: settings.id, messages: newMessages}
  }
  const lastMessages = (num = 10) => {
    let peerTitle = document.querySelector("#column-center .peer-title")
    let newMessages = []
    let bubblesGroup =document.querySelectorAll('#column-center .bubbles-group');
    for (const element of bubblesGroup) {
      let bubbles = element.querySelectorAll(".bubble")
      for (const bubble of bubbles) {
        let mid = bubble.dataset.mid
        // console.log(localMessages, mid, localMessages.includes(mid))

        let timestamp = bubble.dataset.timestamp
        let message = bubble.querySelector('.message')
        let text = ''
        for (const node of message.childNodes) {
          if (node.classList && node.classList.contains('time')) {
            continue;
          }
          text += node.nodeType !== 3 ? node.textContent : node.nodeValue.trim();
        }
        text = text.trim()
        console.log('text', text)
        if (!text) {
          continue;
        }

        // console.log(text);
        newMessages.push({
          mid: mid,
          message: text,
          timestamp: timestamp,
          type: bubble.classList.contains('is-in') ? 0 : 1,
        })
      }
    }
    let title = peerTitle.textContent
    const phoneDom = document.querySelector("#column-right .profile-content .tgico-phone  .row-title")
    if (phoneDom) {
      title = `${title}(${phoneDom.textContent})`;
    }
    return {peerTitle: title, messages: newMessages.slice(-1 * num)}
  }

  setTimeout(() => {
    let loop2 = setInterval(() => {
      let chat = document.querySelector(".chat-input")
      if (chat) {
        loadTailwindcss();
        document.querySelector('#transSuggestBtn').addEventListener('click', function() {
          document.querySelector(classname.ipt).textContent = document.querySelector('#transSuggestContent').textContent.trim()
          const evt = document.createEvent('HTMLEvents');
          evt.initEvent('input', true, true);
          document.querySelector(classname.ipt).dispatchEvent(evt);
        });
        document.querySelector('#transSuggestRefreshBtn').addEventListener('click', function() {
          suggest(lastMessages())
        });
        clearInterval(loop2);
      }
    }, 500);
  }, 500)
  setTimeout(() => {
    console.log('ready to translat33ion');
    let mainLoop = setInterval(() => {
      let main = getMainView();
      if (main) {
        addKeyDownAndTran();
        // setTimeForFunc(addFreshEvent, 500);
        clearInterval(mainLoop);
      }
    }, 500);
    // suggest('hello')
  }, 500);
  let loop3 = setInterval(() => {
    // console.log('chatType', chatType())
    if (chatType() === 2) {
      let messages = newMessages()
      // console.log('messages', messages)
      if (messages.messages.length > 0) {
        Ferdium.postMessages(settings.apiBase, settings.token, messages)
        if (messages.messages[messages.messages.length - 1].type === 0) {
          suggest(lastMessages())
        }
      }
    }
  }, 3000);
  const closeSuggest = () => {
    document.querySelector('#transSuggest').style.display = 'none';
  }

  const suggest = (msg) => {
    const transSuggest = document.querySelector('#transSuggest')
    const svgDom = transSuggest.querySelector('svg')
    if (svgDom.classList.contains('animate-spin')) {
      return
    }
    svgDom.classList.add('animate-spin');
    Ferdium.getSuggest(settings.apiBase, settings.token, {msg}).then((res) => {
      transSuggest.querySelector('#transSuggestContent').textContent = res;
    }).finally(() => {
      svgDom.classList.remove('animate-spin')
    })
  }
};
