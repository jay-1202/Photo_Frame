const express = require("express");
const ApiRoute = require("./routes/index");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use('/api', ApiRoute)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
