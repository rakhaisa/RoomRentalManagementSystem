import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="0.5rem 0.5rem 0.5rem 0.5rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.secondary.main}
      borderRadius="0.55rem"
      m="0.5rem 0.5rem 0.5rem "
      width="100%"
    >
      <Box
      padding= "1rem"
      margin= "0.5rem 0.5rem 0.5rem 0.5rem"
      borderRadius="0.55rem"
      backgroundColor={theme.palette.neutral.main}
      >
      <FlexBetween>
        <Typography variant="h3" fontWeight="500" sx={{ color: theme.palette.secondary[200] }}>
          {title}
        </Typography>
       
      </FlexBetween>
      <FlexBetween gap="1rem">
        <Typography fontSize="13px">{description}</Typography>
      </FlexBetween>
      <FlexBetween>
      <Typography
        justifyContent="center"
        variant="h1"
        fontWeight="bold"
        sx={{ color: theme.palette.primary.main }}
      >
        {value}
      </Typography>
        {icon}
      </FlexBetween>
   
      </Box>
    </Box>
  );
};

export default StatBox;