import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posttyp } from '../../posts/domains/posttyp.entity';

@Entity()
export class Commenttyp {
  @ManyToOne(() => Posttyp, 'commenttyp')
  public posttyp: Posttyp;

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column()
  userId: string;

  @Column()
  userLogin: string;
}
