import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'redirect',
})
export class RedirectEntity {
  @PrimaryColumn()
  path: string;

  @Column()
  redirectTo: string;
}
