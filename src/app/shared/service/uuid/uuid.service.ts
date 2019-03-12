import { UUID } from './uuid';

export class UuidService  {

    static NAME: string = 'uuidService';

    constructor() {
        'ngInject';
    }

    public generate(): string {
        return UUID.UUID();
    }
}