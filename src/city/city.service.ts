import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getAllCities(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    // armazena o id do estado em cache, quando buscado
    const citiesCache: CityEntity[] = await this.cacheManager.get(
      `state_${stateId}`,
    );

    // verifica se as cidades estao no cache, pelo id do estado
    // se o id ja foi buscado, estara armazenado em cache
    if (citiesCache) {
      // retorna o que esta armazenado sem buscar no banco de dados
      return citiesCache;
    }

    const cities = await this.cityRepository.find({
      where: { stateId },
    });

    await this.cacheManager.set(`state_${stateId}`, cities);

    return cities;
  }
}
