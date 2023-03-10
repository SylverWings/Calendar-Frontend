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
        localStorage.clear();
        dispatch(onLogout(null))
    }

    const startRegister = async({name, email, password}) =>{

        dispatch(onChecking());
        try {
            
            const {data} = await calendarApi.post('/auth/register', {name, email, password});
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name: data.name, id: data.id}))

        } catch (error) {
            dispatch(onLogout(error.response.data?.message || 'Error al crear Usuario'))
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);   
        }
    }

    const checkAuthToken = async()=>{
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout('El token ha expirado'));

        try {
            const {data} = await calendarApi.get('/auth/new');
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(onLogin({name: data.name, id: data.id}))
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout('Error al intentar renovar Token'))
        }
    }
    
    return{
        //*Propiedades
        status, 
        user, 
        errorMessage,
        //*M??todos
        startLogin,
        startLogout,
        startRegister,
        checkAuthToken,
    }
}
