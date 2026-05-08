let wallet = {
    balance: 0,
    history: []
};

function deposit(amount, note = "Deposit") {
    wallet.balance += amount;

    wallet.history.push({
        type: "credit",
        amount,
        note,
        date: new Date()
    });
}

function withdraw(amount, note = "Withdraw") {
    if (wallet.balance < amount) {
        return "Insufficient funds";
    }

    wallet.balance -= amount;

    wallet.history.push({
        type: "debit",
        amount,
        note,
        date: new Date()
    });
}

function getBalance() {
    return wallet.balance;
}

module.exports = {
    deposit,
    withdraw,
    getBalance,
    wallet
};