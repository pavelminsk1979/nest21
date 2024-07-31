import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usertyp {
  /*----- @PrimaryGeneratedColumn()  декоратор определяет
    поле которое является главнымКлючом
    ОБЯЗАТЕЛЬНО НАДО СОЗДАТЬ ТАКУЮ КАЛОНКУ В КАЖДОЙ
    ТАБЛИце с таким декоратором
  -для типа данных  можно  @PrimaryGeneratedColumn('uuid')
  ---если по умолчанию вроде будет считать
    1,2,3,4 и так далее
    причем если удалить значения то вроде не с еденицы
    продолжит а с места остановки*/
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /*  @Column()  много доп свойств - надо провалится
    в него и покапатся--- также можно провалитватся
    во внутренние - вроде в типы надо проваливатся а не
    в значения

    например
@Column({nullable:true})  если поле может быть null


например
@Column({default:'22222'})  можно значение по дефолту

    */

  @Column()
  public login: string;

  @Column()
  public passwordHash: string;

  @Column()
  public email: string;

  @Column()
  public createdAt: Date;

  @Column()
  public confirmationCode: string;

  @Column()
  public isConfirmed: boolean;

  @Column()
  public expirationDate: Date;
}

/*
@CreateDateColumn()   дата будет создаватся автоматически
@UpdateDateColumn()  при обновлении сущности
автоматом обновит дату*/
