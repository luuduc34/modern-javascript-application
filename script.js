const API_KEY = '1a8f49efd80db8c189bb16e06cd70e63'; // For Openweather API
const CLIENT_ID = 'KiROWCmL9ZKZnoWjHWJlIdCP5jLw2f_2ziSpzcUcqIY'; // For Unsplash API

const wrapper = document.querySelector(".wrapper");
const inputField = wrapper.querySelector("input");
let tempo = "Historique : ";
const labels = [];

apisCall('liege'); // Start with weather of Liege
// Call requestApi and requestApi_unsplash when put value in field and press "enter"
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value !=""){
        apisCall(inputField.value);
        history(inputField.value);               
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

function requestApi(value){ // return data from API call promise to weatheDetails function
   
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}&units=metric&lang=fr`;
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result));       
}

function requestApi_unsplash(value){ // return data from API call promise to UnsplashDetails function

    let api_unsplash = `https://api.unsplash.com/search/photos?query=${value}&client_id=${CLIENT_ID}`;
    fetch(api_unsplash)
        .then(response => response.json())
        .then(result => UnsplashDetails(result));
}
/* function select_icon(value){
    switch(value){
        case '01d' : return "<i class='fa-solid fa-sun fa-2xl'></i>";
        break;
        case '02d' : return "<i class='fa-solid fa-sun-cloud fa-2xl'></i>";
        break;
        case '03d' : return "<i class='fa-solid fa-cloud fa-2xl'></i>";
        break;
        case '04d' : return "<i class='fa-solid fa-clouds fa-2xl'></i>";
        break;
        case '09d' : return "<i class='fa-solid fa-cloud-showers fa-2xl'></i>";
        break;
        case '10d' : return "<i class='fa-solid fa-cloud-sun-rain fa-2xl'></i>";
        break;
        case '11d' : return "<i class='fa-solid fa-cloud-bolt fa-2xl'></i>";
        break;
    }
}
 */
function weatherDetails(value){ // Get elements from API
    const {lat, lon} = value.coord;

    wrapper.querySelector(".location").innerHTML = "- "+value.name+" -";
    wrapper.querySelector(".one .weather").innerHTML = value.weather[0].description;
    wrapper.querySelector(".one .temp .numb").innerHTML = Math.round(value.main.temp);
    wrapper.querySelector(".one .min .numb").innerHTML = Math.round(value.main.temp_min);
    wrapper.querySelector(".one .max .numb").innerHTML = Math.round(value.main.temp_max);
    wrapper.querySelector(".icon1").src = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;

    //console.log(value);
    // return data from API call promise to weatheDetails2 function
    let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${API_KEY}&units=metric&lang=fr`;
    fetch(api2)
        .then(response => response.json())
        .then(result => weatherDetails2(result));
    
    let api3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${API_KEY}&units=metric&lang=fr`;
    fetch(api3)
        .then(response => response.json())
        .then(result => weatherDetails3(result));
    }
    

function UnsplashDetails(value){
    const img_bg = value.results[0].urls.regular;        
    document.body.style.backgroundImage = `url(${img_bg})`;
    document.body.style.backgroundSize = 'cover';
        
    //console.log(value);
}
        
function weatherDetails2(value){ // Get elements from API
        
    var allDays= ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var d2 = new Date(value.daily[1].dt * 1000); // to get the DateTime. 
    var dayName_two = allDays[d2.getDay()]; // It will give day index, and based on index we can get day name from the array.
    var d3 = new Date(value.daily[2].dt * 1000);
    var dayName_thre = allDays[d3.getDay()];
    var d4 = new Date(value.daily[3].dt * 1000);
    var dayName_four = allDays[d4.getDay()];
    var d5 = new Date(value.daily[4].dt * 1000);
    var dayName_five = allDays[d5.getDay()];
// D-day + 1 data        
    wrapper.querySelector(".day-two").innerHTML =dayName_two;
    document.querySelector(".icon2").src = `http://openweathermap.org/img/wn/${value.daily[1].weather[0].icon}.png`;
    wrapper.querySelector(".two .weather").innerHTML = value.daily[1].weather[0].description;
    wrapper.querySelector(".two .min .numb").innerHTML = Math.round(value.daily[1].temp.min);
    wrapper.querySelector(".two .max .numb").innerHTML = Math.round(value.daily[1].temp.max);
// D-day + 2 data
    wrapper.querySelector(".day-thre").innerHTML =dayName_thre;
    document.querySelector(".icon3").src = `http://openweathermap.org/img/wn/${value.daily[2].weather[0].icon}.png`;
    wrapper.querySelector(".thre .weather").innerHTML = value.daily[2].weather[0].description;
    wrapper.querySelector(".thre .min .numb").innerHTML = Math.round(value.daily[2].temp.min);
    wrapper.querySelector(".thre .max .numb").innerHTML = Math.round(value.daily[2].temp.max);
// D-day + 3 data        
    wrapper.querySelector(".day-four").innerHTML =dayName_four;
    document.querySelector(".icon4").src = `http://openweathermap.org/img/wn/${value.daily[3].weather[0].icon}.png`;
    wrapper.querySelector(".four .weather").innerHTML = value.daily[3].weather[0].description;
    wrapper.querySelector(".four .min .numb").innerHTML = Math.round(value.daily[3].temp.min);
    wrapper.querySelector(".four .max .numb").innerHTML = Math.round(value.daily[3].temp.max);
// D-day + 4 data        
    wrapper.querySelector(".day-five").innerHTML =dayName_five;
    document.querySelector(".icon5").src = `http://openweathermap.org/img/wn/${value.daily[4].weather[0].icon}.png`;
    wrapper.querySelector(".five .weather").innerHTML = value.daily[4].weather[0].description;
    wrapper.querySelector(".five .min .numb").innerHTML = Math.round(value.daily[4].temp.min);
    wrapper.querySelector(".five .max .numb").innerHTML = Math.round(value.daily[4].temp.max);

    //console.log(value);
}
function weatherDetails3(value){
    //console.log(value);
    
    for(let i = 0; i < 9; i++){
        labels[i] = get_hour(value.list[i].dt_txt);
    }
    const data = {
        labels: labels,
        datasets: [{
          label: 'Temperatures du jour sur 24 heures',
          backgroundColor: 'rgb(61, 170, 248)',
          borderColor: 'rgb(61, 170, 248)',
          data: [value.list[0].main.temp, value.list[1].main.temp, value.list[2].main.temp, value.list[3].main.temp, value.list[4].main.temp, value.list[5].main.temp, value.list[6].main.temp, value.list[7].main.temp, value.list[8].main.temp],
        }]
    };
    /* const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'lightGreen';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      }; */
    
    const config = {
        type: 'line',
        data: data,
        //plugins: [plugin],
        options: {responsive: true}
    };
    const ctx = document.getElementById('myChart').getContext('2d');
    let chartStatus = Chart.getChart("myChart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

    var myChart = new Chart(
        ctx,
        config
    ); 
       
}

function get_hour(value){
    let result = value.substr(11, 2) + "h";
    return result;
}
