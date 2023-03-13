"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const video_routes_1 = require("./routes/video-routes");
exports.app = (0, express_1.default)();
const middleWere = (0, body_parser_1.default)({});
exports.app.use(middleWere);
exports.app.use('/videos', video_routes_1.productRouter);
exports.app.use('/testing', video_routes_1.productRouter);
