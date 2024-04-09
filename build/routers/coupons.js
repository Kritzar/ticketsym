"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRouter = void 0;
const express_1 = __importDefault(require("express"));
const couponRouter = express_1.default.Router();
exports.couponRouter = couponRouter;
const coupons_1 = require("../controller/coupons");
couponRouter.get("/coupons", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coupons = yield coupons_1.CouponController.getAllCoupon({
        path: req.path,
    });
    res.json(coupons);
}));
couponRouter.get("/coupon/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id == undefined || id == null || id == "") {
        const response = {
            status: false,
            message: "id is required",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    if (isNaN(Number(id))) {
        const response = {
            status: false,
            message: "id must be a number",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    const coupons = yield coupons_1.CouponController.getCouponById({
        id: Number(id),
        path: req.path,
    });
    res.json(coupons);
}));
couponRouter.post("/coupon", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (body.name == undefined || body.name == null || body.name == "") {
        const response = {
            status: false,
            message: "name is required",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    if (body.code == undefined || body.code == null || body.code == "") {
        const response = {
            status: false,
            message: "code is required",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    if (body.days == undefined || body.days == null || body.days == "") {
        const response = {
            status: false,
            message: "days is required",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    if (body.discount == undefined ||
        body.discount == null ||
        body.discount == "") {
        const response = {
            status: false,
            message: "discount is required",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    const coupons = yield coupons_1.CouponController.createCoupon({
        name: body.name,
        days: Number(body.days),
        discount: Number(body.discount),
        code: body.code,
        path: req.path,
    });
    res.json(coupons);
}));
couponRouter.delete("/coupon/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id == undefined || id == null || id == "") {
        const response = {
            status: false,
            message: "id is required",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    if (isNaN(Number(id))) {
        const response = {
            status: false,
            message: "id must be a number",
            data: null,
            path: req.path,
        };
        return res.status(400).json(response);
    }
    const coupons = yield coupons_1.CouponController.deleteCouponById({
        id: Number(id),
        path: req.path,
    });
    res.json(coupons);
}));
couponRouter.delete("/coupons", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coupons = yield coupons_1.CouponController.deleteAllCoupon({
        path: req.path,
    });
    res.json(coupons);
}));
