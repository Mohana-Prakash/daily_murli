import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [content, setContent] = useState({});
  const [date, setDate] = useState(moment(new Date()).format("DD.MM.YY"));
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fetch-murli/${date}`
        );
        setContent(response.data);
      } catch (error) {}
    };

    fetchData();
  }, [date]);

  return (
    <div style={{ padding: "10px" }}>
      <input
        type="date"
        onChange={(e) => setDate(moment(e.target.value).format("DD.MM.YY"))}
        // value={date}
        id="dateInput"
        max={today}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div dangerouslySetInnerHTML={{ __html: content.tamil }} />
        <div dangerouslySetInnerHTML={{ __html: content.english }} />
      </div>
    </div>
  );
}

export default App;
