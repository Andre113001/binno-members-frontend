import React from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Requests from "./Requests_data";

function RequestList() {
  return (
    <>
      <div className="flex flex-col">
        <SearchBar />
        <div className="flex flex-col mt-4 ">
          {Requests.map((req) => (
            <>
              {/* main card container */}
              <div key={req.id} className="flex flex-row">
                {/* parent card container */}
                <div className="flex flex-col m-4 p-2 ml-20 w-[75%] rounded-lg bg-white">
                  <div className="flex flex-row">
                    {/* image container */}
                    <div className="relative right-20 bottom-1 w-30 h-30 rounded-full p-4 bg-[#F4F4F4]">
                      <img
                        className="w-24 h-24 object-cover rounded-full"
                        src={req.mentorProfile}
                        alt="Profile Photo"
                      />
                    </div>
                    {/* mentor name and button container */}
                    <div className="flex flex-row items-center w-full">
                      <div className="flex grow">
                        <h1 className="text-2xl font-bold ">
                          {req.mentorName}
                        </h1>
                      </div>
                      <div className="flex">
                        <button className="bg-[#599EF3] rounded-lg p-2 px-4 m-2 text-white hover:bg-blue-600 ">
                          Accept
                        </button>
                        <button className="border border-[#EB5858] rounded-lg p-2 px-4 m-2 text-[#EB5858] hover:bg-red-400 hover:text-white">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Credentials container */}
                  <div className="flex flex-col m-3">
                    <h1 className="text-2xl my-2 font-bold">Credentials</h1>
                    <h1>{req.credentials}</h1>
                  </div>
                  {/* File attachment container */}
                  <div className="flex m-3">
                    <div className="flex justify-center rounded-lg p-2 border border-black grow mr-5">
                      {req.attachedFile}
                    </div>
                    <button className="bg-[#FF7A00] rounded-lg p-2 text-white hover:bg-orange-600">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
export default RequestList;
