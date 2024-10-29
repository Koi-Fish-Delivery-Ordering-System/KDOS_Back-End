import { Field, ObjectType } from "@nestjs/graphql"
import { IsJWT } from "class-validator"

@ObjectType()
export class AuthTokens {
  @IsJWT()
  @Field(() => String)
      accessToken: string
}

export enum TokenType {
  Access = "Access",
}

export enum AuthTokenType {
  Access = "Access",
}

export type Payload = {
  accountId: string;
  accountRoles?: Array<string>;
  type: AuthTokenType;
  iat: string;
  exp: string;
};
