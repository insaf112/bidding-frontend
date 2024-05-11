import React, { useEffect, useState } from "react";
import CompanyDisplayBox from "../../Components/CompanyDisplayBox";
import { companies } from "../../assets/data/dummyData";
import { Link, useNavigate } from "react-router-dom";
import CompanySmallDisplayBox from "../../Components/CompanySmallDisplayBox";
import ProjectDisplayBox from "../../Components/ProjectDisplayBox";
import { GET } from "../../config/ApiConfig";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProjectsActiveScreen = () => {
  const { user } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  console.log("USERRRRR", user);
  const fetchAllCompanies = async () => {
    try {
      const { data } = await GET(
        `/company/getAllProjects/${user?.companyProfile?._id}`
      );
      console.log("DATAAAAAAAAAA", data.data.data);
      setProjects(data?.data?.data);
      toast.success(data?.data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.companyProfile) {
      fetchAllCompanies();
    }
  }, [user]);

  const navigate = useNavigate();
  return (
    <div className="w-full bg-neutral7 flex flex-col items-center pb-3">
      <div className="maxW">
        <div className="border-b-2 border-b-neutral5 py-3">
          <h1 className="text-[30px] mt-3 font-[500]">
            Active Projects - {projects.length}
          </h1>
          <div className="flex flex-wrap mt-4 gap-x-[2%]">
            {projects.length > 0 ? (
              projects.map((item) => (
                <ProjectDisplayBox
                  key={item.id}
                  item={item}
                  // onClick={() => navigate(`/user/company/${item.id}`)}
                />
              ))
            ) : (
              <p className="text-center text-neutral4 my-3">
                No Projects at the moment
              </p>
            )}
          </div>
        </div>
        {/* <div>
          <h1 className="text-[30px] mt-3 font-[500]">Add Companies</h1>
          <div className="flex flex-wrap mt-4 gap-x-[2%]">
            {companies.map((item) => (
              // <CompanyDisplayBox
              //   key={item.id}
              //   item={item}
              //   onClick={() => navigate(`/user/company/${item.id}`)}
              // />
              <CompanySmallDisplayBox
                type={"AddFriend"}
                key={item.id}
                item={item}
                onClick={() =>
                  navigate(`/user/company/${item.id}`, {
                    state: {
                      type: "AddFriend",
                    },
                  })
                }
                onAddFriend={() => {
                  console.log("ON Accept");
                }}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectsActiveScreen;
