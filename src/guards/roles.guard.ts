import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dtos/loginPayload.dto';
import { ROLES_KEYS } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEYS,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return false;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: LoginPayloadDto | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET_KEY,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      throw new UnauthorizedException(
        'Usuário não tem a permissão necessária.',
      );
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}
