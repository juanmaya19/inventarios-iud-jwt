const Router = require("express");

const {
    createEstado,
    getAllEstados,
    getEstadoByID,
    updateEstadobyID,
    deleteEstadobyID
} = require("../controllers/estados");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();


router.post('/', [validarJWT, verificarRol], createEstado);
router.get('/', [validarJWT, verificarRol], getAllEstados);
router.get("/:id", [validarJWT, verificarRol], getEstadoByID);
router.put("/:id", [validarJWT, verificarRol], updateEstadobyID);
router.delete("/:id", [validarJWT, verificarRol], deleteEstadobyID);

module.exports = router;