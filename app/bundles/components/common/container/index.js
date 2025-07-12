function Wrapper({ children, className, style, id }) {
    return <div className={`__container w-[95%] mx-auto px-4${className ? (" " + className) : ""}`} style={style || {}}
        id={id}>
        {children}
    </div>
}

function W600({ children, className, style, id }) {
    return <Wrapper children={children} className={`max-w-[600px] ${className || ""}`} style={style} id={id} />
};

function W800({ children, className, style, id }) {
    return <Wrapper children={children} className={`max-w-[800px] ${className || ""}`} style={style} id={id} />
}

function W1000({ children, className, style, id }) {
    return <Wrapper children={children} className={`max-w-[1000px] ${className || ""}`} style={style} id={id} />
}

function W1200({ children, className, style, id }) {
    return <Wrapper children={children} className={`max-w-[1200px] ${className || ""}`} style={style} id={id} />
};

function W1400({ children, className, style, id }) {
    return <Wrapper children={children} className={`max-w-[1400px] ${className || ""}`} style={style} id={id} />
};

const Container = {
    W600,
    W800,
    W1000,
    W1200,
    W1400
}

export default Container;