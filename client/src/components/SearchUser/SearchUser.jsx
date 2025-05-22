import { useState } from "react";
import axios from "axios";
import "./style.css";
import Input from "../Input";

const SearchUser = () => {
  const [userEmail, setUserEmail] = useState("");
  const [result, setResult] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/users/search", {
        email: userEmail,
      });
      const userDetails = await axios.get(
        `http://localhost:5001/users/${res.data.id}/summary`
      );
      setResult(res.data);
      setUserDetails(userDetails.data);
    } catch (err) {
      console.error(err);
      setResult(err.message);
    }
  };

  return (
    <>
      <div className="search-user-container">
        <h3>Search user</h3>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="user email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
          />
          <button type="submit">Search</button>
        </form>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        {userDetails && <pre>{JSON.stringify(userDetails, null, 2)}</pre>}
      </div>
    </>
  );
};

export default SearchUser;
