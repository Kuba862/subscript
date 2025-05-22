import { useState } from "react";
import Input from "../Input";
import "./style.css";
import axios from "axios";

const AssignProjectOwner = () => {
  const [userEmail, setUserEmail] = useState("");
  const [projectId, setProjectId] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:5001/projects/${projectId}/assign-to-user`,
        {
          user_email: userEmail,
        }
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult(err.message);
    }
  };

  return (
    <div className="assign-project-owner-container">
        <h3>Assign project owner</h3>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="project id"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            type="text"
          />
          <Input
            placeholder="user email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
          />
          <button type="submit">Assign project owner</button>
        </form>
        {result && (
          <pre>
            Project with id: {projectId} assigned to user with email:{" "}
            {userEmail}
          </pre>
        )}
      </div>
    );
};

export default AssignProjectOwner;
