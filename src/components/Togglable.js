import React,{useState} from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibilty = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hiddenWhenVisible}>
                <button onClick={toggleVisibilty}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibilty}>cancel</button>
            </div>
        </div>
    )

}

export default Togglable