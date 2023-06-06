import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, useTheme,} from "@mui/material";
import Button from "@mui/material/Button";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Download as DownloadIcon } from "@mui/icons-material";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

const PaymentList = () => {
    const [payments, setPayment] = useState([]);
    const theme = useTheme();

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    const response = await axios.get("${baseUrl}/payment");
    setPayment(response.data);
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`${baseUrl}/payment/${id}`);
      getPayments();
    } catch (error) {
      console.log(error);
    }
  };
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const columns = [
    { field: 'rentId', headerName: 'Invoice ID', flex : 0.5, },
    { field: 'tenantID', headerName: 'Tenant ID', flex: 0.5, },
    { field: 'roomNo', headerName: 'Room No', flex: 0.5, },
    { field: 'rentAmount', headerName: 'Rent Amount', flex: 0.8, valueGetter: (params) => currencyFormatter.format(params.value) },
    {
      field: 'paymentDate',
      headerName: 'Payment Date',
      flex: 0.8,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    { field: 'paymentType', headerName: 'Payment Type', flex: 0.8, },
    { field: 'period', headerName: 'Period', flex: 0.5, },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      renderCell: (params) => (
        <>
        <IconButton
    color="info"
    size="small"
  >
    <DownloadIcon />
  </IconButton>
  
          <Link
    to={`edit/${params.row._id}`}
    component={IconButton}
    color="info"
    size="small"
  >
    <EditIcon />
  </Link>
  
  <IconButton
    onClick={() => deletePayment(params.row._id)}
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
        <Header title="PAYMENTS" subtitle="List of Payments" />
        <Button component={Link} to="/payment/add" variant="contained" color="primary">
           <AddIcon sx={{ size: "1rem" }} />
            Add Payment
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
           getRowId={(payment) => payment._id}
          rows={payments}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default PaymentList
