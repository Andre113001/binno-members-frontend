import React from "react";
import Back from "../../../components/Back/Back";
import SearchBar from "../../../components/Search Bar/Searchbar";
import EnablerCards from "./EnablerCards";

function AddEnabler() {
  return (
    <>
      {/* main enabler page */}
      <div className="flex flex-col bg-[#F4F4F4]">
        {/* back button container */}
        <div className="flex ml-10 ">
          <Back link="/enablers" />
        </div>
        {/* Search and Cards container */}
        <div className="flex flex-col w-full items-center">
          {/* title and search container */}
          <div className="flex flex-col justify-center items-center w-[50%]">
            <h1 className="mb-6 font-bold text-5xl text-[#FF7A00]">
              Discover Enablers
            </h1>
            <SearchBar />
          </div>
          {/* enabler cards container */}
        </div>
        <div className="flex items-center justify-center ">
          <EnablerCards />
        </div>
      </div>
    </>
  );
}

export default AddEnabler;
