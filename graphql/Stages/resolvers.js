const Stage = require("../../models/Stage");
const tools = require("../../utils/tools");
const moment = require("moment");

module.exports = {
  fetchStages: async function ({ stageInput }) {
    const data = {
      ...stageInput,
    };
    const stages = await Stage.find(data, null, {
      sort: { name: 1 },
    });
    return stages;
  },
  addStage: async function ({ stageInput }, req) {
    const data = {
      projectId: stageInput.projectId,
      description: stageInput.description,
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
      termAt: stageInput.termAt,
    };

    const stage = new Stage(data);
    try {
      const storedStage = await stage.save();
      return {
        ...storedStage._doc,
        _id: storedStage._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateStage: async function ({ stageInput }, req) {
    const _id = stageInput._id;
    const stage = await Stage.findOne({ _id });

    const data = {
      _id: stageInput._id,
      projectId:
        stageInput.projectId !== "" ? stageInput.projectId : stage.projectId,
      description:
        stageInput.description !== ""
          ? stageInput.description
          : stage.description,
      createdAt:
        stageInput.createdAt !== "" ? stageInput.createdAt : stage.createdAt,
      termAt: stageInput.termAt !== "" ? stageInput.termAt : stage.termAt,
    };
    try {
      stage.overwrite(data);
      const storedStage = await stage.save();
      return {
        ...storedStage._doc,
        _id: storedStage._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeStage: async function ({ stageId }) {
    try {
      await Stage.deleteOne({ _id: stageId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: stageId };
  },
};
