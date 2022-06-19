import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
const DeleteButton = styled.button`
  width: 100px;
  background: red;
  font-weight: bold;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
`;
function MyEvents(props) {
  const events = props.events;
  console.log(events);
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
      props.setIsUpdated(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {events.map((item) => {
        return (
          <div>
            <DeleteButton
              onClick={() => {
                deleteEvent(item._id);
              }}
            >
              Delete
            </DeleteButton>
          </div>
        );
      })}
    </div>
  );
}

export default MyEvents;
