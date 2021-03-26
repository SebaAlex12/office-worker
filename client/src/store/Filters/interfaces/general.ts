export interface IfiltersElement{
    statuses:[
      { _id: string,
        name: string,
        active: boolean,
      }
    ],
    projectName: string
}