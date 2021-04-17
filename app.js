const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const schema = require('./schema');
const indexRoute = require('./routes/index-route');;

dotenv.config();
connectDB();
const app = express();

app.use(express.json({
    extended: true
}));

app.use('/graphiql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.use('/', indexRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;