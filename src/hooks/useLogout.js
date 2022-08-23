import useAuth from "./useAuth";

import axios from "../api/axios";

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    const options = {
      method: "POST",
      url: "https://api.gensanfeedmill.com/api/auth/logout",
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      await axios.request(options).then(function () {
        // console.log(response.data);
        // navigate("/login");
        setAuth({});
        localStorage.removeItem("user");
        window.location.reload(false);
      });
    } catch (err) {
      console.log(err);
      setAuth({});
      localStorage.removeItem("user");
      window.location.reload(false);
    }
  };

  return logout;
};

export default useLogout;
