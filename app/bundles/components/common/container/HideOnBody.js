"use client"

import React, { useEffect, useRef } from 'react';

function HideOnBody({ className, close, style, children, executable }) {
    const closer = useRef(null);

    function handelBodyClicked(event = false) {
        if (!closer.current?.contains(event.target) && (typeof executable === "function" ? executable(event) : true)) {
            event?.preventDefault()
            typeof close === "function" && close()
        }
    }

    function handelESCClicked(event) {
        if (event.key === "Escape" && (typeof executable === "function" ? executable(event) : true)) {
            event?.preventDefault()
            typeof close === "function" && close()
        }
    }

    useEffect(() => {
        let targetElement = document.querySelector(".__drk")

        document.addEventListener("click", handelBodyClicked)
        window.addEventListener("keydown", handelESCClicked)
        targetElement.style.overflow = "hidden";

        return () => {
            document.removeEventListener("click", handelBodyClicked)
            window.removeEventListener("keydown", handelESCClicked)
            targetElement.style.overflow = "scroll";
        }
    }, [children])

    return <div ref={closer} className={`__drk_hob z-10 ${className || ""}`} style={style}>
        {children}
    </div>
}

export default HideOnBody;