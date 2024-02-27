import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column({ type: "varchar", nullable: false, name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", nullable: true, name: "last_name" })
  lastName: string;

  @Column({ type: "varchar", nullable: true, name: "phone" })
  phone: string;

  @Column({ type: "varchar", nullable: true, name: "email" })
  email: string;

  @Column({ type: "uuid", nullable: true, name: "user_uuid" })
  userUuid: string;
}
