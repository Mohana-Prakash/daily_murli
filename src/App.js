import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [content, setContent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/fetch-murli");
        setContent(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ width: "49%", textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: content.tamil }}
        />
        <div
          style={{ width: "49%", textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: content.english }}
        />
      </div>
    </div>
  );
}

export default App;
