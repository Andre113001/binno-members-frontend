import React, { useState, useEffect } from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import useCustomModal from "../../../../hooks/useCustomModal";
import { Fragment } from "react";
import { Button } from "@mui/material";
import AddMentorButton from "../../AddMentors/AddMentorButton";
import { useHttp } from '../../../../hooks/http-hook';

function RequestList() {

  const [requests, setRequests] = useState([]);
  const { sendRequest } = useHttp(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/mentors/request/list/receiver/:receiverId`
        });

        if (!response) {
          throw new Error('Failed to fetch data');
        }

        const data = await response;
        console.log("data: ", data);
        setRequests(data);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="flex flex-col">
        <SearchBar />
        <div className="flex flex-col mt-4 ">
          {requests.map((req) => (
            <>
              {/* main card container */}
              <div key={req.member_id} className="flex">
                {/* image container */}
                <div className="absolute rounded-full p-4 bg-[#F4F4F4]">
                  <img
                    className="w-24 h-24 rounded-full"
                    src={req.mentorProfile}
                    alt="Profile Photo"
                  />
                </div>
                {/* parent card container */}
                <div className="flex flex-col m-4 p-2 ml-20 w-[75%] rounded-lg bg-white">
                  {/* mentor name and button container */}
                  <div className="flex flex-row items-center mb-4 m-8">
                    <h1 className="ml-8 text-2xl font-bold grow">
                      {req.mentorName}
                    </h1>
                    <button className="bg-[#599EF3] rounded-lg p-2 px-4 m-2 text-white hover:bg-blue-600 ">
                      Accept
                    </button>
                    <button className="border border-[#EB5858] rounded-lg p-2 px-4 m-2 text-[#EB5858] hover:bg-red-400 hover:text-white">
                      Reject
                    </button>
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
