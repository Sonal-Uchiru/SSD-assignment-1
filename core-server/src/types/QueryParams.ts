export class QueryParams {
    limit: number
    offset: number
    sort: string

    constructor(limit: number, offset: number, sort: string) {
        this.limit = (limit != null) && (limit === 0) ? 100 : limit
        this.offset = offset != null ? offset : 0
        this.sort = (sort != null) && (sort === 'asc' || sort === 'desc') ? sort : 'asc'
    }

}