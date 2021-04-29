"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = require("../controller/home.controller");
const router = express_1.Router();
const homeController = new home_controller_1.HomeController();
router.get('/envio', homeController.envio);
exports.default = router;
//# sourceMappingURL=index.js.map