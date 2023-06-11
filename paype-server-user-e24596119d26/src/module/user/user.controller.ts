import { Controller, Get, Post, Body, Param, Delete, Put, Headers, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, IFindOnBoardingStatus } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JWTGrantGuard } from 'src/common/middleware/grant/default.grant';


@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'The user account has been successfully created.',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto, @Headers() headers): Promise<User> {
    return this.userService.create(createUserDto, headers);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Post('by-fields')
  findByFields(@Body() body: any) {
    return this.userService.findByFields(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers() headers) {
    return this.userService.updateById(+id, updateUserDto, headers);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('/onboarded/status')
  findOnBoardingStatus(@Query() query: IFindOnBoardingStatus) {
    return this.userService.findOnBoardingStatus(query);
  }
  
}
