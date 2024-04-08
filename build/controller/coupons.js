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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const __1 = require("..");
const mothod_1 = require("../utils/mothod");
class Coupon {
    createCoupon(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupons = yield __1.prisma.coupon.create({
                    data: {
                        name: args.name,
                        days: args.days,
                        discount: args.discount,
                        code: args.code,
                    },
                });
                if (!coupons) {
                    const response = {
                        status: false,
                        message: "failed to create coupon",
                        data: null,
                        path: args.path,
                    };
                    return response;
                }
                const response = {
                    status: true,
                    message: "coupon created",
                    data: coupons,
                    path: args.path,
                };
                return response;
            }
            catch (e) {
                const response = {
                    status: false,
                    message: (0, mothod_1.errorToString)(e),
                    data: null,
                    path: args.path,
                };
                return response;
            }
        });
    }
    getAllCoupon(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupons = yield __1.prisma.coupon.findMany();
                if (!coupons || coupons.length == 0) {
                    const response = {
                        status: false,
                        message: "failed to get coupons",
                        data: null,
                        path: args.path,
                    };
                    return response;
                }
                const response = {
                    status: true,
                    message: "coupons",
                    data: coupons,
                    path: args.path,
                };
                return response;
            }
            catch (e) {
                const response = {
                    status: false,
                    message: (0, mothod_1.errorToString)(e),
                    data: null,
                    path: args.path,
                };
                return response;
            }
        });
    }
    getCouponById(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = __1.prisma.coupon.findUnique({
                    where: {
                        id: args.id,
                    },
                });
                if (!coupon) {
                    const response = {
                        status: false,
                        message: "coupon not found",
                        data: null,
                        path: args.path,
                    };
                    return response;
                }
                const response = {
                    status: true,
                    message: "coupon",
                    data: coupon,
                    path: args.path,
                };
                return response;
            }
            catch (e) {
                const response = {
                    status: false,
                    message: (0, mothod_1.errorToString)(e),
                    data: null,
                    path: args.path,
                };
                return response;
            }
        });
    }
}
const CouponController = new Coupon();
exports.CouponController = CouponController;
