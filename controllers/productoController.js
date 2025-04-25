const Producto = require('../models/producto')

//funciones
exports.crearProducto = async (req, res) => {
    try {
        let producto;

        //creamos nuestro producto
        producto = new Producto(req.body);

        await producto.save()
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe este producto' });
        } else {
            res.json(producto);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProductos = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;

        let producto = await Producto.findById(req.params.id); //aca supuestamente se esta ingresando a la base de datos - checker con chat
        if (!producto) {
            res.status(404).json({ msg: 'No existe este producto' })
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (producto) {
            await Producto.findOneAndDelete({ _id: req.params.id });
            res.json({ msg: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'No existe este producto' });
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}