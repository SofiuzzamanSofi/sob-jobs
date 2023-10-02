const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomStringId = (lenght: number) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < lenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    return result;
};