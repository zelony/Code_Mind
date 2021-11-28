import * as functions from "firebase-functions";
import {checkIfAuth, throwError} from "../methods";
import {connect} from "../config";
import {Team} from "../entity/team";
export const get = functions.https.onCall(async(data, context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const teamsRepo = connection.getRepository(Team);
        const {limit = 20,index} = data;
        let query =
            teamsRepo.createQueryBuilder("team")
            .select("team.color,team.id as id,manager.id as manager,team.name,team.admin")
                .addSelect("GROUP_CONCAT(members.id) as mids,GROUP_CONCAT(members.name) as mnames")
                .leftJoin("team.members","members")
                .leftJoin("team.manager","manager")
                .limit(limit)
                .orderBy("team.id","ASC").groupBy("team.id");
        if (index){
            query = query.where("team.id > :index",{index})
        }
        // return handleRows(await teamsRepo.find({
        //     relations:["members"]
        // }))
        return await query.getRawMany();
    }
    catch (e) {
        return throwError(e);
    }
});
