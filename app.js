const http = require("http");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");


  // Allow specific HTTP methods
  if (req.method === "POST") {
    const chunks = [];

    const urlEncodedString = req.url;
    const decodedString = decodeURIComponent(urlEncodedString);

    req.on("data", (chunk) => {
    
      chunks.push(chunk);
    });

    req.on("end", () => {
      const fileData = Buffer.concat(chunks);

      console.log(fileData);

      // Find the start and end indices of the file content
      const startBoundary = Buffer.from("\r\n\r\n");
      const contentTypeHeader = req.headers["content-type"];

      const boundary = contentTypeHeader.split(";")[1].trim().split("=")[1];
      const endBoundary = Buffer.from(`\r\n--${boundary}--\r\n`);

      const startIndex = fileData.indexOf(startBoundary) + startBoundary.length;
      const endIndex = fileData.lastIndexOf(endBoundary);

      // Extract the file content from the received data
      const fileContent = fileData.slice(startIndex, endIndex);

      // Set the desired file path and extension

      // Write the file content to a file

      let str = fileContent.toString();

      const lines = str.split("\n");
      const result = [];

      const headers = lines[0].split(",");
      // if(lines.length>100000){
      //   lines.length=10000;
      // }
      console.log(lines.length);
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === "") {
          continue; // Skip empty lines
        }

        const obj = {};
        const currentLine = line.split(",");

        for (let j = 0; j < headers.length; j++) {
          const key = headers[j].trim();
          const value = currentLine[j].trim();
          obj[key] = value;
        }

        result.push(obj);
      }

      res.setHeader("Content-Type", "application/json");

      res.end(JSON.stringify(result));
      console.log("response sent");

      //     fs.writeFile(filePath, filedata, (error) => {
      //       if (error) {
      //         console.error("Error writing file:", error);
      //         res.statusCode = 500;
      //         res.end("Error writing file.");
      //       } else {
      //         console.log("File saved successfully.");
      //         res.statusCode = 200;
      //         res.end("File saved successfully.");
      //       }
      //     });
    });
  } else {
    res.statusCode = 404;
    res.end("Not found.");
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
