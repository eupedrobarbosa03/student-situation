import { inputsAll } from "./index.js";

export function effectBoxShadowInputs() {
    inputsAll.forEach((e) => {
        setInterval(() => {
            e.classList.toggle("box-shadow-effect");
        }, 1500);
    })
}