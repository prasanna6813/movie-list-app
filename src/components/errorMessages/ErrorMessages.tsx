import React, { memo } from "react";
import "./errorMessages.css";
type Props = {
  header: string;
  body?: string;
  type?: "info" | "error";
};

const ErrorMessages = ({ header, body, type }: Props) => {
  return (
    <div
      className={`errorMessage ${
        (type === undefined || type === "info") && "info"
      } ${type === "error" && "error"}`}>
      <h3>{header}</h3>
      {body && <p>{body}</p>}{" "}
    </div>
  );
};

export default memo(ErrorMessages);
