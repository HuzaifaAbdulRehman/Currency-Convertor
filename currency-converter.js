// Currency Converter JavaScript
const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultDiv = document.getElementById("result");

const CURRENCY_API = "https://api.exchangerate-api.com/v4/latest/";

// Populate currency dropdowns
const populateCurrencies = async () => {
  const res = await fetch(CURRENCY_API + "USD");
  if (!res.ok) throw new Error("Failed to fetch currencies");
  const data = await res.json();
  console.log("data: ", data);
  const currencies = Object.keys(data.rates);
  fromCurrency.innerHTML = "";
  toCurrency.innerHTML = "";
  currencies.forEach((cur) => {
    fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
    toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
  });
  fromCurrency.value = "USD";
  toCurrency.value = "EUR";
};

// Convert currency
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // e.preventDefault() is a JavaScript method used to stop the default action of an event from happening. //Normally, submitting a form would reload the page.
  //e.preventDefault() stops this, so you can handle the form with JavaScript instead (like converting currency without reloading the page).

  const amount = parseFloat(amountInput.value); // parseFloat() is a JavaScript function that converts a string to a floating-point number. It is often used to convert user input (like from a form) into a number for calculations.
  const from = fromCurrency.value;
  const to = toCurrency.value;
  resultDiv.textContent = "Converting...";
  const res = await fetch(CURRENCY_API + from);
  const data = await res.json();
  const rate = data.rates[to];
  const converted = (amount * rate).toFixed(2);
  resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
});

// Initialize
populateCurrencies();
