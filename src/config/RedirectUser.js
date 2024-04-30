import { useNavigate } from "react-router-dom";

export const RedirectAfterLogin = (role) => {
  const navigate = useNavigate();

  switch (role) {
    case 0: // Simple user
      navigate("/dashboard");
      break;
    case 1: // Company user
      navigate("/dashboard");
      break;
    case 2: // Admin user
      navigate("/dashboard");
      break;
    default:
      // Handle invalid role
      break;
  }
};
