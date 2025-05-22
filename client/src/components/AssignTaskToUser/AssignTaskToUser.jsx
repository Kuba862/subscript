import { useState } from "react";
import Input from "../Input";
import "./style.css";
import axios from "axios";

const AssignTaskToUser = () => {
  const [assignData, setAssignData] = useState({
    taskId: "",
    userEmail: "",
    result: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { taskId, userEmail } = assignData;

    try {
      const res = await axios.patch(
        `http://localhost:5001/todos/${taskId}/assign`,
        {
          user_email: userEmail,
        }
      );
      setAssignData({ ...assignData, result: res.data });
    } catch (err) {
      console.error(err);
      setAssignData({ ...assignData, result: err.message });
    }
  };

  return (
    <div className="assign-task-to-user-container">
      <h3>Assign task to user</h3>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="task id"
          value={assignData.taskId}
          onChange={(e) =>
            setAssignData({ ...assignData, taskId: e.target.value })
          }
          type="text"
        />
        <Input
          placeholder="user email"
          value={assignData.userEmail}
          onChange={(e) =>
            setAssignData({ ...assignData, userEmail: e.target.value })
          }
          type="email"
        />
        <button type="submit">Assign task to user</button>
      </form>
      {assignData.result && (
        <pre>
          Task with id: {assignData.taskId} assigned to user eith email:{" "}
          {assignData.userEmail}
        </pre>
      )}
    </div>
  );
};

export default AssignTaskToUser;
