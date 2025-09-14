import bcrypt from "bcryptjs";
import {  User } from "../models/user"; // import trực tiếp model
import type {UserCreationAttributes } from "../models/user"
import type { Optional } from "sequelize";

const salt = bcrypt.genSaltSync(10);
// initUserModel(sequelize);
// 🔑 Hàm hash password
async function hashUserPassword(password: string): Promise<string> {
  return bcrypt.hash(password, salt);
}

export async function createNewUser(data: UserCreationAttributes): Promise<string> {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await User.create({
      ...data,
      password: hashPasswordFromBcrypt,
    });
    return "Create user succeed!";
  } catch (error) {
    throw error;
  }
}

// 🔑 Lấy tất cả user (ẩn password)
export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (error) {
    throw error;
  }
}

// 🔑 Lấy user theo ID (ẩn password)
export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// 🔑 Cập nhật user
export async function updateUserData(
  data: Partial<UserCreationAttributes> & { id: number }
): Promise<string> {
  try {
    const user = await User.findOne({ where: { id: data.id } });
    if (user) {
      user.set({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        image: data.image,
        roleId: data.roleId,
        positionId: data.positionId,
      });
      await user.save();
      return "Update user succeed!";
    }
    return "User not found!";
  } catch (error) {
    throw error;
  }
}

// 🔑 Xóa user theo ID
export async function deleteUserById(userId: number): Promise<string> {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      await user.destroy();
      return "Delete user succeed!";
    }
    return "User not found!";
  } catch (error) {
    throw error;
  }
}

export default {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserData,
  deleteUserById,
};