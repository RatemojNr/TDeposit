function calculateCommission(amount) {
    const commissionRate = 0.0426; // example rate (adjustable)

    const commission = parseFloat((amount * commissionRate).toFixed(2));
    const netAmount = parseFloat((amount - commission).toFixed(2));

    return {
        original: amount,
        commission,
        netAmount
    };
}

module.exports = {
    calculateCommission
};