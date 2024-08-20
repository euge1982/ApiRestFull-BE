//Archivo que contiene el CRUD para el modelo User

const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Registra un nuevo usuario
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
        const existingUser = await User.findOne({ where: { email } });   //Para ver si ya existe un User con ese email
        //Si ya existe manda un msj de error y corta la ejecucion
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: 'El email ya esta en uso' }] });
        }

        //Sino se encuentra el email en uso, se registra al usuario
        const hashedPassword = await bcrypt.hash(password, 12);   //Se hashea(encripta) la contraseña
        const newUser = await User.create({ username, email, password: hashedPassword });   //Se crea el nuevo usuario

        //Se crea el token del newUser
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: newUser });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

//Login del usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });   //Para ver si existe el User con ese email
    //Si no existe manda un msj de error y sale de la ejecucion
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Usuario o contraseña incorrectos' }] });
    }

    //Si encuentra el email, verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    //Si no la encuentra manda un msj de error y sale de la ejecucion
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Usuario o contraseña incorrectos' }] });
    }

    //Se genera un token con el id de usuario
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } 
  catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

//Obtener un usuario por id
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);   //Para ver si el id se encuentra
    //Si no lo encuentra manda un msg de error y saca de la ejecucion
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    //Si lo encuentra devuelve un json con el usuario
    res.json(user);

  } 
  catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

//Actualizar el usuario del id dado
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(id);   //Para ver si existe el usuario del id dado
    //Si no se encuentra devuelve el error y sale de la ejecucion
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    //Si lo encuentra lo modifica con los valores dados
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 12);

    await user.save();   //Lo guarda
    res.json(user);   //Devuelve un json con el usuario modificado

  } 
  catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

//Eliminar un usuario de un id dado
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);   //Para ver si el usuario con el id dado existe

    //Si no existe devuelve el error y sale de la ejecucion
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    //Si existe lo elimina
    await user.destroy();
    res.json({ msg: 'Usuario eliminado' });   //Devuelve un msj de que se elimino

  } 
  catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
