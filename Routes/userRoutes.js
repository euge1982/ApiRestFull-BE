//Archivo que define las rutas relacionadas con el modelo 'User'
//Y las asocia con los metodos del controlador que corresponde

const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../Controllers/userController');
const { authMiddleware } = require('../Middlewares/authMiddleware');
const { param, body } = require('express-validator');

const router = express.Router();

//Ruta para registrar un usuario
router.post('/register', [
  body('username').not().isEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], registerUser);

//Ruta para loguear a un usuario
router.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').not().isEmpty().withMessage('La contraseña es obligatoria')
  ], loginUser);
  
//Ruta para obtener datos de un usuario con un id dado
router.get('/:id', authMiddleware, [
    param('id').isInt().withMessage('ID inválido')
  ], getUser);  
 
//Ruta para actualizar datos de un usuario con un id dado
router.put('/:id', authMiddleware, [
  param('id').isInt().withMessage('ID inválido'),
  body('username').optional().not().isEmpty().withMessage('El nombre de usuario no puede estar vacío'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], updateUser);
  
//Ruta para eliminar un usuario con un id dado
router.delete('/:id', authMiddleware, [
  param('id').isInt().withMessage('ID inválido')
], deleteUser);
  
module.exports = router;
