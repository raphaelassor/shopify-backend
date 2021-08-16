function parseSort(sort=undefined) {
    if(!sort) return {}
    const sortParts = sort.split('_')
    const parsedSort = {
        [sortParts[0]]: sortParts[1] === 'asc' ? 1 : -1
    }
    return parsedSort
}
function getMongoPatchCommand(patch) {
    console.log('patch is:',patch)
    if (!patch.action) return { [patch.field]: patch.value }
    const mongoOperator = patch.action === 'remove' ?
        { $pull: { [patch.field]: { $in: patch.value } } }
        :
        { $push: { [patch.field]: { $each: patch.value } } }
    return mongoOperator
}
function getMongoMatch(criteria) {
    const match = { ...criteria }
    if (criteria.tags) match.tags = criteria.tags
    delete match.sort
    delete match.limit
    delete match.skip
    return match
// WHAT AM I DOING WITH THE TAGS HERE ?? 
}
function noramilzeCriteria(criteria){
    const {limit,skip}=criteria
    if(limit)criteria.limit=+limit
    if(skip)criteria.skip=+skip
}

module.exports = {
    parseSort,
    getMongoPatchCommand,
    getMongoMatch,
    noramilzeCriteria,

}