import React, {Component} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import Datetime from "react-datetime";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./design.css"
import Header from "../../components/Header";

export default function EventModal({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [category, setCategory] = React.useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const onSubmit = (e) => {
    e.preventDefault();
    onEventAdded({ title, start, end, category });
    onClose();
  };


  return (

    <Modal isOpen={isOpen} toggle={onClose} className="custom-modal">
        <Header title="Task" subtitle="Add a New Tasks" />
      <form onSubmit={onSubmit}>
        <Box
          margin="10px"
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            label="Task Name"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Name"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            type="date"
            label="Start Date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start Date"
            sx={{ gridColumn: "span 2" }}
          />
           <TextField
            type="date"
            label="End Date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End Date"
            sx={{ gridColumn: "span 2" }}
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ gridColumn: "span 8" }}
              
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </Modal>
  );
}