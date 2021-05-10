const IncomingMail = require("../../models/IncomingMail");
const tools = require("../../utils/tools");

module.exports = {
  fetchIncomingMails: async function () {
    const incomingMails = await IncomingMail.find({}, null, {
       sort: { deliveryDate: "desc" },
    });
    return incomingMails;
  },
  addIncomingMail: async function ({ incomingMailInput }, req) {
    console.log("incomingMailInput", incomingMailInput);
    const result = await IncomingMail.findOne({
      number: incomingMailInput.number,
    });
    // todo
    // if (result) {
    //   throw {
    //     errors: [
    //       { path: "name", message: "Istnieje już poczta o podanym numerze" },
    //     ],
    //   };
    // }
    const data = {
      number: incomingMailInput.number,
      deliveryDate: incomingMailInput.deliveryDate,
      sender: incomingMailInput.sender,
      deliveryCase: incomingMailInput.deliveryCase,
      signature: incomingMailInput.signature,
      description: incomingMailInput.description,
    };

    const incomingMail = new IncomingMail(data);

    try {
      const storedIncomingMail = await incomingMail.save();
      return {
        ...storedIncomingMail._doc,
        _id: storedIncomingMail._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateIncomingMail: async function ({ incomingMailInput }, req) {
    const _id = incomingMailInput._id;
    const incomingMail = await IncomingMail.findOne({ _id });

    const data = {
      _id: incomingMailInput._id,
      number:
        incomingMailInput.number !== ""
          ? incomingMailInput.number
          : incomingMail.number,
      deliveryDate:
        incomingMailInput.deliveryDate !== ""
          ? incomingMailInput.deliveryDate
          : incomingMail.deliveryDate,
      sender:
        incomingMailInput.sender !== ""
          ? incomingMailInput.sender
          : incomingMail.sender,
      deliveryCase:
        incomingMailInput.deliveryCase !== ""
          ? incomingMailInput.deliveryCase
          : incomingMail.deliveryCase,
      signature:
        incomingMailInput.signature !== ""
          ? incomingMailInput.signature
          : incomingMail.signature,
      description:
        incomingMailInput.description !== ""
          ? incomingMailInput.description
          : incomingMail.description,
    };
    try {
      incomingMail.overwrite(data);
      const storedIncomingMail = await incomingMail.save();
      return {
        ...storedIncomingMail._doc,
        _id: storedIncomingMail._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeIncomingMail: async function ({ incomingMailId }) {
    try {
      await IncomingMail.deleteOne({ _id: incomingMailId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: incomingMailId };
  },
};
