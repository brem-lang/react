import axios from "axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.removeItem("user");

    try {
      await axios.post("http://172.16.0.118/api/auth/logout");
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
