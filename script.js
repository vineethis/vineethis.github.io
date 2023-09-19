let purchaseCount = 1; // Keep track of the number of purchases

function updateAmountInvested() {
    const purchaseRows = document.querySelectorAll(".purchase-row");
    purchaseRows.forEach((row, index) => {
        const price = parseFloat(row.querySelector(".price").value);
        const quantity = parseInt(row.querySelector(".quantity").value);

        if (!isNaN(price) && !isNaN(quantity)) {
            const amountInvested = (price * quantity).toFixed(2);
            row.querySelector(".amount-invested").textContent = `Amount Invested: $${amountInvested}`;
        }
    });
}

function addPurchase() {
    const purchaseRow = document.createElement("div");
    purchaseRow.classList.add("purchase-row");

    const priceLabel = document.createElement("label");
    priceLabel.textContent = "Price:";

    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.classList.add("price");
    priceInput.step = "0.01";

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity:";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("quantity");

    const amountInvestedSpan = document.createElement("span");
    amountInvestedSpan.classList.add("amount-invested");
    amountInvestedSpan.textContent = "Amount Invested: $0.00";

    purchaseRow.appendChild(priceLabel);
    purchaseRow.appendChild(priceInput);
    purchaseRow.appendChild(quantityLabel);
    purchaseRow.appendChild(quantityInput);
    purchaseRow.appendChild(amountInvestedSpan);

    document.getElementById("purchase-inputs").appendChild(purchaseRow);

    purchaseCount++;
}

function calculateAverage() {
    const priceInputs = document.querySelectorAll(".price");
    const quantityInputs = document.querySelectorAll(".quantity");

    if (priceInputs.length !== quantityInputs.length || priceInputs.length === 0) {
        alert("Please fill in all price and quantity fields.");
        return;
    }

    purchases = [];

    for (let i = 0; i < priceInputs.length; i++) {
        const price = parseFloat(priceInputs[i].value);
        const quantity = parseInt(quantityInputs[i].value);

        if (isNaN(price) || isNaN(quantity)) {
            alert("Please enter valid values for price and quantity.");
            return;
        }

        purchases.push({ price, quantity });
    }

    const totalShares = purchases.reduce((total, purchase) => total + purchase.quantity, 0);
    const totalValueSum = purchases.reduce((total, purchase) => total + (purchase.price * purchase.quantity), 0);

    const averagePrice = totalValueSum / totalShares;
    document.getElementById("average-price").textContent = `$${averagePrice.toFixed(2)}`;
}

// Listen for input changes and update the amount invested
const inputs = document.querySelectorAll(".price, .quantity");
inputs.forEach((input) => {
    input.addEventListener("input", updateAmountInvested);
});
