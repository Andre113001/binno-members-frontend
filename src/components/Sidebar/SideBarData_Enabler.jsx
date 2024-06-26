import React from "react";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

const SideBarData_Enabler = [
  {
    title: "Account",
    icon: <PersonRoundedIcon />,
    link: "/account",
  },
  // {
  //     title: "Dashboard",
  //     icon:  <WebRoundedIcon />,
  //     link:   "/dashboard" //will be change to '/dashboard' once login is added
  // },
  {
    title: "Guides",
    icon: <SpaceDashboardRoundedIcon />,
    link: "/guides",
  },
  {
    title: "Events",
    icon: <CalendarMonthRoundedIcon />,
    link: "/events",
  },
  {
    title: "Blog Entries",
    icon: <NewspaperRoundedIcon />,
    link: "/blogs",
  },
  {
    title: "Mentor",
    icon: <PeopleRoundedIcon />,
    link: "/mentor",
  },
];

export default SideBarData_Enabler;
