import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchase,
  stripeWebhook,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router
  .route("/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);

router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);

router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchase);

router.route("/").get(getAllPurchasedCourse);

export default router;
