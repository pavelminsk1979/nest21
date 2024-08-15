import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
/*не создает таблицы без
TypeOrmModule.forFeature([Usertyp]),
  в app.module.ts*/
export class Blogtyp {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ collation: 'C' })
  name: string;

  @Column()
  description: string;

  @Column()
  websiteUrl: string;

  @Column()
  createdAt: string;

  @Column()
  isMembership: boolean;
}
