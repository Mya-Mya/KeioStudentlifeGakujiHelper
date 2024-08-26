const fs = new FormStorage([
    // 基本情報
    /// input
    "event[club_other_name]",
    "event[name]",
    "event[other_host]",
    "event[description]",
    /// select
    "event[area]",
    "event[host_type]",

    // スケジュール
    /// input
    "event[schedules_attributes][0][date]",
    "event[schedules_attributes][0][start_at]",
    "event[schedules_attributes][0][end_at]",
    "event[schedules_attributes][0][location_name]",
    "event[schedules_attributes][0][location_address]",
    "event[schedules_attributes][0][members_count]",

    // 参加人数
    /// input
    "event[students_count]",
    "event[staffs_count]",
    "event[graduates_count]",
    "event[other_students_count]",
    "event[other_students_organization]",
    "event[other_count]",
    "event[other_organization]",

    // 教員
    /// input
    "event[chairman_name]",
    "event[chairman_other_faculty]",
    "event[chairman_other_title]",
    "event[chairman_email]",
    "event[chairman_phone]",
    /// select
    "event[chairman_faculty]",
    "event[chairman_title]",

    // 学生責任者
    // input
    "event[admin_student_name]",
    "event[admin_student_id]",
    "event[admin_student_other_faculty]",
    "event[admin_student_mobile_phone]",
    "event[admin_student_phone]",
    "event[admin_student_email]",
    // select
    "event[admin_student_faculty]",

    // 申請責任者
    // input
    "event[event_admin_student_name]",
    "event[event_admin_student_id]",
    "event[event_admin_student_other_faculty]",
    "event[event_admin_student_mobile_phone]",
    "event[event_admin_student_phone]",
    "event[event_admin_student_email]",
    // select
    "event[event_admin_student_faculty]",

    // 備考
    "event[note]"
], "KeioStudentlifeGakujiHelper.OtherclubNew", [
    Action("学生責任者→申請責任者へコピー", () => {
        [
            ["event[admin_student_name]", "event[event_admin_student_name]"],
            ["event[admin_student_id]", "event[event_admin_student_id]"],
            ["event[admin_student_other_faculty]", "event[event_admin_student_other_faculty]"],
            ["event[admin_student_mobile_phone]", "event[event_admin_student_mobile_phone]"],
            ["event[admin_student_phone]", "event[event_admin_student_phone]"],
            ["event[admin_student_email]", "event[event_admin_student_email]"],
            ["event[admin_student_faculty]", "event[event_admin_student_faculty]"]
        ].forEach(item => {
            const src = item[0]
            const dst = item[1]
            fs.domname2dom[dst].value = fs.domname2dom[src].value
        })
        fs.save()
    })
])