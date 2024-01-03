import CryptoJS from "crypto-js";

export let encryptData = (data) => {
    let cipherText = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.REACT_APP_CRYPTOJS_CREDENTIAL
    ).toString();
    return cipherText;
};

export let decryptData = (encyptedData) => {
    const bytes = CryptoJS.AES.decrypt(encyptedData, process.env.REACT_APP_CRYPTOJS_CREDENTIAL);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
};