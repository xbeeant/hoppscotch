import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerService } from './mailer.service';
import { throwErr } from 'src/utils';
import { MAILER_FROM_ADDRESS_UNDEFINED } from 'src/errors';

@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        ignoreTLS: process.env.SMTP_IGNORE_TLS === 'true',
        secure: process.env.SMTP_SECURE === 'true',
        tls: {
          rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED === 'true',
        },
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from:
          process.env.MAILER_ADDRESS_FROM ??
          throwErr(MAILER_FROM_ADDRESS_UNDEFINED),
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
