import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
    private readonly apiUrl = 'https://graph.facebook.com/v22.0';
    private readonly phoneNumberId = '856944747494157';
    private readonly accessToken = 'EAAaFx6I6mlsBPR2x4uImZARslWMXS2yQC2KqZBwg0SYEH8X2rm8Jn5S3UvBxdS036sewVdHzwPZBV0msx0hwP82xqA5AZCHpGroklJ86vQZCN5KtIk33ZBBaUJKWrg7LabDJEX805gp4D0j6a9za1aufZAZCQjZCwn8dCeoeKhfzOvpmHmGr0HRW6I2MXdSWPRE1VcfK9grfXbp3ef50ZAYumwNEc2eguE1R9nv4nkC1Kd91cZD'


    async sendMessage(to: string) {
        try {
            const response = await axios.post(
                `${this.apiUrl}/${this.phoneNumberId}/messages`,
                {
                    messaging_product: 'whatsapp',
                    to: to,
                    type: 'template',
                    template: {
                        name: 'hello_world',
                        language: { code: 'en_US' },

                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data;
        }
        catch (error) {
            throw new HttpException(
                error.response?.data || 'Error al enviar el mensaje',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
