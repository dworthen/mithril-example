var express = require('express'),
  serveStatic = require('serve-static'),
  app = express();

app.use(serveStatic('public'));
app.listen(3000);
