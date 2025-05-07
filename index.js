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
        this.validationFinished = false;
    };

    validation() {

        let numbers = [];

        for (let i = 0; i < 10; i++) {
            i = String(i);
            numbers.push(i);
        };

        for (let i = 0; i < this.name.length; i++) {
            if (numbers.includes(this.name[i])) {
                boxError(inputsSelection.studentName, "box-error", "add");
                return;
            };
        }

        if (!this.name || typeof this.name !== "string" || this.name.trim() === "") {
            boxError(inputsSelection.studentName, "box-error", "add");
            return;  
        };

        const lengthMax = 20;

        if (this.name.length > lengthMax) {
            boxError(inputsSelection.studentName, "box-error", "add");
            return;  
        }

        this.name = this.name.trim();

        boxError(inputsSelection.studentName, "box-error", "remove");

        this.firstBimester = Number(this.firstBimester);
        this.secondBimester = Number(this.secondBimester);
        this.thirdBimester = Number(this.thirdBimester);
        this.fourthBimester = Number(this.fourthBimester);

        function validationBimester(bimester, input) {

            if (bimester < 0 || bimester > 10 || Number.isNaN(bimester)) {
                boxError(input, "box-error", "add");
                return false;
            };

            boxError(input, "box-error", "remove");
            return true;

        };

        if (!validationBimester(this.firstBimester, inputsSelection.firstBimester)) return;
        if (!validationBimester(this.secondBimester, inputsSelection.secondBimester)) return;
        if (!validationBimester(this.thirdBimester, inputsSelection.thirdBimester)) return;
        if (!validationBimester(this.fourthBimester, inputsSelection.fourthBimester)) return;
        

        this.validationFinished = true;

    };

    result() {

        if (this.validationFinished) {

            let notaSum = 0;
            let notes = [this.firstBimester, this.secondBimester, this.thirdBimester, this.fourthBimester];
            for (let i = 0; i < notes.length; i++) {
                notaSum += notes[i];
            };

            let average = (notaSum / notes.length).toFixed(1);
            
            let situation = "";

            if (average >= 5) {
                situation = "approved";
            } else if (average >= 4.5 && average <= 4.9) {
                situation = "recovery";
            } else {
                situation = "reproved";
            };

            const template =  
            `
                <li>
                    <div>
                        <p id="first-result"><span>Name - </span> ${this.name}</p>
                        <p id="second-result"><span>Final Note - </span> ${notaSum.toFixed(1)}</p>
                        <p id="third-result"><span>Average - </span> ${average}</p>
                    </div>

                    <div>
                        <p id="fourth-result"><span>Situation - </span>${situation}</p>
                    </div>
                </li>
            `

            const parser = new DOMParser();
            const templateHtml = parser.parseFromString(template, "text/html");
            const li = templateHtml.querySelector("li");

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
            };

            cleanInputs();

        };
    };

};

buttons.send.addEventListener("click", () => {
    const {studentName, firstBimester, secondBimester, thirdBimester, fourthBimester} = inputsSelection

    const student = new Student(studentName.value, firstBimester.value, secondBimester.value, thirdBimester.value, fourthBimester.value);
    student.validation();
    student.result();
});

buttons.clean.addEventListener("click", () => {
    cleanInputs();
});