import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  position!: string;

  @Column()
  department!: string;
}
