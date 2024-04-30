import React, { useEffect, useState } from "react";
// import { companies } from "../../assets/data/dummyData";
import AppButton from "../../Components/AppButton";
import { useNavigate } from "react-router-dom";
import CompanyDisplayBox from "../../Components/CompanyDisplayBox";
import { GET, getDecodedToken } from "../../config/ApiConfig";

const data = getDecodedToken();

const ApprovalRequests = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const fetchPendingCompanies = async () => {
    try {
      const { data } = await GET(`/admin/getPendingCompanies`);
      console.log("DATAAAAAAAAAA", data.data.data);
      setCompanies(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingCompanies();
  }, []);

  return (
    <div className="w-full bg-neutral7 flex flex-col items-center pb-3">
      <div className="maxW">
        <h1 className="text-[30px] mt-3 font-[500]">
          Companies to Approve - {companies.length}
        </h1>
        <div className="mt-3 w-full">
          {companies.map((item) => (
            <CompanyDisplayBox
              key={item.id}
              item={item}
              onClick={() => navigate(`/admin/company/${item._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovalRequests;
