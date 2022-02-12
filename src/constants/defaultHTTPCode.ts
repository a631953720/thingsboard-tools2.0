type HTTPErrorType = { status?: number; errorMessage: any };

export default function HTTPError({ status = 500, errorMessage }: HTTPErrorType) {
    return {
        status,
        errorMessage,
    };
}

export function newHTTPError(status = 500) {
    return (errorMessage: any) => ({
        status,
        errorMessage,
    });
}
