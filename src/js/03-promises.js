// all modules
import Notiflix from 'notiflix';

// Додаємо обробник події на форму
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault(); // Забороняємо стандартну поведінку форми

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  // Очищаємо введені значення
  delayInput.value = '';
  stepInput.value = '';
  amountInput.value = '';

  // Викликаємо функцію createPromise стільки разів, скільки ввели в поле amount
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    createPromise(position, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
