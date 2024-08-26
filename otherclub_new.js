console.log("Keio Student-Life Gakuji Helper: Other-Club New is Running")

const INPUT_NAMES = [
    // 基本情報
    "event[club_other_name]",
    "event[name]",
    "event[other_host]",
    "event[description]",
    // スケジュール
    "event[schedules_attributes][0][date]",
    "event[schedules_attributes][0][start_at]",
    "event[schedules_attributes][0][location_name]",
    "event[schedules_attributes][0][location_address]",
    "event[schedules_attributes][0][members_count]",
    // 参加人数
    "event[students_count]",
    "event[staffs_count]",
    "event[graduates_count]",
    "event[other_students_count]",
    "event[other_students_organization]",
    "event[other_count]",
    "event[other_organization]",
    // 教員
    "event[chairman_name]",
    "event[chairman_other_faculty]",
    "event[chairman_other_title]",
    "event[chairman_email]",
    "event[chairman_phone]",
    // 学生責任者
    "event[admin_student_name]",
    "event[admin_student_id]",
    "event[admin_student_other_faculty]",
    "event[admin_student_mobile_phone]",
    "event[admin_student_phone]",
    "event[admin_student_email]",
    // 申請責任者
    "event[event_admin_student_name]",
    "event[event_admin_student_id]",
    "event[event_admin_student_other_faculty]",
    "event[event_admin_student_mobile_phone]",
    "event[event_admin_student_phone]",
    "event[event_admin_student_email]",
    // 備考
    "event[note]"
]

const SELECT_NAMES = [
    // 基本情報
    "event[area]",
    "event[host_type]",
    // 教員
    "event[chairman_faculty]",
    "event[chairman_title]",
    // 学生責任者
    "event[admin_student_faculty]",
    // 申請責任者
    "event[event_admin_student_faculty]"
]

/**
 * @param {any[]} list 
 * @param {any} query 
 */
const has = (list, query) => list.indexOf(query) != -1

LOCALSTORAGE_KEY = "KeioStudentlifeGakujiHelper.OtherclubNew"

console.log(localStorage)

/**@type{Object<string, HTMLElement>} */
let inputElements = {}
for (const e of document.querySelectorAll("input")) {
    if (has(INPUT_NAMES, e.name)) {
        inputElements[e.name] = e
    }
}
/**@type{Object<string, HTMLElement>} */
let selectElements = {}
for (const e of document.querySelectorAll("select")) {
    if (has(SELECT_NAMES, e.name)) {
        selectElements[e.name] = e
    }
}

// 復元
const restore = () => {
    const item = localStorage.getItem(LOCALSTORAGE_KEY)
    console.log("Item")
    console.log(item)
    if (item == null) return
    let data
    try {
        data = JSON.parse(item)
    } catch {
        console.error("Local Storageに保存されていたJSON文字列が破損しています．")
        return
    }
    for (const key of INPUT_NAMES) {
        const element = inputElements[key]
        try {
            element.value = data.input[key]
        } catch {
            console.error(`Input ${key} の取得に失敗しました．`)
        }
    }
    for (const key of SELECT_NAMES) {
        const element = selectElements[key]
        try {
            element.value = data.select[key]
        } catch {
            console.error(`Select ${key} の取得に失敗しました．`)
        }
    }
}
restore()


// 保存
const save = () => {
    let data = { input: {}, select: {} }
    for (const key of INPUT_NAMES) {
        const element = inputElements[key]
        data.input[key] = element.value
    }
    for (const key of SELECT_NAMES) {
        const element = selectElements[key]
        data.select[key] = element.value
    }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data))
    console.log("Save")
}

for (const e of Object.values(inputElements)) e.addEventListener("change", save)
for (const e of Object.values(selectElements)) e.addEventListener("change", save)

// クリア
const clear = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY)
    location.reload()
}

// 表示
const statusBar = document.createElement("div")
statusBar.style.position = "sticky"
statusBar.style.width = "100%"
statusBar.style.height = "3rem"
statusBar.style.backgroundColor = "whitesmoke"
statusBar.style.bottom = 0
statusBar.style.display = "flex"
statusBar.style.alignItems = "center"
statusBar.style.gap = "1rem"
statusBar.style.padding = "2rem"
const clearButton = document.createElement("a")
clearButton.addEventListener("click", clear)
clearButton.innerText = "保存データを全消去"
statusBar.innerHTML = `
Keio Student-Life Gakuji Helper が実行中です
<a href="https://github.com/Mya-Mya/KeioStudentlifeGakujiHelper" target="_blank">GitHub</a>
`
statusBar.append(clearButton)
document.body.appendChild(statusBar)