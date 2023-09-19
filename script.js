let purchases = [];

function addPurchase() {
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.classList.add("input-field");
    priceInput.step = "0.01";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("input-field");

    const purchaseRow = document.createElement("div");
    purchaseRow.classList.add("purchase-row");
    purchaseRow.appendChild(priceInput);
    purchaseRow.appendChild(quantityInput);

    document.getElementById("purchase-inputs").appendChild(purchaseRow);
}

function calculateAverage() {
    const priceInputs = document.querySelectorAll(".input-field");
    
    if (priceInputs.length === 0) {
        alert("Please add at least one purchase.");
        return;
    }

    purchases = [];

    for (let i = 0; i < priceInputs.length; i += 2) {
        const price = parseFloat(priceInputs[i].value);
        const quantity = parseInt(priceInputs[i + 1].value);

        if (isNaN(price) || isNaN(quantity)) {
            alert("Please enter valid values for price and quantity.");
            return;
        }

        purchases.push({ price, quantity });
    }

    const totalShares = purchases.reduce((total, purchase) => total + purchase.quantity, 0);
    const totalValueSum = purchases.reduce((total, purchase) => total + (purchase.price * purchase.quantity), 0);

    const averagePrice = totalValueSum / totalShares;
    
    const purchaseValues = purchases.map((purchase, index) => `Purchase Value for ${index + 1} Buy: ${purchase.price * purchase.quantity}`);
    const totalInvestment = purchaseValues.reduce((total, value) => total + (parseFloat(value.split(": ")[1])), 0); // Summing the purchase values

    document.getElementById("average-price").textContent = averagePrice.toFixed(2);
    document.getElementById("purchase-values-list").innerHTML = purchaseValues.map(value => `<li>${value}</li>`).join("");
    document.getElementById("total-investment").innerHTML = `<span class="bold">Total Investment:</span> ${totalInvestment.toFixed(2)}`; // Making Total Investment bold
}
