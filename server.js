const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8083;

const contentTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
};

const server = http.createServer((req, res) => {
  let url = req.url.split("?")[0]; // Remove query params
  let filePath = "";
  let ext = path.extname(url).toLowerCase();

  switch (url) {
    case "/":
    case "/index.html":
      filePath = path.join(__dirname, "index.html");
      ext = ".html";
      break;

    case "/about":
    case "/about.html":
      filePath = path.join(__dirname, "about.html");
      ext = ".html";
      break;

    case "/properties":
    case "/properties.html":
      filePath = path.join(__dirname, "properties.html");
      ext = ".html";
      break;

    case "/services":
    case "/services.html":
      filePath = path.join(__dirname, "services.html");
      ext = ".html";
      break;

    case "/agents":
    case "/agents.html":
      filePath = path.join(__dirname, "agents.html");
      ext = ".html";
      break;

    case "/blog":
    case "/blog.html":
      filePath = path.join(__dirname, "blog.html");
      ext = ".html";
      break;

    case "/contact":
    case "/contact.html":
      filePath = path.join(__dirname, "contact.html");
      ext = ".html";
      break;

    // Add more cases for your pages here

    default:
      // For anything else (like CSS, images, fonts), try to serve the file directly
      filePath = path.join(__dirname, url);
      if (!ext) {
        // If no extension, serve 404 page
        filePath = path.join(__dirname, "404.html");
        ext = ".html";
      }
  }

  const contentType = contentTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If error reading file, serve 404.html
      fs.readFile(path.join(__dirname, "404.html"), (err404, data404) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(data404 || "404 Not Found");
      });
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
