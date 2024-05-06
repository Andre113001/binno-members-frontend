import React from "react";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";

const SideBarData_Mentor = [
  {
    title: "Account",
    icon: <PersonRoundedIcon />,
    link: "/account",
  },
  {
    title: "Enablers",
    icon: <RocketLaunchRoundedIcon />,
    link: "/enablers",
  },
  {
    title: "Blog Entries",
    icon: <NewspaperRoundedIcon />,
    link: "/blogs",
  },
];

export default SideBarData_Mentor;
