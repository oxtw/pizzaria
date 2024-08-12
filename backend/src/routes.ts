import { Router } from "express";
import multer from "multer";

//user
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

//category
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

//product
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

//order
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
//middleware auth
import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

//Rota privada com middleware
router.get("/me", isAuthenticated, new DetailUserController().handle);

//-- ROTAS CATEGORY --
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// -- ROTAS PRODUCT --

router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

//rota para filtrar produtos por categoria.
router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

//-- ROTAS ORDER --

router.post("/order", isAuthenticated, new CreateOrderController().handle);

router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

export { router };
