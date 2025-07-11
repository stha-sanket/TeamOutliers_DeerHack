"use client"

import { createContext, useState } from "react"
import ToastCreator from "../Hooks/Toaster"
import { SessionProvider } from "next-auth/react"

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
    const [toast, setToast] = useState([])

    return <SessionProvider refetchInterval={300} refetchOnWindowFocus={false} refetchWhenOffline={false}>
        <_.Provider value={{
            data,
            auth,

            setData: (_) => setdata(_),
            setAuth: (_) => setauth(_),

            createToast: ({ title = "", message = "", type = "", icon = "", duration = 0, onClick = () => { }, onClose = () => { } }) =>
                setToast(prev => [{
                    id: new Date().getTime(),
                    title,
                    message,
                    type,
                    icon,
                    duration,
                    onClick,
                    onClose,
                }, ...prev]),
        }}>
            {children}

        </_.Provider>

        <ToastCreator toast={toast} clearToast={(_) => {
            setToast((prev) => {
                prev = [...prev]

                for (let _toast in prev) {
                    let ind = _toast
                    _toast = prev[ind]

                    if (_ == _toast.id) {
                        prev.splice(ind, 1)
                        break
                    }
                }

                return prev
            })
        }} />
    </SessionProvider>
}

export const useApplication = () => useContext(_)