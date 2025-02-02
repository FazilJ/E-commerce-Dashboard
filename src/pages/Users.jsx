import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/usersSlice";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserPlus } from "react-icons/fa";

const Users = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") return (
    <div className="d-flex justify-content-center p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (status === "failed") return (
    <div className="alert alert-danger m-4" role="alert">
      Error fetching users.
    </div>
  );

  return (
    <div className="container-fluid p-4">
      {/* Header with Stats */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Users</h2>
          <p className="text-muted">Total Users: {users.length}</p>
        </div>
        <button className="btn btn-primary">
          <FaUserPlus className="me-2" /> Add User
        </button>
      </div>

      {/* Users Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {users.map((user) => (
          <div key={user.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary text-white rounded-circle p-3 me-3">
                    <FaUser size={24} />
                  </div>
                  <div>
                    <h5 className="card-title mb-0">
                      {user.name?.firstname} {user.name?.lastname}
                    </h5>
                    <small className="text-muted">@{user.username}</small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <FaEnvelope className="text-muted me-2" />
                    <a href={`mailto:${user.email}`} className="text-decoration-none">
                      {user.email}
                    </a>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaPhone className="text-muted me-2" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaMapMarkerAlt className="text-muted me-2" />
                    <small className="text-muted">
                      {user.address?.street}, {user.address?.city}
                    </small>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button className="btn btn-sm btn-outline-primary">
                    Edit Profile
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
