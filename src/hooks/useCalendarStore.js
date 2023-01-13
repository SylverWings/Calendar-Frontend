import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import {convertEventsToDateEvents} from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";


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
            dispatch( onAddNewEvent( {...calendarEvent, id: data.event.id, userId: user} ) )
        }
    }


    const startDeleteEvent = ( calendarEvent ) =>{

        dispatch( onDeleteEvent() )
    }


    const startLoadingEvents = async() =>{

        try {
            const {data} = await calendarApi.get('/event');
            const events = convertEventsToDateEvents(data.data);
            dispatch(onLoadEvents(events))

        } catch (error) {
            console.log({
                success: false,
                message: error
            })
        }
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
        startLoadingEvents,
    }
}
