// 鉴权
const dataAccessConfig = require('../data-access-config');

const matchConfig = (req, config)=> {

  if(!Array.isArray(req.privilege)) {
    return false;
  }

  if(req.privilege.indexOf("*") > -1) {
    return true;
  }

  return config.pattern.match(req.uri) &&
          config.method.toUpperCase() === req.method.toUpperCase() &&
          req.privilege.indexOf(config.privilege) > -1
};

const authorization = (req, res, next)=> {

  dataAccessConfig.fetch((err, data)=> {
    let matched = data.some((config)=> {
      console.log(config);
      return matchConfig({
        uri: req.url,
        method: req.method,
        privilege: req.__privilege
      }, config);
    });

    if(matched) {
      next();
    } else {
      return res.sendStatus(401);
    }
  });


};



module.exports = authorization;