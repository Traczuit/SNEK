const express = require("./node_modules/express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public/'));

app.get("/", (req, res) => res.sendFile('index.html'));

app.listen(port, () => console.log(`example listening to port ${port}`));
