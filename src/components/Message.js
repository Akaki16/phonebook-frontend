import React from 'react'
import PropTypes from 'prop-types';

const Message = ({ text, bgColor }) => {
    if (!text) {
        return null;
    }
    return (
        <div style={{backgroundColor: bgColor}} className='message'>
            <p>{text}</p>
        </div>
    )
}

Message.propTypes = {
    bgColor: PropTypes.string,
    text: PropTypes.string
};

export default Message;