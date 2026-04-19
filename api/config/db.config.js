const mongoose = require('mongoose');

function DB()
{
mongoose.connect('mongodb://localhost:27017/exercise')
  .then(() => console.log('Connected!'));
}

module.exports={DB}