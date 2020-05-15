import React from 'react';
import { FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const Mail = () => {

    return <>
        <Link to='/mailbox'>
            <span style={{ color: 'white', marginRight: '1.3rem', position: 'relative', top: '7px' }}>
                <FaMailBulk></FaMailBulk>
            </span>
        </Link>
    </>

}

export default Mail;

