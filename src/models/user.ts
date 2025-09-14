import {Model, DataTypes, Sequelize} from 'sequelize';
import type { Optional } from 'sequelize';
import {sequelize} from '../config/configdb'
interface UserAttributes{
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address:string;
    phoneNumber:string;
    gender: boolean;
    image?:string;
    roleId:string;
    positionId:string;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    id!: number;
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    address!: string;
    phoneNumber!: string;
    gender!: boolean;
    image?: string;
    roleId!: string;
    positionId!: string;
    static associate(models: any){

    }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
  },
  {
    sequelize, // ⚡ dùng instance import từ config
    modelName: "User",
    tableName: "Users",
  }
);

export default User;