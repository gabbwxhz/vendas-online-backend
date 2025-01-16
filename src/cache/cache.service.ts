import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  // "T" eh um tipo de entidade ou tipo de classe
  // um coringa que sera substituido pelo tipo
  // passado no momento de chamar a funçao getCache
  async getCache<T>(
    key: string,
    functionRequest: () => Promise<T>,
  ): Promise<T> {
    // armazena em cache, quando buscado
    const allData: T = await this.cacheManager.get(key);

    // verifica se tem dados em cache
    if (allData) {
      // retorna o que esta armazenado sem buscar no banco de dados
      return allData;
    }

    const request: T = await functionRequest();

    await this.cacheManager.set(key, request);

    return request;
  }
}
