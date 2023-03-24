var conn = require("./db")

module.exports = {
    render(req, res, error = null, success = null) {
        res.render('contacts', {
            title: 'Contato - Restaurante Saboroso',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga um oi!',
            body: req.body,
            error,
            success
        });
    },

    save(req) {
        return new Promise((res, rej) => {
            if (!req.fields.email) {
                rej("Preencha o email")
            } else {
                conn.query(`
                 INSERT INTO tb_emails (email) VALUES(?)
                `[
                    req.fields.email
                ], (err, results) => {
                    if (err) {
                        rej(err.message)
                    } else {
                        res(results)
                    }
                })
            }
        })
    },

    getEmails() {
        return new Promise((res, rej) => {
            conn.query(`
            SELECT * FROM tb_emails ORDER by register DESC
            `, (err, results) => {
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
                DELETE FROM tb_emails WHERE id = ?
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
    },
}