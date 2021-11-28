import {
    Entity,
    Column,
    ManyToMany, PrimaryGeneratedColumn, OneToMany, ManyToOne,
} from "typeorm";
import {MainEntity} from "../main_entities/mainEntity";
import {User} from "./user";
import {Project} from "./project";
import {Task} from "./task";
@Entity()
export class Team extends MainEntity {
    @PrimaryGeneratedColumn({})
    id: string;
    @Column({type: "varchar", length: 80, nullable: true, default: null})
    name: string;
    @Column({type: "varchar", length: 10, nullable: true, default: null})
    color: string;
    @Column({type: "boolean", default: false})
    admin:boolean
    @ManyToOne(() => User,(user)=>user.managementRules)
    manager: User;
    @ManyToMany(() => User,(user)=>user.teams)
    members: User[];
    @ManyToMany(() => Project,(project)=>project.teams)
    projects: Project[];
    @OneToMany(() => Task,(task)=>task.team)
    tasks: Task[];

}
