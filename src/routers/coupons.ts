import express, { Request, Response } from "express";
const couponRouter = express.Router();
import { ResponseType } from "../model/response";
import { CouponController } from "../controller/coupons";

couponRouter.get("/coupon", async (req: Request, res: Response) => {
  const coupons: ResponseType = await CouponController.getAllCoupon({
    path: req.path,
  });
  res.json(coupons);
});

couponRouter.get("/coupon/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (id == undefined || id == null || id == "") {
    const response: ResponseType = {
      status: false,
      message: "id is required",
      data: null,
      path: req.path,
    };
    return res.status(400).json(response);
  }

  if (isNaN(Number(id))) {
    const response: ResponseType = {
      status: false,
      message: "id must be a number",
      data: null,
      path: req.path,
    };
    return res.status(400).json(response);
  }

  const coupons: ResponseType = await CouponController.getCouponById({
    id: Number(id),
    path: req.path,
  });

  res.json(coupons);
});

couponRouter.post("/coupon", async (req: Request, res: Response) => {
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

  if (
    body.discount == undefined ||
    body.discount == null ||
    body.discount == ""
  ) {
    const response = {
      status: false,
      message: "discount is required",
      data: null,
      path: req.path,
    };
    return res.status(400).json(response);
  }

  const coupons: ResponseType = await CouponController.createCoupon({
    name: body.name,
    days: Number(body.days),
    discount: Number(body.discount),
    code: body.code,
    path: req.path,
  });
  res.json(coupons);
});

couponRouter.delete("/coupons/:id", async (req: Request, res: Response) => {
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
  res.send(`delete coupons by ${id}`);
});

couponRouter.delete("/coupons", async (req: Request, res: Response) => {
  res.send("5th command");
});

couponRouter.put("/coupons/:id", async (req: Request, res: Response) => {
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
  res.json({ message: `update coupons by ${id}` });
});
export { couponRouter };
