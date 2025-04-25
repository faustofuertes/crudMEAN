const express =  require('express');
const  conectarDB = require('./config/db')
const cors = require('cors');

//creamos servidor
const app = express();

//conectamos db
conectarDB();
app.use(cors());

app.use(express.json());

app.use('/api/productos' , require('./routes/producto'));

//hacemos que nuestro servidor escuche por el puerto 4000
app.listen(4000, ()=>{
    console.log('El servidor esta corriendo perfectamente')
})

