const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8083;

const requestHandler = (req, res) => {
  let filePath = "";
  let extname = path.extname(req.url);
  if (extname) {
    const cleanUrl = req.url.split("?")[0];
    filePath = path.join(__dirname, cleanUrl);
  } else {
    switch (req.url) {
      case "/":
      case "/index.html":
        filePath = path.join(__dirname, "index.html");
        break;
      case "/about":
      case "/about.html":
        filePath = path.join(__dirname, "about.html");
        break;
      case "/properties":
      case "/properties.html":
        filePath = path.join(__dirname, "properties.html");
        break;
      case "/services":
      case "/services.html":
        filePath = path.join(__dirname, "services.html");
        break;
      case "/agents":
      case "/agents.html":
        filePath = path.join(__dirname, "agents.html");
        break;
      case "/blog":
      case "/blog.html":
        filePath = path.join(__dirname, "blog.html");
        break;
      case "/property-details":
      case "/property-details.html":
        filePath = path.join(__dirname, "property-details.html");
        break;
      case "/service-details":
      case "/service-details.html":
        filePath = path.join(__dirname, "service-details.html");
        break;
      case "/agent-profile":
      case "/agent-profile.html":
        filePath = path.join(__dirname, "agent-profile.html");
        break;
      case "/blog-details":
      case "/blog-details.html":
        filePath = path.join(__dirname, "blog-details.html");
        break;
      case "/terms":
      case "/terms.html":
        filePath = path.join(__dirname, "terms.html");
        break;
      case "/privacy":
      case "/privacy.html":
        filePath = path.join(__dirname, "privacy.html");
        break;
      case "/contact":
      case "/contact.html":
        filePath = path.join(__dirname, "contact.html");
        break;
      default:
        filePath = path.join(__dirname, "404.html");
    }
  }

  const contentTypeMap = {
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
    ".json": "application/json"
  };

  const contentType = contentTypeMap[extname.toLowerCase()] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // File not found or other error -> send 404 page
      fs.readFile(path.join(__dirname, "404.html"), (error404, content404) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content404 || "404 Not Found");
      });
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
