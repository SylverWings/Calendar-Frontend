import { addHours } from "date-fns";
import { useDispatch } from "react-redux"
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";


export const FabAddNew = () => {

    const dispatch = useDispatch();

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore()

    const onHanldeClickNew = () =>{

        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Lionel'
            }
        })
        openDateModal()
    }

    return (
        <button 
            className="btn btn-primary fab"
            onClick={ onHanldeClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
