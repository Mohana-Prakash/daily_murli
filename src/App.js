import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [content, setContent] = useState({});
  const [date, setDate] = useState(moment(new Date()).format("DD.MM.YY"));
  const [lang, setLang] = useState("tamil");
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://daily-murli-backend.vercel.app/fetch-murli/${date}`
        );
        setContent(response.data);
      } catch (error) {}
    };

    fetchData();
  }, [date]);

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <input
          type="date"
          onChange={(e) => setDate(moment(e.target.value).format("DD.MM.YY"))}
          value={date}
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
          style={{ width: "10%", padding: "10px", borderRadius: "5px" }}
          onChange={(e) => setLang(e.target.value)}>
          <option value="tamil">Tamil</option>
          <option value="english">English</option>
        </select>
      </div>
      {lang === "tamil" ? (
        <div
          style={{ margin: "auto", width: "80%" }}
          dangerouslySetInnerHTML={{ __html: content.tamil }}
        />
      ) : (
        <div
          style={{ margin: "auto", width: "80%" }}
          dangerouslySetInnerHTML={{ __html: content.english }}
        />
      )}{" "}
    </div>
  );
}

export default App;
