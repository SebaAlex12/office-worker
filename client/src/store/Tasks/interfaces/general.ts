export interface ItaskElement{
    _id: number | undefined,
    projectId: number,
    createdByUserId: number,
    responsiblePersonId: number,
    title: string,
    status: string,
    priority: string,
    termAt: string,
    description: string,
    responsiblePersonLastComment: string,
    finishedAt: string | undefined,
    mailRemainderData: string | undefined,
    createdAt: string | undefined
}