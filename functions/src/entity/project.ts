import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MainEntity} from "../main_entities/mainEntity";
import {User} from "./user";
import {Team} from "./team";
import {Task} from "./task";

@Entity()
export class Project extends MainEntity {
    @PrimaryGeneratedColumn({})
    id: string;
    @Column({type: "varchar", length: 80, nullable: true, default: null})
    name: string;
    @Column({type: "text", nullable: true, default: null})
    description: string;
    @Column({type: "varchar", length: 10, nullable: true, default: null})
    color: string;
    @Column({type: "date", nullable: true, default: null})
    start:Date;
    @Column({type: "date", nullable: true, default: null})
    finish:Date;
    @Column({type: "date", nullable: true, default: null})
    deadline:Date;
    @Column({type: "varchar", length: 250, nullable: true, default: null})
    thumbnail: string;
    @Column({type: "tinyint", default: 0})
    priority: number;
    @ManyToOne(() => User,(user)=>user.projects)
    admin: User;
    @OneToMany(() => Task,(task)=>task.project)
    tasks: Task[];
    @ManyToMany(() => Team,(team)=>team.projects)
    @JoinTable()
    teams: Team[];
}