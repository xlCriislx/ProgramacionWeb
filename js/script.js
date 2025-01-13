document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("conversion-form");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const resultDiv = document.getElementById("result");
    const convertedAmount = document.getElementById("converted-amount");

    const API_URL = "https://v6.exchangerate-api.com/v6/b0a04d3281413ca2b67ad341/latest/USD";

    async function populateCurrencies() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.result === "success") {
                const currencies = Object.keys(data.conversion_rates);

                currencies.forEach(currency => {
                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");

                    option1.value = option2.value = currency;
                    option1.textContent = option2.textContent = currency;

                    fromCurrency.appendChild(option1);
                    toCurrency.appendChild(option2);
                });
            }
        } catch (error) {
            console.error("Error fetching currency data:", error);
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (!amount || !from || !to) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/b0a04d3281413ca2b67ad341/pair/${from}/${to}/${amount}`);
            const data = await response.json();

            if (data.result === "success") {
                convertedAmount.textContent = data.conversion_result.toFixed(2);
                resultDiv.style.display = "block";
            } else {
                alert("Conversion failed. Please try again.");
            }
        } catch (error) {
            console.error("Error converting currency:", error);
        }
    });

    populateCurrencies();
});
