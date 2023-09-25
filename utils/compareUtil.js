function sortByField(array, field, order) {
    if(!!field && field.length > 0 &&  !!order && order.length > 0) {
        const sortOrder = order === 'DESC' ? -1 : 1;
        return array.slice().sort((a, b) => a[field].localeCompare(b[field]) * sortOrder);
    }
    return array
}

module.exports.sortByField = sortByField