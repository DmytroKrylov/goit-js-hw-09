import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Описаний в документації об'єкт з параметрами
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      document.querySelector('button[data-start]').disabled = true;
    } else {
      document.querySelector('button[data-start]').disabled = false;
    }
  },
};

// Ініціалізація flatpickr на полі вибору дати і часу
const datetimePicker = flatpickr('#datetime-picker', options);

// Обробник натискання кнопки "Start"
document
  .querySelector('button[data-start]')
  .addEventListener('click', function () {
    const selectedDate = datetimePicker.selectedDates[0];

    if (selectedDate) {
      const countdown = selectedDate - new Date();
      startTimer(countdown);
    }
  });

// Функція запуску таймера
function startTimer(countdown) {
  const timerElement = document.querySelector('.timer');

  function updateTimer() {
    countdown -= 1000;

    if (countdown <= 0) {
      clearInterval(timerInterval);
      renderTimer(0, 0, 0, 0);
      console.log('Timer finished!');
    } else {
      const { days, hours, minutes, seconds } = convertMs(countdown);
      renderTimer(days, hours, minutes, seconds);
    }
  }

  // Викликати функцію оновлення раз на секунду
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// Функція рендерингу таймера
function renderTimer(days, hours, minutes, seconds) {
  const formattedDays = addLeadingZero(days);
  const formattedHours = addLeadingZero(hours);
  const formattedMinutes = addLeadingZero(minutes);
  const formattedSeconds = addLeadingZero(seconds);

  const timerElement = document.querySelector('.timer');
  timerElement.textContent = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Функція форматування чисел з ведучими нулями
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Функція підрахунку значень часу
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0,
