import React, { useEffect, useState } from "react";
import CompanyDisplayBox from "../../Components/CompanyDisplayBox";
import {} from "../../assets/data/dummyData";
import { Link, useNavigate } from "react-router-dom";
import CompanySmallDisplayBox from "../../Components/CompanySmallDisplayBox";
import { useSelector } from "react-redux";
import { GET, POST } from "../../config/ApiConfig";

const FriendRequestPage = () => {
  const { user } = useSelector((state) => state.user);
  const [companies, setCompanies] = useState([]);
  const [requests, setRequests] = useState([]);
  console.log("USERRRRR", user);
  const navigate = useNavigate();

  const handleAddFriend = async (reciever) => {
    try {
      const { data } = await POST(`/user/sendFriendRequest`, {
        sender: user.companyProfile._id,
        reciever,
      });
      fetchAllCompanies();
      console.log("DATAAAAAAAAAA", data.data.data);
      // setCompanies(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllCompanies = async () => {
    try {
      const { data } = await GET(
        `/company/getOthersCompanies/${user?.companyProfile?._id}`
      );
      console.log("DATAAAAAAAAAA", data.data.data);
      setCompanies(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getPendingFriendRequests = async () => {
    try {
      const { data } = await GET(
        `/user/getPendingRequests/${user?.companyProfile?._id}`
      );
      console.log("PENDINGGGGGGGGg", data.data.data);
      setRequests(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.companyProfile) {
      fetchAllCompanies();
      getPendingFriendRequests();
    }
  }, [user]);

  // Accept Request
  const handleAcceptRequest = async (id) => {
    console.log("Accept", id);
    try {
      const { data } = await POST(`/user/approveFriendRequest`, {
        id,
      });
      console.log("DATAAAAAAAAAA", data.data.data);
      fetchAllCompanies();
      getPendingFriendRequests();
      // setCompanies(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  // Accept Request
  const handleRejectRequest = async (id) => {
    try {
      const { data } = await POST(`/user/denyFriendRequest`, {
        id,
      });
      console.log("DATAAAAAAAAAA", data.data.data);
      // fetchAllCompanies();
      getPendingFriendRequests();
      // setCompanies(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-neutral7 flex flex-col items-center pb-3">
      <div className="maxW">
        <div className="border-b-2 border-b-neutral5 py-3">
          <h1 className="text-[30px] mt-3 font-[500]">
            Friends Requests - {requests.length}
          </h1>
          <div className="flex flex-wrap mt-4 gap-x-[2%]">
            {requests.length > 0 ? (
              requests.map((item) => (
                <CompanySmallDisplayBox
                  key={item._id}
                  item={item.sender}
                  onClick={() =>
                    navigate(`/company/${item.sender._id}`, {
                      state: {
                        id: item._id,
                      },
                    })
                  }
                  onAccept={() => handleAcceptRequest(item._id)}
                  onReject={() => handleRejectRequest(item._id)}
                />
              ))
            ) : (
              <p className="text-center text-neutral4 my-3">
                No friend requests at the moment
              </p>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-[30px] mt-3 font-[500]">
            Add Companies - {companies.length}
          </h1>
          <div className="flex flex-wrap mt-4 gap-x-[2%]">
            {companies.map((item) => (
              // <CompanyDisplayBox
              //   key={item.id}
              //   item={item}
              //   onClick={() => navigate(`/user/company/${item.id}`)}
              // />
              <CompanySmallDisplayBox
                type={"AddFriend"}
                key={item._id}
                item={item}
                onClick={() =>
                  navigate(`/company/${item._id}`, {
                    state: {
                      type: "AddFriend",
                    },
                  })
                }
                onAddFriend={() => handleAddFriend(item._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestPage;
