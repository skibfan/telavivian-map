import { ReactElement, ReactNode, useEffect, useState } from "react";
import axios from "axios";


type AuthProps = {
    children: ReactNode;
    placeholder: ReactElement | null;
}


const Auth = ({children, placeholder}: AuthProps) => {
    const [redirect, setRedirect] = useState(false)
    const path = import.meta.env.VITE_MY_PATH
    useEffect(() => {
            verify()
    },[])

    const verify = async() => {

        try {
            const response = await axios.get(`${path}/api/auth`, {
                withCredentials: true
            })
            if (response.status === 200) setRedirect(true)
        } catch (error) {
            console.log(error);
            setRedirect(false)
        }
    }

    return redirect ? children : placeholder
}

export default Auth



export const verify = async(): Promise<boolean> => {
    const path = import.meta.env.VITE_MY_PATH

    try {
        const response = await axios.get(`${path}/api/auth`, {
            withCredentials: true
        })
        if (response.status === 200) return true
    } catch (error) {
        console.log(error);
        return false
    }
    return false
}


