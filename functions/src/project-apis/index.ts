import * as functions from "firebase-functions";
import {checkIfAuth, generateRandomColor, handleRows, throwError} from "../methods";
import {connect} from "../config";
import {Project} from "../entity/project";
import {Team} from "../entity/team";

export const get = functions.https.onCall(async(data, context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const projectsRepo = connection.getRepository(Project);
        const {limit,index} = data;
        let query =
            projectsRepo.createQueryBuilder("project")
                .select("project.color,project.id,project.name,project.start")
                .addSelect("project.priority,project.thumbnail as thumb")
                .addSelect("COUNT(tasks.id) as tCount")
                // .addSelect("admin.name as admin")
                // .addSelect("GROUP_CONCAT(teams.id) as tids,GROUP_CONCAT(teams.name) as tnames")
                // .leftJoin("project.teams","teams")
                // .leftJoin("project.admin","admin")
                .leftJoin("project.tasks","tasks")
                .where("ISNULL(project.finish)")
                .orderBy("project.id","ASC")
                .limit(limit)
                .groupBy("project.id");
        if (index){
          query  = query.andWhere("project.id > :index",{index})
        }
        return handleRows(await query.getRawMany());
    }
    catch (e) {
        return throwError(e);
    }
});
export const add = functions.https.onCall(async(data, context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const projectsRepo = connection.getRepository(Project);
        const newProject = new Project();
        const {name,description,start,teams,admin} = data;
        newProject.start = new Date(start);
        newProject.description = description || null;
        newProject.color =generateRandomColor();
        newProject.admin = admin;
        newProject.name = name;
        newProject.teams = teams.map(x => {
            const team = new Team()
            team.id = x;
            return team;
        });
        await projectsRepo.save(newProject);
        return true;
        // const query =
        //     projectsRepo.createQueryBuilder("project")
        //         .select("project.color,project.id,project.name,project.description,project.start")
        //         .addSelect("project.priority,project.thumbnail as thumb")
        //         .addSelect("COUNT(tasks.id) as tCount")
        //         .addSelect("admin.name as admin")
        //         .addSelect("GROUP_CONCAT(teams.id) as tids,GROUP_CONCAT(teams.name) as tnames")
        //         .leftJoin("project.teams","teams")
        //         .leftJoin("project.admin","admin")
        //         .leftJoin("project.tasks","tasks")
        //         .where("ISNULL(project.finish)")
        //         .groupBy("project.id");
        // return handleRows(await query.getRawMany());
    }
    catch (e) {
        return throwError(e);
    }
});
export const priority = functions.https.onCall(async (data,context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const projectsRepo = connection.getRepository(Project);
        const {id,value} = data;
        await projectsRepo.update(id,{
            priority:value
        });
        return true;
    }
    catch (e) {
        return throwError(e);
    }
})