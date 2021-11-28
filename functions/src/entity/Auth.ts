import {
  Entity,
  Column,
  BaseEntity, PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: "varchar", length: 80, unique: true, nullable: true, default: null})
  email: string;

  @Column({type: "varchar", length: 20, unique: true, nullable: true, default: null})
  phone: string;

  @Column({type: "boolean", default: false})
  facebook: boolean;

  @Column({type: "boolean", default: false})
  google: boolean;
}
