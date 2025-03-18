const countries = [
   { name: "Pakistan", flag: "pk", offset: 5 },
   { name: "India", flag: "in", offset: 5.5 },
   { name: "Bangkok", flag: "th", offset: 7 },
   { name: "Hong Kong", flag: "hk", offset: 8 },
   { name: "Singapore", flag: "sg", offset: 8 },
   { name: "Tokyo", flag: "jp", offset: 9 },
   { name: "Sydney", flag: "au", offset: 10 },
   { name: "Auckland", flag: "nz", offset: 13 },
   { name: "New York", flag: "us", offset: -4 },
   { name: "Mexico", flag: "mx", offset: -6 },
   { name: "Brazil", flag: "br", offset: -3 },
   { name: "London", flag: "gb", offset: 0 },
   { name: "Saudi Arabia", flag: "sa", offset: 3 },
   { name: "Dubai", flag: "ae", offset: 4 },
   { name: "Berlin", flag: "de", offset: 1 },
   { name: "Paris", flag: "fr", offset: 1 },
   { name: "Moscow", flag: "ru", offset: 3 },
   { name: "Jakarta", flag: "id", offset: 7 },
   { name: "Los Angeles", flag: "us", offset: -7 },
   { name: "Toronto", flag: "ca", offset: -4 },
   { name: "Cape Town", flag: "za", offset: 2 },
   { name: "Buenos Aires", flag: "ar", offset: -3 },
   { name: "Seoul", flag: "kr", offset: 9 },
   { name: "Beijing", flag: "cn", offset: 8 }
];

function getBackgroundColor(hours) {
   if (hours >= 5 && hours < 12) return "morning"; 
   if (hours >= 12 && hours < 15) return "noon"; 
   if (hours >= 15 && hours < 18) return "asr"; 
   if (hours >= 18 && hours < 20) return "sunset"; 
   return "night";
}

function updateTime() {
const now = new Date();
const utc = now.getTime() + now.getTimezoneOffset() * 60000;

document.querySelector('.digital-time').innerHTML = countries.map(c => {
let countryTime = new Date(utc + (c.offset * 3600000));
let hours = countryTime.getHours();
let minutes = countryTime.getMinutes();
let seconds = countryTime.getSeconds();

return `<div class="time-box ${getBackgroundColor(hours)}">
   <img src="https://flagcdn.com/w40/${c.flag}.png" alt="${c.name}"> 
   <strong>${c.name}</strong><br> 
   ${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}<br>
   ${countryTime.toLocaleDateString(undefined, { weekday: 'long' })}
</div>`;
}).join('');

// Call function to update clock hands
updateClockHands(utc);
}

function updateClockHands(utc) {
let pakistanTime = new Date(utc + (5 * 3600000));
let hours = pakistanTime.getHours();
let minutes = pakistanTime.getMinutes();
let seconds = pakistanTime.getSeconds();
let milliseconds = pakistanTime.getMilliseconds();

// Calculate smooth movement for second, minute, and hour hands
const secondDeg = ((seconds + milliseconds / 1000) / 60) * 360;
const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
const hourDeg = ((hours % 12 + minutes / 60) / 12) * 360;

document.querySelector(".second-hand").style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
   document.querySelector(".minute-hand").style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
   document.querySelector(".hour-hand").style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
requestAnimationFrame(updateClockHands);
}

// Run updateTime() every second
setInterval(updateTime, 1000);
updateTime();
