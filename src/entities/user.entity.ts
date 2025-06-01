import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}
