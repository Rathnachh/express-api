// import { QueryParams } from "src/controllers/user.controller";
import { User, userModel } from "../models/userModel"; // Assuming you have a UserModel

interface PaginateType {
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
}
export class UserRepository {
  async getById({ userId }: { userId: string }) {
    return await userModel.findById(userId);
  }

  // async getAll(options: QueryParams) {
  //   const { page, limit } = options;

  //   const skip: number = (page - 1) * limit;

  //   const usersData = await userModel.find().skip(skip).limit(limit).exec();

  //   const totalDocuments: number = await userModel.countDocuments();
  //   const totalPages: number = Math.ceil(totalDocuments / limit);

  //   const pagination: PaginateType = {
  //     currentPage: page,
  //     totalPages: totalPages,
  //     totalDocuments: totalDocuments,
  //   };

  //   return { usersData, pagination };
  // }
  

  async countAll(): Promise<number> {
    return await userModel.countDocuments({});
  }

  async updateById(userId: string, userData: any) {
    return await userModel.findByIdAndUpdate(userId, userData);
  }

  async deleteById(userId: string) {
    return await userModel.findByIdAndDelete(userId);
  }

  async create(userData: any) {
    return await userModel.create(userData);
  }

  async getUserByToken({ token }: { token: string }) {
    try {
      return await userModel.findOne({ verificationToken: token });
    } catch (error) {
      console.error("Error fetching user by token:", error);
      throw error;
    }
  }
}