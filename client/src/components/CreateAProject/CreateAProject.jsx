import { useState } from "react";
import axios from "axios";
import Input from "../Input";
import "./style.css";

const CreateAProject = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    result: "",
    projectId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = projectData;

    try {
      const res = await axios.post("http://localhost:5001/projects", { name });
      setProjectData({
        ...projectData,
        result: res.data,
        projectId: res.data[0].id,
      });
    } catch (err) {
      console.error(err);
      setProjectData({ ...projectData, result: err.message });
    }
  };

  return (
    <div className="create-a-project-container">
      <h3>Create a project</h3>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="project name"
          value={projectData.name}
          onChange={(e) =>
            setProjectData({ ...projectData, name: e.target.value })
          }
          type="text"
        />
        <button type="submit">Create</button>
      </form>
      {projectData.result && (
        <pre>
          Project with id: {projectData.projectId} created: {projectData.name}
        </pre>
      )}
    </div>
  );
};

export default CreateAProject;
