export function formatNumber(number: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 2
    });

    return formatter.format(number);
}

