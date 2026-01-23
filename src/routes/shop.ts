import { Router } from 'express';
import * as shopController from '../controllers/shop';

const router = Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/add-to-cart', shopController.postCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.post('/cart-delete-item', shopController.postCartDelete);

export default router;
