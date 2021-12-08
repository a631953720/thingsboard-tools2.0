export function HTTP2xx({ status = 200, data }: { status?: number; data: any }) {
    return {
        status,
        data,
    };
}

export function HTTPError({ status = 500, errorMessage }: { status?: number; errorMessage: any }) {
    return {
        status,
        errorMessage,
    };
}
