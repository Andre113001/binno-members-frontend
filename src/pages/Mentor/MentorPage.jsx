import React from "react";
import { Fragment } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import MentorTabs from "./Tabs/MentorTabs";

function MentorPage() {
  return (
    <>
      <Fragment>
        <div className="flex w-full bg-[#F4F4F4] overflow-hidden">
          <SideBar />
          <MentorTabs />
        </div>
      </Fragment>
    </>
  );
}

export default MentorPage;
