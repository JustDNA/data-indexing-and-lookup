var express = require("express");
var app = express();

const { notFound, errorHandler } = require('./middlewares');

const search = require('./routes/search');

app.use('/search', search);
app.use(notFound);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
