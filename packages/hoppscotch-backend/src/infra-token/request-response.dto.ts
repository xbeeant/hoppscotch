import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { OffsetPaginationArgs } from 'src/types/input-types.args';

// POST v1/infra/user-invitations
export class CreateUserInvitationRequest {
  @Type(() => String)
  @IsNotEmpty()
  @ApiProperty()
  inviteeEmail: string;
}
export class CreateUserInvitationResponse {
  @ApiProperty()
  @Expose()
  invitationLink: string;
}

// GET v1/infra/user-invitations
export class GetUserInvitationResponse {
  @ApiProperty()
  @Expose()
  inviteeEmail: string;

  @ApiProperty()
  @Expose()
  invitedOn: Date;
}

// DELETE v1/infra/user-invitations
export class DeleteUserInvitationRequest {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => String)
  @IsNotEmpty()
  @ApiProperty()
  inviteeEmails: string[];
}
export class DeleteUserInvitationResponse {
  @ApiProperty()
  @Expose()
  message: string;
}

// POST v1/infra/users
export class GetUsersRequestQuery extends OffsetPaginationArgs {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiPropertyOptional()
  searchString: string;
}
export class GetUserResponse {
  @ApiProperty()
  @Expose()
  uid: string;

  @ApiProperty()
  @Expose()
  displayName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  photoURL: string;

  @ApiProperty()
  @Expose()
  isAdmin: boolean;
}

// PATCH v1/infra/users/:uid
export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiPropertyOptional()
  displayName: string;
}

// PATCH v1/infra/users/:uid/admin-status
export class UpdateUserAdminStatusRequest {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isAdmin: boolean;
}
export class UpdateUserAdminStatusResponse {
  @ApiProperty()
  @Expose()
  message: string;
}

// Used for Swagger doc only, in codebase throwHTTPErr function is used to throw errors
export class ExceptionResponse {
  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty()
  @Expose()
  statusCode: number;
}
