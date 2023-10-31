import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const selectors = {
    input: document.querySelector('input#datetime-picker'),
    days: document.querySelector('.js-days'),
    hours: document.querySelector('.js-hours'),
    minutes: document.querySelector('.js-minutes'),
    seconds: document.querySelector('.js-seconds'),
    buttonStart: document.querySelector('button'),
  };

selectors.buttonStart.disabled = true;
selectors.buttonStart.addEventListener('click', startTimer)


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
     onClose(selectedDates) {
       if (selectedDates[0] <= new Date()) {
         Notiflix.Notify.failure('Please choose a date in the future');
       } else {
        selectors.buttonStart.disabled = false;
       }
    }
}

flatpickr(selectors.input, options);


const currentTime = new Date();


function startTimer() {
  selectors.buttonStart.disabled = true;
  selectors.input.disabled = true;
  let futureTime = new Date(selectors.input.value);
  let targetTime = futureTime - currentTime;

 const selectedDate = setInterval(() => {
    const convertedData =  convertMs(targetTime);
    selectors.days.textContent = addLeadingZero(convertedData.days);
    selectors.hours.textContent = addLeadingZero(convertedData.hours);
    selectors.minutes.textContent = addLeadingZero(convertedData.minutes);
    selectors.seconds.textContent = addLeadingZero(convertedData.seconds);
    targetTime -= 1000;
    
   if (targetTime <= 0) {
     clearInterval(selectedDate);
     selectors.buttonStart.disabled = false;
     selectors.input.disabled = false;
  }
 }, 1000)
}




function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    
    const hours = Math.floor((ms % day) / hour);
    
    const minutes = Math.floor(((ms % day) % hour) / minute);
   
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

