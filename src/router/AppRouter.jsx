import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { HomePage } from "../calendar/pages/HomePage"
import { useAuthStore } from "../hooks/useAuthStore"


export const AppRouter = () => {

    const {checkAuthToken, status} = useAuthStore();

    useEffect(()=>{
        checkAuthToken();
    }, [])

    if(status === 'checking'){
        return(
            <h3>Cargando...</h3>
        )
    }


    return (
        <Routes>
            {
                (status === 'not-authenticated') 
                ?(
                    <>
                        <Route path="/auth/*" element={ <LoginPage />} />
                        <Route path="/*" element={ <Navigate to="/auth/login" />} />
                    </>
                )
                :(
                    <>
                        <Route path="/" element={ <HomePage />} />
                        <Route path="/*" element={ <Navigate to="/" />} />
                    </>
                )
            }
            
        </Routes>
    )
}
