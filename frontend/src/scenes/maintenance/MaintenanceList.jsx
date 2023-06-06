import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, useTheme,} from "@mui/material";
import Button from "@mui/material/Button";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery"

const MaintenanceList = () => {
    const [maintenances, setMaintenance] = useState([]);
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    getMaintenances();
  }, []);

  const getMaintenances = async () => {
    const response = await axios.get("http://https://easykos-backend.onrender.com/maintenances");
    setMaintenance(response.data);
  };

  const deleteMaintenance = async (id) => {
    try {
      await axios.delete(`hhttp://https://easykos-backend.onrender.com/maintenances/${id}`);
      getMaintenances();
    } catch (error) {
      console.log(error);
    }
  };

  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const columns = [
    { field: 'maintenanceID', headerName: 'Maintenance ID', flex: 0.5, },
    { field: 'description', headerName: 'Description', flex : 0.8, },
    { field: 'maintAmount', headerName: 'Maintenance Amount', flex: 0.8,  valueGetter: (params) => currencyFormatter.format(params.value)  },
    { field: 'maintDate', headerName: 'Maintenance Date', flex: 0.8,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }, },
    { field: 'details', headerName: 'Details', flex : 1, },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: (params) => (
        <>
          <Link
    to={`edit/${params.row._id}`}
    component={IconButton}
    color="info"
    size="small"
  >
    <EditIcon />
  </Link>
  <IconButton
    onClick={() => deleteMaintenance(params.row._id)}
    color="error"
    size="small"
  >
    <DeleteIcon />
  </IconButton>
        </>
      ),
    },
  ];


  return (
    <Box m="1.5rem 2.5rem">
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="MAINTENANCES" subtitle="List of Maintenances" />
        <Button component={Link} to="/maintenance/add" variant="contained" color="primary">
           <AddIcon sx={{ size: "1rem" }} />
            Add Maintenance
        </Button>
     </Box>
    
     <Box
        mt="38px"
        height="70vh"
        
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.white.gading,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.white.linen,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          
        }}
      >
        <DataGrid
           getRowId={(maintenances) => maintenances._id}
          rows={maintenances}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default MaintenanceList;
