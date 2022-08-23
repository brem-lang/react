import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useVerifyToken from "../hooks/useVerify";
import Spinner from "../components/spinner/spinner.component";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useVerifyToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err.response);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth, refresh]);

  //   useEffect(() => {
  //     console.log(`isLoading: ${isLoading}`);
  //     console.log(`aT: ${JSON.stringify(auth?.token)}`);
  //   }, [isLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
