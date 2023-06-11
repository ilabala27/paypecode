import schema from "src/common/consts/schema"

export const matchORPipeline = (match: any[], query) => {
    const { user_chain_ids } = query
    return [
        {
            '$match': {
                "$and": [
                    {
                        "$expr": {
                            "$and": [
                                { "$eq": ["$is_deleted", false] },
                                {
                                    "$or": [
                                        { "$eq": ["$is_deleted", false] },
                                        ...match
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        'comm_user_chain_ids': {
                            '$regex': `${user_chain_ids}`
                        },
                    },
                ]
            }
        }
    ]
}


export const matchANDPipeline = (match: any[], query) => {
    const { user_chain_ids } = query
    return [
        {
            '$match': {
                "$and": [
                    {
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
                    },
                    {
                        'comm_user_chain_ids': {
                            '$regex': user_chain_ids
                        },
                    },
                ]
            }
        }
    ]
}

export const operatorLoopUp = () => {
    return [
        {
            "$lookup": {
                "let": { 'operator_id': '$comm_operator_id' },
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

export const providerLoopUp = () => {
    return [
        {
            "$lookup": {
                "let": { 'provider_id': '$comm_provider_id' },
                "from": schema.entity_provider,
                "as": 'provider',
                "pipeline": [
                    {
                        '$match': {
                            "$expr": {
                                "$and": [
                                    { "$eq": ["$is_deleted", false] },
                                    { "$eq": ["$prov_id", "$$provider_id"] },
                                ]
                            }
                        }
                    },
                ]
            }
        },
    ]
}