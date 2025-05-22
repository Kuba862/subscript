import { useState } from "react";
import axios from "axios";
import "./style.css";
import Input from "../Input";

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    result: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = userData;

    try {
      const res = await axios.post("http://localhost:5001/users", {
        name,
        email,
      });
      setUserData({ name: "", email: "", result: res.data.message });
    } catch (err) {
      console.error(err);
      setUserData({ ...userData, result: err.message });
    }
  };

  return (
    <div className="add-user-container">
      <h3>Add user</h3>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="user name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          type="text"
        />
        <Input
          placeholder="user email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          type="email"
        />
        <button type="submit">Add user</button>
      </form>
      {userData.result && <pre>{JSON.stringify(userData.result, null, 2)}</pre>}
    </div>
  );
};

export default AddUser;
