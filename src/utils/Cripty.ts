import { sha256, sha224 } from 'js-sha256';

export class Cripty {

    encripty(key: string) {
        let hash = sha256.create();
        hash.update(key);
        return hash.hex();
    }

}