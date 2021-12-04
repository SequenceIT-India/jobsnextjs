import moment from "moment";

var CryptoJS = require("crypto-js");
const crypto = require("crypto");
const { createHash } = require("crypto");

class JobsHornEncryptAndDecrypt {
  constructor() {
    const {
      REACT_APP_AES_METHOD_ALGO,
      REACT_APP_AES_DIHEST,
      REACT_APP_PEPPER,
    } = process.env;
    this._keySize = 256;
    this._ivSize = 128;
    this._iterationCount = 65536;
    this._algorithm = REACT_APP_AES_METHOD_ALGO;
    this._digest = REACT_APP_AES_DIHEST;
    this._pepper = REACT_APP_PEPPER;
  }

  encrypt256(plainText, shared_Salt_key, secretKey) {
    const key = crypto.pbkdf2Sync(
      secretKey,
      shared_Salt_key,
      65536,
      32,
      this._digest
    );
    const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const cipher = crypto.createCipheriv(this._algorithm, key, iv);
    let encrypted = cipher.update(plainText, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }

  decrypt256(strToDecrypt, shared_Salt_key, secretKey) {
    const key = crypto.pbkdf2Sync(
      secretKey,
      shared_Salt_key,
      65536,
      32,
      this._digest
    );
    const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const decipher = crypto.createDecipheriv(this._algorithm, key, iv);
    let decrypted = decipher.update(strToDecrypt, "base64");
    decrypted += decipher.final();
    return decrypted;
  }
  generateKey(salt, passPhrase) {
    return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Base64.parse(salt), {
      keySize: this._keySize / 16,
      iterations: this._iterationCount,
    });
  }
  decryptWithIvSalt(salt, iv, passPhrase, cipherText) {
    let key = this.generateKey(salt, passPhrase);
    let cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText),
    });
    let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: CryptoJS.enc.Base64.parse(iv),
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  randomKey = (p) => {
    var salt = CryptoJS.lib.WordArray.random(p / 2);
    return salt.toString();
  };
  sha512Password = (password, salt) => {
    return createHash(this._digest).update(password, salt).digest("hex");
  };
  hashTransmission = async (passData) => {
    //admin@123
  };
  getFinalOutput = (values, DATETIMEFORMAT, type, comingFromProfile = false) => {
    type = type !== "EMP" ? sessionStorage.getItem('isEmployee') ? 'EMP' : 'CAND' : type;
    console.log('type', type)
    const { REACT_APP_RandamString_Length } = process.env;
    const saltRandom20Char = this.randomKey(REACT_APP_RandamString_Length);
    const timeStamp = moment
      .utc()
      .subtract(DATETIMEFORMAT.DURATION_ZONE, DATETIMEFORMAT.HOURS)
      .format(DATETIMEFORMAT.DATETIME); //2
    const shared_Salt_key = process.env[`REACT_APP_${type}_Shared_Salt_key`]; //1
    const shared_Secret_key =
      process.env[`REACT_APP_${type}_Shared_Secret_key`]; //3
    const pepperKey = process.env[`REACT_APP_${type}_PEPPER`]; //3
    let dataSet = values;
    const uiPepperKey = CryptoJS.enc.Base64.parse(pepperKey);

    if (!comingFromProfile) {
      const finalHasData = this.sha512Password(values.password, uiPepperKey); //salt
      if (values.emailId) {
        dataSet = { setText: finalHasData, emailId: values.emailId };
      }
      else {
        dataSet = { setText: finalHasData };
      }
    }
    else {
      if (values.oldPassword && values.newPassword) {
        const finalHasDataOldPassword = this.sha512Password(values.oldPassword, uiPepperKey); //salt
        const finalHasDataNewPassword = this.sha512Password(values.newPassword, uiPepperKey); //salt\

        dataSet = { oldPassword: finalHasDataOldPassword, newPassword: finalHasDataNewPassword };
      }
      if (values.newEmail) {
        const finalHasData = this.sha512Password(values.password, uiPepperKey); //salt
        dataSet = { setText: finalHasData, emailId: values.newEmail };
      }
    }
    const passToken = timeStamp + saltRandom20Char + shared_Secret_key;
    const cipherText = this.encrypt256(
      JSON.stringify(dataSet),
      shared_Salt_key,
      passToken
    );
    return { timeStamp, saltRandom20Char, cipherText };
  };

  get keySize() {
    return this._keySize;
  }

  set keySize(value) {
    this._keySize = value;
  }

  get iterationCount() {
    return this._iterationCount;
  }

  set iterationCount(value) {
    this._iterationCount = value;
  }
}
export default JobsHornEncryptAndDecrypt;
