export function Spinner({ color, height, width }) {
    return <svg className="animate-spin" style={{
        height: height || "90%",
    }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color || "currentColor"} strokeWidth="2" strokeDasharray="15" strokeLinecap="round" fill="none" />
    </svg>
}

export default function Loader({ color, height, width, loading, className }) {
    return <div className={`absolute bg-inherit text-inherit top-0 gap-3 right-0 h-full w-full flex items-center justify-center p-1 cursor-wait rounded-md ${className || ""}`}>
        <Spinner color={color} height={height} width={width} />

        {loading}
    </div>
};