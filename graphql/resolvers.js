module.exports = {
  ...require("./Users/resolvers"),
  ...require("./UsersHistory/resolvers"),
  ...require("./Settings/resolvers"),
  ...require("./Tasks/resolvers"),
  ...require("./Stages/resolvers"),
  ...require("./Comments/resolvers"),
  ...require("./Mails/resolvers"),
  ...require("./Projects/resolvers"),
  ...require("./IncomingMails/resolvers"),
  ...require("./OutgoingMails/resolvers"),
  ...require("./Calendar/resolvers"),
};
