module.exports = Ferdium => class Messenger extends Ferdium {
    modifyResponseHeaders() {
        return {
            'content-security-policy': "",
        };
    }
};
