const fs = require('fs');
const app = require('express')();
const cors = require('cors');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');

const privateKey  = fs.readFileSync('./sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('./sslcert/server.cert', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const httpPort = 3000;
const httpsPort = 3030;

const routes = require('./routes');

app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use('/', routes);

http.createServer(app).listen(httpPort, () => {
  console.log(`listening for connections on port ${httpPort}`);
});

https.createServer(credentials, app).listen(httpsPort, () => {
  console.log(`listening for connections on port ${httpsPort}`);
});
