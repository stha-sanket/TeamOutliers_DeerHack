import React, { useEffect, useRef, useState } from 'react'
import Loader from './Loader';

export default function Button({ callable, children, reloadEvent=true, processing, loaderHeight = "75%", onError, freeze = true, className, color, Tag = "button", style, forceWait, title, whileLoading, htmlRef }) {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState(children)
    const ref = useRef(htmlRef?.current || null)

    async function handelLoaderClicked(e) {
        if (loading || window?.onButtonEvent) return
        window.onButtonEvent = (true && reloadEvent)
        let targetElement = document.querySelector(".__drk")

        try {
            setLoading(true)
            typeof processing === "function" && processing(true)
            if (freeze) {
                targetElement.style.overflow = "hidden"
            }
            targetElement.style.pointerEvents = "none"
            typeof callable === "function" && await callable((_p) => setContent(_p))

            if (forceWait) {
                await sleep(forceWait || 0)
            }

        } catch (error) {
            if (typeof onError === "function") {
                await onError(error)
            } else if (process.env.NODE_ENV === "development") {
                console.warn(error);
                throw error
            }

        } finally {
            setLoading(false)
            typeof processing === "function" && processing(false)
            targetElement.style.overflow = "scroll"
            targetElement.style.pointerEvents = "all"
            window.onButtonEvent = false
        }
    }

    useEffect(() => {
        if (loading) {
            document.body.insertAdjacentHTML("beforeend", `<div class="__drk__cli_blo fixed top-0 cursor-wait right-0 w-full h-full z-[1000]"></div>`)
        } else {
            document.querySelectorAll(".__drk__cli_blo").forEach(_ => _.remove())
        }
    }, [loading])

    useEffect(() => {
        setContent(children)
    }, [children])

    useEffect(() => {
        if (htmlRef && ref) {
            htmlRef.current = ref.current
        }

    }, [ref.current, htmlRef?.current])

    return <>
        <Tag data-type="__drk__smt_button" ref={ref} title={title} onClick={handelLoaderClicked} style={style} disabled={loading} className={`${className} relative cursor-pointer`}>
            {loading && <Loader color={color} loading={whileLoading} height={loaderHeight} />}

            {content}
        </Tag>
    </>
}
