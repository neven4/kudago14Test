import { GET_EVENTS } from './actionTypes';

const receiveEvents = payload => ({
  type: GET_EVENTS,
  payload
});

const fetchEvents = url => {
  return dispatch => {
    fetch(url)
        .then(res => res.json())
        .then(data => dispatch(receiveEvents(data.results)))
        .then(data => console.log(data))
        .catch(error => console.log(error));
  };
};

export default fetchEvents;
