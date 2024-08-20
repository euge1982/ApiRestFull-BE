//Archivo con la autenticacion

const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');   //Se obtiene el token

  //Si no existe manda un msj de error y sale de la ejecucion
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  //Se constata que el token sea el correcto
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();   //Pasa a la funcion que sigue
  } 
  catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
