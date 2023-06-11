let http = require("http");


let server = http.createServer((req, res) => {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  let arr = [];

  req.on("data", (chunk) => {
    arr.push(chunk);
  });


  req.on("end", () => {
    let buff = Buffer.concat(arr);

    console.log(buff);

    res.end("Dd")
  });


});

let port=process.env.PORT||8080
server.listen(port);
