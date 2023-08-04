import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { NewEnquiryRequestDto } from './dto/request/new-enquiry.dto';

@Controller('api/v1/travel')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('enquiry/new')
  async newTravelEnquiry(@Body() body: NewEnquiryRequestDto) {
    return this.appService.newTravelEnquiry(body);
  }

  @Post('enquiry')
  async getTravelEnquiryRecords(@Body() body) {
    return this.appService.getTravelEnquiryRecords(
      body.startDate,
      body.endDate,
    );
  }
}
