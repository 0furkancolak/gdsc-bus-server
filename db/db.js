const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Bağlandı!!!'))
        .catch(err => console.log('Database Hatası: ' + err));
}