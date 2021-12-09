type HTTPErrorType = { status?: number; errorMessage: any };

export default function HTTPError({ status = 500, errorMessage }: HTTPErrorType) {
    return {
        status,
        errorMessage,
    };
}
