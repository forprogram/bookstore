const app = require('koa')();
const cors = require('koa-cors');
const mongoose = require('mongoose');
const session = require('koa-session-store');
const mongoStore = require('koa-session-mongo');
const bodyParser = require('koa-bodyparser');
mongoose.connect('mongodb://localhost/lzn');

app.use(bodyParser());

app.use(cors({
	credentials:true,
}));

app.keys = ['forProgram'];
app.use(session({
  store: mongoStore.create({
    mongoose: mongoose.connection,
    collection:'sessions',
    
  }),
}));
require('./router/routes.js')(app);
app.listen(2017);