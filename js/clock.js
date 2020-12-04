let quote = document.querySelector('#quote')
let author = document.querySelector('#author')
let shuffle = document.querySelector('#sync')
let btn = document.querySelector('#btn')


let now = new Date()

/*quotes section starts*/
const getQuotes = () => {
    
    fetch("https://type.fit/api/quotes")
    .then((res) =>{
        return res.json();
    })
    .then((data) => {
        console.log(data);
        let randomNum = Math.floor(Math.random() * (data.length));
        let text = data[randomNum].text
        let owner = data[randomNum].author

        quote.innerText = `“${text}”`
        author.innerHTML = owner
    });   
}

/*quote section ends*/


/*time section starts*/

const greeting = hour => {
    let background = document.querySelector('#upper')
    let greeting = document.querySelector('#greet')
    let icon = document.querySelector('#icon') 

    if (hour < 12) {
        background.classList.remove('bg-night');
        background.classList.add('bg-day')

        greeting.innerText = 'Morning';
        icon.className = "fas fa-sun";
    }
    else if (hour >12 && hour < 17) {
        greeting.innerText = 'Afternoon';
        background.classList.add('bg-day')
        icon.className = "fas fa-sun";
    }
    else {
        greeting.innerText = 'Evening'
        background.classList.remove('bg-day')
        background.classList.add('bg-night')
        icon.className = "fas fa-moon";
    }
}

// const newClock() {
const getTime = () => {
    now = new Date()
    hour = now.getHours()
    minutes = now.getMinutes()

    const currentTime = document.querySelector('#current-time')
    //if minute or hour less than 10, make it two digits
    minutes = minutes < 10 ? '0' + minutes : minutes
    hour = hour < 10 ? '0' + hour : hour

    currentTime.innerHTML = `${hour}:${minutes}`

    greeting(hour)
}
/* time section ends */


const getInfo = () => {
    let timezone = document.querySelector('#timezone')
    //get the timezone
    let zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // get timezone code
    timezone.textContent = zone
    //get locale
    let locale = Intl.DateTimeFormat().resolvedOptions().locale
    document.querySelector('#code').innerText = new Date().toLocaleString(locale, {timeZoneName: 'short'}).split(' ').pop()          
}



const dayAndWeek = () => {
    let start = new Date(now.getFullYear(), 0, 0)
    let difference = (now - start) + ((start.getTimezoneOffset()) * 60 * 1000)
    let day = 1000 * 60 * 60 * 24
    let DoY = Math.floor(difference / day)
    console.log(DoY, difference)

    WeekNumber = Math.ceil(DoY / 7)
    document.querySelector('#year-day').innerText = DoY
    document.querySelector('#week-day').innerText = now.getDay() + 1
    document.querySelector('#week-num').innerText = WeekNumber

}


    //toggle section two
    btn.addEventListener('click', () => {
    details= document.querySelector('#details')
    arrow = document.querySelector('#arrow')
    btnText = document.querySelector('button')

    details.classList.toggle('hide')

    if(btnText.innerHTML == 'more'){
        btnText.innerHTML = 'less'
        arrow.className = "fas fa-chevron-circle-up"
    }else{
        btnText.innerHTML = 'more'
        arrow.className = 'fas fa-chevron-circle-down'
    

    }
})

//get location. CORS blocking fetch so, use script
const getLocation = ({city, country_code}) => {
    document.querySelector('#location').innerHTML = (`${city}, ${country_code}`);
}
let script = document.createElement('script');
script.src = `https://freegeoip.app/json?callback=getLocation`;
document.body.append(script);


/*call all functions*/
getQuotes()
// change quotes when sync icon is clicked 
shuffle.addEventListener('click', getQuotes)
getInfo()
dayAndWeek()
let clock  = setInterval(getTime, 1000)