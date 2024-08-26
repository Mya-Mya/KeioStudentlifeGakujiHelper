/**
 * @param {any[]} list 
 * @param {any} query 
 */
const has = (list, query) => list.indexOf(query) != -1

class FormStorage {
    /**
     * @param {string[]} domnames 管理対象とする入力系DOMのname属性 
     * @param {string} localStorageKey
     * @param {HTMLElement[]} barContents
     */
    constructor(domnames, localStorageKey, barContents) {
        this.domnames = domnames
        this.localStorageKey = localStorageKey

        /**@type{Object<string, HTMLElement>} */
        this.domname2dom = {}
        this.doms = []
        for (const type of ["input", "select"]) {
            for (const e of document.querySelectorAll(type)) {
                if (has(domnames, e.name)) {
                    this.doms.push(e)
                    this.domname2dom[e.name] = e
                }
            }
        }
        this.restore()
        this.doms.forEach(dom => dom.addEventListener("change", () => this.save()))
        this.setupBottombar(barContents)
    }

    getDoms() { return this.doms }
    getDomname2Dom() { return this.domname2dom }

    restore() {
        const item = localStorage.getItem(this.localStorageKey)
        if (item == null) return
        let data
        try {
            data = JSON.parse(item)
            console.log(data)
        } catch {
            console.error("Local Storageに保存されていたJSON文字列が破損しています．")
            return
        }
        for (const key in this.domname2dom) {
            if (key in data) {
                this.domname2dom[key].value = data[key]
            } else {
                console.error(`指定されたキー${key}が保存データ中に見つかりませんでした．`)
            }
        }
    }

    save() {
        let data = {}
        Object.entries(this.domname2dom).forEach(value => {
            const [key, dom] = value
            data[key] = dom.value
        })
        const item = JSON.stringify(data)
        localStorage.setItem(this.localStorageKey, item)
        console.log("保存しました")
    }

    clear() {
        if (confirm("保存データを全消去しますか？")) {
            localStorage.removeItem(this.localStorageKey)
            location.reload()
        }
    }

    setupBottombar(barContents) {
        const bottombar = document.createElement("div")
        bottombar.classList.add("KeioStudentlifeGakujiHelperComponent")
        bottombar.id = "bottombar"
        bottombar.append(
            Span("入力支援稼働中"),
        )
        document.body.append(bottombar)

        const toppanel = document.createElement("div")
        toppanel.classList.add("KeioStudentlifeGakujiHelperComponent")
        toppanel.id = "toppanel"
        toppanel.append(
            Title("Keio Student-Life Gakuji Helper稼働中"),
            Link("GitHub", "https://github.com/Mya-Mya/KeioStudentlifeGakujiHelper"),
            Action("保存データを全消去", () => this.clear()),
            ...barContents
        )

        document.body.insertBefore(toppanel, document.body.childNodes[0])
    }
}

const DivWrapped = (child) => {
    const e = document.createElement("div")
    e.append(child)
    return e
}
const Title = (text)=>{
    const e = document.createElement("h3")
    e.innerText = text
    return e
}
const Span = (text) => {
    const e = document.createElement("span")
    e.innerText = text
    return e
}
const Action = (text, callback) => {
    const e = document.createElement("a")
    e.innerText = text
    e.addEventListener("click", callback)
    return DivWrapped(e)
}
const Link = (text, url) => {
    const e = document.createElement("a")
    e.innerText = text
    e.href = url
    e.target = "_blank"
    return DivWrapped(e)
}