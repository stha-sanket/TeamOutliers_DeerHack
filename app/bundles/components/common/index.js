export async function sleep(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 500));
}