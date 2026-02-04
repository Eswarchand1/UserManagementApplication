import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((result) => result.json())
      .then((response) => {
        setUser(response);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  });
//   console.log(user);
//   console.log(keys);
  const handelButton1Click = () => {
    navigate(`/`);
  };
  if (loading) {
    return (
      <div className="loading-page">
        {" "}
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-page">
        {" "}
        <p style={{ color: "red" }}>Error: {error}</p>{" "}
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h1>User Details</h1>
        <div>
          <table>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Id</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                {user?.address.city +
                  ", " +
                  user?.address.street +
                  ", " +
                  user?.address.suite +
                  ", " +
                  user?.address.zipcode}
              </td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>{user.website}</td>
            </tr>
            <tr>
              <td>Company</td>
              <td>
                {user?.company.name +
                  ", " +
                  user?.company.catchPhrase +
                  ", " +
                  user?.company.bs}
              </td>
            </tr>
          </table>
        </div>
        <button className="btn" onClick={() => handelButton1Click()}>
          {"User management"}
        </button>
      </div>
    </>
  );
};

export default UserDetails;
