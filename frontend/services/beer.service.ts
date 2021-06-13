import { Beer } from '@backend/beer/beer.entity'
import { ApiService } from '@services/api.service'

class BeerService extends ApiService {
  async getRandomBeer(): Promise<Beer | null> {
    return this.get('/beer/random').then((res) => res.data)
  }
}

export default new BeerService()
