function parseSort(sort = undefined) {
    if (!sort) return {}
    const sortParts = sort.split('_')
    const parsedSort = {
        [sortParts[0]]: sortParts[1] === 'asc' ? 1 : -1
    }
    return parsedSort
}

function parsePatchCommand(patch) {
    console.log('patch is:', patch)
    if (!patch.action) return { [patch.field]: patch.value }
    const mongoOperator = patch.action === 'remove' ?
        { $pull: { [patch.field]: { $in: patch.value } } }
        :
        { $push: { [patch.field]: { $each: patch.value } } }
    return mongoOperator
}

function parseMatch(criteria) {
    const match = { ...criteria }
    delete match.sort
    delete match.limit
    delete match.skip
    return match
    // WHAT AM I DOING WITH THE TAGS HERE ?? 
}

function noramilzeCriteria(criteria) {
    const { limit, skip } = criteria
    if (limit) criteria.limit = +limit
    if (skip) criteria.skip = +skip
}

function buildCriteriaForQuery(criteria) {
    const sortLimit = appSettings.PRODUCT_FILTER_LIMIT
    const skipDefault = 0
    noramilzeCriteria(criteria)
    const queryCriteria = {
        match: parseMatch(criteria),
        sort: parseSort(criteria.sort),
        limit: criteria.limit || sortLimit,
        skip: criteria.skip || skipDefault
    }
    return queryCriteria
}

module.exports = {
    parseSort,
    parsePatchCommand,
    parseMatch,
    noramilzeCriteria,
    buildCriteriaForQuery

}