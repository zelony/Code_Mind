import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
export class MainEntity extends BaseEntity {
    @Column()
    @CreateDateColumn()
    createdAt: Date;
    // @ts-ignore
    @Column()
    @UpdateDateColumn()
    updatedAt!: Date;
}
