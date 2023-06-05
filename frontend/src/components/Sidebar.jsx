import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  ReceiptLongOutlined,
  AdminPanelSettingsOutlined,
  DashboardOutlined,
  SingleBedOutlined,
  PaymentOutlined,
  EmailOutlined,
  EngineeringOutlined,
  TaskAltOutlined,
  SummarizeOutlined,
  Groups2Outlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/noprofil.png";
import logo from "assets/IconLogo.png";
//import Dashboard from "scenes/dashboard";

const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    text: "Tenants",
    icon: <Groups2Outlined />,
  },
  {
    text: "Rooms",
    icon: <SingleBedOutlined />,
  },
  {
    text: "Payment",
    icon: <PaymentOutlined />,
  },
  {
    text: "Email",
    icon: <EmailOutlined />,
  },
  {
    text: "Maintenance",
    icon: <EngineeringOutlined />,
  },
  {
    text: "Task",
    icon: <TaskAltOutlined />,
  },
  
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.contrastText,
              backgroundColor: theme.palette.secondary.main,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <FlexBetween>
            <Box m="1.5rem 1rem 1rem 2rem">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="logo"
                  width="85px"
                  src={logo}
        
                />
                <Typography variant="h3" fontWeight="bold" color="#394149">
                  EasyKos
                </Typography>
              </Box>
              

                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
            </Box>

            </FlexBetween>
  
             
            
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="50px"
                  height="50px"
                  src={profileImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color= {theme.palette.primary.main}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Kos Alfurqon
                </Typography>
                <Typography  color={theme.palette.primary[600]}>
                  Padang
                </Typography>
              </Box>
            </Box>
        

            <List 
              sx={{ 
                backgroundColor: theme.palette.neutral.main, 
                borderRadius: "5px",
                padding: "0.5rem",
                margin: "1.5rem 0.5rem 0.5rem 0.5rem",
              }}
              >
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                
                  <ListItem key={text} disablePadding >
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor: 
                          active === lcText 
                            ? theme.palette.secondary.main 
                            : "transparent",
                        color: 
                          active === lcText 
                            ? theme.palette.primary[600] 
                            : theme.palette.secondary[100],
                        borderRadius: "5px",
                        "&:hover": {
                          backgroundColor: 
                            active === lcText 
                              ? theme.palette.secondary.main 
                              : theme.palette.secondary[50],
                          color: 
                            active === lcText 
                              ? theme.palette.primary[600] 
                              : theme.palette.secondary[200],
                        },
                        
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
              
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;