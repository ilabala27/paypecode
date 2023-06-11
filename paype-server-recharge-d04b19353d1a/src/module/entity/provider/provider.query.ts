import { lookup } from "src/common/mongoose/lookup.mongoose"
import schema from 'src/common/consts/schema';

export const matchORPipeline = (match: any[]) => {
    return [
        {
            '$match': {
                "$expr": {
                    "$and": [
                        { "$eq": ["$is_deleted", false] },
                        {
                            "$or": [
                                ...match
                            ]
                        }
                    ]
                }
            }
        }
    ]
}


export const matchANDPipeline = (match: any[]) => {
    return [
        {
            '$match': {
                "$expr": {
                    "$and": [
                        { "$eq": ["$is_deleted", false] },
                        {
                            "$and": [
                                ...match
                            ]
                        }
                    ]
                }
            }
        }
    ]
}


export const operatorLoopUp = () => {
    return [
        {
            "$lookup": {
                "let": { 'operator_id': '$prov_operator_id' },
                "from": schema.entity_operator,
                "as": 'operator',
                "pipeline": [
                    {
                        '$match': {
                            "$expr": {
                                "$and": [
                                    { "$eq": ["$is_deleted", false] },
                                    { "$eq": ["$oper_id", "$$operator_id"] },
                                ]
                            }
                        }
                    },
                ]
            }
        },
    ]
}


export const providerGroupAndFormat = () => {
    return [
        { "$unwind": "$operator" },
        {
            "$group": {
                "_id": "$operator._id",
                "oper_id": { "$first": "$operator.oper_id" },
                "is_active": { "$first": "$operator.is_active" },
                "is_deleted": { "$first": "$operator.is_deleted" },
                "oper_type": { "$first": "$operator.oper_type" },
                "oper_name": { "$first": "$operator.oper_name" },
                "oper_key": { "$first": "$operator.oper_key" },
                "created_by": { "$first": "$operator.created_by" },
                "created_at": { "$first": "$operator.created_at" },
                "providers": {
                    "$push": {
                        "_id": "$_id",
                        "prov_id": "$prov_id",
                        "is_active": "$is_active",
                        "is_deleted": "$is_deleted",
                        "prov_display_name": "$prov_display_name",
                        "prov_name": "$prov_name",
                        "prov_key": "$prov_key",
                        "prov_commission": "$prov_commission",
                        "prov_commission_tax": "$prov_commission_tax",
                        "prov_request_object": "$prov_request_object",
                        "created_by": "$created_by",
                        "created_at": "$created_at"
                    }
                }
            }
        },
    ]
}