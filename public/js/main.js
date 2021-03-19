const cityName = document.getElementById("cityName");
const btnSearch = document.getElementById("btnSearch");
const city_name = document.getElementById("city_name");
const tempVal = document.getElementById("tempVal");
const temp_status = document.getElementById("temp_status");
const data_hide = document.querySelector(".midLayer");
const pDay = document.querySelector(".pDay");
const pTodayData = document.querySelector(".pTodayData");

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

const currDate = new Date(); 
const currmonth = months[currDate.getMonth()+1]
let day = weekday[currDate.getDay()];
pDay.innerHTML= day
pTodayData.innerHTML = `${currDate.getDate()} ${currmonth}`
const getInfo = async(event) =>{
    event.preventDefault();
    city_name.innerHTML = ""
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText="Please enter valid city name ."
        data_hide.classList.add("data_hide")
    }
    else{
        try{
        city_name.innerText = "Loading"
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&APPID=${WEATHER_API}`
        
        const res = await fetch(apiUrl)
        const data = await res.json()
        const temperature = Math.floor(data.main.temp);
        tempVal.innerHTML = temperature;
        const tempMood = data.weather[0].main;
        if(tempMood === "Clear"){
            temp_status.innerHTML=` <i class="fa fa-sun" color="yellow"></i>`;
        }
        else if(tempMood === "Clouds"){
            temp_status.innerHTML=` <i class="fas fa-cloud" color="grey"></i>`;
        }
        else if(tempMood === "Rain"){
            temp_status.innerHTML=`<img src="https://media.giphy.com/media/3ov9jCEFMBtCy54q6Q/giphy.gif" class="fa fa-cloud-rain" color="grey"></img>`;
        }
        else{
            temp_status.innerHTML=tempMood;
        }

        data_hide.classList.remove("data_hide")
        city_name.innerHTML = ""

        }
    
        catch{
            city_name.innerText="Please enter valid city name ."
            data_hide.classList.add("data_hide")
        }
    }

}
btnSearch.addEventListener("click", getInfo)
// git commit -m "created global variable for apikey"