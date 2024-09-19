export class GuestModel {
    id: number;
    name: string;
    email: string;
    rsvpStatus: string;
    eventId: number;

    constructor(id: number, name: string, email: string, rsvpStatus: string, eventId: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rsvpStatus = rsvpStatus;
        this.eventId = eventId;
    }
}