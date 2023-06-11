import { Body, Controller, Get, Post } from '@nestjs/common';
import { JWTGrantGuard } from 'src/common/middleware/grant/default.grant';
import { GetOptionsDto, GetAuthorizationDto } from './dto/rbac.dto';
import { RBACInitService } from './init.service';
import { RBACService } from './rbac.service';

@Controller('rbac')
export class RbacController {
  constructor(
    private readonly rbacInitService: RBACInitService,
    private readonly rbacService: RBACService
  ) { }

  @JWTGrantGuard()
  @Get('/init')
  init() {
    return this.rbacInitService.init();
  }

  @JWTGrantGuard()
  @Get('/de-init')
  deInit() {
    return this.rbacInitService.deInit();
  }

  @Post('/options')
  getOptions(@Body() getOptions: GetOptionsDto) {
    return this.rbacService.getOptions(getOptions);
  }

  @Post('/authorization')
  getAuthorization(@Body() getAuthorizationDto: GetAuthorizationDto) {
    return this.rbacService.getAuthorization(getAuthorizationDto);
  }
}
