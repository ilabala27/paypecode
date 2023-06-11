export const lookup = ({ _let, from, as, expr, project, limit, current }: any) => {
    const canExec = current <= limit
    if (!canExec) return []

    const projectQuery: any = project ? [{ "$project": project }] : []
    return [
        {
            "$lookup": {
                let: _let, from, as,
                "pipeline": [
                    { '$match': { "$expr": expr } },
                    ...lookup({ _let, from, as, expr, project, limit, current: current + 1 })
                ]
            }
        },
        ...projectQuery
    ]
}