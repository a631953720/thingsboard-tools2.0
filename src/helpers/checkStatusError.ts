export default function checkStatusError({ status }: { status: number }) {
    if (status >= 400) {
        return true;
    }
    return false;
}
