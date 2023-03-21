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
    }
}