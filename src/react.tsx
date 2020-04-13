import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactJson from "react-json-view";

const Index = () => {
  const [json, setJson] = React.useState({});
  const update = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setJson(JSON.parse(event.target.value));
    } catch (e) {}
  };

  return (
    <>
      <div style={{ width: "50%", float: "left", height: "100%" }}>
        <textarea
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            margin: 0,
            padding: "5px",
          }}
          onChange={update}
        />
      </div>
      <div style={{ width: "50%", float: "left", height: "100%" }}>
        <ReactJson
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          src={json}
          theme="monokai"
        />
      </div>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
