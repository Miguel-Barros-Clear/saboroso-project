let conn = require('./db')
let path = require('path')

module.exports = {
  getMenus() {
    return new Promise((res, rej) => {
      conn.query(`
    SELECT * FROM tb_menus ORDER by title
    `, (err, results) => {
        if (err) {
          rej(err)
        }
        res(results)
      })
    })
  },

  save(fields, files) {
    return new Promise((res, rej) => {

      fields.photo = `images/${path.parse(files.photo.path).base}`

      conn.query(`
          INSERT INTO tb_menus (title, description, price, photo)
          VALUES(?, ?, ?, ?)
        `, [
        fields.title,
        fields.description,
        fields.price,
        fields.photo
      ], (err, results) => {
        if (err) {
          rej(err)
        } else {
          res(results)
        }
      })
    })
  }
}