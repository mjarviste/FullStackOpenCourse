const ApprovedMessage = ({approvedMessage}) => {
    if (approvedMessage === null) {
        return null
    }
    return (
        <div className='approvedMessageContainer'>
            <p>{approvedMessage}</p>
        </div>
    )
}

export default ApprovedMessage