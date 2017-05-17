const UrlPattern = require('url-pattern');
const db = require('../db');

let privilegeConfig;

const fetch = (cb)=> {
  if(privilegeConfig) {
    cb(null, privilegeConfig);
  } else {
    db.getAllPrivilege((err, data)=> {
      if(err) throw err;
      privilegeConfig = data.filter(item=> {
        return item.uri
      }).map(item=> {
        console.log(item);
        let pattern = new UrlPattern(item.uri);
        return Object.assign({}, {pattern}, item);
      });
      cb(null, privilegeConfig);
    })
  }
};

module.exports = {fetch};