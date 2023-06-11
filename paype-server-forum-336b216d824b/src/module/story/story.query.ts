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
        },
        { $sort : { created_at : -1 } }
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
        },
        { $sort : { created_at : -1 } }
    ]
}
