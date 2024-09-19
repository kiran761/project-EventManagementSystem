export class Payment {
    id: number;
    vendorId: number;
    eventId: number;
    amount: number;
    dueDate: string;
    status: string;

    constructor(id: number, vendorId: number, eventId: number, amount: number, dueDate: string, status: string) {
        this.id = id;
        this.vendorId = vendorId;
        this.eventId = eventId;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
    }
}