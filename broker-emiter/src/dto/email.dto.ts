import { ApiProperty } from "@nestjs/swagger";

export class EmailDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    subject: string;
    
    @ApiProperty()
    message: string;

    constructor() {
        this.email = '';
        this.subject = '';
        this.message = '';
    }
}
