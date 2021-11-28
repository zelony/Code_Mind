import * as functions from "firebase-functions";
import {checkIfAuth, getDates, handleRows, throwError} from "../methods";
import {connect} from "../config";
import {Task} from "../entity/task";
import {Project} from "../entity/project";
import {Team} from "../entity/team";
import {User} from "../entity/user";
import {Occurrence} from "../entity/occurrence";
import {HTTP404Error} from "../error";
import {TaskFinishing} from "../entity/taskFinishing";
import {TaskComment} from "../entity/taskComment";

// @ts-ignore
enum FilterOccurrenceType{
    TODAY,
    INBOX,
    Upcoming,
    Finished,
    Overdue,
}
export const get = functions.https.onCall(async(data, context) => {
    try{
        checkIfAuth(context);
        const connection = await connect();
        const {project,index,limit,team,type,user,id,comments = false} = data;
        let occType = parseInt(type);
        const tasksRepo = connection.getRepository(Task);
        let query = tasksRepo.createQueryBuilder("task")
            .select("task.id,task.title,finish.at as finish,task.start,task.closed,task.description,task.deadline,task.priority,task.points")
            .addSelect("user.name as member")
            .addSelect("team.name as team")
            .addSelect("occ.type,occ.at")
            .addSelect("project.name as project,project.color as pcolor")
            .leftJoin("task.member","user")
            .leftJoin("task.team","team")
            .leftJoin("task.project","project")
            .leftJoin("task.occurrence","occ")
            .leftJoin("task.finish","finish")
            .orderBy("task.id","ASC")
            .where("1=1")
            .limit(limit);
        if (project){
            query= query.andWhere("project.id = :project",{project});
        }
        if (id){
            query = query.andWhere("task.id = :id",{id})
        }
        if (index) {
            query = query.andWhere("task.id > :index", {index})
        }
        if(team){
            query = query.andWhere("team.id = :team", {team})
        }
        if(user){
            query = query.andWhere("user.id = :user",{user})
        }
        if (occType === 0){
            query = query.andWhere("DATE(task.start) = current_date").andWhere("ISNULL(task.closed) = 1")
                // .andWhere("((occ.runType = '0' and DATE(occ.runAt) = current_date)")
                // .orWhere("(occ.runType = '1' and current_date >= DATE(occ.runAt))")
                // .orWhere("(occ.runType = '2' and WEEKDAY(DATE(current_date)) = occ.runAt)")
                // .orWhere("(occ.runType in ('3','4') and DAY(DATE(current_date)) = occ.runAt))")
        }
        else if(occType === 1){
            query = query.andWhere("(ISNULL(task.start) = 0 or (DATE(task.start) <  current_date and current_date < DATE(task.deadline)))").andWhere("ISNULL(task.closed) =1")
        }
        else if(occType === 2){
            query = query.andWhere("DATE(task.start) > current_date").andWhere("ISNULL(task.closed) =1")
        }
        else if (occType === 3){
            query = query.andWhere("ISNULL(task.closed) =0").andWhere("ISNULL(finish.id) =1")
        }
        else if(occType === 4){
            query = query.andWhere("current_date > DATE(task.deadline)").andWhere("ISNULL(task.closed) =1")
        }
        else if(occType === 5){
            query = query.andWhere("ISNULL(task.closed) =0").andWhere("ISNULL(finish.id) =0")
        }
        // else if(occType === 2){
        //     //todo::upcoming has problem
        //     query = query.andWhere("ISNULL(task.closed) =1").andWhere("((occ.runType = '0' and DATE(occ.runAt)> current_date)")
        //         .orWhere("(occ.runType = '1' and current_date < DATE(occ.runAt))")
        //         .orWhere("(occ.runType = '2' and WEEKDAY(DATE(current_date)) < occ.runAt)")
        //         .orWhere("(occ.runType = '3' and DAY(DATE(current_date)) < occ.runAt))")
        //         // .orWhere("(occ.runType = '4' and )")
        // }

        // else if (occType===4){
        //     query = query.andWhere("ISNULL(task.closed) = 1 and current_date > DATE(task.deadline)")
        // }
        const rows = handleRows(await query.getRawMany());
        if (comments){
            // @ts-ignore
            rows[0].comments = await connection.getRepository(TaskComment).find({
                relations:["attachments"],
                // @ts-ignore
                where:{task:{id:rows[0].id}
                }
            })
            // for (const row of rows){
            //
            // }
        }
        return rows;
    }
    catch (e) {
        return throwError(e);
    }
})
export const add = functions.https.onCall(async(data, context) => {
    try{
        checkIfAuth(context);
        const connection = await connect();
        //@ts-ignore
        //todo::check if i has a role to add a task or not
        //todo::handle occurrence
        //todo::daily
        const tasksRepo = connection.getRepository(Task);
        const{title, description, occ, member, team, points, project} = data;
        if (!occ)throw new functions.https.HttpsError("invalid-argument","invalid_request");
        const {type,at,start,deadline,finish} = occ;
        const occurrence = new Occurrence();
        occurrence.type = type;
        occurrence.at = at?.toString().substr(0,10);
        const occRepo = connection.getRepository(Occurrence);
        const occDoc = await occRepo.save(occurrence);
        if (type === 0){
            const newTask = new Task();
            newTask.title=title;
            newTask.description = description;
            newTask.project =new Project();
            newTask.project.id = project;
            newTask.team = new Team();
            newTask.team.id = team;
            newTask.member = new User();
            newTask.member.id = member;
            newTask.points = points;
            newTask.deadline = deadline;
            newTask.start = at;
            newTask.occurrence =occDoc;
            await tasksRepo.save(newTask);
        }
        else if (type === 1){
            //todo::get all dates between two dates
            //filter to get who will get day of week
            //create entity
            const datesBetween = getDates(new Date(at),new Date(finish));
            const entities = [];
            datesBetween.forEach(date => {
                const newTask = new Task();
                newTask.title=title;
                newTask.description = description;
                newTask.project =new Project();
                newTask.project.id = project;
                newTask.team = new Team();
                newTask.team.id = team;
                newTask.member = new User();
                newTask.member.id = member;
                newTask.points = points;
                newTask.deadline = date.addDays(1);
                newTask.start = date;
                newTask.occurrence =occDoc;
                entities.push(newTask);
            });
            await tasksRepo.save(entities);
            // datesBetween = datesBetween.filter(x => x.getDay() === at);
        }
        else if (type === 2){
            let datesBetween = getDates(new Date(start),new Date(finish));
            datesBetween = datesBetween.filter(x => x.getDay() === parseInt(at))
            const entities = [];
            datesBetween.forEach(date => {
                const newTask = new Task();
                newTask.title=title;
                newTask.description = description;
                newTask.project =new Project();
                newTask.project.id = project;
                newTask.team = new Team();
                newTask.team.id = team;
                newTask.member = new User();
                newTask.member.id = member;
                newTask.points = points;
                newTask.deadline = date.addDays(parseInt(deadline));
                newTask.start = date;
                newTask.occurrence =occDoc;
                entities.push(newTask);
            });
            await tasksRepo.save(entities);
            // datesBetween = datesBetween.filter(x => x.getDay() === at);
        }
        else if (type === 3){
            let datesBetween = getDates(new Date(start),new Date(finish));
            datesBetween = datesBetween.filter(x => x.getDate() === parseInt(at))
            const entities = [];
            datesBetween.forEach(date => {
                const newTask = new Task();
                newTask.title=title;
                newTask.description = description;
                newTask.project =new Project();
                newTask.project.id = project;
                newTask.team = new Team();
                newTask.team.id = team;
                newTask.member = new User();
                newTask.member.id = member;
                newTask.points = points;
                newTask.deadline = date.addDays(deadline);
                newTask.start = date;
                newTask.occurrence =occDoc;
                entities.push(newTask);
            });
            await tasksRepo.save(entities);
        }
        return true
    }
    catch (e) {
        return throwError(e);
    }
})
export const check = functions.https.onCall(async (data,context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const  {id, value} =data;
        if (value){
            //todo::check and validate and add coin system
        }
        const taskRepo = connection.getRepository(Task);
        await taskRepo.update(id,{
            // @ts-ignore
            closed:value?new Date:null
        })
        return true;
    }
    catch (e) {
        return throwError(e);
    }
})
export const priority = functions.https.onCall(async (data,context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const  {id, value} =data;
        const taskRepo = connection.getRepository(Task);
        await taskRepo.update(id,{
            priority:value
        })
        return true;
    }
    catch (e) {
        return throwError(e);
    }
});
export const rate = functions.https.onCall(async (data,context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const taskRepo = connection.getRepository(Task);
        const  {id,close,rate} =data;
        const task = await taskRepo.findOne(id,{relations:["finish"]});
        if (!task)throw new HTTP404Error();
        if (task.finish)throw new functions.https.HttpsError("aborted","Already rated")
        if (close){
            task.closed = new Date(close);
        }
        let bonus = 0;
        const taskFinish = new TaskFinishing();
        let points = task.points;
        //todo::rate based
        taskFinish.rate = rate;
        if (parseInt(rate) > 5){
            //good
            bonus += (task.points * (1/rate));
        }
        else{
            bonus -= (task.points * (1/rate));
        }
        //todo::time based
        if (task.closed <= task.deadline){
            bonus += points * 0.1
            //finish the task at or before time
        }
        else if(task.closed > task.deadline && task.closed > task.manager_deadline){
            bonus -= points * 0.1
        }
        //coin rate
        // await taskRepo.update(id,{
        //     finish:rate
        // })
        taskFinish.bonus = bonus;
        points += bonus;
        taskFinish.points = points;
        taskFinish.task = task;
        taskFinish.at = new Date();
        taskFinish.admin = await connection.getRepository(User).findOne(context.auth.uid);
        task.finish = await connection.getRepository(TaskFinishing).save(taskFinish);
        await taskRepo.save(task);
        return true;
    }
    catch (e) {
        return throwError(e);
    }
});