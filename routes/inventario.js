const Router = require("express");

const {
    getAllInventario,
    createInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImageByID,
    getImageByID
} = require("../controllers/inventario");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();

router.post('/', [validarJWT, verificarRol], createInventario);
router.get('/', getAllInventario);
router.get("/:id", getInventarioByID);
router.put("/:id", [validarJWT, verificarRol], updateInventarioByID);
router.delete("/:id", [validarJWT, verificarRol], deleteInventarioByID);


router.post("/inventario/:id/image", uploadImageByID)
router.get("/inventario/:id/image", getImageByID)

module.exports = router