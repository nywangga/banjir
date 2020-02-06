let myChart = document.getElementById('myChart').getContext('2d')
let button = document.querySelector('.button')
let inputValue = document.querySelector('.inputValue')
let tunjuk = document.querySelector('.all')
let kepala = document.getElementById('as')


Chart.defaults.global.defaultFontFamily= 'Georgia';
Chart.defaults.global.defaultFontColor= '#777';

button.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+',id&appid=f3f066bdab383470df914acc5b9aee5d')
    .then(response => response.json())
    .then(data => {
        let day1 = [];
        for (i=0; i<40; i+= 2) {
            day1.push(data['list'][i]['weather'][0]['main'])
        }
        console.log(day1)
        let bgCol =[];
        for (let i of day1) {
            if (i === "Clouds") {
                bgCol.push("#C5D7C0")
            } else if (i === "Rain") {
                bgCol.push("#8AC0DE")
            } else {
                bgCol.push('#FED797')
            }
        }
        let bgCol1 =[];
        for (i=0; i < 20; i+= 4) {
            bgCol1.push(bgCol[i])
        }
        let bgCol2 =[];
        for (i=1; i < 20; i+= 4) {
            bgCol2.push(bgCol[i])
        }
        let bgCol3 =[];
        for (i=2; i < 20; i+= 4) {
            bgCol3.push(bgCol[i])
        }
        let bgCol4 =[];
        for (i=3; i < 20; i+= 4) {
            bgCol4.push(bgCol[i])
        }
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let kumpulanhari = [];

        var d = new Date();
        var m = months[d.getMonth()]
        var tod = d.getDate()
        var y = d.getFullYear()

        for (let i=0; i<5; i++) {
            kumpulanhari.push(`${tod} ${m} ${y}`)
            tod += 1;
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        kepala.innerHTML = `${capitalizeFirstLetter(inputValue.value)} bakal banjir ga yah?`
        
        

        let massPopChart = new Chart(myChart, {
            type:'bar',
            data: {
                labels:kumpulanhari,
                datasets:[{
                    label:'3',
                    backgroundColor: bgCol1,
                    data:[
                        6,
                        6,
                        6,
                        6,
                        6,
                    ],
                }, {
                    label:'6',
                    backgroundColor: bgCol2,
                   
                    data:[
                        6,
                        6,
                        6,
                        6,
                        6,
                    ],
                },
                {
                    label:'9',
                    backgroundColor: bgCol3,
                    data:[
                        6,
                        6,
                        6,
                        6,
                        6,
                    ],
                },
                {
                    label:'12',
                    backgroundColor: bgCol4,
                    data:[
                        6,
                        6,
                        6,
                        6,
                        6,
                    ],
                },
            ]
            },
            options: {
                title:{
                    display:true,
                    text: "Perkiraan Cuaca 5 hari ini",
                    fontSize: 25
                },
                legend:{
                    display:false
                },
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        ticks:{
                            max:24,
                            stepSize:6,
                            callback: function(value, index, values) {
                                return `Jam ${value}.00`}
                        },
                        stacked:true
                    }]
                }
            }
        })
    }).then(tunjuk.style.display = "inline")
.catch(err => alert("Nama kota tidak ditemukan!"))
})



