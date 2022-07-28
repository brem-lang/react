import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const styles = {
  osContent: {
    padding: "16px",
    height: "100%",
    width: "100%",
  },
};

const AppSetting = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const allowedRoles = [9];

  return (
    <aside className="control-sidebar control-sidebar-dark">
      <div className="p-3 control-sidebar-content">
        <div className="os-padding">
          <div className="os-content" style={styles.osContent}>
            <h5>Settings</h5>
            <hr className="mb-2"></hr>

            {auth?.roles?.find((role) => allowedRoles?.includes(role)) && (
              <>
                <div className="mb-4">
                  <h6>Users</h6>
                  <Link to="/users" style={{ paddingLeft: 15 }}>
                    Users List
                  </Link>
                </div>

                <div className="mb-4">
                  <h6>Activity Log</h6>
                  <Link to="/logs" style={{ paddingLeft: 15 }}>
                    Activity Logs List
                  </Link>
                </div>
              </>
            )}

          <div className="mb-4">
            <h6>Profile Settings</h6>
              <Link to="/update-user" style={{ paddingLeft: 15 }}>
                Update Profile
              </Link>
          </div>
          
            <div className="mb-4" style={{ position: "absolute", bottom: 0 }}>
              <button
                className="btn btn-secondary"
                onClick={() => handleLogout()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSetting;
