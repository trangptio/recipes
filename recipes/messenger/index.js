module.exports = (Ferdium) => class Messenger extends Ferdium {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }

  modifyResponseHeaders() {
    return {
      'content-security-policy': "default-src data: blob: https://*.fbcdn.net https://*.facebook.com *.fbsbx.com *.messenger.com;script-src *.tailwindcss.com *.facebook.com *.fbcdn.net *.facebook.net *.google-analytics.com *.google.com 127.0.0.1:* 'unsafe-inline' blob: data: 'self' connect.facebook.net *.messenger.com 'unsafe-eval';style-src data: blob: 'unsafe-inline' *.facebook.com *.fbcdn.net *.messenger.com;connect-src http://localhost:3103 *.facebook.com facebook.com *.fbcdn.net *.facebook.net wss://*.facebook.com:* wss://*.whatsapp.com:* attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' *.messenger.com wss://*.messenger.com www.messenger.com www.google-analytics.com wss://*.messenger.com:*;font-src *.messenger.com *.facebook.com https://*.fbcdn.net data: *.gstatic.com;img-src *.fbcdn.net https://*.facebook.com cdninstagram.com *.cdninstagram.com *.tenor.co *.tenor.com *.giphy.com data: *.fbsbx.com *.messenger.com messenger.com blob: android-webview-video-poster: *.xx.fbcdn.net https://messenger.com *.oculuscdn.com;media-src *.messenger.com *.facebook.com https://*.fbcdn.net data: *.fbsbx.com *.fbcdn.net *.cdninstagram.com https://*.giphy.com blob:;frame-src *.messenger.com *.facebook.com https://*.fbcdn.net data: *.fbsbx.com *.fbcdn.net *.cdninstagram.com blob: *.doubleclick.net;",
    };
  }
};
