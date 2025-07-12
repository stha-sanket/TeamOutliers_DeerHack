"use client"

import { createContext, useContext, useState } from "react"
import { SessionProvider } from "next-auth/react"
import ApplicationInit from "./ApplicationInit"

const _ = createContext({
    auth: {
        user_exist: undefined,
        name: "",
        uid: "",
        fname: "",
        image: "",
        mode: "free",
        email: ""
    },

    data: {},

    setData: (__data, __path) => { },
    setAuth: (__data, __path) => { },

    createToast: ({ title = "", message = "", type = "", icon = "", duration = 0, onClick = () => { }, onClose = () => { } }) => { },
})

export default function Application({ children }) {
    const [data, setdata] = useState({})
    const [auth, setauth] = useState({})

    return <SessionProvider refetchInterval={300} refetchOnWindowFocus={false} refetchWhenOffline={false}>
        <_.Provider value={{
            data,
            auth,

            setData: (_) => setdata(_),
            setAuth: (_) => setauth(_),
        }}>
            {children}
            <ApplicationInit />
        </_.Provider>
    </SessionProvider>
}

export const useApplication = () => useContext(_)