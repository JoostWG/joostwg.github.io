import { Api } from 'jolpica-f1-api'
import { F1LocalStorage } from './F1LocalStorage'

export class F1Api extends Api {
  public constructor() {
    super({ cache: new F1LocalStorage() })
  }
}
