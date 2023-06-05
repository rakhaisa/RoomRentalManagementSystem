import { useState, useRef, } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  Groups2,
  BedRounded,
  Payment,
  AddCircleOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import { useGetDashboardQuery } from "state/api";
import AddEventModal from "../task/addEventModal";
import axios from "axios";
import moment from "moment";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const {data} = useGetDashboardQuery();

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
      await axios.post("http://localhost:6001/general/task", data.event);
      // Successful request, perform any necessary actions
    } catch (error) {
      console.log(error);
      // Handle the error (e.g., show an error message to the user)
    }
  }

  async function handleDateSet(data) {
    const response = await axios.get("http://localhost:6001/general/task", +moment(data.start).toISOString()+"&end="+moment(data.end).toISOString())
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
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });


  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
           variant="contained" 
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding: "10px 20px",

            }}
          >
            <DownloadOutlined sx={{ size: "1rem", mr: "10px"  }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="35px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <Box
         gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx = {{ borderRadius: "0.55rem", }}
        >
        <StatBox
          title="Tenant"
          value={data && data.totalTenant ? data.totalTenant : "0"}
          description="Total Tenant"
          icon={
            <Groups2
              sx={{ color: theme.palette.secondary[300], fontSize: "50px" }}
            />
          }
        />
        </Box>
        <Box
          gridColumn="span 3"
          sx = {{ borderRadius: "0.55rem",}}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <StatBox
          title="Room"
          value={data && data.totalVacantRoom ? data.totalVacantRoom : "0"}
          description="Total Room Available"
          icon={
            <BedRounded
              sx={{ color: theme.palette.secondary[300], fontSize: "50px" }}
            />
          }
        />
        </Box>
        <Box
          gridColumn="span 3"
          sx = {{ borderRadius: "0.55rem",}}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
       
        <StatBox
          title="Email"
          value={data && data.totalEmail ? data.totalEmail : "0"}
          description="Total Email Send"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "50px" }}
            />
          }
        />
        </Box>
        <Box
          gridColumn="span 3"
          sx = {{ borderRadius: "0.55rem",}}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <StatBox
          title="Invoice"
          value={data && data.totalInvoice ? data.totalInvoice : "0"}
          description="Total Invoice"
          icon={
            <Payment
              sx={{ color: theme.palette.secondary[300], fontSize: "50px" }}
            />
          }
        />
        </Box>
         {/* ROW 2 */}
         <Box
          gridColumn="span 8"
          gridRow="span 3"
          mt="20px"
          mb="100px"
          borderRadius="0.55rem"
          backgroundColor={theme.palette.secondary.main}
        >
          <Box mt="20px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
  <Box>
    <Typography variant="h4" fontWeight="800" sx={{ color: theme.palette.secondary[200] }}>
      Revenue Overview
    </Typography>
    <Typography variant="h5" fontWeight="600" sx={{ color: theme.palette.secondary[200] }}>
      2023
    </Typography>
  </Box>
  <Box>
    {data && (
      <div>
        {data.yearlyPaymentTotal.map((item) => (
          <div key={item._id.year}>
            <Typography variant="body1" fontWeight="500">
              Total Revenue: Rp. {item.yearlyPaymentTotal.toLocaleString()}
            </Typography>
          </div>
        ))}
        {data.yearlyMaintenanceTotal.map((item) => (
          <div key={item._id.year}>
            <Typography variant="body1" fontWeight="500">
              Total Expense: Rp. {item.yearlyMaintenanceTotal.toLocaleString()}
            </Typography>
          </div>
        ))}
      </div>
    )}
  </Box>
</Box>

          <Box height="250px" 
          borderRadius="0.55rem"
          padding= "1rem"
          margin= "0.5rem 1rem 0.5rem 1rem"
          backgroundColor={theme.palette.neutral.main}
          alignItems="end"
          >
            <OverviewChart isDashboard={true}/>
          </Box>
        
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          mt="20px"
          mb="100px"
          padding="20px"
          borderRadius="0.55rem"
          backgroundColor={theme.palette.secondary.main}
        >
          <Box mb="10px"> 
          <FlexBetween>
          <Typography
                variant="h4" fontWeight="700" sx={{ color: theme.palette.secondary[200] }}
              >
                Task
              </Typography>
              <Button
           variant="contained" 
           onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding: "5px",

            }}
          >
            <AddCircleOutline sx={{ size: "1rem", mr: "1px"  }} />
            Add
          </Button>
          <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={onEventAdded}
        />

              </FlexBetween>
          </Box>
          
          <FullCalendar
  height="33vh"
  ref={calendarRef}
    events={events}
  plugins={[listPlugin]}
  headerToolbar={null}
  initialView="listMonth"
  editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
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

export default Dashboard;