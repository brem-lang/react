import axios from "axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    try {
      await axios.post("http://172.16.0.118/api/auth/logout", config);
    } catch (err) {
      console.error(err);
    }

    setAuth({});
    localStorage.removeItem("user");
  };

  return logout;
};

export default useLogout;
