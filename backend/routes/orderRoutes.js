import express from 'express';
/* eslint-disable */
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
/* eslint-disable */

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/pay").put(protect, admin, updateOrderToDelivered);

export default router;
