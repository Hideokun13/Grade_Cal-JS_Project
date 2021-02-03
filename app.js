let num = prompt("คำนวณเกรดทั้งหมดกี่วิชา: ")
let input = ""
let gradeData = new Array(parseInt(num))

InputData()
CalGrade(gradeData)
PrintGradeDetail()
console.log("GPA: " + CalGPA(gradeData))

function InputData(){
    for(let i = 0; i < gradeData.length; i++){
        input = prompt("วิชาที่: "+(i+1)+ " กรุณาใส่ชื่อวิชา,หน่วยกิต,และคะแนน \nคั่นด้วยเครื่องหมาย(,)")
        gradeData[i] = input
    }
}
function CalGrade(data){
    for(let i = 0; i < data.length; i++){
        let temp = data[i].split(",")
        let score = temp[2]
        let grade = ""
        if(score >= 85){
            grade = "A"
        }
        else if(score >= 80 && score < 85){
            grade = "B+"
        }
        else if(score >= 75 && score < 80){
            grade = "B"
        }
        else if(score >= 70 && score < 75){
            grade = "C+"
        }
        else if(score >= 65 && score < 70){
            grade = "C"
        }
        else if(score >= 60 && score < 65){
            grade = "D+"
        }
        else if (score >= 55 && score < 60){
            grade = "D"
        }
        else {
            grade = "F"
        }
        
        data[i] = temp + "," + grade
    }
    return data
}
function CalGPA(data){
    let sumScore = 0
    for(let i = 0; i < data.length; i++){
        let temp = data[i].split(",")
        let grade = temp[3]
        switch(grade){
            case "A": sumScore += 4; break;
            case "B+": sumScore += 3.5; break;
            case "B": sumScore += 3; break;
            case "C+": sumScore += 2.5; break;
            case "C": sumScore += 2; break;
            case "D+": sumScore += 1.5; break;
            case "D": sumScore += 1; break;
            case "F": sumScore += 0; break;
        }
    }
    return (Math.round(sumScore / data.length) * 100 / 100).toFixed(2)
}
function PrintGradeDetail(){
    for(let i = 0; i < gradeData.length; i++){
        console.log(gradeData[i])
    }
}