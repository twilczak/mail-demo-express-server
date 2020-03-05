const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('listening for connections on port 3000');
});
