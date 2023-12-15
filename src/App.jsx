import {
  Box,
  Button,
  Input,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [isConverted, setIsConverted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const finalUrlInit = `https://www.googleapis.com/drive/v3/files/${inputValue}?alt=media&key=${
    import.meta.env.VITE_GDRIVE_API
  }`;

  function convertLink() {
    setTimeout(() => {
      setIsLoading(false);
      const regexFileId = /\/file\/d\/([\w-]+)/;
      const regexOpenId = /\/open\?id=([\w-]+)/;
      const regexDownloadId = /\/uc\?export=download&id=([\w-]+)/;
      const regexDownloadId2 = /\/uc\?id=([\w-]+)/;

      const url = inputValue;
      let match =
        url.match(regexFileId) ||
        url.match(regexOpenId) ||
        url.match(regexDownloadId) ||
        url.match(regexDownloadId2);

      if (match) {
        setIsConverted(true);
        return setInputValue(match[1]);
      }
      return alert("Invalid Link or Empty Input");
    }, 1000);
    setIsLoading(true);
  }

  function copyLink() {
    setTimeout(() => {
      setIsCopied(true);
      setIsLoading(false);
    }, 700);
    setIsLoading(true);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Typography
        onClick={() => window.location.reload()}
        sx={{ cursor: "pointer" }}
        className="heading"
        variant="h4"
      >
        GDrive Download Link Generator
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Input
          type="url"
          value={isConverted ? finalUrlInit : inputValue}
          readOnly={isConverted}
          sx={{
            backgroundColor: "#3d3d3d",
            paddingInline: "0.5rem",
            color: "#9f9f9f",
            borderRadius: "0.2rem",
            width: "20rem",
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-around",
          }}
        >
          {isConverted ? (
            <>
              {isLoading ? (
                <CircularProgress className="loading" />
              ) : (
                <CopyToClipboard text={finalUrlInit} onCopy={copyLink}>
                  <Button
                    sx={{ backgroundColor: "#009159", fontWeight: "bold" }}
                    variant="contained"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </Button>
                </CopyToClipboard>
              )}
              <Button
                sx={{ fontWeight: "bold" }}
                onClick={() => window.location.reload()}
                color="error"
                variant="contained"
              >
                Try Again
              </Button>
            </>
          ) : (
            <>
              {isLoading ? (
                <CircularProgress className="loading" />
              ) : (
                <Button onClick={convertLink} variant="contained">
                  Generate
                </Button>
              )}
            </>
          )}
        </Box>
      </Box>
      <Typography sx={{ color: "#848484" }} variant="body2">
        Made By Adnan Siddiqui
      </Typography>
    </Box>
  );
}
