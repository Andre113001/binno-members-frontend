import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MentorList from "./MentorTab/MentorList";
import RequestList from "./RequestTab/RequestList";

export default function MentorTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        marginLeft: "60px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          style={{
            width: "230px",
            borderBottom: 1,
            marginTop: "40px",
          }}
        >
          <Tab label="Mentor List" value="1" />
          <Tab label="Requests" value="2" />
        </TabList>
        <TabPanel value="1">
          <MentorList />
        </TabPanel>
        <TabPanel value="2">
          <RequestList />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
