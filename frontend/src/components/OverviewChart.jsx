import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetDashboardQuery } from "state/api";
import { mockLineData as mockdata } from "../data/mockData";


const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data: dashboardData, isLoading } = useGetDashboardQuery();

  const chartData = useMemo(() => {
    if (!dashboardData || !dashboardData.monthlyPaymentArray || !dashboardData.monthlyMaintArray) {
      return [];
    }
  
    const { monthlyPaymentArray, monthlyMaintArray } = dashboardData;
    
    const RevenueData = Array.isArray(monthlyPaymentArray)
    ? [
        {
          id: "Revenue",
          color: "#89dacc",
          data: monthlyPaymentArray.map((entry) => ({
            x: entry.month,
            y: entry.totalPayment,
            
          })),
        },
      ]
    : [];

  const ExpenseData = Array.isArray(monthlyMaintArray)
    ? [
        {
          id: "Expenses",
          color: "#f79888",
          data: monthlyMaintArray.map((entry) => ({
            x: entry.month,
            y: entry.totalMaintenance,
            
        })),
      },
      ]
    : [];

  
    return [...RevenueData, ...ExpenseData];
  }, [dashboardData]);

  //if (!dashboardData || isLoading) return "Loading...";

  return (
    <ResponsiveLine
    data={chartData}
      //data={mockdata}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#394149",
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[300],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[300],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[300],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[300],
          },
        },
        tooltip: {
          container: {
            color: "#141b2d",
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 20, right: 110, bottom: 50, left: 80 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat={(value) => `Rp. ${(value / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}k`}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "Month", // added
        legendOffset: 36,
        legendPosition: "middle",
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;},
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "Amount", // added
        legendOffset: -70,
        legendPosition: "middle",
        format: (value) => `Rp. ${(value / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}k`,
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{from:"color"}}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
        areaOpacity={0.15}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default OverviewChart;