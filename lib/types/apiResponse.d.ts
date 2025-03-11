export type Responses<T> = ApiResponse<T> | ApiResponseNoData;


export type ApiFunc<T> = () => Promise<Responses<T>>;
export type ApiFuncWithArgs<T> = (...args: any[]) => Promise<Responses<T>>

export type ApiCallable<T> = ApiFunc<T> | ApiFuncWithArgs<T>;

export interface ApiResponseNoData {
	success: boolean;
	message?: string;
}

export interface ApiResponse<T> extends ApiResponseNoData {
	data?: T;
}

