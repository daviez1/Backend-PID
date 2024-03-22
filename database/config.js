
const mongoose = require('mongoose');

const dbConnection = async() => {
  try {

    await mongoose.connect('mongodb://localhost:27017/Laboratorio',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Inline')
    
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar DB')
  }
}

module.exports = {
  dbConnection
}