import * as functions from "firebase-functions";
import {checkIfAuth, throwError} from "../methods";
import {connect} from "../config";
import {Team} from "../entity/team";
import {User} from "../entity/user";
import {HTTP404Error} from "../error";
import * as admin from "firebase-admin";
import {Auth} from "../entity/Auth";

export const add = functions.https.onCall(async(data, context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const {name, phone, male, team,id} = data.worker;
        const teamsRepo = connection.getRepository(Team);
        const usersRepo = connection.getRepository(User);
        const teamDoc = await teamsRepo.findOne(team,{relations:["manager"]});
        let dbUser = new User();
        if (!teamDoc){throw new HTTP404Error('team not found')}
        if (id){
            dbUser = await usersRepo.findOne(id,{relations:["teams"]});
            dbUser.admin = !!teamDoc.admin;
            dbUser.teams.push(teamDoc)
        }
        else{
            const auth = admin.auth();
            const user = await auth.createUser({
                displayName:name,
                phoneNumber:'+2'+phone,
            });
            dbUser.id = user.uid;
            dbUser.name = name;
            dbUser.male = male;
            dbUser.admin = !!teamDoc.admin;
            dbUser.teams = [teamDoc]
            const authDb = new Auth();
            authDb.phone = phone;
            const authRepo = connection.getRepository(Auth);
            const doc = await authRepo.save(authDb);
            authDb.id = doc.id;
            dbUser.auth = authDb;
        }
        await usersRepo.save(dbUser);
        if (!teamDoc.manager){
            teamDoc.manager = dbUser;
            await teamsRepo.save(teamDoc);
        }
        return true;
    }
    catch (e) {
        return throwError(e);
    }
})
export const getIds = functions.https.onCall(async(data, context) => {
    try {
        checkIfAuth(context);
        const connection = await connect();
        const userRepo = connection.getRepository(User);
        const {team,notTeam} =data;
        let query =
            userRepo.createQueryBuilder('user')
            .select("user.name,user.id").groupBy("user.id")
        ;
        if (team){
            query.leftJoin("user.teams","teams").where("teams.id = :team",{team})
        }
        if (notTeam){
            query.leftJoin("user.teams","teams").where('ISNULL(teams.id) or teams.id != :notTeam',{notTeam})
        }
        return await query.getRawMany();
    }
    catch (e) {
        return throwError(e);
    }
})