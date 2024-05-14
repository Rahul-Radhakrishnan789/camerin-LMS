console.log("hy");

const today = new Date();





const hours = today.getHours();
const minutes = today.getMinutes();
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
const date=today.toISOString().split('T')[0]

const time=today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
console.log(formattedTime,time);

console.log("20:12"<="20:11");