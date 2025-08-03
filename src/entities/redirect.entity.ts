import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'redirect',
})
export class RedirectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  redirectTo: string;
}
