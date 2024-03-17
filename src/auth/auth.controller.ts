import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './dto/pubg';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Public()
  @Post("/login")
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Public()
  @Post("/register")
  register(@Body() loginDto: LoginDto) {
    return this.authService.signup(loginDto);
  }
  @Get("/currentUser")
  currentUser(@Req() request: any) {
    return this.authService.currentUser(request);
  }
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
