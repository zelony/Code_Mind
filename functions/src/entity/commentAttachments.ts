import {MainEntity} from "../main_entities/mainEntity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TaskComment} from "./taskComment";
@Entity()
export class commentAttachment extends MainEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "text", nullable: true, default: null})
    url: string;
    @Column({type: "int"})
    size: string;
    @Column({type: "varchar", length: 130})
    type: string;
    @Column({type: "varchar", length: 20})
    name: string;
    @ManyToOne(()=>TaskComment,comment => comment.attachments)
    @JoinColumn({name:"commentId"})
    comment:TaskComment
}