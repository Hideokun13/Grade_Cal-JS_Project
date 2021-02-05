let gradeData = new Array(1)
let numArr = 0
function InputData(){
    
    let subjName = document.getElementById("input_subjName").value
    let subjCredit = document.getElementById("input_subjCredit").value
    let subjScore = document.getElementById("input_subjScore").value
    if(subjName != "" && subjCredit != "" && subjScore >= 0 && subjScore != ""){
        gradeData[numArr] = subjName + "," + subjCredit + "," + subjScore + "," + "-"
        ClearData()
        InsertTable(numArr)
        gradeData = ExpandArray()
        numArr++
        document.getElementById("subj_Count").innerHTML = "จำนวนรายวิชา: " + (numArr)
    }
    else{
        alert("กรุณาใส่ข้อมูลให้ครบถ้วน")
    }
}
function ExpandArray(){
    let temp = gradeData
    let expandArr = new Array(gradeData.length+1)
    expandArr = temp
    return expandArr
}
function ClearData(){
    document.getElementById("input_subjName").value = ""
    document.getElementById("input_subjCredit").value = ""
    document.getElementById("input_subjScore").value = ""
}
function CalGrade(){
    try{
        for(let i = 0; i < gradeData.length; i++){
            let temp = gradeData[i].split(",")
            let score = temp[2]
            let grade = ""
            if(temp[1] != "-" && score >= 85){
                grade = "A"
            }
            else if(temp[1] != "-" && score >= 80 && score < 85){
                grade = "B+"
            }
            else if(temp[1] != "-" && score >= 75 && score < 80){
                grade = "B"
            }
            else if(temp[1] != "-" && score >= 70 && score < 75){
                grade = "C+"
            }
            else if(temp[1] != "-" && score >= 65 && score < 70){
                grade = "C"
            }
            else if(temp[1] != "-" && score >= 60 && score < 65){
                grade = "D+"
            }
            else if (temp[1] != "-" && score >= 55 && score < 60){
                grade = "D"
            }
            else if (temp[1] == "-" && score >= 50){
                grade = "S"
            }
            else if (temp[1] == "-" && score < 50){
                grade = "U"
            }
            else {
                grade = "F"
            }
            
            gradeData[i] = temp[0] + "," + temp[1] + "," + temp[2] + "," + grade
        }
        ClearTable()
        PrintGrade()
    }
    catch(err){
        alert("กรุณาใส่ข้อมูลก่อนคำนวณ")
    }
}
function CalGPA(){
    try{
        let sumScore = 0
        let totalCredit = 0
        if(gradeData[0] !== ""){
            CalGrade()
            for(let i = 0; i < gradeData.length; i++){
                let temp = gradeData[i].split(",")
                let credit = parseInt(temp[1])
                let grade = temp[3]
                if(temp[3] != "-"){
                    switch(grade){
                        case "A": {
                            sumScore += (4 * credit)
                            totalCredit += credit
                        } break;
                        case "B+":{
                            sumScore += (3.5 * credit)
                            totalCredit += credit
                        } break;
                        case "B":{
                            sumScore += (3 * credit)
                            totalCredit += credit
                        } break;
                        case "C+":{
                            sumScore += (2.5 * credit)
                            totalCredit += credit
                        } break;
                        case "C":{
                            sumScore += (2 * credit)
                            totalCredit += credit
                        } break;
                        case "D+":{
                            sumScore += (1.5 * credit)
                            totalCredit += credit
                        } break;
                        case "D":{
                            sumScore += (1 * credit)
                            totalCredit += credit
                        } break;
                        case "F":{
                            sumScore += 0
                            totalCredit += credit
                        } break;
                        case "S":{
                            sumScore += 0
                        } break;
                        case "U":{
                            sumScore += 0
                        } break;
                    }
                }
            }
            document.getElementById("Total_Credit").innerHTML = "หน่วยกิตรวม: " + totalCredit
            document.getElementById("GPA_Detail").innerHTML = "เกรดเฉลี่ย GPA: " + FloorGPA((sumScore / totalCredit))
        }
    }
    catch(err){
        alert("กรุณาใส่ข้อมูลก่อนคำนวณ")
    }
}
function ClearTable(){
    let table = document.getElementById("GradeTable")
    while(table.rows.length) {
        table.deleteRow(0);
    }
    let header = table.createTHead()
    let row = header.insertRow(0)

    row.insertCell(0).innerHTML = '<b scope="col">#</b>'
    row.insertCell(1).innerHTML = '<b scope="col">ชื่อรายวิชา</b>'
    row.insertCell(2).innerHTML = '<b scope="col">หน่วยกิต</b>'
    row.insertCell(3).innerHTML = '<b scope="col">คะแนนรวม</b>'
    row.insertCell(4).innerHTML =  '<b scope="col">เกรด</b>'             
}
function InsertTable(i){
    let table = document.getElementById("GradeTable")
    let numRow = i+1
        let temp = gradeData[i].split(",")
        let row = table.insertRow(numRow)
        let dataNum = row.insertCell(0)
        let subjName = row.insertCell(1)
        let subjCredit = row.insertCell(2)
        let subjScore = row.insertCell(3)
        let subjGrade = row.insertCell(4)

        dataNum.innerHTML = row.rowIndex
        subjName.innerHTML = temp[0]
        subjCredit.innerHTML = temp[1]
        subjScore.innerHTML = temp[2]
            if(temp[3] != null){
                subjGrade.innerHTML = temp[3]

                row.insertCell(5).innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteData(true)">Delete</button>'
            }
}
function PrintGrade(){
    let table = document.getElementById("GradeTable")
    for(let i = 0; i < gradeData.length; i++){
        let temp = gradeData[i].split(",")
        let row = table.insertRow(i+1)
        let dataNum = row.insertCell(0)
        let subjName = row.insertCell(1)
        let subjCredit = row.insertCell(2)
        let subjScore = row.insertCell(3)
        let subjGrade = row.insertCell(4)

        dataNum.innerHTML = row.rowIndex
        subjName.innerHTML = temp[0]
        subjCredit.innerHTML = temp[1]
        subjScore.innerHTML = temp[2]
            if(temp[3] != null){
                subjGrade.innerHTML = temp[3]
            }
    }
}
function FloorGPA(gpa){
    let gpaFloor = Math.floor(gpa)
    if(gpa - gpaFloor > 0.05){
       return (gpa - 0.01).toFixed(2)
    }
    else {
       return gpa.toFixed(2)
    }
}
function deleteData(isClick){
    let index, table = document.getElementById("GradeTable")
    for(let i = 0; i < table.rows.length; i++){
        table.rows[i].onclick = function()
        {
            if(isClick === true){
                index = this.rowIndex
                let con = confirm("คุณต้องการที่จะลบข้อมูลบรรทัดนี้หรือไม่")
                if(con === true){
                    deleteDataArr(index)
                    table.deleteRow(index)
                    numArr--
                    document.getElementById("subj_Count").innerHTML = "จำนวนรายวิชา: " + (numArr)
                    reArrIndex()
                }
            }  
        }
    }
}
function deleteDataArr(index){
    if(gradeData[index] != null && gradeData != ""){
        console.log(gradeData)
        console.log(gradeData[index-1])
        delete gradeData[index-1]
        gradeData.splice(index-1,1)
        console.log(gradeData)
    }
}
function reArrIndex(){
    let table = document.getElementById("GradeTable")
    for (var i = 0; i< table.rows.length; i++){
        table.rows[i+1].cells[0].innerHTML = i+1;
    } 
}
function FindMeBtn(){
    alert("You got me!")
}