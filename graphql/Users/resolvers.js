const User = require("../../models/User");
const tools = require("../../utils/tools");

//user authorization
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  fetchUsers: async function ({ userInput }) {
    const users = await User.find(userInput, null, { sort: { name: 1 } });
    return users;
  },
  fetchUsersByLoggedUserProjects: async function ({ projects }) {
    const list = projects.split(",");
    const pregmatch = list.map((item) => new RegExp(item));
    const users = await User.find().or([
      {
        projects: {
          $in: pregmatch,
        },
      },
    ]);
    return users;
  },
  createUser: async function ({ userInput }, req) {
    // if (!userInput.name || !userInput.email || !userInput.password) {
    //   const err = new Error("You left input fields epmty");
    //   throw err;
    // }

    const mailExists = await User.findOne({ email: userInput.email });

    if (mailExists && mailExists.length > 0) {
      return {
        errors: [
          {
            path: "Dodawanie użytkownika",
            message: "Istnieje już email o podanej nazwie",
          },
        ],
      };
    }

    const userNameExists = await User.findOne({ name: userInput.name });

    if (userNameExists) {
      return {
        errors: [
          {
            path: "Dodawanie użytkownika",
            message: "Istnieje już użytkownik o podanej nazwie",
          },
        ],
      };
    }

    const salt = bcrypt.genSaltSync(14);
    const hash = bcrypt.hashSync(userInput.password, salt);

    const user = new User({
      name: userInput.name,
      email: userInput.email,
      address: userInput.address,
      phone: userInput.phone,
      password: hash,
      status: userInput.status,
      company: userInput.company,
      projects: userInput.projects,
      users: userInput.users,
      lastActive: userInput.lastActive,
      createdAt: userInput.createdAt,
    });
    // console.log("user", userInput);

    try {
      const storedUser = await user.save();
      return { ...storedUser._doc, _id: storedUser._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  loginUser: async function ({ email, password }) {
    const db = require("../../config/keys").mongoURI;

    if (!email || !password) {
      throw new Error({
        errors: [
          {
            path: "Logowanie użytkownika",
            message: "Email lub hasło nie zostało wprowadzone",
          },
        ],
      });
    }

    const userData = await User.findOne({ email: email });

    if (!userData) {
      throw new Error({
        errors: [
          {
            path: "Logowanie użytkownika",
            message: "Użytkownik nie istnieje",
          },
        ],
      });
    }

    const pass = await bcrypt.compare(password, userData.password);

    if (!pass) {
      throw new Error({
        errors: [
          {
            path: "Logowanie użytkownika",
            message: "Podałeś niepoprawne hasło",
          },
        ],
      });
    }
    // console.log("resolverlogin", userData);
    const token = await jwt.sign(
      {
        _id: userData._id.toString(),
        name: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
        status: userData.status,
        company: userData.company ? userData.company : "",
        projects: userData.projects ? userData.projects : "",
        users: userData.users ? userData.users : "",
        lastActive: userData.lastActive ? userData.lastActive : "",
        createdAt: userData.createdAt,
        tokenCreatedAt: new Date(),
        logged: true,
      },
      require("../../config/keys").secretOrKeyOk,
      {
        expiresIn: "1h",
      }
    );

    // console.log("user doc", userData._doc);
    try {
      return { ...userData._doc, _id: userData._id.toString(), token: token };
    } catch (errors) {
      return { errors: tools.formatErrors(errors) };
    }
  },
  updateUser: async function ({ userInput }, req) {
    // console.log("user input", userInput);
    if (!userInput.name) {
      return {
        errors: [
          {
            path: "Aktualizacja danych użytkownika",
            message: "Pozostawiłeś nazwę pustą",
          },
        ],
      };
    }
    const _id = userInput._id;
    const user = await User.findOne({ _id });

    // console.log("userInput", userInput);

    const data = {
      name: userInput.name ? userInput.name : user.name,
      email: userInput.email,
      address: userInput.address ? userInput.address : user.address,
      phone: userInput.phone ? userInput.phone : user.phone,
      password: userInput.password ? userInput.password : user.password,
      status: userInput.status ? userInput.status : user.status,
      company: userInput.company ? userInput.company : user.company,
      projects: userInput.projects ? userInput.projects : user.projects,
      users: userInput.users ? userInput.users : user.users,
      lastActive: userInput.lastActive ? userInput.lastActive : user.lastActive,
    };
    // console.log("pass", userInput.password.length);
    if (userInput.password.length > 0) {
      const salt = bcrypt.genSaltSync(14);
      const hash = bcrypt.hashSync(userInput.password, salt);
      data.password = hash;
    }

    // console.log("data push", data);

    try {
      user.overwrite(data);
      const storedUser = await user.save();
      return { ...storedUser._doc, _id: storedUser._id.toString() };
    } catch (e) {
      return {
        errors: [
          {
            path: "Aktualizacja danych użytkownika",
            message: e,
          },
        ],
      };
    }
  },
};
