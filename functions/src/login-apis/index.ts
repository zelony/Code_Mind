import * as functions from "firebase-functions";
import * as adminInit from "firebase-admin";
import {checkIfAuth, throwError} from "../methods";
import {connect} from "../config";
import {Auth} from "../entity/Auth";
import {User} from "../entity/user";
import {HTTP401Error} from "../error";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const admin = functions.https.onCall(async (data, context) => {
  try {
    checkIfAuth(context);
    const uid = context.auth?.uid;
    const connection = await connect();
    const userRepo = connection.getRepository(User);
    let user = await userRepo.findOne(uid,{
      relations:["auth"],
      where:{
        admin:true
      }
    });
    if (!user){
      throw new HTTP401Error("not-logged-in");
    }
    const authRepo = connection.getRepository(Auth);
    const authUser = await adminInit.app().auth().getUser(uid);
    const auth = new Auth();
    auth.email = authUser.email;
    auth.phone = authUser.phoneNumber;
    // eslint-disable-next-line max-len
    auth.facebook = authUser.providerData?.some((r) => r.providerId === "facebook.com");
    // eslint-disable-next-line max-len
    auth.google = authUser.providerData?.some((r) => r.providerId === "google.com");
    auth.id = user?user.auth?.id:undefined;
    await authRepo.save(auth);
    const newUser = new User();
    newUser.auth = auth;
    // @ts-ignore
    newUser.name = authUser.displayName;
    // @ts-ignore
    newUser.profile = authUser.photoURL;
    newUser.id = uid;
    return await userRepo.save(newUser)
  } catch (e) {
    return throwError(e);
  }
});
export const user = functions.https.onCall(async (data, context) => {
  try {
    checkIfAuth(context);
    const uid = context.auth?.uid;
    const connection = await connect();
    const userRepo = connection.getRepository(User);
    let user = await userRepo.findOne(uid,{
      relations:["auth"],
      where:{
        disabled:false
      }
    });
    if (!user){
      throw new HTTP401Error("not-logged-in");
    }
    const authRepo = connection.getRepository(Auth);
    const authUser = await adminInit.app().auth().getUser(uid);
    const auth = new Auth();
    auth.email = authUser.email;
    auth.phone = authUser.phoneNumber;
    // eslint-disable-next-line max-len
    auth.facebook = authUser.providerData?.some((r) => r.providerId === "facebook.com");
    // eslint-disable-next-line max-len
    auth.google = authUser.providerData?.some((r) => r.providerId === "google.com");
    auth.id = user?user.auth?.id:undefined;
    await authRepo.save(auth);
    const newUser = new User();
    newUser.auth = auth;
    // @ts-ignore
    newUser.name = authUser.displayName;
    // @ts-ignore
    newUser.profile = authUser.photoURL;
    newUser.id = uid;
    return await userRepo.save(newUser)
  } catch (e) {
    return throwError(e);
  }
});