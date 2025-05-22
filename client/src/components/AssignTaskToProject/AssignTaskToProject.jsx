import React, { useState } from "react";
import Input from "../Input";
import "./style.css";
import axios from "axios";

const AssignTaskToProject = () => {
  const [assignData, setAssignData] = useState({
    taskId: "",
    projectId: "",
    result: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { taskId, projectId } = assignData;

    try {
      const res = await axios.patch(
        `http://localhost:5001/todos/${taskId}/assign-to-project`,
        {
          project_id: projectId,
        }
      );
      setAssignData({ ...assignData, result: res.data });
    } catch (err) {
      console.error(err);
      setAssignData({ ...assignData, result: err.message });
    }
  };

  return (
    <div className="assign-task-to-project-container">
      <h3>Assign task to project</h3>
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
          placeholder="project id"
          value={assignData.projectId}
          onChange={(e) =>
            setAssignData({ ...assignData, projectId: e.target.value })
          }
          type="text"
        />
        <button type="submit">Assign task to project</button>
      </form>
      {assignData.result && (
        <pre>
          Task with id: {assignData.taskId} assigned to project with id:{" "}
          {assignData.projectId}
        </pre>
      )}
    </div>
  );
};

export default AssignTaskToProject;
