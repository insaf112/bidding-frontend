import { GET, POST } from "./ApiConfig";

const getCompany = async (id) => {
  return GET(`/company/getCompanies/${id}`);
};
const userLogin = async (user) => {
  return POST("/auth/login", { ...user });
};
const adminLogin = async (user) => {
  return POST("/auth/loginAdmin", { ...user });
};

export { getCompany, userLogin, adminLogin };
