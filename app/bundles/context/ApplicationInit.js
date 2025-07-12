import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useApplication } from "./Application"


export default function ApplicationInit() {
    const session = useSession()

    const { setAuth } = useApplication()

    function handelIsEventOn(event) {
        if (window.onButtonEvent){
            event.preventDefault()
            event.returnValue = "";
            return
        }
    }

    useEffect(() => {
        let data = session?.data?.user

        setAuth({
            user_exist: ((session.status === "loading") ? undefined : (session.status === "authenticated")),

            name: data?.name,
            email: data?.email,
            uid: data?.uid,
            fname: data?.name?.split(" ")?.[0],
            image: data?.image,
            mode: "free"
        })

        window.addEventListener("beforeunload", handelIsEventOn)

        return () => {
            window.removeEventListener("beforeunload", handelIsEventOn)
        }
    }, [session.status])

    return null
}