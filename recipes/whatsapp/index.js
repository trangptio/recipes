module.exports = (Ferdium) => class Messenger extends Ferdium {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }

  modifyResponseHeaders() {
    return {
      'content-security-policy': "default-src 'self' data: blob:;script-src 'self' data: blob: 'unsafe-eval' 'unsafe-inline' *.tailwindcss.com https://ajax.googleapis.com https://api.search.live.net https://maps.googleapis.com https://www.youtube.com https://s.ytimg.com;style-src 'self' data: blob: 'unsafe-inline' https://fonts.googleapis.com;connect-src 'self' data: blob: https://*.whatsapp.net https://www.facebook.com https://*.giphy.com https://*.tenor.co https://crashlogs.whatsapp.net/wa_clb_data https://crashlogs.whatsapp.net/wa_fls_upload_check https://www.bingapis.com/api/v6/images/search https://*.google-analytics.com wss://*.web.whatsapp.com wss://web.whatsapp.com https://www.whatsapp.com https://dyn.web.whatsapp.com https://graph.whatsapp.com/graphql/;font-src data: 'self' https://fonts.googleapis.com https://fonts.gstatic.com;img-src 'self' data: blob: *;media-src 'self' data: blob: https://*.whatsapp.net https://*.giphy.com https://*.tenor.co https://*.cdninstagram.com https://*.streamable.com https://*.sharechat.com https://*.fbcdn.net mediastream:;child-src 'self' data: blob:;frame-src 'self' data: blob: https://www.youtube.com;block-all-mixed-content;upgrade-insecure-requests;report-uri https://www.facebook.com/csp/reporting/?minimize=0;",
    };
  }

  modifyRequestHeaders() {
    return [
      {
        headers: {
          'user-agent': window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim(),
        },
        requestFilters: {
          urls: ['*://*/*'],
        },
      },
    ];
  }
};
