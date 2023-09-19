let purchases = 0;

function addPurchase() {
    const purchaseRow = document.createElement("div");
    purchaseRow.classList.add("purchase-row");
    
    const priceLabel = document.createElement("label");
    priceLabel.textContent = "Price:";
    priceLabel.setAttribute("for", `price${purchases}`);
    
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.classList.add("input-field");
    priceInput.step = "0.01";
    priceInput.id = `price${purchases}`;

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity:";
    quantityLabel.setAttribute("for", `quantity${purchases}`);
    
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("input-field");
    quantityInput.id = `quantity${purchases}`;
    
    purchaseRow.appendChild(priceLabel);
    purchaseRow.appendChild(priceInput);
    purchaseRow.appendChild(quantityLabel);
    purchaseRow.appendChild(quantityInput);

    document.getElementById("purchase-inputs").appendChild(purchaseRow);

    purchases++;
}

function calculateAverage() {
    const priceInputs = document.querySelectorAll(".input-field");
    
    if (priceInputs.length === 0) {
        alert("Please add at least one purchase.");
        return;
    }

    const purchaseData = [];

    for (let i = 0; i < priceInputs.length; i += 2) {
        const price = parseFloat(priceInputs[i].value);
        const quantity = parseInt(priceInputs[i + 1].value);

        if (isNaN(price) || isNaN(quantity)) {
            alert("Please enter valid values for price and quantity.");
            return;
        }

        purchaseData.push({ price, quantity });
    }

    const totalShares = purchaseData.reduce((total, purchase) => total + purchase.quantity, 0);
    const totalValueSum = purchaseData.reduce((total, purchase) => total + (purchase.price * purchase.quantity), 0);

    const averagePrice = totalValueSum / totalShares;
    
    const purchaseValues = purchaseData.map((purchase, index) => `Purchase Value for ${index + 1} Buy: ${(purchase.price * purchase.quantity).toFixed(2)}`);
    const totalInvestment = purchaseData.reduce((total, purchase) => total + (purchase.price * purchase.quantity), 0);

    document.getElementById("average-price").textContent = averagePrice.toFixed(2);
    document.getElementById("purchase-values-list").innerHTML = purchaseValues.map(value => `<li>${value}</li>`).join("");
    document.getElementById("total-investment").innerHTML = `<span class="bold">Total Investment:</span> ${totalInvestment.toFixed(2)}`;
}

function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value);
    
    if (isNaN(loanAmount) || isNaN(interestRate)) {
        alert("Please enter valid loan amount and interest rate.");
        return;
    }

    const monthlyInterestRate = (interestRate / 12) / 100; // Monthly interest rate
    const numberOfMonths = 12; // 12 months in a year
    const emi = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

    const emiDetailsContainer = document.getElementById("emi-details");
    emiDetailsContainer.innerHTML = ""; // Clear previous results

    for (let month = 1; month <= numberOfMonths; month++) {
        const monthlyPrincipal = loanAmount / numberOfMonths;
        const monthlyInterest = loanAmount * monthlyInterestRate;
        loanAmount -= monthlyPrincipal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${month}</td>
            <td>${monthlyPrincipal.toFixed(2)}</td>
            <td>${monthlyInterest.toFixed(2)}</td>
            <td>${(monthlyPrincipal + monthlyInterest).toFixed(2)}</td>
        `;

        emiDetailsContainer.appendChild(row);
    }
}

