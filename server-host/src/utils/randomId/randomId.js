"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomStringId = void 0;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateRandomStringId = (lenght) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < lenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    ;
    return result;
};
exports.generateRandomStringId = generateRandomStringId;
//# sourceMappingURL=randomId.js.map