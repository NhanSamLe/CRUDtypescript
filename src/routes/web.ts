import express from "express";
import type { Application, Request, Response } from "express";
import homeController from "../controllers/homecontroller";

const router = express.Router();

const initWebRoutes = (app: Application): Application => {
  router.get("/", (req: Request, res: Response) => {
    return res.send("Hello World");
  });

  router.get("/home", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.getFindAllCrud);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
    router.get("/get-crud2", homeController.getFindAllCrud2);
  return app.use("/", router);
};

export default initWebRoutes;
