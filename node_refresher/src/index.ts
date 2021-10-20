import { NextFunction } from "express";

const http = require("http");

const server = http.createServer((req: any, res: any, next: any) => {
  console.log("Incoming request");
  console.log(req.method, req.url);

  if (req.method === "POST") {
    let body: string = "";
    req.on("end", () => {
      const userName = body.split("=")[1];
      res.end(`<h1>${userName}</h1>`);
    });
    req.on("data", (chunk: any) => {
      body += chunk;
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<form method='POST'><input type='text' name='username'><button type='submit'>Create User</button></form>"
    );
  }
});

server.listen(5000);
