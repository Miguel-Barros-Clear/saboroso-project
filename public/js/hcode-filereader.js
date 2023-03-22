class HcodeFileReader {
    constructor(inputEl, imgEl) {
        this.inputEl = inputEl;
        this.imgEl = imgEl

        this.initIputEvent();
    }

    initIputEvent() {
        document.querySelector(this.inputEl).addEventListener('change', (e) => {
            this.reader(e.target.files[0].then((result) => {
                document.querySelector(this.imgEl).src = result
            }))
        })
    }

    reader(file) {
        return new Promise((res, rej) => {
            let reader = new FileReader;
            reader.onload = () => {
                resizeBy(reader.result);
            }

            reader.onerror = () => {
                rej("Não foi possivel ler a imagem")
            }

            reader.readAsDataURL(file);
        })
    }
}
