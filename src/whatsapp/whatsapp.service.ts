import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';


@Injectable()
export class WhatsappService {
    async sendMessage(phone: string, message: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'whatsapp_sender.py');
            const process = spawn('python', [scriptPath, phone, message]);

            let output = '';
            let errorOutput = '';

            process.stdout.on('data', (data) => {
                output += data.toString();
            });

            process.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });
            process.on('close', (code) => {
                if (code === 0) {
                    try {
                        resolve(JSON.parse(output));
                    } catch (err) {
                        reject({ status: 'error', error: 'error parseando salida del script', raw: output });
                    }
                } else {
                    reject({ status: 'error', error: errorOutput || 'Falló el script' });
                }
            });
        });
   }
}
