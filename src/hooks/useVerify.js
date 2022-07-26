import useAuth from "./useAuth";

const useVerifyToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn) {
      const foundUser = JSON.parse(isLoggedIn);

      setAuth((prev) => {
        return {
          ...prev,
          token: foundUser.data.token,
          status: foundUser.data.status,
          user: foundUser.email,
          roles: foundUser.roles,
        };
      });

      return foundUser.token;
    }
  };

  return refresh;
};

export default useVerifyToken;
