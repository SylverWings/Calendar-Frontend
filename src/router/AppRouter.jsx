import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { HomePage } from "../calendar/pages/HomePage"


export const AppRouter = () => {

    const authSatatus = 'not-authenticated'
    return (
        <Routes>
            {
                (authSatatus === 'not-authenticated') 
                ?<Route path="/auth/*" element={ <LoginPage />} />
                :<Route path="/*" element={ <HomePage />} />
            }
            
            <Route path="/*" element={ <Navigate to="/auth/login" />} />
        </Routes>
    )
}
