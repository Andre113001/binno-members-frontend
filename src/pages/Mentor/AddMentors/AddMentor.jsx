import React from "react";
import Back from "../../../components/Back/Back";
import SearchBar from "../../../components/Search Bar/Searchbar";
import MentorCards from "./MentorCards";

function AddMentor() {
  return (
    <>
      {/* main mentor page */}
      <div className="flex flex-col bg-[#F4F4F4] ">
        {/* back button container */}
        <div className="flex ml-10 ">
          <Back link="/mentor" />
        </div>
        {/* Search and Cards container */}
        <div className="flex flex-col w-full items-center">
          {/* title and search container */}
          <div className="flex flex-col justify-center items-center w-[50%]">
            <h1 className="mb-6 font-bold text-5xl text-[#FF7A00]">
              Discover Mentor
            </h1>
            <SearchBar />
          </div>
          {/* mentor cards container */}
        </div>
        <div className="flex items-center justify-center ">
          <MentorCards />
        </div>
      </div>
    </>
  );
}

export default AddMentor;
