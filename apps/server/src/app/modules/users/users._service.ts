// import { Injectable } from '@nestjs/common';
// // import { Model } from 'mongoose';
// // import { InjectModel } from '@nestjs/mongoose';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './interfaces/user.interface';

// @Injectable()
// export class UsersService {
//   constructor() {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const createdUser = new this.userModel(createUserDto);
//     return await createdUser.save();
//   }

//   async findOne(email: string): Promise<User> {
//     return await this.userModel.findOne({ email }, '-__v').exec();
//   }
// }
