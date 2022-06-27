import { weatherDetailsHourly, get_hour, add_chart } from "./chart.js";
import { requestApi, requestApi_unsplash } from "./api.js";


const wrapper = document.querySelector(".wrapper");
const inputField = wrapper.querySelector("input");

let tempo = "Historique : ";

apisCall('liege'); // Start with weather of Liege
// Call requestApi and requestApi_unsplash when put value in field and press "enter"
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value !=""){
        apisCall(inputField.value);
        history(inputField.value);
        inputField.value = "";               
    }
})
// Call all API when give new city
function apisCall(value){
    requestApi(value);
    requestApi_unsplash(value);
}

function history(val){  
    tempo += " " + val + " -";
    let visited = tempo.substring(0, tempo.length - 1);
    wrapper.querySelector('.visited').innerHTML = visited;
}
        

