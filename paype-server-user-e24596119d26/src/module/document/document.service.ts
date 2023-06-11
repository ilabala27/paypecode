import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepo: Repository<Document>
  ) { }

  public async create(createDocumentDto: CreateDocumentDto) {
    const document: Document = new Document();
    return await this.documentRepo.save({ ...document, ...createDocumentDto });
  }

  public async findAll() {
    return await this.documentRepo.find({
      where: { is_deleted: false }
    })
  }

  public async findOne(id: number) {
    return await this.documentRepo.findOne({
      where: { _id: id, is_deleted: false }
    })
  }

  public async findByFields(body: any) {
    if(!body?.docu_user_id) return []
    return await this.documentRepo.find({ where: body })
  }

  public async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    await this.documentRepo.update(
      { _id: id },
      { ...updateDocumentDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.documentRepo.update(
      { _id: id },
      { is_deleted: true, is_active: false }
    );
    return { success: true, message: "Deleted successfully" }
  }
}
