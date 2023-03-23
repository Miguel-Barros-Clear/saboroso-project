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
            btnUpdate: ".btn-update",
            btnDelete: ".btn-delete",
        }, configs)

        this.initButtons();
        this.initForms();
    }

    initForms() {
        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate
            .save()
            .then((json) => {
                this.fireEvent('afterFormCreate');
            })
            .catch((err) => {
                this.fireEvent('afterFormCreateError');
            });

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate
            .save()
            .then((json) => {
                this.fireEvent('afterFormUpdate');
            })
            .catch((err) => {
                this.fireEvent('afterFormUpdateError');
            });
    }

    fireEvent(name, args) {
        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args)
    }

    initButtons() {
        [...document.querySelectorAll(this.options.btnDelete)].forEach((btn) => {
            btn.addEventListener("click", (e) => {
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
            });
        });

        [...document.querySelectorAll(this.options.btnUpdate)].forEach((btn) => {
            btn.addEventListener("click", (e) => {
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
            });
        });
    }
}