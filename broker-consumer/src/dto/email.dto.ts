export class EmailDto {
    email: string;

    subject: string;
    
    message: string;

    constructor() {
        this.email = '';
        this.subject = '';
        this.message = '';
    }
}
