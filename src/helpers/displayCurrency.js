const displayINRCurrency = (startPrice, endPrice = null) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const formatNumber = (number) => {
        if (number >= 1e7) {
            return `${formatter.format(number / 1e7)} Cr`;
        } else if (number >= 1e5) {
            return `${formatter.format(number / 1e5)} Lakh`;
        } else {
            return `${formatter.format(number)}`;
        }
    };

    const formatPriceRange = (start, end) => {
        const startFormatted = formatNumber(start);
        const endFormatted = formatNumber(end);

        // Check if both start and end have the same unit (e.g., both are in Lakh or both are in Cr)
        if (startFormatted.includes('Cr') && endFormatted.includes('Cr')) {
            return `Rs. ${startFormatted.replace(' Cr', '')} - ${endFormatted}`;
        } else if (startFormatted.includes('Lakh') && endFormatted.includes('Lakh')) {
            return `Rs. ${startFormatted.replace(' Lakh', '')} - ${endFormatted}`;
        } else {
            return `Rs. ${startFormatted} - ${endFormatted}`;
        }
    };

    if (endPrice) {
        return `${formatPriceRange(startPrice, endPrice)}*`;
    } else {
        return `Rs. ${formatNumber(startPrice)}*`;
    }
};

export default displayINRCurrency;
