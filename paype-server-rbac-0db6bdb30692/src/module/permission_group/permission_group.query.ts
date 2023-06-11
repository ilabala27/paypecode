import { lookup } from "src/common/mongoose/lookup.mongoose"


export const constructTreeLookup = lookup({
    _let: { 'parent_id': '$_id' },
    from: 'permission_group',
    as: 'childrens',
    expr: {
        "$and": [
            { "$eq": ["$is_deleted", false] },
            { "$eq": ["$pegr_parent_id", "$$parent_id"] },
        ]
    },
    limit: 20,
    current: 1
})

export const queryMatch = (match: any[]) => {
    return {
        '$match': {
            "$expr": {
                "$and": [
                    { "$eq": ["$is_deleted", false] },
                    ...match
                ]
            }
        }
    }
}
