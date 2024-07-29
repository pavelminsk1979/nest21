import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usertyp {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public login: string;

  @Column()
  public passwordHash: string;

  @Column()
  public email: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public confirmationCode: string;

  @Column()
  public isConfirmed: string;

  @Column()
  public expirationDate: Date;
}

/*ТУТ В АРГУМЕНТ ПОМЕЩАЕТСЯ КЛАСС User  и в переменную
UserSchema  получаю СХЕМУ*/
//export const UserSchema = SchemaFactory.createForClass(User);
