import {useContext} from 'react'
import axios from 'axios';
import { AuthContext } from "../context/auth.context";

function MyEvents(props) {
    const events = props.events 
    console.log(events)
    const { getToken } = useContext(AuthContext);
    const token = getToken();
    
  const deleteEvent = async (eventId) => {
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.setIsUpdated(false)
    } catch (err) {
      console.log(err);
    }
  };
  
    return (
    <div>
        <p>My Events</p>
        {events.map(item => {
            return (
                <div>
                    <h3>{item.title}</h3>
                    <button onClick={() => {deleteEvent(item._id)}}>Delete Event</button>
                </div>
            )
        })}
    </div>

  )
}

export default MyEvents