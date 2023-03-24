var conn = require('./db')

module.exports = {

  render(req, res, error = null) {
    res.render("admin/login", {
      body: req.body,
      error
    })
  },

  login(email, password) {
    return new Promise((res, rej) => {
      conn.query(`
            SELECT * FROM tb_users WHERE email = ?
            `, [
        email
      ], (err, results) => {
        if (err) {
          rej(err)
        } else {
          if (!results.length > 0) {
            rej("Usuario ou senha incorretos")
          } else {
            let row = results[0]
            if (row.password !== password) {
              rej("Usuario ou senha incorretos")
            } else {
              res(row);
            }
          }
        }
      })
    })
  },

  getUsers() {
    return new Promise((res, rej) => {
      conn.query(`
        SELECT * FROM tb_users ORDER by name
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

      let query, queryPhoto = '', params = [
        fields.name,
        fields.email
      ];

      if (parseInt(fields.id) > 0) {
        params.push(fields.id)

        query = `
              UPDATE tb_users
              SET name = ?,
                  email = ?
                WHERE id = ?
            `;

      } else {

        query = `
              INSERT INTO tb_users (name, email, password)
              VALUES(?, ?, ?)
            `;
        params.push(fields.password)
      }

      conn.query(query, params, (err, results) => {
        if (err) {
          rej(err)
        } else {
          res(results)
        }
      })
    })
  },

  delete(id) {
    return new Promise((res, rej) => {
      conn.query(`
            DELETE FROM tb_users WHERE id = ?
          `, [
        id
      ], (err, results) => {
        if (err) {
          rej(err);
        } else {
          res(results)
        }
      })
    })
  }
}