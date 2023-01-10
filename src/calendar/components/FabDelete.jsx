import { useCalendarStore } from "../../hooks/useCalendarStore"
import { useUiStore } from "../../hooks/useUiStore";



export const FabDelete = () => {

   
    const { startDeleteEvent, hasEventSelected } = useCalendarStore();
    
    const onHanldeDelete = () =>{

        startDeleteEvent()
    }

    return (
        <button 
            className="btn btn-danger fab-danger"
            onClick={ onHanldeDelete }
            style={{
                display: hasEventSelected  ?'' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
