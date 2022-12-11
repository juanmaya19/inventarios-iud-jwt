const Router = require("express");

const {
    createMarcas,
    getAllMarcas,
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
} = require("../controllers/marcas");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();


router.post('/', [validarJWT, verificarRol], createMarcas);
router.get('/', [validarJWT, verificarRol], getAllMarcas);
router.get("/:id", [validarJWT, verificarRol], getMarcaByID);
router.put("/:id", [validarJWT, verificarRol], updateMarcaByID);
router.delete("/:id", [validarJWT, verificarRol], deleteMarcaByID);

module.exports = router