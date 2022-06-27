function weatherDetailsHourly(value){
    //console.log(value);
   add_chart(value);
}

function get_hour(value){
    let result = value.substr(11, 2) + "h";
    return result;
}

function add_chart(value){
    const labels = [];

    for(let i = 0; i < 9; i++){
        labels[i] = get_hour(value.list[i].dt_txt);
    }
    const data = {
        labels: labels,
        datasets: [{
          label: 'Temperatures du jour sur 24 heures',
          backgroundColor: 'rgb(61, 170, 248)',
          borderColor: 'rgb(61, 170, 248)',
          data: [Math.round(value.list[0].main.temp), Math.round(value.list[1].main.temp), Math.round(value.list[2].main.temp), Math.round(value.list[3].main.temp), Math.round(value.list[4].main.temp), Math.round(value.list[5].main.temp), Math.round(value.list[6].main.temp), Math.round(value.list[7].main.temp), Math.round(value.list[8].main.temp)],
        }]
    };
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
    const myChart = new Chart(
        ctx,
        config
    );       
}

export { weatherDetailsHourly, get_hour, add_chart };