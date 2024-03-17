import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt"
import * as bcryptjs from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly JwtService: JwtService
  ) { }


  async create(createAuthDto: CreateAuthDto) {
    const findUser = await this.user.findOne({
      where: { username: createAuthDto.username }
    })
    if (findUser && findUser.username === createAuthDto.username) return "用户已存在"
    // 对密码进行加密处理
    createAuthDto.password = bcryptjs.hashSync(createAuthDto.password, 10)
    await this.user.save(createAuthDto)

    return '新增成功';
  }

  async findAll() {
    return {
      data: await this.user.find()
    }
  }

  currentUser(request: { user: any }) {
    return request.user;
    // return `This action returns all auth`;
  }
  async login(loginDto: LoginDto) {
    const findUser = await this.user.findOne({
      where: { username: loginDto.username }
    })
    // 没有找到
    if (!findUser) return new BadRequestException("用户不存在")

    // 找到了对比密码
    const compareRes: boolean = bcryptjs.compareSync(loginDto.password, findUser.password)
    // 密码不正确
    if (!compareRes) return new BadRequestException("密码不正确")
    const payload = {
      name: findUser.username,
      userid: findUser.id
    }

    return {
      access_token: this.JwtService.sign(payload),
      msg: "登录成功"
    }
  }
  // 注册
  async signup(signupData: LoginDto) {
    const findUser = await this.user.findOne({
      where: { username: signupData.username }
    })
    if (findUser && findUser.username === signupData.username) return "用户已存在"
    // 对密码进行加密处理
    signupData.password = bcryptjs.hashSync(signupData.password, 10)
    await this.user.save(signupData)
    return "注册成功"
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    await this.user.save(updateAuthDto)
    return await this.user.save(updateAuthDto)
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
