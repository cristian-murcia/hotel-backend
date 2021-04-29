"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regExpresion = void 0;
exports.regExpresion = {
    email: function (data) {
        let exp = new RegExp('[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+(\.[a-zA-Z])?');
        return exp.test(data);
    },
    name: function (data) {
        let exp = new RegExp('^([a-zA-Z]+ ?[a-zA-z]+?)+$');
        if (data.length > 0 && data.length <= 50) {
            return exp.test(data.trim());
        }
        else {
            return false;
        }
    },
    texto: function (data) {
        let exp = new RegExp('^\w+ \w+?)+$');
        if (data.length > 0 && data.length <= 255) {
            return exp.test(data.trim());
        }
        else {
            return false;
        }
    },
    number: function (data) {
        if (typeof data == 'number') {
            return true;
        }
        else {
            return false;
        }
    }
};
//# sourceMappingURL=regular.expresion.js.map