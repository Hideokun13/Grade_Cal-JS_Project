let num = prompt("คำนวณเกรดทั้งหมดกี่วิชา: ")
let gradeData = new Array(parseInt(num))
let input = ""

InputData()
CalGrade(gradeData)
InsertTable(gradeData)
CalGPA(gradeData)

function InputData(){
    for(let i = 0; i < gradeData.length; i++){
        input = prompt("วิชาที่: "+(i+1)+ " กรุณาใส่ชื่อวิชา,หน่วยกิต,และคะแนน \nคั่นด้วยเครื่องหมาย(,) \n(หมายเหตุ: ถ้าวิชานั้นไม่มีหน่วยกิต ให้ใส่เครื่องหมาย (-)")
        gradeData[i] = input
    }
}
function CalGrade(dataList){
    for(let i = 0; i < dataList.length; i++){
        let temp = dataList[i].split(",")
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
        
        dataList[i] = temp + "," + grade
    }
    return dataList
}
function CalGPA(dataList){
    let sumScore = 0
    let totalCredit = 0
    for(let i = 0; i < dataList.length; i++){
        let temp = dataList[i].split(",")
        let credit = parseInt(temp[1])
        let grade = temp[3]
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
    document.getElementById("Total_Credit").innerHTML = "หน่วยกิตรวม: " + totalCredit
    document.getElementById("GPA_Detail").innerHTML = "เกรดเฉลี่ย GPA: " + FloorGPA((sumScore / totalCredit))
    
}
function PrintGradeDetail(){
    console.log("ชื่อวิชา\tหน่วยกิต\tคะแนน\tเกรด")
    for(let i = 0; i < gradeData.length; i++){
        let temp = gradeData[i].split(",")
        console.log(temp[0]+"\t"+temp[1]+"\t"+temp[2]+"\t"+temp[3])
    }
}
function InsertTable(dataList){
    let table = document.getElementById("GradeTable")
    for(let i = 0; i < dataList.length; i++){
        let temp = dataList[i].split(",")
        let row = table.insertRow(i+1)
        let subjName = row.insertCell(0)
        let subjCredit = row.insertCell(1)
        let subjScore = row.insertCell(2)
        let subjGrade = row.insertCell(3)

        subjName.innerHTML = temp[0]
        subjCredit.innerHTML = temp[1]
        subjScore.innerHTML = temp[2]
        subjGrade.innerHTML = temp[3]
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