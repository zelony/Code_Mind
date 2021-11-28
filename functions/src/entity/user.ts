import {
    Entity,
    Column,
    OneToOne,
    JoinColumn, PrimaryColumn, ManyToMany, JoinTable, OneToMany,
} from "typeorm";
import {Auth} from "./Auth";
import {MainEntity} from "../main_entities/mainEntity";
import {Team} from "./team";
import {Project} from "./project";
import {Task} from "./task";
import {TaskFinishing} from "./taskFinishing";
import {TaskComment} from "./taskComment";
@Entity()
export class User extends MainEntity {
    @PrimaryColumn({})
    id: string;
    @Column({type: "varchar", length: 80, nullable: true, default: null})
    name: string;
    @Column({type: "varchar", length: 250, nullable: true, default: null})
    profile: string;
    @Column({type: "boolean", default: true})
    male:boolean
    @Column({type: "date", nullable: true, default: null})
    birthDate:Date;
    @Column({type: "boolean", default: false})
    admin:Boolean;
    @Column({type: "boolean", default: false})
    disabled:Boolean;
    @OneToOne(() => Auth)
    @JoinColumn({name: "authId"})
    auth: Auth;
    @OneToMany(() => User,(user)=>user.projects)
    projects: Project[];
    @OneToMany(() => Task,(task)=>task.member)
    tasks: Task[];
    @OneToMany(() => TaskFinishing,(finish)=>finish.admin)
    finishStats: TaskFinishing[];
    @OneToMany(() => TaskComment,(comment)=>comment.user)
    comments: TaskComment[];
    @ManyToMany(() => Team,(team)=>team.members)
    @JoinTable()
    teams: Team[];
    @OneToMany(() => Team,(team)=>team.manager)
    managementRules: Team[];
}
