const ErrorMessage = ({errorMessage}) => {
    if (errorMessage === null) {
        return null
    }
    return (
        <div className='errorMessageContainer'>
            <p>{errorMessage}</p>
        </div>
    )
}

export default ErrorMessage