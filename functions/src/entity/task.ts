import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {MainEntity} from "../main_entities/mainEntity";
import {User} from "./user";
import {Team} from "./team";
import {Project} from "./project";
import {TaskFinishing} from "./taskFinishing";
import {Occurrence} from "./occurrence";
import {TaskComment} from "./taskComment";

@Entity()
export class Task extends MainEntity {
    @PrimaryGeneratedColumn({})
    id: string;
    @Column({type: "varchar", length: 80, nullable: true, default: null})
    title: string;
    @Column({type: "text", nullable: true, default: null})
    description: string;
    @Column({type: "date", nullable: true, default: null})
    start:Date;
    @Column({type: "date", nullable: true, default: null})
    deadline:Date;
    @Column({type: "date", nullable: true, default: null})
    closed:Date;
    @Column({type: "date", nullable: true, default: null})
    manager_deadline:Date;
    // @Column({type: "varchar", length: 250, nullable: true, default: null})
    // thumbnail: string;
    @Column({type: "tinyint", default: 0})
    priority: number;
    @Column({type: "tinyint", default: 1})
    points: number;
    @ManyToOne(() => User,(user)=>user.tasks)
    member: User;
    @ManyToOne(() => Team,(team)=>team.tasks)
    team: Team;
    @ManyToOne(() => Task,(task)=>task.children)
    parent: Task;
    @OneToMany(() => Task,(task)=>task.parent)
    children: Task[];
    @ManyToOne(() => Occurrence,(Occurrence)=>Occurrence.tasks)
    occurrence: Occurrence;
    @ManyToOne(() => Project,(project)=>project.tasks)
    project: Project;
    @OneToOne(() => TaskFinishing,(finish)=>finish.task)
    finish: TaskFinishing;
    @OneToMany(() => TaskComment,(comment)=>comment.task)
    comments: TaskComment[];
}