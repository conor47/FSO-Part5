import React from 'react'

const Notification = ({message, classType}) => {
    if (message === '') {
        return null
    }

    return (
        <div className={classType}>
            {message}
        </div>
    )
}

export default Notification