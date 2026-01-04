import { effectBoxShadowInputs } from "./efeito.js";

export const inputsAll = document.querySelectorAll("input");
const list = document.querySelector("#list");

effectBoxShadowInputs();

const inputsSelection = {
    studentName: document.querySelector("#student-name"),
    firstBimester: document.querySelector("#firstBimester"),
    secondBimester: document.querySelector("#secondBimester"),
    thirdBimester: document.querySelector("#thirdBimester"),
    fourthBimester: document.querySelector("#fourthBimester")
};

const buttons = {
    send: document.querySelector("#button-send"),
    clean: document.querySelector("#button-clean")
};

function cleanInputs() {
    inputsAll.forEach((e) => {
        e.value = "";
    });
}

function boxError(input, classname, type = "add") {
    switch(type) {
        case 'add':
            input.classList.add(classname);
            break;
        case 'remove':
            input.classList.remove(classname);
            break;
    };
}

class Student {
    constructor(name, firstBimester, secondBimester, thirdBimester, fourthBimester) {
        this.name = name;
        this.firstBimester = firstBimester;
        this.secondBimester = secondBimester
        this.thirdBimester = thirdBimester
        this.fourthBimester = fourthBimester
    };

    validation() {

        this.name = this.name.trim();
        const regExpStudentName = /[a-zA-Z]+/gi;
        const studentNameLength = {min: 3, max: 40}

        if (!this.name.match(regExpStudentName)) {
            boxError(inputsSelection.studentName, "box-error", "add"); return;
        }

        if (this.name.length < studentNameLength.min
            || this.name.length > studentNameLength.max) {
            boxError(inputsSelection.studentName, "box-error", "add"); return;  
        };

        boxError(inputsSelection.studentName, "box-error", "remove");

        const bimesters = [
            {bimester: this.firstBimester, input: inputsSelection.firstBimester},
            {bimester: this.secondBimester, input: inputsSelection.secondBimester},
            {bimester: this.thirdBimester, input: inputsSelection.thirdBimester},
            {bimester: this.fourthBimester, input: inputsSelection.fourthBimester}
        ];

        let isReal = true;

        bimesters.forEach((student) => {
            if (Number(student.bimester) < 0
            || Number(student.bimester) > 10
            || isNaN(student.bimester)
            || !student.bimester){
                boxError(student.input, "box-error", "add")
                isReal = false;
            }
        });

        if (!isReal) return;

        bimesters.forEach((bimester) => bimester.input.classList.remove("box-error"));

        const notes = bimesters.reduce((note, sumNote) => {
            return note + Number(sumNote.bimester);
        }, 0);

        const avarage = parseFloat((notes / 4).toFixed(1));
        let situation = null;

        if (avarage >= 5) situation = "approved"
        else if (avarage >= 4.5 && avarage <= 4.9) situation = "recovery"
        else situation = "reproved";

        const li = document.createElement("li");
        li.innerHTML = 
        `
            <div>
                <p id="first-result"><span>Name - </span> ${this.name}</p>
                <p id="second-result"><span>Final Note - </span> ${notes}</p>
                <p id="third-result"><span>Average - </span> ${avarage}</p>
            </div>
            <div>
                <p id="fourth-result"><span>Situation - </span>${situation}</p>
            </div>
        `

        switch(situation) {
            case 'approved':
                list.appendChild(li);
                li.classList.add("approved");
                break;
            case 'recovery':
                list.appendChild(li);
                li.classList.add("recovery");
                break;
            case 'reproved':
                list.appendChild(li);
                li.classList.add("reproved");
                break;
            default: console.error(`...`); break;
        };

        cleanInputs();

    };
};

buttons.send.addEventListener("click", () => {
    const {studentName, firstBimester, secondBimester, thirdBimester, fourthBimester} = inputsSelection

    const student = new Student(studentName.value, firstBimester.value, secondBimester.value, thirdBimester.value, fourthBimester.value);
    student.validation();
});

buttons.clean.addEventListener("click", () => {
    cleanInputs();
});