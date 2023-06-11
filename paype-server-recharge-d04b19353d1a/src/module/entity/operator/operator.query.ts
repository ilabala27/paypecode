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
