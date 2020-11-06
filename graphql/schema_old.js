const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Error {
        path: String
        message: String
    }

    type Calendar {
        _id: ID
        eventId: String
        userId: String
        eventType: String
        title: String
        description: String
        selectedDate: String
        status: String
        createdAt: String
        errors: [Error]
    }

    type User {
        _id: ID
        name: String
        email: String
        address: String
        phone: String
        password: String
        status: String
        company: String
        projects: String
        users: String
        lastActive: String
        createdAt: String
        errors: [Error]
    }

    type Stage{
        _id: ID
        projectId: String
        description: String,
        createdAt: String
        createdBy: String
        termAt: String
        errors: [Error] 
    }

    type UserHistory {
        _id: ID
        userId: String
        userName: String
        taskCreatedBy: String
        taskProjectName: String
        taskTitle: String
        event: String
        createdAt: String
        errors: [Error]
    }

    type Settings {
        _id: ID
        mailingDate: String
    }

    type Task {
        _id: ID
        userId: String
        createdBy: String
        projectId: String
        projectName: String
        responsiblePerson: String
        title: String
        description: String
        priority: String
        status: String
        responsiblePersonLastComment: String
        createdAt: String
        finishedAt: String
        termAt: String
        mailRemainderData: String
        errors: [Error]
        files: [String]
    }
    type Comment {
        _id: String
        taskId: String
        userId: String
        createdBy: String
        description: String
        createdAt: String
        errors: [Error]
    }

    type Mail {
        _id: String
        from: String
        to: String
        projectName: String
        title: String
        description: String
        absolutePathFile: String
        attachments: String
        createdBy: String
        createdAt: String
        errors: [Error]
    }

    type Project {
        _id: ID
        lastStageId: String
        name: String
        signature: String
        type: String
        organ: String
        description: String
        lastStageDescription: String
        lastStageCreatedAt: String
        createdAt: String
        termAt: String
        errors: [Error]
    }

    type IncomingMail {
        _id: ID
        number: String
        deliveryDate: String
        sender: String
        deliveryCase: String
        signature: String
        description: String
        errors: [Error]
    }

    input CalendarInputData {
        _id: ID
        eventId: String
        userId: String
        eventType: String
        title: String
        description: String
        selectedDate: String
        status: String
        createdAt: String     
    }

    input UserInputData {
        _id: String
        name: String
        email: String
        address: String
        phone: String
        password: String
        status: String
        company: String
        projects: String
        users: String
        lastActive: String
        createdAt: String
    }

    input StageInputData {
        _id: String
        projectId: String
        description: String
        createdBy: String
        createdAt: String
        termAt: String
    }

    input UserHistoryInputData {
        _id: String,
        userId: String
        userName: String
        taskCreatedBy: String
        taskProjectName: String
        taskTitle: String
        event: String
        createdAt: String
    }

    input SettingsInputData {
        _id: String
        mailingDate: String
    }

    input TaskInputData {
        _id: String
        userId: String
        createdBy: String
        projectId: String
        projectName: String
        responsiblePerson: String
        title: String
        description: String
        priority: String
        status: String
        responsiblePersonLastComment: String
        createdAt: String
        finishedAt: String
        termAt: String
        mailRemainderData: String
    }
    input CommentInputData {
        _id: String
        taskId: String
        userId: String
        createdBy: String
        description: String
        createdAt: String
    }

    input MailInputData {
        _id: String
        from: String
        to: String
        projectName: String
        title: String
        description: String
        absolutePathFile: String
        attachments: String
        createdBy: String
        createdAt: String
    }

    input ProjectInputData {
        _id: String
        lastStageId: String
        name: String
        signature: String
        type: String
        organ: String
        description: String
        createdAt: String
        lastStageDescription: String
        lastStageCreatedAt: String
        termAt: String
    }

    input IncomingMailInputData {
        _id: String
        number: String
        deliveryDate: String
        sender: String
        deliveryCase: String
        signature: String
        description: String
    }

    type UserLoginData {
        _id: ID!
        name: String!
        email: String!
        address: String
        phone: String
        createdAt: String!
        password: String!
        status: String!
        company: String
        projects: String
        users: String
        lastActive: String
        token: String!
    }

    type RootMutation {
        addCalendar(calendarInput: CalendarInputData): Calendar!
        updateCalendar(calendarInput: CalendarInputData): Calendar!
        removeCalendar(eventId: String!): Calendar!
        createUser(userInput: UserInputData): User!
        addUserHistory(dataInput: UserHistoryInputData): UserHistory!
        addTask(taskInput: TaskInputData): Task!
        updateTask(taskInput: TaskInputData): Task!
        updateSettings(settingsInput: SettingsInputData): Settings!
        sendMailingTask: Task
        addComment(commentInput: CommentInputData): Comment!
        addMail(mailInput: MailInputData): Mail!
        removeTask(taskId: String!): Task!
        removeCommentsByTaskId(taskId: String!): Task!
        addProject(projectInput: ProjectInputData): Project!
        updateProject(projectInput: ProjectInputData): Project!
        removeProject(projectId: String!): Project!
        addStage(stageInput: StageInputData): Stage!
        updateStage(stageInput: StageInputData): Stage!
        removeStage(stageId: String!): Stage!
        updateUser(userInput: UserInputData): User!
        addIncomingMail(incomingMailInput: IncomingMailInputData): IncomingMail!
        updateIncomingMail(incomingMailInput: IncomingMailInputData): IncomingMail!
        removeIncomingMail(incomingMailId: String!): IncomingMail!
    }

    type RootQuery {
        loginUser(email: String!, password: String!): UserLoginData!
        fetchCalendars(loggedUserId: String): [Calendar]!
        fetchUsers(userInput: UserInputData): [User]!
        fetchUsersByLoggedUserProjects(projects: String): [User]!
        fetchUsersHistory(userId: String): [UserHistory]!
        fetchSettings: Settings!
        fetchTasks(taskInput: TaskInputData): [Task]!
        fetchTasksByLoggedUserProjects(taskInput: TaskInputData, projects: String): [Task]!
        fetchComments(commentInput: CommentInputData): [Comment]!
        fetchProjects(projectInput: ProjectInputData): [Project]!
        fetchStages(stageInput: StageInputData): [Stage]!
        fetchIncomingMails(incomingMailInput: IncomingMailInputData): [IncomingMail]!
        fetchMails: [Mail]!
        fetchProjectsByLoggedUserProjects(projects: String): [Project]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
