import React, { useState, CSSProperties } from 'react'
import { PropagateLoader, PulseLoader } from 'react-spinners'

import './Button.css'
interface btn {
    className: string;
    text: string;
    type?: string;
    loading?: boolean;
}
const Button = (props: btn) => {
    let [loading, setLoading] = useState(true);

    return <button className={'button first--btn ' + props.className} type='submit'>
        {props.loading ? 
        <PulseLoader color="#fff" margin={5} size={10} /> : props.text
        }
        </button>
}

export default Button;