import React from "react";
import SideBar from "../../components/Sidebar/Sidebar.jsx";
import EnablerTab from "./EnablerTabs/EnablerTab.jsx";

function EnablersPage() {
  return (
    <>
      {/* page container */}
      <div className="flex w-full bg-[#F4F4F4] overflow-hidden">
        <SideBar />
        <div className="flex w-full ">
          <EnablerTab />
        </div>
      </div>
    </>
  );
}

export default EnablersPage;
