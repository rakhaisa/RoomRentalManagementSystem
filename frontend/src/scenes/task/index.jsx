import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
// Import the AddEventModal component from the correct path
import AddEventModal from "./addEventModal";
import "./design.css";
import axios from "axios";
import moment from "moment";

export default function Calendar() {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);


  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    try {
      await axios.post("http://https://easykos-backend.onrender.com/general/task", data.event);
      // Successful request, perform any necessary actions
    } catch (error) {
      console.log(error);
      // Handle the error (e.g., show an error message to the user)
    }
  }

  async function handleDateSet(data) {
    const response = await axios.get("http://https://easykos-backend.onrender.com/general/task", +moment(data.start).toISOString()+"&end="+moment(data.end).toISOString())
    setEvents(response.data); 
  }

  const handleDateClick = (selected) => {
    setModalOpen(true);
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
  
  };

  const handleEventDelete = async (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event with '${id}'?`
      )
    ) {
      // Perform event deletion logic here
      try {
        // Make the DELETE request to the backend server
        await axios.delete(`http://localhost:6001/general/task/${id}`);
        
        // Call the function to update the events or perform any necessary actions
        handleDateSet();
      } catch (error) {
        console.log(error);
      }
    }
  };


  
  

  const formatDate = (dateString, options) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };


  return (

    <Box m="1.5rem 2.5rem">
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Header title="Calendar" subtitle="List of Tasks" />
      <Button
          onClick={() => setModalOpen(true)} // Fix: Call setModalOpen with the value `true`
          variant="contained"
          color="primary"
        >
          <AddIcon sx={{ size: "1rem" }} />
          Add Task
        </Button>
        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={onEventAdded}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" m="20px">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor= {theme.palette.secondary.main}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Tasks</Typography>
         <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: "#fffdf261",
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
                </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px" backgroundColor= {theme.palette.neutral.main}
        p="15px"
        borderRadius="4px">
          <FullCalendar
            ref={calendarRef}
            events={events}
            height="70vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialView="dayGridMonth"
            eventAdd={event => handleEventAdd(event)}
            datesSet={(date) => handleDateSet(date)}
            select={handleDateClick}
            eventClick={handleEventDelete}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2023-05-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2023-05-28",
              },
            ]}
            
          />
        </Box>
      </Box>
    </Box>
    
  );
};
