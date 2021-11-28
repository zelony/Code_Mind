import {ConnectionOptions, Connection, createConnection, getConnection} from "typeorm";
import "reflect-metadata";
const prod = process.env.NODE_ENV === "production";
// const isGoogle = false;
// const googleConfig = {
//   host: "127.0.0.1",
//   port: 3306,
//   username: "cloud_functions", // review
//   password: "evq1IpBu4Dxc1t3M",
//   ...(prod && {
//     extra: {
//       socketPath: "/cloudsql/e-learn-4b0fb:us-central1:e-learn", // change
//     },
//   }),
// };
const clustersConfig = {
  host: "mysql-52254-0.cloudclusters.net",
  port: 12474,
  username: "cloud_functions",
  password: "d2]KUD5>L,%:\"uc?",
};
export const config: ConnectionOptions = {
  name: "firstConnection",
  type: "mysql",
  database: "development",
  synchronize: true,
  logging: true,
  entities: [
    "lib/entity/**/**/*.js",
    "lib/entity/**/*.js",
  ],
  ...clustersConfig,
  // Production Mode
  ...(prod && {
    database: "production",
    logging: false,
    synchronize: false,
  }),
};
export const connect = async () => {
  let connection: Connection;
  try {
    connection = getConnection(config.name);
  } catch (err) {
    connection = await createConnection(config);
  }

  return connection;
};
