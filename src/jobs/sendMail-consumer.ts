import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}
  @Process('sendMail-job')
  async sendMailJOb(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: String(data.email),
      from: 'Misael Beray',
      subject: 'Apenas um teste!',
      text: `Olá ${data.name}, esse é apenas um e-mail de teste.`,
    });
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`);
  }
}

export { SendMailConsumer };
