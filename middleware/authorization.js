const async = require('async');
const db = require('../db');
const authorization = (req, res, next)=> {
  // 首先拿到user_id(可以通过session,token等机制),此处我们假设其为1
  let user_id = 1;

  async.waterfall([(done)=> {
    db.getUserInfo(user_id, done);
  }, (data, done)=> {
    db.getPrivilegeByRole(data.role, done);
  }], (err, data)=> {
    req.__privilege = data.map(item=>item.privilege);
    next();
  });
};

module.exports = authorization;