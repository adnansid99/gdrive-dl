import {
  Box,
  Button,
  Input,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

const { VITE_GDRIVE_API } = import.meta.env;
const headingData = {
  title: "GDrive Download Link Generator",
  fileType: "",
};

export default function App() {
  const [heading, setHeading] = useState(headingData);
  const [inputValue, setInputValue] = useState("");
  const [isConverted, setIsConverted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const finalUrlInit = `https://www.googleapis.com/drive/v3/files/${inputValue}?alt=media&key=${VITE_GDRIVE_API}`;

  function convertLink() {
    setTimeout(async () => {
      const regexFileId = /\/file\/d\/([\w-]+)\//;
      const regexFileId2 = /\/file\/d\/([\w-]+)/;
      const regexOpenId = /\/open\?id=([\w-]+)/;
      const regexDownloadId = /\/uc\?export=download&id=([\w-]+)/;
      const regexDownloadId2 = /\/uc\?id=([\w-]+)/;

      const url = inputValue;
      let match =
        url.match(regexFileId) ||
        url.match(regexFileId2) ||
        url.match(regexOpenId) ||
        url.match(regexDownloadId) ||
        url.match(regexDownloadId2);

      if (match) {
        // console.log(match);
        await getFileName(match[1]);
        setInputValue(match[1]);
        setIsLoading(false);
        setIsConverted(true);
        return null;
      }
      setIsLoading(false);
      return alert("Invalid Link or Empty Input");
    }, 1000);
    setIsLoading(true);
  }

  async function getFileName(fileId) {
    await axios
      .get(
        `https://www.googleapis.com/drive/v3/files/${fileId}?key=${VITE_GDRIVE_API}`,
      )
      .then((response) => {
        const { name, mimeType } = response.data;
        setHeading((preValue) => {
          return {
            ...preValue,
            title: name.substring(0, name.lastIndexOf(".")),
            fileType: mimeType.split("/")[0],
          };
        });
      })
      .catch((error) => alert(error));
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
      <Box sx={{ textAlign: "center" }}>
        <Typography
          onClick={() => window.location.reload()}
          sx={{ cursor: "pointer" }}
          className="heading"
          variant="h4"
        >
          {heading.title}
        </Typography>
        {isConverted && (
          <Typography
            variant="body1"
            sx={{
              margin: "1rem 0 -1.2rem 0",
              color: "#525252",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            📁File Type: {heading.fileType}
          </Typography>
        )}
      </Box>
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
                    sx={{
                      backgroundColor: "#009159",
                      ":hover": {
                        backgroundColor: "#007c4d",
                      },
                      fontWeight: "bold",
                    }}
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
