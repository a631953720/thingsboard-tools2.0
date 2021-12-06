export type HTTPStatusRes = {
    status: number
    data?: any
    errorMessage?: any
}

export function HTTP2xx({ status = 200, data }: { status?: number, data: any }) {
    return {
        status,
        data,
    };
}

export function HTTP4xx({ status = 400, errorMessage }: { status?: number, errorMessage: any }) {
    return {
        status,
        errorMessage,
    };
}

export function HTTP5xx({ status = 500, errorMessage }: { status?: number, errorMessage: any }) {
    return {
        status,
        errorMessage,
    };
}
