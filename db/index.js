const connection = require('./connection');

const getAllPrivilege = (cb)=> {
  connection.query('select * from privilege;', cb);  
};

const getUserInfo = (id, cb)=> {
  connection.query(`SELECT * FROM user WHERE id = ${id}`, (err, results)=> {
    cb(err, results[0]);
  });
};

const getPrivilegeByRole = (roleId, cb)=> {
  connection.query(`
SELECT * FROM \`role-privilege\` r
LEFT JOIN privilege p
ON r.privilege_id = p.id
WHERE role_id = ${roleId}
`.trim(), cb);

};

module.exports = {
  getAllPrivilege,
  getUserInfo,
  getPrivilegeByRole
};