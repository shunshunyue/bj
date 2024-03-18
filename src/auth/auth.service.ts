import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto, roles } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Like, Repository } from 'typeorm';
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

  async findAll(ops: { role: string, username: string }) {
    return {
      data: await this.user.find({
        where: { username: !!ops.username ? Like(`%${ops.username}%`) : undefined, role: !!ops.role ? Like(`%${ops.role}%`) : undefined }
      })
    }
  }

  async currentUser(request: { user: any }) {
    const findUser = await this.user.findOne({
      where: { id: request.user.userid }
    })
    return {
      roleCongfig: roles[findUser.role],
      ...request.user
    };
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
      userid: findUser.id,
      role: findUser.role
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
    if (!!updateAuthDto.password) updateAuthDto.password = bcryptjs.hashSync(updateAuthDto.password, 10)
    return await this.user.save(updateAuthDto)
  }

  async remove(id: number) {
    let userToRemove = await this.user.findOne({
      where: { id: id }
    });

    return await this.user.remove(userToRemove);
  }

}
