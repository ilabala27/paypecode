import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid/async';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';
import { Repository } from 'typeorm';
import { CreateRazorPayDto } from './dto/create-razor-pay.dto';
import { UpdateRazorPayDto } from './dto/update-razor-pay.dto';
import { RazorPay } from './entities/razor-pay.entity';
import { razorPayDefaultQuery } from './razor-pay.query';



@Injectable()
export class RazorPayService {
  constructor(
    @InjectRepository(RazorPay)
    private razorPayRepo: Repository<RazorPay>
  ) { }

  public async create(createCashDepositDto: CreateRazorPayDto) {
    try {
      createCashDepositDto.rapa_id = await nanoid(24)
      const razorPay: RazorPay = new RazorPay();
      return await this.razorPayRepo.save({ ...razorPay, ...createCashDepositDto });
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findAll() {
    try {
      return await this.razorPayRepo.find({
        where: { rapa_is_deleted: false }
      })
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findAllByQuery(query: object) {
    try {
      const { _id, user_id, status }: any = query
      return await this.razorPayRepo
        .createQueryBuilder('razorPay')
        .where("razorPay.rapa_is_deleted = false")
        .andWhere(razorPayDefaultQuery, { _id, user_id, status })
        .orderBy('razorPay.rapa_created_at', 'DESC')
        .getMany();
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findOneByQuery(query: object) {
    try {
      const { _id, user_id, status }: any = query
      return await this.razorPayRepo
        .createQueryBuilder('razorPay')
        .where("razorPay.rapa_is_deleted = false")
        .andWhere(razorPayDefaultQuery, { _id, user_id, status })
        .getOne();
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async update(id: string, updateCashDepositDto: UpdateRazorPayDto) {
    try {
      const { rapa_id, ...rest } = updateCashDepositDto
      await this.razorPayRepo.update(
        { rapa_id: id },
        { ...rest }
      );
      return await this.findOneByQuery({ _id: id })
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async remove(id: number) {
    try {
      await this.razorPayRepo.update(
        { _id: id },
        { rapa_is_deleted: true, rapa_is_active: false }
      );
      return { success: true, message: "Deleted successfully" }
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

}