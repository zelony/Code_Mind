import {CallableContext} from "firebase-functions/lib/providers/https";
import {Connection} from "typeorm";
import * as functions from "firebase-functions";
import {HTTP401Error} from "./error";
import {User} from "./entity/user";
export function checkIfAuth(context:CallableContext) {
  // if (context.app === undefined) {
  //   throw new functions.https.HttpsError(
  //     'failed-precondition',
  //     'The function must be called from an App Check verified app.')
  // }
  if (!context.auth || !context.auth.uid) {
    throw new HTTP401Error();
  }
  return true;
}
export async function getUserIdFromUid(connection:Connection, uid:string) {
  const UserRepo = connection.getRepository(User);
  const user = await UserRepo.find({where: {authId: uid}, select: ["id"]});
  // @ts-ignore
  return user.length > 0 && user[0].id;
}
export const whereBuilder = (where:string, query:string) => {
  const q = query === null ? "" :query +" AND";
  return `${q} ${where}`;
};
export const throwError = (e:{httpCode:number, status:number, message:string}) => {
  functions.logger.error(e);
  return {
    error: true,
    code: e.httpCode || e.status,
    message: e.message,
  };
};
export const handleRows = (arr: any[]) =>{
  return arr.map((el:any) => {
    const object = {};
    // @ts-ignore
    for (const property in el) {
      if (el[property] instanceof Date) {
        // @ts-ignore
        object[property] = el[property].getTime();
      } else {
        // @ts-ignore
        object[property] = el[property];
      }
    }
    return object;
  });
};
export const generateRandomColor = () => {
  const arr = ["#27ae60","#d35400","#e74c3c","#8e44ad","#2c3e50","#1abc9c"]
  return arr[Math.floor(Math.random()*arr.length)]
}
// @ts-ignore
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
export function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}