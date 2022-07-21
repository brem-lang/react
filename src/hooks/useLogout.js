import useAuth from "./useAuth";

import axios from "../api/axios";

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    try {
      await axios.post("/api/auth/logout", config);
    } catch (err) {
      console.error(err);
    }

    setAuth({});
    localStorage.removeItem("user");
  };

  return logout;
};

export default useLogout;
