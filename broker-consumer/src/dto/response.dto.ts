
export class ResponseDto {
    success: boolean;

    data: any | any[];

    error: any;
    
    message: string;

    constructor() {
        this.success = false;
        this.data = null;
        this.error = null;
        this.message = '';
    }
}