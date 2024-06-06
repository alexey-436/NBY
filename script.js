document.addEventListener('DOMContentLoaded', () => {
  const apiURL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  const exchangeRatesContainer = document.getElementById('exchange-rates');

  function fetchExchangeRates() {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => displayExchangeRates(data))
      .catch(error => {
        exchangeRatesContainer.innerHTML = '<p>Не вдалося завантажити дані. Спробуйте пізніше.</p>';
        console.error('Error fetching exchange rates:', error);
      });
  }

  function displayExchangeRates(data) {
    exchangeRatesContainer.innerHTML = '';
    data.forEach(rate => {
      const rateElement = document.createElement('p');
      rateElement.textContent = `${rate.txt} (${rate.cc}): ${rate.rate.toFixed(2)} UAH`;
      exchangeRatesContainer.appendChild(rateElement);
    });
  }

  fetchExchangeRates();

  // Оновлювати дані кожні 10 хвилин (600000 мілісекунд)
  setInterval(fetchExchangeRates, 600000);
});
