import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PdfComponent from "../../Components/PdfComponent";
import AppButton from "../../Components/AppButton";
import ConfirmationModal from "../../Components/ConfirmationModal";
import { getCompany } from "../../config/ApiHelpers";
import { POST } from "../../config/ApiConfig";

const CompanyDetailsPageUser = () => {
  // const { user } = useSelector((state) => state.user);
  const [company, setCompany] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    type: "",
    title: "",
    body: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("STATEEEEEEEE", state);

  const getCompanyDetails = async () => {
    try {
      const { data } = await getCompany(id);
      // console.log("RESPONSE COMPANY", data, data.data.data);
      setCompany(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCompanyDetails();
  }, [id]);

  const acceptClick = () => {
    setOpenConfModal(true);
    setConfirmationData({
      type: "accept",
      title: "Do you want to accept this friend request?",
      body: "By confirming, this user will be added to your connections list and will be allowed to accept this requestyour private projects and vice versa",
    });
  };
  const declineClick = () => {
    setOpenConfModal(true);
    setConfirmationData({
      type: "decline",
      title: "Do you want to decline this friend request?",
      body: "If you decline this request, this user will not be added to your connections list and will not be allowed to access your private projects, and vice versa",
    });
  };

  // Accept Request
  const handleAcceptRequest = async () => {
    console.log("ACEEEEETTTTT");
    try {
      const { data } = await POST(`/user/approveFriendRequest`, {
        id: state.id,
      });
      console.log("DATAAAAAAAAAA", data.data.data);
      navigate("/company/friend-requests");
      // setCompanies(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  // Accept Request
  const handleRejectRequest = async () => {
    console.log("Declineeeee");
    try {
      const { data } = await POST(`/user/denyFriendRequest`, {
        id: state.id,
      });
      navigate("/company/friend-requests");
      console.log("DATAAAAAAAAAA", data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full calcHeight bg-neutral7 flex justify-center">
      <div className="maxW py-3">
        <div className="">
          <div className="flex justify-between mt-2">
            <p className="text-3xl font-medium">{company?.companyName}</p>
            <div className="flex gap-x-5">
              {state?.type !== "AddFriend" ? (
                <>
                  <AppButton
                    onClick={declineClick}
                    bgColor={"red"}
                    text={"Decline Request"}
                  />
                  <AppButton
                    onClick={acceptClick}
                    bgColor={"green"}
                    text={"Accept Request"}
                  />
                </>
              ) : (
                <AppButton
                  onClick={() => console.log("Add Friend Click")}
                  bgColor={"#4640DE"}
                  text={"Add Connection"}
                />
              )}
            </div>
          </div>
          <p className="text-base mt-5 text-neutral2">{company?.description}</p>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium">Categories</p>
          <div className="flex mt-2">
            <p className="text-base text-neutral2">
              {company?.categories?.slice(" ").join(", ")}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium underline">Documentation</p>
          <div className="flex mt-2 gap-x-5 items-center">
            <p className="text-base ">License Copy : </p>
            <div
              onClick={() => {
                setPdfFile(company?.licensePdf?.filename);
                setOpenPdfModal(true);
              }}
              className={`font-epilogue text-white bg-[#4640DE] rounded-md hover:brightness-125 cursor-pointer py-1 px-2 h-fit`}
            >
              <p className={` text-base`}>View License</p>
            </div>
            <p className="text-base">VAC Certificate : </p>
            <div
              onClick={() => {
                setPdfFile(company?.vacPdf?.filename);
                setOpenPdfModal(true);
              }}
              className={`font-epilogue text-white bg-[#4640DE] rounded-md hover:brightness-125 cursor-pointer py-1 px-2 h-fit`}
            >
              <p className={` text-base`}>View VAC</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium underline">Contact Info</p>
          <div className="flex mt-2 gap-x-5 gap-y-1 flex-wrap">
            <p className="text-base">
              Phone #1 :{" "}
              <span className="text-primary hover:underline">
                {company?.telephone1}
              </span>
            </p>
            <p className="text-base">
              Phone #2 :{" "}
              <span className="text-primary hover:underline">
                {company?.telephone2}
              </span>
            </p>
            <p className="text-base">
              Fax Number :{" "}
              <span className="text-primary hover:underline">
                {company?.faxNumber}
              </span>
            </p>
            <p className="text-base">
              Email :{" "}
              <span className="text-primary hover:underline">
                {company?.email}
              </span>
            </p>
            <p className="text-base">
              Website :{" "}
              <a
                href={company?.website}
                className="text-primary hover:underline"
              >
                {company?.website}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium underline">Address</p>
          <div className="flex mt-2 gap-x-5 gap-y-1 flex-wrap">
            <p className="text-base">
              Address #1 :{" "}
              <span className="text-primary hover:underline">
                {company?.address1}
              </span>
            </p>
            <p className="text-base">
              Address #2 :{" "}
              <span className="text-primary hover:underline">
                {company?.address2}
              </span>
            </p>
            <p className="text-base">
              Address #3 :{" "}
              <span className="text-primary hover:underline">
                {company?.address3}
              </span>
            </p>
            <p className="text-base">
              Location :{" "}
              <span className="text-primary hover:underline">
                {company?.location}
              </span>
            </p>
          </div>
        </div>

        <ConfirmationModal
          open={openConfModal}
          onConfirm={
            confirmationData.type === "accept"
              ? handleAcceptRequest
              : handleRejectRequest
          }
          handleClose={() => setOpenConfModal(false)}
          data={confirmationData}
        />
        <PdfComponent
          open={openPdfModal}
          file={pdfFile}
          handleClose={() => setOpenPdfModal(false)}
        />
      </div>
    </div>
  );
};

export default CompanyDetailsPageUser;
