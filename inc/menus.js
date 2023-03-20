let conn = require('./db')

module.exports = {
    getMenus(){
        return new Promise((res, rej) => {
            conn.query(`
    SELECT * FROM tb_menus ORDER by title
    `, (err, results) => {
      if(err){
        rej(err)
      }
      res(results)
    })
        })
    }
}