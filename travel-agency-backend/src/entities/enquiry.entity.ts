import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('enquiry')
export class Enquiry {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column('varchar', { array: true, default: [] })
  destination: string[];

  @Column('varchar', { array: true, default: [] })
  interests: string[];

  @Column()
  noOfTravelers: number;

  @Column()
  budgetPerPerson: number;

  @Column()
  specialNotes: string;

  @Column('varchar') // Use 'varchar' instead of 'string'
  travelMonth: string;

  @Column()
  tripDuration: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;
}
