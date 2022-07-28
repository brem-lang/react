import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useError from "../hooks/useError";

const RedirectError = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { setUnAuth } = useError();

  const RedirectError = () => {
    setUnAuth(true);
    setAuth({});
    localStorage.removeItem("user");

    return navigate("/login", { replace: true });
  };

  return RedirectError;
};

export default RedirectError;
