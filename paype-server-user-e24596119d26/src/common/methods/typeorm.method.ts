import { Repository } from "typeorm";

export function selectAllColumn<T>(repository: Repository<T>): (keyof T)[] {
    return (repository.metadata.columns.map(col => col.propertyName) as (keyof T)[]);
}