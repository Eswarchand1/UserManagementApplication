import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./UserManagement.css";
const UserManagement = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("NONE");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json().then((result) => setData(result)))
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log(data);
  const sortedUsers =
    sortOrder === "NONE"
      ? data
      : [...data].sort((a, b) =>
          sortOrder === "ASE"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name),
        );
  const filterdData = sortedUsers?.filter((user) =>
    user?.name.toLowerCase().includes(search?.toLowerCase()),
  );
  const filterdTableData = filterdData?.map((element, index) => (
    <tr onClick={() => handelUserClick(element.id)} key={index}>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.address.city}</td>
    </tr>
  ));
  const tableData = sortedUsers?.map((element, index) => (
    <tr onClick={() => handelUserClick(element.id)} key={index}>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.address.city}</td>
    </tr>
  ));
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

  const handelUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <div className="container">
        <h1>UserManagement</h1>
        <div className="flex-container">
          <div className="search">
            <label htmlFor="search">{"Search by name "}</label>
            <input
              className="searchInput"
              type="text"
              name="search"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sort-select">
            <label for="sort" style={{ marginRight: "5px" }}>
              Sort
            </label>
            <select
              name="sort"
              id="sort"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="NONE">None</option>
              <option value="ASE">Asecnding</option>
              <option value="DESC">Desending</option>
            </select>
          </div>
        </div>
        <div>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>
            {search ? filterdTableData : tableData}
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
