let purchases = [];

function calculateAverage() {
    const date = document.getElementById("date").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!date || isNaN(price) || isNaN(quantity)) {
        alert("Please enter valid values for date, price, and quantity.");
        return;
    }

    const totalValue = price * quantity;
    purchases.push({ date, price, quantity });

    const totalShares = purchases.reduce((total, purchase) => total + purchase.quantity, 0);
    const totalValueSum = purchases.reduce((total, purchase) => total + (purchase.price * purchase.quantity), 0);

    const averagePrice = totalValueSum / totalShares;
    document.getElementById("average-price").textContent = `$${averagePrice.toFixed(2)}`;
}
