module.exports = Ferdium => class Messenger extends Ferdium {
    modifyResponseHeaders() {
        return {
            'content-security-policy': "script-src 'unsafe-eval' *.tailwindcss.com sf16-website-login.neutral.ttwstatic.com s20.tiktokcdn.com *.tiktokcdn-us.com;frame-src *.tiktok.com accounts.google.com www.google.com recaptcha.google.com www.facebook.com *.kakao.com lf16-web.tiktokcdn.com assets.braintreegateway.com appleid.apple.com access.line.me api.twitter.com h.online-metrix.net bytedance:;worker-src https: blob:",
        };
    }
};
