export class Task {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    dueTime: string;
    status: string;
    eventId: number;

    constructor(id:number,name:string,description:string,dueDate:string,dueTime:string,status:string,eventId:number){
        this.id=id;
        this.name=name;
        this.description=description;
        this.dueDate=dueDate;
        this.dueTime=dueTime;
        this.status=status;
        this.eventId=eventId
    }
  }