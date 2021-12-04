export default function checkAxiosError({ status }: { status: number }) {
    if (status >= 400) {
        return true;
    }
    return false;
}
