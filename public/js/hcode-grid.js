class HcodeGrid {
    constructor(configs) {
        configs.listeners = Object.assign({
            afterUpdateClick: (e) => {
                $("#modal-update").modal("show");
            },
            afterDeleteClick: (e) => {
                window.location.reload();
            },
            afterFormCreate: (e) => {
                window.location.reload();
            },
            afterFormUpdate: (e) => {
                window.location.reload();
            },
            afterFormUpdateError: (e) => {
                alert('Não foi possivel enviar o formulario!')
            },
            afterFormDeleteError: (e) => {
                alert('Não foi possivel enviar o formulario!')
            }

        }, configs.listeners)

        this.options = configs;
        this.options = Object.assign({}, {
            formCreate: "#modal-create form",
            formUpdate: "#modal-update form",
            btnUpdate: "btn-update",
            btnDelete: "btn-delete",
            onUpdateLoad: (form, name, data) => {
                let input = form.querySelector('[name' + name + ']')
                input.value = data[name]
            }
        }, configs)

        this.rows = [...document.querySelectorAll('table tbody tr')]

        this.initButtons();
        this.initForms();
    }

    initForms() {
        this.formCreate = document.querySelector(this.options.formCreate);

        if (this.formCreate) {
            this.formCreate
                .save({
                    success: () => {
                        this.fireEvent('afterFormCreate');

                    },

                    failure: () => {
                        this.fireEvent('afterFormCreateError');
                    }
                })
        }

        this.formUpdate = document.querySelector(this.options.formUpdate);

        if (this.formUpdate) {
            this.formUpdate
                .save({
                    success: () => {
                        this.fireEvent('afterFormUpdate');

                    },

                    failure: () => {
                        this.fireEvent('afterFormUpdateError');
                    }
                })
        }
    }

    fireEvent(name, args) {
        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args)
    }

    btnDeleteClick(btn, e) {
        this.fireEvent('afterDeleteClick', [e]);
        let tr = btn.parentNode.parentNode;
        let data = JSON.parse(tr.dataset.row);

        if (confirm(eval("`" + this.options.deleteMsg + "`")))
            fetch(eval("`" + this.options.deleteUrl + "`"), {
                method: "DELETE",
            })
                .then((response) => {
                    response.json();
                    this.fireEvent('afterDeleteClick', [e]);
                })
                .then((json) => {
                    this.fireEvent('afterDeleteClick', [e]);
                });
    }

    btnUpdateClick(btn, e) {
        this.fireEvent('beforeUpdateClick', [e]);
        let tr = btn.parentNode.parentNode;
        let data = JSON.parse(tr.dataset.row);

        for (let name in data) {
            let input = this.formUpdate.querySelector(`[name=${name}]`);
            switch (name) {
                case "date":
                    if (input) input.value = moment(data[name]).format("YYYY-MM-DD");
                    break;

                default:
                    if (input) input.value = data[name];
            }
        }
        this.fireEvent('afterUpdateClick', [e]);
    }

    initButtons() {
        this.rows.forEach((row) => {
            [...row.querySelectorAll('.btn')].forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    let tr = btn.parentNode.parentNode;
                    if (e.target.classList.contains(this.options.btnUpdate)) {
                        this.btnUpdateClick(btn, e);
                    } else if (e.target.classList.contains(this.options.btnDelete)) {
                        this.btnDeleteClick(btn, e);
                    } else {
                        this.fireEvent('buttonClick', [e.target, tr, e])
                    }
                })
            })
        });
    }
}