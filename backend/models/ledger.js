let ledger = [];
let withdrawals = [];

// ======================
// TRANSACTIONS
// ======================
function addTransaction(tx) {
    ledger.push(tx);
}

function getLedger() {
    return ledger;
}

// ======================
// WITHDRAWALS
// ======================
function addWithdrawalRequest(request) {
    withdrawals.push(request);
}

function getWithdrawals() {
    return withdrawals;
}

// OPTIONAL: find withdrawal by id (useful for admin)
function findWithdrawalById(id) {
    return withdrawals.find(w => w.id == id);
}

module.exports = {
    addTransaction,
    getLedger,
    addWithdrawalRequest,
    getWithdrawals,
    findWithdrawalById
};