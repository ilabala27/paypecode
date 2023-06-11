import { Controller, Get, Post, Body, Param, Delete, Put, Query, Headers, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { cipherDto } from 'src/common/cipher/cipher.dto';
import { CreateRazorPayDto } from './dto/create-razor-pay.dto';
import { UpdateRazorPayDto } from './dto/update-razor-pay.dto';
import { RazorPayService } from './razor-pay.service';
import { RazorPayTransactService } from './special-services/razor-pay-transact.service';

@ApiTags('razor-pay')
@Controller('razor-pay')
export class RazorPayController {
  constructor(
    private readonly razorPayService: RazorPayService,
    private readonly razorPayTransactService: RazorPayTransactService
  ) { }

  @Post()
  create(@Body() createRazorPayDto: CreateRazorPayDto) {
    return this.razorPayService.create(createRazorPayDto);
  }

  @Get()
  findAll() {
    return this.razorPayService.findAll();
  }

  @Get('entries/query')
  findAllByQuery(@Query() query: object) {
    return this.razorPayService.findAllByQuery(query);
  }

  @Get('entry/query')
  findOneByQuery(@Query() query: object) {
    return this.razorPayService.findOneByQuery(query);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRazorPayDto: UpdateRazorPayDto) {
    return this.razorPayService.update(id, updateRazorPayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.razorPayService.remove(+id);
  }

  // ### Speical services
  @Post('transact/:_id/:status')
  razarPayTransaction(
    @Headers() headers: any,
    @Param() query: any,
    @Body() transactionDto: cipherDto
  ) {
    return this.razorPayTransactService.razarPayTransaction(headers, query, transactionDto);
  }

}