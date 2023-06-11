import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId

export const INIT_PERMISSION: any = {
    "is_active": true,
    "is_deleted": false,
    "created_by": "system",
    "updated": [],
    "perm_parent_id": new ObjectId(),
    "perm_name": "root",
    "perm_description": "Root for entire permissions",
}

export const INIT_PERMISSION_GROUP: any = {
    "is_active": true,
    "is_deleted": false,
    "created_by": "system",
    "updated": [],
    "pegr_parent_id": new ObjectId(),
    "pegr_name": "root",
    "pegr_description": "Root for entire permission groups",
    "pegr_isFolder": false,
    "pegr_effect": 'Allow',
    "pegr_permissions": []
}

export const INIT_ROLE: any = {
    "is_active": true,
    "is_deleted": false,
    "created_by": "system",
    "updated": [],
    "role_parent_id": new ObjectId(),
    "role_name": "root",
    "role_description": "Root for entire roles",
    "role_permission_groups": []
}
