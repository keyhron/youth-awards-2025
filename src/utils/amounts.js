
export const formatNumber = (amount) => {
    return new Intl.NumberFormat().format(amount)
}

export const getTotalProduct = (item) => {
    return formatNumber(+item.price)
}