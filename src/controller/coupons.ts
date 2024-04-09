import { prisma } from "../index";
import { errorToString } from "../utils/mothod";
import { ResponseType } from "../model/response";

class Coupon {
  async createCoupon(args: {
    name: string;
    days: number;
    discount: number;
    code: string;
    path: string;
  }): Promise<ResponseType> {
    try {
      const iscouponalreadyexist = await prisma.coupon.findFirst({
        where: {
          code: args.code,
        },
      });

      if (iscouponalreadyexist) {
        const response: ResponseType = {
          status: false,
          message: "coupon already exist",
          data: null,
          path: args.path,
        };
        return response;
      }

      const coupons = await prisma.coupon.create({
        data: {
          name: args.name,
          days: args.days,
          discount: args.discount,
          code: args.code,
        },
      });

      if (!coupons) {
        const response: ResponseType = {
          status: false,
          message: "failed to create coupon",
          data: null,
          path: args.path,
        };
        return response;
      }
      const response: ResponseType = {
        status: true,
        message: "coupon created",
        data: coupons,
        path: args.path,
      };
      return response;
    } catch (e) {
      const response: ResponseType = {
        status: false,
        message: errorToString(e),
        data: null,
        path: args.path,
      };
      return response;
    }
  }

  async getAllCoupon(args: { path: string }): Promise<ResponseType> {
    try {
      const coupons = await prisma.coupon.findMany();

      if (!coupons || coupons.length == 0) {
        const response: ResponseType = {
          status: false,
          message: "failed to get coupons",
          data: null,
          path: args.path,
        };
        return response;
      }
      const response: ResponseType = {
        status: true,
        message: "coupons",
        data: coupons,
        path: args.path,
      };
      return response;
    } catch (e) {
      const response: ResponseType = {
        status: false,
        message: errorToString(e),
        data: null,
        path: args.path,
      };
      return response;
    }
  }

  async getCouponById(args: {
    id: number;
    path: string;
  }): Promise<ResponseType> {
    try {
      const coupon = await prisma.coupon.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!coupon) {
        const response: ResponseType = {
          status: false,
          message: "coupon not found",
          data: null,
          path: args.path,
        };
        return response;
      }
      const response: ResponseType = {
        status: true,
        message: "coupon",
        data: coupon,
        path: args.path,
      };
      return response;
    } catch (e) {
      const response: ResponseType = {
        status: false,
        message: errorToString(e),
        data: null,
        path: args.path,
      };
      return response;
    }
  }

  async deleteAllCoupon(args: { path: string }): Promise<ResponseType> {
    try {
      const deleteAllCoupon = await prisma.coupon.deleteMany({
        where: {
          id: {
            gt: 0,
          },
        },
      });

      if (!deleteAllCoupon) {
        const response: ResponseType = {
          status: false,
          message: "failed to delete coupons",
          data: null,
          path: args.path,
        };
        return response;
      }
      const response: ResponseType = {
        status: true,
        message: "Coupons deleted",
        data: null,
        path: args.path,
      };
      return response;
    } catch (e) {
      const response: ResponseType = {
        status: false,
        message: errorToString(e),
        data: null,
        path: args.path,
      };
      return response;
    }
  }

  async deleteCouponById(args: {
    id: number;
    path: string;
  }): Promise<ResponseType> {
    try {
      const coupon = await prisma.coupon.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!coupon) {
        const response: ResponseType = {
          status: false,
          message: "coupon not found",
          data: null,
          path: args.path,
        };
        return response;
      }
      const deleteCoupon = await prisma.coupon.delete({
        where: {
          id: args.id,
        },
      });

      if (!deleteCoupon) {
        const response: ResponseType = {
          status: false,
          message: "Unable to delete coupon",
          data: coupon,
          path: args.path,
        };
        return response;
      }

      const response: ResponseType = {
        status: true,
        message: "coupon deleted",
        data: coupon,
        path: args.path,
      };
      return response;
    } catch (e) {
      const response: ResponseType = {
        status: false,
        message: errorToString(e),
        data: null,
        path: args.path,
      };
      return response;
    }
  }
}

const CouponController = new Coupon();
export { CouponController };
