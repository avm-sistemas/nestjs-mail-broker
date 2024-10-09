import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    data: any | any[];

    @ApiProperty()
    error: any;
    
    @ApiProperty()
    message: string;

    constructor() {
        this.success = false;
        this.data = null;
        this.error = null;
        this.message = '';
    }
}