import schema from "src/common/consts/schema"

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


export const queryForcategoryAndServices = () => {
    return [
        queryMatch([]),
        {
            '$lookup': {
                let: { serv_cate_id: "$serv_cate_id" },
                from: schema.category,
                as: schema.category,
                pipeline: [
                    queryMatch([
                        { "$eq": ["$cate_id", "$$serv_cate_id"] }
                    ])
                ]
            }
        },
        { "$unwind": { path: "$category", preserveNullAndEmptyArrays: true } },
        {
            "$group": {
                _id: "$category._id",
                is_active: { $first: "$category.is_active" },
                is_deleted: { $first: "$category.is_deleted" },
                created_by: { $first: "$category.created_by" },
                updated: { $first: "$category.updated" },
                schema_version: { $first: "$category.schema_version" },
                remarks: { $first: "$category.remarks" },
                notes: { $first: "$category.notes" },
                cate_id: { $first: "$category.cate_id" },
                cate_is_visible: { $first: "$category.cate_is_visible" },
                cate_is_coming_soon: { $first: "$category.cate_is_coming_soon" },
                cate_is_new: { $first: "$category.cate_is_new" },
                cate_is_Popular: { $first: "$category.cate_is_Popular" },
                cate_priority: { $first: "$category.cate_priority" },
                cate_label: { $first: "$category.cate_label" },
                cate_key: { $first: "$category.cate_key" },
                cate_image: { $first: "$category.cate_image" },
                cate_icon_type: { $first: "$category.cate_icon_type" },
                cate_icon_name: { $first: "$category.cate_icon_name" },
                cate_icon_color: { $first: "$category.cate_icon_color" },
                cate_description: { $first: "$category.cate_description" },
                cate_short_description: { $first: "$category.cate_short_description" },
                created_at: { $first: "$category.created_at" },
                services: {
                    $push: {
                        _id: '$_id',
                        is_active: '$is_active',
                        is_deleted: '$is_deleted',
                        created_by: '$created_by',
                        updated: '$updated',
                        schema_version: '$schema_version',
                        remarks: '$remarks',
                        notes: '$notes',
                        serv_id: '$serv_id',
                        serv_cate_id: '$serv_cate_id',
                        serv_is_visible: '$serv_is_visible',
                        serv_is_coming_soon: '$serv_is_coming_soon',
                        serv_is_new: '$serv_is_new',
                        serv_is_Popular: '$serv_is_Popular',
                        serv_priority: '$serv_priority',
                        serv_label: '$serv_label',
                        serv_key: '$serv_key',
                        serv_image: '$serv_image',
                        serv_icon_type: '$serv_icon_type',
                        serv_icon_name: '$serv_icon_name',
                        serv_icon_color: '$serv_icon_color',
                        serv_nav_key: '$serv_nav_key',
                        serv_nav_params: '$serv_nav_params',
                        serv_description: '$serv_description',
                        serv_short_description: '$serv_short_description',
                        created_at: '$created_at',
                    }
                }
            }
        }
    ]
}