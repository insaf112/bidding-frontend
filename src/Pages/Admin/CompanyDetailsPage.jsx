import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categories from "../../assets/data/categories";
import { companies } from "../../assets/data/dummyData";
import PdfComponent from "../../Components/PdfComponent";
// import PdfFile from "../../assets/Resume.pdf";
import AppButton from "../../Components/AppButton";
import ConfirmationModal from "../../Components/ConfirmationModal";
import { getCompany } from "../../config/ApiHelpers";
import { POST } from "../../config/ApiConfig";
import { useSelector } from "react-redux";

const CompanyDetailsPage = () => {
  const { user } = useSelector((state) => state.user);
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
  console.log("RESPONSE COMPANY", user);
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
      title: "Do you want to Approve this company registration?",
      body: "By confirming, this company will be registered to your platform and will be allowed to post and bid on Projects.",
    });
  };
  const declineClick = () => {
    setOpenConfModal(true);
    setConfirmationData({
      type: "decline",
      title: "Do you want to decline this company registration?",
      body: "If you decline this registration, this company registration request will be denied and won't be able to use your platform",
    });
  };

  const handleAcceptRequest = async () => {
    console.log("ACCEPT REQUEST");
    try {
      const res = await POST("/admin/approveCompany", {
        companyId: id,
        userId: user.id,
      });
      console.log("ACCEPT REQUEST", res);
      navigate("/admin/approval-requests");
    } catch (error) {
      alert("Error: " + error);
    }
    setOpenConfModal(false);
  };
  const handleDeclineRequest = async () => {
    console.log("DECLINE REQUEST");
    try {
      const res = await POST("/admin/rejectCompany", {
        companyId: id,
        userId: user.id,
      });
      console.log("ACCEPT REQUEST", res);
      navigate("/admin/approval-requests");
    } catch (error) {
      alert("Error: " + error);
    }
    setOpenConfModal(false);
  };

  return (
    <div className="w-full calcHeight bg-neutral7 flex justify-center">
      <div className="maxW py-3">
        <div className="">
          <p className="text-3xl font-medium">{company?.companyName}</p>
          <p className="text-base mt-3 text-neutral2">{company?.description}</p>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium">Categories</p>
          <div className="flex mt-2">
            <p className="text-base text-neutral2">
              {company?.categories?.slice(" ").join(", ")}
            </p>
          </div>
        </div>
        {/* </div> */}
        <div className="mt-4">
          <p className="text-xl font-medium">Documentation</p>
          <div className="flex mt-2 gap-x-5 items-center">
            <p className="text-base">License Copy : </p>
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
          <p className="text-xl font-medium">Contact Info</p>
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
                {company?.telephone2}
              </span>
            </p>
            <p className="text-base">
              Email :{" "}
              <span className="text-primary hover:underline">
                {company?.emailAddress}
              </span>
            </p>
            <p className="text-base">
              Website :{" "}
              <span className="text-primary hover:underline">
                {company?.websiteAddress}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium">Address</p>
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
        {company?.status == 0 && (
          <div className="flex gap-x-5 justify-end mt-5">
            <AppButton
              onClick={declineClick}
              bgColor={"red"}
              text={"Decline"}
            />
            <AppButton
              onClick={acceptClick}
              bgColor={"green"}
              text={"Approve"}
            />
          </div>
        )}
        <ConfirmationModal
          open={openConfModal}
          onConfirm={
            confirmationData.type === "accept"
              ? handleAcceptRequest
              : handleDeclineRequest
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

export default CompanyDetailsPage;
