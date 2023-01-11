import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import {clearErrorMessage, onChecking, onLogin, onLogout} from "../store/auth/authSlice"

export const useAuthStore = () => {
    
    const {status, user, errorMessage} = useSelector(state=> state.auth)
    const dispatch = useDispatch();
    
    const startLogin = async({email, password})=>{

        dispatch( onChecking() )
        try {
            
            const {data} = await calendarApi.post('/auth', {email, password});
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name: data.name, id: data.id}))

        } catch (error) {
            
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);            
        }
    };

    const startLogout = ()=>{
        dispatch(onLogout('Hasta la proxima'))
        setTimeout(() => {
            dispatch( clearErrorMessage() )
        }, 10);
    }
    
    return{
        //*Propiedades
        status, 
        user, 
        errorMessage,
        //*Métodos
        startLogin,
        startLogout,
    }
}
