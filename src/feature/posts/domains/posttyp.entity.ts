import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blogtyp } from '../../blogs/domains/blogtyp.entity';

@Entity()
/*не создает таблицы без
TypeOrmModule.forFeature([Usertyp]),
  в app.module.ts*/
export class Posttyp {
  @ManyToOne(() => Blogtyp, 'posttyp')
  public blogtyp: Blogtyp;

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  content: string;

  @Column()
  blogName: string;

  @Column()
  createdAt: string;
}
