import React, { useEffect, useState } from "react";
import CompanyDisplayBox from "../../Components/CompanyDisplayBox";
import { useNavigate } from "react-router-dom";
import { GET } from "../../config/ApiConfig";

const AllCompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const fetchAllCompanies = async () => {
    try {
      const { data } = await GET(`/admin/getAllCompanies`);
      console.log("DATAAAAAAAAAA", data.data.data);
      setCompanies(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <div className="w-full bg-neutral7 flex flex-col items-center pb-3">
      <div className="maxW">
        <h1 className="text-[30px] mt-3 font-[500]">
          Registered Companies - {companies.length}
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

export default AllCompaniesPage;
