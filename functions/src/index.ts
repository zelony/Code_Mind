import * as admin from "firebase-admin";
admin.initializeApp({
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  credential: admin.credential.cert(require("./service.json")),
});
exports.login = require("./login-apis");
exports.staff = require("./staff-apis");
exports.projects = require("./project-apis");
exports.teams = require("./teams-apis");
exports.workers = require("./worker-apis");
exports.tasks = require("./task-apis");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
