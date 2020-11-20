const Project = require("../../models/Project");
const tools = require("../../utils/tools");
const moment = require("moment");

module.exports = {
  fetchProjects: async function () {
    const projects = await Project.find({}, null, {
      sort: { createdAt: "desc" },
    });
    return projects;
  },
  fetchProjectsByLoggedUserProjects: async function ({ projects }) {
    const list = projects.split(",");
    // console.log("resolver list", list);
    const pregmatch = list.map((item) => new RegExp(item));
    // console.log("pregmatch", pregmatch);
    let prj = await Project.find().or([
      {
        name: {
          $in: pregmatch,
        },
      },
    ]);
    return prj;
  },
  addProject: async function ({ projectInput }, req) {
    const result = await Project.findOne({ name: projectInput.name });
    if (result) {
      return {
        errors: [
          {
            path: "name",
            message: "Istnieje już sprawa o podanej nazwie",
          },
        ],
      };
    }
    const data = {
      lastStageId: "",
      name: projectInput.name,
      signature: projectInput.signature,
      type: projectInput.type,
      organ: projectInput.organ,
      description: projectInput.description,
      createdAt: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      termAt: projectInput.termAt,
    };

    const project = new Project(data);
    try {
      const storedProject = await project.save();
      return {
        ...storedProject._doc,
        _id: storedProject._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateProject: async function ({ projectInput }, req) {
    const _id = projectInput._id;
    const project = await Project.findOne({ _id });

    const data = {
      _id: projectInput._id,
      lastStageId:
        projectInput.lastStageId !== ""
          ? projectInput.lastStageId
          : project.lastStageId,
      name: projectInput.name !== "" ? projectInput.name : project.name,
      signature:
        projectInput.signature !== ""
          ? projectInput.signature
          : project.signature,
      type: projectInput.type !== "" ? projectInput.type : project.type,
      organ: projectInput.organ !== "" ? projectInput.organ : project.organ,
      description:
        projectInput.description !== ""
          ? projectInput.description
          : project.description,
      lastStageDescription:
        projectInput.lastStageDescription !== ""
          ? projectInput.lastStageDescription
          : project.lastStageDescription,
      lastStageCreatedAt:
        projectInput.lastStageCreatedAt !== ""
          ? projectInput.lastStageCreatedAt
          : project.lastStageCreatedAt,
      createdAt:
        projectInput.createdAt !== ""
          ? projectInput.createdAt
          : project.createdAt,
      termAt: projectInput.termAt !== "" ? projectInput.termAt : project.termAt,
    };
    try {
      project.overwrite(data);
      const storedProject = await project.save();
      return {
        ...storedProject._doc,
        _id: storedProject._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeProject: async function ({ projectId }) {
    try {
      await Project.deleteOne({ _id: projectId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: projectId };
  },
};
