import { StateEntity } from '../entities/state.entity';

export class ReturnStateDto {
  name: string;

  constructor(stateEtity: StateEntity) {
    this.name = stateEtity.name;
  }
}
