function clearInput1() {
    document.getElementById('teacherNames').value = '';
}

function clearInput2() {
    document.getElementById('examHalls').value = '';
}
function clearInput3() {
    document.getElementById('exams').value = '';
}

function allocateTeachers() {
    const inputElement1 = document.getElementById('teacherNames');
    const teacherNames = inputElement1.value.split(',').map(name => name.trim());
    const inputElement2 = document.getElementById('examHalls');
    var examHalls = inputElement2.value.split(',').map(name => name.trim());
    const inputElement3 = document.getElementById('exams');
    var exams = inputElement3.value.split(',').map(name => name.trim());

    if(teacherNames.length===1 || examHalls.length===1 || exams.length===1){
        alert("Please Verify Inputs");
    }

    var teachers = teacherNames.length;
    var examHall= examHalls.length;
    var dates= exams.length;

    //Round Robin manner
    var allocationResults = [];
    var teacherIndex = 0;
    var examHallIndex= 0;

    for (var i = 0; i < exams.length; i++) {
        for (var j = 0; j < examHalls.length; j++) {
            allocationResults.push({
                teacher: teacherNames[teacherIndex % teachers],
                exam: exams[i],
                hall: examHalls[examHallIndex % examHall],
            });
            teacherIndex++;
            examHallIndex++;
        }
    }
    
    displayAllocationTable(allocationResults);
}

function displayAllocationTable(allocationResults) {
    var table = "<table><tr><th>Teacher</th><th>Exam Date</th><th>Hall No</th></tr>";
    allocationResults.forEach(function(result) {
        table += "<tr><td>" + result.teacher + "</td><td>" + result.exam + "</td><td>" + result.hall + "</td></tr>";
    });
    table += "</table>";
    document.getElementById("allocationTable").innerHTML = table;
}

function generatePDF() {
    let doc = new jsPDF();
    let pdf = document.querySelector("#allocationTable");
    doc.fromHTML(pdf);
    doc.save("Allocation.pdf");
}
