module.exports = Ferdium => class Instagram extends Ferdium {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }

  modifyResponseHeaders() {
    return {
      'content-security-policy': "default-src *.facebook.com *.fbcdn.net *.instagram.com data: blob:;script-src *.tailwindcss.com *.facebook.com *.fbcdn.net *.facebook.net 127.0.0.1:* 'unsafe-inline' 'unsafe-eval' blob: data: 'self' *.teststagram.com *.instagram.com static.cdninstagram.com *.google-analytics.com *.google.com;style-src data: blob: 'unsafe-inline' *.fbcdn.net *.facebook.com *.instagram.com *.teststagram.com static.cdninstagram.com;connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net wss://*.facebook.com:* ws://localhost:* blob: *.instagram.com *.cdninstagram.com wss://*.instagram.com:* 'self' *.teststagram.com wss://edge-chat.instagram.com connect.facebook.net;font-src *.facebook.com data: fonts.gstatic.com *.fbcdn.net *.instagram.com *.teststagram.com static.cdninstagram.com *.intern.facebook.com;img-src *.instagram.com *.facebook.com *.fbcdn.net data: blob: *.cdninstagram.com www.gstatic.com *.fbsbx.com android-webview-video-poster: *.giphy.com *.teststagram.com *.igsonar.com *.google-analytics.com *.whatsapp.net;media-src *.facebook.com *.fbcdn.net *.instagram.com *.cdninstagram.com *.giphy.com cdn.fbsbx.com data: blob:;frame-src *.instagram.com *.facebook.com *.fbsbx.com fbsbx.com data:;block-all-mixed-content;upgrade-insecure-requests;",
    };
  }
};
