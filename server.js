var connect = require('connect');
var servreStatic = require('serve-static');

app = connect();

app.use(servreStatic(__dirname + "/angularjs"));
app.listen(5000);