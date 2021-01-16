const fs = require("fs");
const exec = require("child_process").exec;
const path = require("path");
const { empty } = require("./backup");

const backupDirPath = path.join(
  __dirname,
  "database-backup\\2021-1-16\\kancelaria-prawna"
);
const mongoDbAbsolutePath = "D:\\mongodb\\bin\\mongorestore.exe";

const dbOptions = {
  user: "",
  pass: "",
  host: "localhost",
  port: 27017,
  database: "testowa",
  autoBackupPath: backupDirPath,
};

exports.dbRestoreBackup = () => {
  const start = mongoDbAbsolutePath ? mongoDbAbsolutePath : "mongorestore.exe";

  let cmd =
    start +
    " --host " +
    dbOptions.host +
    " --port " +
    dbOptions.port +
    " --db " +
    dbOptions.database +
    //   " --username " +
    //   dbOptions.user +
    //   " --password " +
    //   dbOptions.pass +
    " " +
    dbOptions.autoBackupPath +
    " --drop";

  exec(cmd, (error) => {
    if (empty(error)) {
      console.log("database has been restored");
    } else {
      console.log("something went wrong: ", error);
    }
  });
};
