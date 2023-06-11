

export const queryMatch = (match: any[]) => {
    return {
        '$match': {
            "$expr": {
                "$and": [
                    { "$eq": ["$is_deleted", false] },
                    { "$eq": ["$is_active", true] },
                    ...match
                ]
            }
        }
    }
}
