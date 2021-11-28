import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MainEntity} from "../main_entities/mainEntity";
import {Task} from "./task";
export enum OccurrenceRunType {
    ONCE,
    DAILY,
    WEEKLY,
    MONTHLY,
    YEARLY
}
@Entity()
export class Occurrence extends MainEntity {
    @PrimaryGeneratedColumn({})
    id: string;
    @OneToMany(() => Task,(task)=>task.occurrence)
    tasks: Task[];
    @Column({type:"enum",enum:OccurrenceRunType,default:OccurrenceRunType.ONCE})
    type:OccurrenceRunType
    @Column({type:"varchar",length:10})
    at:string


}