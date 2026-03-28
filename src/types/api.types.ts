export interface ApiResponse<Tdata = unknown> {

    success: boolean;
    message: string;
    data: Tdata;
    meta?: PaginationMeta
}

export interface PaginationMeta {
    limit: number;
    page: number;
    total: number;
    totalPages: number
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
}