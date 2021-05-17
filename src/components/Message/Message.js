import React from "react";
const Message = (props) => {
  let style = {};
  if (props.message.type == "success") {
    style = {
      background: "#93f58c",
      color: "white",
      textAlign: "center",
      padding: "1rem",
      fontWeight: "700",
    };
  } else {
    style = {
      background: "tomato",
      color: "white",
      textAlign: "center",
      padding: "1rem",
      fontWeight: "700",
    };
  }

  console.log("MESSSSSSSSSSSSSSSSAGE");
  return <div style={style}>{props.message.value}</div>;
};
export default Message;
