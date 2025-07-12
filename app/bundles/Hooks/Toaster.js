"use client";

import { CiCircleInfo, CiWarning } from "react-icons/ci";
import { MdOutlineErrorOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

export default function ToastCreator({ toast, clearToast }) {
    let onlyFirst = 7;
    let delay = 0

    return <>
        {!!toast?.length && <drk-toaster>
            {toast?.slice(0, onlyFirst)?.map((toast, index) => {
                if (index === 0) {
                    delay = 0
                }

                let timer = setTimeout(() => {

                    clearToast(toast.id)
                    clearTimeout(timer)

                }, (1000 * ((toast?.duration || 5) + delay + .1)));

                delay += (toast?.duration || 5)

                return <>
                    <div style={{ bottom: `${index * 5}px`, right: `${index * 5}px` }} className="fixed w-[90%] max-w-[500px] h-fit m-4 transition-all duration-500 ease-in-out transform animate-fade-in hover:shadow-lg rounded-md" key={index}>
                        <div className="w-full p-3 cursor-pointer h-full box shadow rounded-md hover:bg-muted transition-colors duration-300" onClick={typeof toast.onClick === "function" ? toast.onClick : undefined}>
                            <div className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors duration-300" onClick={async (e) => {
                                e.stopPropagation();
                                if (typeof toast.onClose === "function") {
                                    await toast.onClose();
                                }
                                clearToast(index);
                            }}>
                                <RxCross1 size={20} />
                            </div>
                            <div className="__b">
                                <div className="fc gap-2">

                                    {toast.type === "error" ? <MdOutlineErrorOutline size={25} className="text-red-500" />
                                        : toast.type === "info" ? (toast?.icon || <CiCircleInfo size={20} className="col-pri" />)
                                            : <CiWarning size={25} className="text-orange-500" />}

                                    <h3 className="font-medium para">{toast.title}</h3>
                                </div>
                                {toast?.message && <p className="para mt-2">{toast.message}</p>}
                            </div>
                        </div>
                    </div>
                </>
            })}
        </drk-toaster>}
    </>

};