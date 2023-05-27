export type GenericResponse<T> = {
    status: number;
    message: string;
    data: T;
    error: string | null;
};