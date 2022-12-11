const Router = require("express");

const {
    createUsuario,
    getAllUsuarios,
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID
} = require("../controllers/usuarios");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();


router.post('/', [validarJWT, verificarRol], createUsuario);
router.get('/', [validarJWT, verificarRol], getAllUsuarios);
router.get("/:id", [validarJWT, verificarRol], getUsuarioByID);
router.put("/:id", [validarJWT, verificarRol], updateUsuarioByID);
router.delete("/:id", [validarJWT, verificarRol], deleteUsuarioByID);

module.exports = router