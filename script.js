document.addEventListener('DOMContentLoaded', () => {
  // URL для запиту даних про обмінні курси від Національного банку України
  const apiURL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  // Контейнер у DOM для відображення обмінних курсів
  const exchangeRatesContainer = document.getElementById('exchange-rates');

  // Функція для отримання обмінних курсів з API
  function fetchExchangeRates() {
    // Виконує запит до API
    fetch(apiURL)// повертає проміс 
      // Обробляє отриману відповідь, перетворюючи її у JSON об'єкт
      .then(response => response.json()) // then(response) - отримання результату виконання
      // Обробляє результат перетворення JSON у вигляді масиву даних
      .then(data => displayExchangeRates(data)) // then(data) - отримання об'єкту або масиву даних
      // Обробляє помилки, які виникають під час виконання запиту або обробки результату
      .catch(error => {
        // Повідомляє користувача про помилку, якщо вони виникли
        exchangeRatesContainer.innerHTML = '<p>Не вдалося завантажити дані. Спробуйте пізніше.</p>';
        // Виводить помилку у консоль для подальшого аналізу
        console.error('Error fetching exchange rates:', error);
      });
  }

  // Функція для відображення обмінних курсів на сторінці
  function displayExchangeRates(data) {
    // Очищує вміст контейнера перед відображенням нових даних
    exchangeRatesContainer.innerHTML = '';
    // Перебирає кожен об'єкт rate у масиві data, щоб створити відповідні елементи DOM
    data.forEach(rate => {
      // Створює новий елемент <p> для кожного обмінного курсу
      const rateElement = document.createElement('p');
      // Записує текстове представлення обмінного курсу в елемент <p>
      rateElement.textContent = `${rate.txt} (${rate.cc}): ${rate.rate.toFixed(2)} UAH`;
      // Додає новий елемент до контейнера для відображення
      exchangeRatesContainer.appendChild(rateElement);
    });
  }

  // Викликає функцію fetchExchangeRates для першого завантаження обмінних курсів
  fetchExchangeRates();

  // Оновлює обмінні курси кожні 10 хвилин (600000 мілісекунд)
  setInterval(fetchExchangeRates, 600000);
});
