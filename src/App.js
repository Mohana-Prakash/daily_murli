import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [content, setContent] = useState({});
  const [lang, setLang] = useState("tamil");
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (date) => {
    const req_date = moment(date || new Date()).format("DD.MM.YY");
    try {
      const response = await axios.get(
        `https://daily-murli-backend.vercel.app/fetch-murli/${req_date}`
      );
      setContent(response.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <input
          type="date"
          onChange={(e) => fetchData(e.target.value)}
          id="dateInput"
          max={today}
          style={{
            width: "10%",
            padding: "10px",
            borderRadius: "5px",
            border: "solid 1px black",
          }}
        />
        <select
          style={{
            marginLeft: "10px",
            width: "10%",
            padding: "10px",
            borderRadius: "5px",
          }}
          onChange={(e) => setLang(e.target.value)}>
          <option value="tamil">Tamil</option>
          <option value="english">English</option>
        </select>
      </div>
      <div style={{ display: "flex" }}>
        {lang === "tamil" ? (
          <div dangerouslySetInnerHTML={{ __html: content.tamil }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content.english }} />
        )}
      </div>
    </div>
  );
}

export default App;
