import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Assuming Material UI

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  const [selectedFileName, setSelectedFileName] =
    React.useState("Attach File(.PDF)");
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null); // State for error message
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError("File size exceeds 5MB limit.");
        return;
      }
      setSelectedFileName(file.name);
      setIsUploaded(true);
      setUploadError(null);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      style={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        width: "100%",
        position: "relative", // Use relative positioning for icon placement
      }}
      onChange={handleChange}
    >
      {/* Conditionally render CheckCircleIcon on successful upload */}
      {isUploaded && (
        <CheckCircleIcon
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "green",
          }}
        />
      )}

      {selectedFileName || "Attach File (.PDF)"}
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
