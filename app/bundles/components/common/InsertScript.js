import { useEffect } from "react";

export default function InsertScript({ name, script, type, src, callable }) {
    useEffect(() => {
        const adjustedName = name || "-tt-script";

        let scriptEle = document.querySelector(`script[data-script="${adjustedName}"]`);

        if (scriptEle) {
            if (script) scriptEle.innerHTML = script;
            return;
        }

        scriptEle = document.createElement("script");
        scriptEle.dataset.script = adjustedName;

        if (type) {
            scriptEle.type = type;
        }
        if (script) {
            scriptEle.innerHTML = script;
        }
        if (src) {
            scriptEle.src = src;
        }

        if (src && typeof callable === "function") {
            scriptEle.onload = callable;
        }

        document.head.appendChild(scriptEle);
    }, [name, script, src, type, callable]);

    return null;
}