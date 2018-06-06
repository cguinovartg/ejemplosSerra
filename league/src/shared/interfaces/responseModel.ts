export interface ResponseModel<T> {
    data?: Array<T>;
    took?: number;
    success?: boolean;
    status?: string;
    error?: string;
    error_description?: string;
}
