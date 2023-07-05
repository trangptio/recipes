module.exports = Ferdium => class Messenger extends Ferdium {
    modifyResponseHeaders() {
        return {
            'Content-Security-Policy': "",
        };
    }
};
