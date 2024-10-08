"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const orderController_1 = require("../controller/orderController");
const orderRoute = express_1.default.Router();
orderRoute.route("/createCheckout").post(authMiddleware_1.VerifyToken, (0, asyncHandler_1.AsyncErrorHandler)(orderController_1.createCheckoutSession));
orderRoute.route("/checkout/webhook").post((0, asyncHandler_1.AsyncErrorHandler)(orderController_1.stripeWebookHandler));
orderRoute.route("/sellerOrder").get(authMiddleware_1.VerifyToken, (0, asyncHandler_1.AsyncErrorHandler)(orderController_1.GetSellerOrderHandler));
orderRoute.route("/buyerOrder").get(authMiddleware_1.VerifyToken, (0, asyncHandler_1.AsyncErrorHandler)(orderController_1.BuyerOrderHandler));
orderRoute.route("/changeOrderStatus/:id").put(authMiddleware_1.VerifyToken, (0, asyncHandler_1.AsyncErrorHandler)(orderController_1.ChangeOrderStatus));
exports.default = orderRoute;
