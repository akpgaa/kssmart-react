import React from 'react'

export default function Loader(props) {
    if (props.isOpen) {
        return (
            <div id="overlay">
                {
                    props.load ?
                        <div id='text'>
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>
                        :
                        <div id='text' class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                }
            </div>
        )
    }
    else return null
}
