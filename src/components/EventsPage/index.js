import React, { Component } from 'react';
import { connect } from 'react-redux';

import './EventsPage.css';

import EventItem from '../EventItem';

class EventsPage extends Component {

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getSchedulesDays = days => {
        const weekDays = days.days_of_week;
        const startTime = days.start_time;
        const hours = +startTime.substr(0, 2);
        const minutes = +startTime.substr(3, 2);
        const date = new Date();
        const m = new Date();

        for (let i = 0; i < weekDays.length; i++) {
            m.setDate(date.getDate() + weekDays[i] + 8 - date.getDay());
            m.setHours(hours, minutes, 0, 0);

            if (m > date ) {
                return m.getTime() / 1000;
            }
        }
    }

    getEveryDayEvent = event => {
        const date = new Date();

        if (event.start_time) {
            const startTime = event.start_time;
            const hours = +startTime.substr(0, 2);
            const minutes = +startTime.substr(3, 2);
            

            if (date.getHours() > hours) {
                
                date.setDate(date.getDate() + 1)
            }
            
            date.setHours(hours, minutes, 0, 0);
            
            return date.getTime() / 1000;
        } else {
            date.setHours(0, 0, 0, 0)
            return date.getTime() / 1000;
        }
    }

    getCurrenDate = arr => {
        const nowTime = Math.round(( new Date() ).getTime() / 1000 );
        // console.log(nowTime)

        if ( arr.dates.length > 1 ) {

            for ( let i = 0; i < arr.dates.length; i++ ) {

                if ( arr.dates[i].schedules.length > 0 ) {

                    return this.getSchedulesDays( arr.dates[i].schedules[0] );

                } else if ( arr.dates[i].start > nowTime ) {
                    console.log(arr.title + ' ' + arr.dates[i].start + ':' + nowTime);
                    if ( arr.dates[i].start ) {
                        return arr.dates[i].start
                    }
                } else {

                    return this.getEveryDayEvent(arr.dates[i])

                }
            }

        } else if ( arr.dates[0].schedules.length > 0 ) {

            return this.getSchedulesDays(arr.dates[0].schedules[0]);

        } else if (arr.dates[0].start > nowTime) {

            return arr.dates[0].start;

        } else {

            return this.getEveryDayEvent(arr.dates[0]);

        }
    }

    render() {
        const sortedList = this.props.events.sort(( a, b ) => this.getCurrenDate(a) - this.getCurrenDate(b));

        return (
            <div className='eventsPage'>
                <ul className='eventsList'>
                    {
                        sortedList.map((event, i) => (
                            <EventItem
                                date={ this.getCurrenDate(event) }
                                img={ event.images[0].image }
                                title={ this.capitalizeFirstLetter(event.title) }
                                place={ event.place === null ? '' : this.capitalizeFirstLetter(event.place.title) }
                                street={ event.place === null ? '' : event.place.address }
                                city={ this.capitalizeFirstLetter(event.location.name) }
                                key={ i }
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
    events: state.fetchEvents,
}))(EventsPage);
