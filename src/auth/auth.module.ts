import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/auth.entity'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "../constants"
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn }
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
