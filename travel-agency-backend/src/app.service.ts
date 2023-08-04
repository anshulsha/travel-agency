import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, LessThanOrEqual, Repository } from 'typeorm';
import * as EXPECTIONS from './common/customExceptions/custom.exceptions';
import * as moment from 'moment';
import { Enquiry } from './entities/enquiry.entity';
import { NewEnquiryRequestDto } from './dto/request/new-enquiry.dto';
import { Between } from 'typeorm';

@Injectable()
export class AppService {
  readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Enquiry) private enquiryRepo: Repository<Enquiry>,
  ) {}

  async newTravelEnquiry(data: NewEnquiryRequestDto) {
    this.logger.log(`--- Entered in new travel enquiry handler ---`);
    try {
      const new_enquiry = this.enquiryRepo.create(data);
      return await this.enquiryRepo.save(new_enquiry);
    } catch (e) {
      this.logger.error(
        `--- Error occured in new travel enquiry handler, Error: ${JSON.stringify(
          e.message,
        )}---`,
      );
    }
  }

  async getTravelEnquiryRecords(startDate: string, endDate: string) {
    this.logger.log(
      `--- Entered in get all travel enquiry records handler, Payload: { startDate: ${startDate}, endDate: ${endDate} } ---`,
    );
    try {
      let whereClause: any = {};
      let sortField = 'createdAt';
      if (startDate && !endDate) {
        endDate = startDate;
      } else if (!startDate && endDate) {
        startDate = endDate;
      }

      // if (startDate && endDate) {
      //   let startMoment = moment(startDate, 'DD/MM/YYYY');
      //   let endMoment = moment(endDate, 'DD/MM/YYYY');

      //   if (startMoment.isAfter(endMoment)) {
      //     // Swap startDate and endDate if startDate is greater than endDate
      //     const temp = startMoment;
      //     startMoment = endMoment;
      //     endMoment = temp;
      //   }

      //   whereClause[sortField] = {
      //     $gte: startMoment.startOf('day').toDate(),
      //     $lte: endMoment.endOf('day').toDate(),
      //   };
      // }

      if (startDate && endDate) {
        let startMoment = moment(startDate, 'DD/MM/YYYY');
        let endMoment = moment(endDate, 'DD/MM/YYYY');

        if (startMoment.isAfter(endMoment)) {
          // Swap startDate and endDate if startDate is greater than endDate
          const temp = startMoment;
          startMoment = endMoment;
          endMoment = temp;
        }

        whereClause[sortField] = Between(
          startMoment.startOf('day').toDate(),
          endMoment.endOf('day').toDate(),
        );
      }
      console.log(whereClause);
      const all_enquiries = await this.enquiryRepo.find({
        where: whereClause,
        // order: {
        //   [sortField]: 'ASC',
        // },
      });
      return all_enquiries;
    } catch (e) {
      this.logger.error(
        `--- Error occured in get all travel enquiry records handler, Error: ${JSON.stringify(
          e.message,
        )}---`,
      );
    }
  }
}
