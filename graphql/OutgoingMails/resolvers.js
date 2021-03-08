const OutgoingMail = require("../../models/OutgoingMail");
const tools = require("../../utils/tools");

module.exports = {
  fetchOutgoingMails: async function () {
    const outgoingMails = await OutgoingMail.find({}, null, {
      // sort: { number: "desc" },
    });
    return outgoingMails;
  },
  addOutgoingMail: async function ({ outgoingMailInput }, req) {

    const result = await OutgoingMail.findOne({
      number: outgoingMailInput.number,
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
      date: outgoingMailInput.date,
      number: outgoingMailInput.number,
      recipient: outgoingMailInput.recipient,
      city: outgoingMailInput.city,
      zipcode: outgoingMailInput.zipcode,
      street: outgoingMailInput.street,
      description: outgoingMailInput.description,
      comment: outgoingMailInput.comment,
      collectionAmount: outgoingMailInput.collectionAmount,
      collectionAmountGr1: outgoingMailInput.collectionAmountGr1,
      weight: outgoingMailInput.weight,
      g: outgoingMailInput.g,
      transmittingNumber: outgoingMailInput.transmittingNumber,
      declaredAmount: outgoingMailInput.declaredAmount,
      declaredAmountGr2: outgoingMailInput.declaredAmountGr2,
      payment: outgoingMailInput.payment,
      paymentGr3: outgoingMailInput.paymentGr3,
    };

    const outgoingMail = new OutgoingMail(data);

    try {
      const storedOutgoingMail = await outgoingMail.save();
      return {
        ...storedOutgoingMail._doc,
        _id: storedOutgoingMail._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateOutgoingMail: async function ({ outgoingMailInput }, req) {
    const _id = outgoingMailInput._id;
    const outgoingMail = await OutgoingMail.findOne({ _id });

    const data = {
      _id: outgoingMailInput._id,
      date:
        outgoingMailInput.date !== ""
          ? outgoingMailInput.date
          : outgoingMail.date,
      number:
        outgoingMailInput.number !== ""
          ? outgoingMailInput.number
          : outgoingMail.number,
      recipient:
        outgoingMailInput.recipient !== ""
          ? outgoingMailInput.recipient
          : outgoingMail.recipient,
      city:
        outgoingMailInput.city !== ""
          ? outgoingMailInput.city
          : outgoingMail.city,
      zipcode:
        outgoingMailInput.zipcode !== ""
          ? outgoingMailInput.zipcode
          : outgoingMail.zipcode,
      zipcode:
        outgoingMailInput.zipcode !== ""
          ? outgoingMailInput.zipcode
          : outgoingMail.zipcode,
          street:
          outgoingMailInput.street !== ""
            ? outgoingMailInput.street
            : outgoingMail.street,
            description:
            outgoingMailInput.description !== ""
              ? outgoingMailInput.description
              : outgoingMail.description,
              comment:
              outgoingMailInput.comment !== ""
                ? outgoingMailInput.comment
                : outgoingMail.comment,
                collectionAmount:
                outgoingMailInput.collectionAmount !== ""
                  ? outgoingMailInput.collectionAmount
                  : outgoingMail.collectionAmount,
                  collectionAmountGr1:
                  outgoingMailInput.collectionAmountGr1 !== ""
                    ? outgoingMailInput.collectionAmountGr1
                    : outgoingMail.collectionAmountGr1,
                    weight:
                    outgoingMailInput.weight !== ""
                      ? outgoingMailInput.weight
                      : outgoingMail.weight,
                      g:
                      outgoingMailInput.g !== ""
                        ? outgoingMailInput.g
                        : outgoingMail.g,
                        transmittingNumber:
                        outgoingMailInput.transmittingNumber !== ""
                          ? outgoingMailInput.transmittingNumber
                          : outgoingMail.transmittingNumber,
                          declaredAmount:
                          outgoingMailInput.declaredAmount !== ""
                            ? outgoingMailInput.declaredAmount
                            : outgoingMail.declaredAmount,
                            declaredAmountGr2:
                            outgoingMailInput.declaredAmountGr2 !== ""
                              ? outgoingMailInput.declaredAmountGr2
                              : outgoingMail.declaredAmountGr2,
                              payment:
                              outgoingMailInput.payment !== ""
                                ? outgoingMailInput.payment
                                : outgoingMail.payment,
                                paymentGr3:
                                outgoingMailInput.paymentGr3 !== ""
                                  ? outgoingMailInput.paymentGr3
                                  : outgoingMail.paymentGr3,
    };
    try {
      outgoingMail.overwrite(data);
      const storedOutgoingMail = await outgoingMail.save();
      return {
        ...storedOutgoingMail._doc,
        _id: storedOutgoingMail._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeOutgoingMail: async function ({ outgoingMailId }) {
    try {
      await OutgoingMail.deleteOne({ _id: outgoingMailId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: outgoingMailId };
  },
};
