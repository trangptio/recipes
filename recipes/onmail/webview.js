const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    let countImportant = 0;
    const inboxLinks = document.querySelectorAll('p.truncate');
    for (const label of inboxLinks){
      if (label.textContent) {
        let inbox_count = label.nextSibling
        countImportant = inbox_count == null ? 0 : Ferdium.safeParseInt(inbox_count.textContent);

        break;
      }
    }
    Ferdium.setBadge(countImportant, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
