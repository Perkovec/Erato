const fs = require('fs');

const F_OK = fs.F_OK || (fs.constants && fs.constants.F_OK);

class Utils {
  static makeDirCond(path, existsText, createdText) {
    try {
      fs.accessSync(path, F_OK);
      console.log(existsText || `${path} already exists`);
    } catch (e) {
      fs.mkdirSync(path);
      console.log(createdText || `${path} created`);
    }
  }

  static existsDir(path) {
    try {
      fs.accessSync(path, F_OK);
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = Utils;
