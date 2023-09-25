function sortByField(array, field, order) {
    const sortOrder = order === 'DESC' ? -1 : 1;
    return array.slice().sort((a, b) => a[field].localeCompare(b[field]) * sortOrder);
}

module.exports.sortByField = sortByField