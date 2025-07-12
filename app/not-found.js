export default function NotFound({ }) {
    return <>
        <div class="flex justify-center items-center max-w-[1200px] w-[90%] relative mx-auto min-h-[80vh] flex-wrap">
            <img loading="lazy" src="/icon.ico" class="opacity-10 rotate-180" alt="" />
            <div class="flex gap-2 flex-col max-w-[800px] absolute">
                <h1 class="sec-head font-bold text-center">Looks like you've found the doorway to <span class="col-pri underline">The Great Nothing</span>.</h1>
                <p class="para text-center">The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link.</p>
                <div class="flex mx-auto mt-2 gap-2">
                    <a class="button-sec" href="/">Go Back</a>
                    <a class="button-pri" href="/">Home</a>
                </div>
            </div>
        </div>
    </>
};