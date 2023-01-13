import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) =>{

        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) =>{



        if( calendarEvent.id ){
            //Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) )
        } else {
            //Creando
            const { data } = await calendarApi.post('/event', calendarEvent)
            console.log({data})
            dispatch( onAddNewEvent( {...calendarEvent, id: data.event.id, user} ) )
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
