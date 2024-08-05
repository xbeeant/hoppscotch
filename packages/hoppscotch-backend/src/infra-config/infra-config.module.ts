import { Module } from '@nestjs/common';
import { InfraConfigService } from './infra-config.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SiteController } from './infra-config.controller';
import { InfraConfigResolver } from './infra-config.resolver';

@Module({
  imports: [PrismaModule],
  providers: [InfraConfigResolver, InfraConfigService],
  exports: [InfraConfigService],
  controllers: [SiteController],
})
export class InfraConfigModule {}
