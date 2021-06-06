"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = process.env.PORT || 5000;
app.use(cookie_parser_1.default());
app.use(cors_1.default());
const add = (x) => {
    return x.a + x.b;
};
app.get("/", (req, res) => {
    res.send("sdaddsaasd");
});
app.listen(PORT, () => {
    console.log("Server is started !");
});
