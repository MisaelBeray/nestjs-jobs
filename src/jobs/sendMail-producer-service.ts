import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/create-user/create-user-dto';
import { Queue } from 'bull';

@Injectable()
class SendMailProducesService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}
  async sendMail(createUserDTO: CreateUserDTO) {
    await this.queue.add('sendMail-job', createUserDTO, {
      delay: 3000,
    });
  }
}

export { SendMailProducesService };
