import { Types } from "mongoose"
import { lookup } from "src/common/mongoose/lookup.mongoose"


export const constructTreeLookup = lookup({
    _let: { 'parent_id': '$_id' },
    from: 'permission',
    as: 'childrens',
    expr: {
        "$and": [
            { "$eq": ["$is_deleted", false] },
            { "$eq": ["$perm_parent_id", "$$parent_id"] },
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


export const authroizationQuery = (rolesId: Types.ObjectId[]) =>
    [
        queryMatch([
            {
                "$in": [
                    "$_id",
                    { "$map": { "input": rolesId, "in": { "$toObjectId": "$$this" } } }
                ]
            }
        ]),
        {
            '$lookup': {
                let: { role_permission_groups: "$role_permission_groups" },
                from: "permission_group",
                as: "permission_groups",
                pipeline: [
                    queryMatch([
                        { "$in": ["$_id", "$$role_permission_groups"] }
                    ]),
                    {
                        '$lookup': {
                            let: { pegr_permissions: "$pegr_permissions" },
                            from: "permission",
                            as: "permissions",
                            pipeline: [
                                queryMatch([
                                    { "$in": ["$_id", "$$pegr_permissions"] }
                                ]),
                            ]
                        }
                    }
                ]
            }
        }
    ]