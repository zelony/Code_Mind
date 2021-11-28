import * as functions from "firebase-functions";
import {checkIfAuth, generateRandomColor, throwError} from "../methods";
import {connect} from "../config";
import {Team} from "../entity/team";
import {HTTP404Error} from "../error";

export const add =functions.https.onCall(async(data, context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const {name, admin} = data.team;
        const teamsRepo = connection.getRepository(Team);
        const teamDoc = await teamsRepo.count({where:{name}});
        if (teamDoc>0){throw new HTTP404Error('team found')}
        const newTeam = new Team();
        newTeam.name=name;
        newTeam.color= generateRandomColor();
        newTeam.admin = admin;
        await teamsRepo.save(newTeam);
        // return handleRows(await teamsRepo.find({
        //     relations:["members"]
        // }))
        return true;
    }
    catch (e) {
        return throwError(e);
    }
});
export const get = functions.https.onCall(async(data, context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const teamsRepo = connection.getRepository(Team);
        const query =
            teamsRepo.createQueryBuilder("team")
                .select("team.id as id,team.name,team.admin")
                .orderBy("team.admin").groupBy("team.id");
        // return handleRows(await teamsRepo.find({
        //     relations:["members"]
        // }))
        return await query.getRawMany();
    }
    catch (e) {
        return throwError(e);
    }
});