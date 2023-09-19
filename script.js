let purchases = [];

function addPurchase() {
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (isNaN(price) || isNaN(quantity)) {
        alert("Please enter valid values for price and quantity.");
        return;
    }

    purchases.push({ price, quantity });

    document.getElementById("price").value = ""; // Clear input fields
    document.getElementById("quantity").value = "";
}

function calculateAverage() {
    if (purchases.length === 0) {
        alert("Please add at least one purchase.");
        return;
    }

    const totalShares = purchases.reduce((total, purchase) => total + purchase.quantity, 0);
    const totalValueSum = purchases.reduce((total, purchase) => total + (purchase.price * purchase.quantity), 0);

    const averagePrice = totalValueSum / totalShares;
    document.getElementById("average-price").textContent = `$${averagePrice.toFixed(2)}`;
}
