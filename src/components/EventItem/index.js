import React from 'react';

import './EventItem.css';

const EventItem = props => {
    const {
        date,
        img,
        title,
        place,
        street,
        city
    } = props;

    const dateSec = new Date( date * 1000 );
    const dateNumber = dateSec.getDate();
    const month = dateSec.toLocaleDateString('ru-ru', { month: 'short' }).replace(/\./g,' ').toUpperCase();
    const hours = ('0'+ dateSec.getHours()).substr(-2);
    const minutes = ('0'+ dateSec.getMinutes()).substr(-2);

    return (
        <li className='eventItem'>
            <div className='date_of_event'>
                <div className='date'>
                    { dateNumber } { month }
                </div>
                
                

                <div className='time'>
                    {
                        hours === '00' && minutes === '00' ? 'Весь день' : `${ hours }:${ minutes }`
                    }
                </div>
            </div>

            <div className='pic'
                style={{ backgroundImage: `url(${img})`}} />

            <div className='title'>
                { title }
            </div>

            <div className='place'>
                { place }
            </div>

            <div className='address'>
                <span className='street'>
                    { street }
                </span>

                <span className='city'>
                    { city }
                </span>
            </div>
        </li>
    )
}

export default EventItem;
