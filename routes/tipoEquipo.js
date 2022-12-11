const {
    Router
} = require("express");

const {
    createTipoEquipo,
    getTipoEquipos,
    getTipoEquipoById,
    updateTipoEquipoById,
    deleteTipoEquipoById
} = require('../controllers/tipoEquipo');

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();

router.post('/', [validarJWT, verificarRol], createTipoEquipo);
router.get('/', [validarJWT, verificarRol], getTipoEquipos);
router.get("/:id", [validarJWT, verificarRol], getTipoEquipoById);
router.put("/:id", [validarJWT, verificarRol], updateTipoEquipoById);
router.delete("/:id", [validarJWT, verificarRol], deleteTipoEquipoById);

module.exports = router;