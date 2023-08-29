const express = require('express');
const app = express();

require('./config/db.config')




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Application running at port ${PORT}`));
