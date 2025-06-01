import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'requestlog',
})
export class RequestLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  requestedAt: Date;

  @Column()
  path: string;

  @Column()
  successfullyRedirected: boolean;
}
