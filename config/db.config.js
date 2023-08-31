const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://Naruto35:L1234@tinderbook.jimgrgt.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.info(`Successfully connected to the database ${MONGO_URI}`))
    .catch((error) => console.error(`An error ocurred trying to connect to the database ${MONGO_URI}`))