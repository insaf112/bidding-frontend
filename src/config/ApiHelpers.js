import { GET, POST } from "./ApiConfig";

const getCompany = async (id) => {
  return GET(`/company/getCompanies/${id}`);
};
const userLogin = async (user) => {
  return POST("/auth/login", { ...user });
};

export { getCompany, userLogin };
