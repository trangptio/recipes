const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = (Ferdium, settings) => {
  const getMessages = () => {
    let count = 0;

    if (window.location.pathname.includes('messaging')) {
      count = document.querySelectorAll(
        '.msg-conversation-card__unread-count',
      ).length;
    } else {
      const element = document.querySelector(
        '.nav-item--messaging .nav-item__badge-count',
      );
      if (element) {
        count = Ferdium.safeParseInt(element.textContent);
      }
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
    const parent = document.querySelector(".msg-form")
    if (!parent) {
      return;
    }
    parent.insertAdjacentHTML("beforeend", `<div style="width: 100%; position: relative;">
    <div class="unijump-toolbox" style="opacity: 1 !important;transition: opacity 0.4s ease 0s;z-index: 999;">
        <div class="toolbox text-left w-full flex gap-3 items-center px-2 py-1 text-white font-sans antialiased !opacity-100 !static svelte-ihi54f"
            style="background: linear-gradient(270deg, #4d29b2 0%, #311fa3 100%);position: absolute; ">
            <div class="flex-1">
                <ul class="flex gap-2">
                    <li class="flex items-center rounded-md">
                        <select id="modes" class="bg-gray-50 border border-gray-300 text-gray-900 !text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                        <select id="tones" class="bg-gray-50 border border-gray-300 text-gray-900 !text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                        <input id="text_input" type="text" class="!bg-gray-50 border !border-gray-300 !text-gray-900 text-sm !rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="请输入文字提示,回车后调用ChatGPT生成回复，再次回车发送回复" required>

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
  }
  const addKeyDownAndTran = () => {
    document.querySelector('#text_input').addEventListener(
        'keydown',
        async event => {

          let key = event.key;
          if (key === 'Enter') {
            let msg = document.querySelector("#text_input").value;
            let text = document.querySelector(".msg-form__contenteditable").querySelector('p').textContent;
            // console.log('sendMsg', sendMsg)
            if (text) {
              clickSendBtn();
              setTimeout(() => {
                document.querySelector("#text_input").value = ''
              }, 200);
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
    document.querySelector(".msg-form__contenteditable").querySelector('p').innerHTML = msg
    const event = new Event('input', { bubbles: true });
    document.querySelector(".msg-form__contenteditable").dispatchEvent(event);

  };
  const clickSendBtn = () => {
    let sendBtn = document.querySelector('.msg-form__send-button');
    let evtClick = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    sendBtn.dispatchEvent(evtClick);
  };
  setTimeout(() => {
    let loop2 = setInterval(() => {
      insertDom()
    }, 500);
  }, 500)
};
