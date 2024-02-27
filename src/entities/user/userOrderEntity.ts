import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserOrder {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column({ type: "uuid", nullable: false, name: "user_uuid" })
  userUuid: string;

  @Column({ type: "uuid", nullable: false, name: "order_uuid" })
  orderUuid: string;

  @Column({ type: "timestamp", nullable: false, name: "created_timestamp" })
  createdTimestamp: Date;

  @Column({ type: "timestamp", nullable: false, name: "modified_timestamp" })
  modifiedTimestamp: Date;
}
