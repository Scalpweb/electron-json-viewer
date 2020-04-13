import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactJson from "react-json-view";
import { readFileSync } from "fs";

const remote = require("electron").remote;

const Index = () => {
  const [text, setText] = React.useState("{}");
  const [json, setJson] = React.useState({});
  const update = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setText(event.target.value);
      setJson(JSON.parse(event.target.value));
    } catch (e) {}
  };

  React.useEffect(() => {
    const last: string = remote.process.argv[remote.process.argv.length - 1];
    if (last.endsWith(".json")) {
      try {
        const data = readFileSync(last, "utf-8");
        setJson(JSON.parse(data));
        setText(data);
      } catch {}
    }
  }, []);

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
          value={text}
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
