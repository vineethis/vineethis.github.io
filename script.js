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
    const loanDuration = parseFloat(document.getElementById("loan-duration").value);
    const durationUnit = document.getElementById("duration-unit").value;

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanDuration)) {
        alert("Please enter valid loan amount, interest rate, and loan duration.");
        return;
    }

    const numberOfMonths = durationUnit === "months" ? loanDuration : loanDuration * 12;
    const monthlyInterestRate = (interestRate / 12) / 100; // Monthly interest rate
    const emi = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

    const emiDetailsContainer = document.getElementById("emi-details");
    const totalInterestAmountElement = document.getElementById("total-interest-amount");
    const totalAmountToPayElement = document.getElementById("total-amount-to-pay");
    
    emiDetailsContainer.innerHTML = ""; // Clear previous results

    let loanBalance = loanAmount;
    let totalInterestAmount = 0;
    
    for (let month = 1; month <= numberOfMonths; month++) {
        const monthlyInterest = loanBalance * monthlyInterestRate;
        const monthlyPrincipal = emi - monthlyInterest;
        loanBalance -= monthlyPrincipal;
        totalInterestAmount += monthlyInterest;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${month}</td>
            <td>${monthlyPrincipal.toFixed(2)}</td>
            <td>${monthlyInterest.toFixed(2)}</td>
            <td>${emi.toFixed(2)}</td>
        `;

        emiDetailsContainer.appendChild(row);
    }

    totalInterestAmountElement.textContent = totalInterestAmount.toFixed(2);
    totalAmountToPayElement.textContent = (loanAmount + totalInterestAmount).toFixed(2);

    // Display the "Download EMI Table" button once EMI is calculated
    document.getElementById("download-emi-button").style.display = "block";
        // Add table headers to the displayed table
    const table = document.querySelector(".emi-table");
    const headerRow = table.createTHead().insertRow(0);
    const headers = ["Month", "Principal", "Interest", "Total Payment"];

    for (let i = 0; i < headers.length; i++) {
        const headerCell = document.createElement("th");
        headerCell.textContent = headers[i];
        headerRow.appendChild(headerCell);
    }
}

function exportToCSV(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll("tr");
    const csv = [];

    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].querySelectorAll("td, th");
        const rowData = Array.from(cols).map(col => col.textContent);
        csv.push(rowData.join(","));
    }

    const csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emi_data.csv");
    document.body.appendChild(link);
    link.click();
}
