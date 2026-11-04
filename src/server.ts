import "dotenv/config";
import express from "express";
import path from "node:path";

const app = express();
const siteDirectory = path.resolve(__dirname, "..", "code");
const port = Number(process.env.PORT ?? 8081);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

app.get("/", (_request, response) => {
  response.sendFile(path.join(siteDirectory, "index.html"));
});

app.use(express.static(siteDirectory));

app.listen(port, () => {
  console.log(`Shoe store is running at http://localhost:${port}`);
});
