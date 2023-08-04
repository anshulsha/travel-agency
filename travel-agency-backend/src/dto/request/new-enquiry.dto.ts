import { IsNumber, IsString, IsEmail, IsMobilePhone, IsArray } from 'class-validator';

export class NewEnquiryRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsMobilePhone()
  phone: string;

  @IsArray()
  @IsString({ each: true })
  destination: string[];

  @IsArray()
  @IsString({ each: true })
  interests: string[];

  @IsNumber()
  noOfTravelers: number;

  @IsNumber()
  budgetPerPerson: number;

  @IsString()
  specialNotes: string;

  @IsNumber()
  tripDuration: number;

  @IsString()
  travelMonth: string;
}
