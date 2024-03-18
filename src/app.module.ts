import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql', // 数据库类型
    host: '192.168.1.17', // 主机名
    port: 3306, // 端口
    username: 'root', // 用户名
    password: 'Yss123123', // 密码
    database: 'bj', // 数据库名称
    synchronize: true,
    retryDelay: 500, //重试连接数据库间隔
    retryAttempts: 10,//重试连接数据库的次数
    autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
