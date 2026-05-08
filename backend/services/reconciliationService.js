const { getLatestBalance } = require("./balanceService");

function reconcileWallet(user) {
    const derivBalance = getLatestBalance();
    const localWallet = user.wallet;

    const difference = derivBalance - localWallet;

    return {
        localWallet,
        derivBalance,
        difference,
        status:
            difference === 0
                ? "SYNCED"
                : difference > 0
                ? "DERIV HIGHER"
                : "LOCAL HIGHER"
    };
}

module.exports = {
    reconcileWallet
};