import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) =>{

        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) =>{

        //TODO: lleagr al backend

        //Todo bien
        if( calendarEvent.id ){
            //Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) )
        } else {
            //Creando
            dispatch( onAddNewEvent( {...calendarEvent, _id: new Date().getTime() } ) )
        }
    }

    const startDeleteEvent = ( calendarEvent ) =>{

        dispatch( onDeleteEvent() )
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //*Métodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
    }
}