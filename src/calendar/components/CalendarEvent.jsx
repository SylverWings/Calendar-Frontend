

export const CalendarEvent = ({ event }) => {

    const { title, userId } = event
    return (
        <>
            <strong>{ title }</strong>
            <span> - { userId.name }</span>
        </>
    )
}
