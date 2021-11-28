import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MainEntity} from "../main_entities/mainEntity";
import {User} from "./user";
import {Task} from "./task";
import {commentAttachment} from "./commentAttachments";
@Entity()
export class TaskComment extends MainEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 150, default: null})
    text: string;
    @ManyToOne(()=>User,user => user.comments)
    @JoinColumn({name:"userId"})
    user:User
    @ManyToOne(()=>Task,task => task.comments)
    @JoinColumn({name:"taskId"})
    task:Task
    @OneToMany(() => commentAttachment,(attach)=>attach.comment)
    attachments: commentAttachment[];
    // @Column({type: "text", default: null})
    // description:string;

}
