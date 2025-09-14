import type { Request, Response } from "express";
import * as CRUDService from "../service/CRUDservices"; // import toàn bộ hàm từ service

// Trang chủ
export async function getHomePage(req: Request, res: Response) {
  try {
    const data = await CRUDService.getAllUsers();
    console.log(data);
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
}

// Trang About
export function getAboutPage(req: Request, res: Response) {
  return res.render("about.ejs");
}

// Trang CRUD demo
export function getCRUD(req: Request, res: Response) {
  return res.render("crud.ejs");
}

// Xem tất cả user
export async function getFindAllCrud(req: Request, res: Response) {
  try {
    const data = await CRUDService.getAllUsers();
    // Chuyển toàn bộ instance Sequelize thành plain object
    const plainData = data.map(u => u.toJSON());

    console.log(plainData[0]?.email); // giờ sẽ hiện đúng
    return res.render("users/findAllUser", { datalist: plainData });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
}
export async function getFindAllCrud2(req: Request, res: Response) {
  try {
    const data = await CRUDService.getAllUsers();
    return res.json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
}


// Tạo user mới
export async function postCRUD(req: Request, res: Response) {
  try {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("User created successfully");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Create user failed");
  }
}

// Lấy dữ liệu để edit user
export async function getEditCRUD(req: Request, res: Response) {
  const userId = Number(req.query.id);
  if (userId) {
    const userData = await CRUDService.getUserById(userId);
    if (userData) {
      return res.render("users/editUser.ejs", { data: userData.toJSON() });
    }
    return res.send("User not found");
  }
  return res.send("User ID missing");
}

// Update user
export async function putCRUD(req: Request, res: Response) {
  try {
    const message = await CRUDService.updateUserData(req.body);
    console.log(message);

    const data = await CRUDService.getAllUsers();
    const plainData = data.map(u => u.toJSON()); // convert instance -> plain object

    return res.render("users/findAllUser.ejs", { datalist: plainData });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Update user failed");
  }
}

// Delete user
export async function deleteCRUD(req: Request, res: Response) {
  const userId = Number(req.query.id);
  if (userId) {
    await CRUDService.deleteUserById(userId);
    return res.send("User deleted successfully");
  }
  return res.send("User not found");
}

export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  getFindAllCrud,
  postCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
  getFindAllCrud2
};
