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

    // Create new labels for each purchase
    const priceLabel = document.createElement("label");
    priceLabel.textContent = "Price:";

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity:";

    purchaseRow.appendChild(priceLabel);
    purchaseRow.appendChild(priceInput);
    purchaseRow.appendChild(quantityLabel);
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
    const totalInvestment = totalValueSum; // Total investment is the sum of all purchases

    document.getElementById("average-price").textContent = averagePrice.toFixed(2);

    // Display the total investment as a single value
    document.getElementById("total-investment").textContent = totalInvestment.toFixed(2);

    // Create a string containing the purchase values for display
    const purchaseValues = purchases.map((purchase, index) => `Purchase Value for ${index + 1} Buy: ${(purchase.price * purchase.quantity).toFixed(2)});

    // Display the purchase values as a list
    document.getElementById("purchase-values-list").innerHTML = "";
    purchaseValues.forEach(value => {
        const li = document.createElement("li");
        li.textContent = value;
        document.getElementById("purchase-values-list").appendChild(li);
    });
}

function resetFields() {
    // Remove all additional input fields created for purchases
    const purchaseRows = document.querySelectorAll(".purchase-row");
    purchaseRows.forEach(row => {
        row.remove();
    });

    const inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach(field => {
        field.value = ""; // Clear input fields
    });
    purchases = []; // Clear purchases

    // Clear the calculation results
    document.getElementById("average-price").textContent = "N/A";
    document.getElementById("purchase-values-list").innerHTML = "";
    document.getElementById("total-investment").textContent = "N/A";
}
