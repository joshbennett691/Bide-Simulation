import React, { useState, useRef } from "react";

const FileUpload = (props) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  return <input type="file" ref={fileInputField} />;
};

export default FileUpload;
