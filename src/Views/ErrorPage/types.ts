export interface MyErrorType {
    statusText?: string;
    message?: string;
}

export interface TErrorPageC {
    data: TDataErrorPageC
}

interface TDataErrorPageC {
    error: MyErrorType;
}