import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {MainEntity} from "../main_entities/mainEntity";
import {User} from "./user";
import {Task} from "./task";

@Entity()
export class TaskFinishing extends MainEntity {
    @PrimaryGeneratedColumn({})
    id: string;
    @Column({type: "date", nullable: true, default: null,})
    at:Date;
    // @Column({type: "varchar", length: 250, nullable: true, default: null})
    // thumbnail: string;
    @ManyToOne(() => User,(user)=>user.finishStats)
    admin: User;
    @Column({type: "tinyint", default: 0})
    rate: number;
    @Column({type: "tinyint", default: 0})
    bonus: number;
    @Column({type: "tinyint", default: 0})
    points: number;
    @OneToOne(() => Task,(task)=>task.finish)
    @JoinColumn({name:"taskId"})
    task: Task;
}