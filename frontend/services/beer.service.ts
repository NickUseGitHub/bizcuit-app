import { Beer } from '@backend/beer/beer.entity'
import { ApiService } from '@services/api.service'

class BeerService extends ApiService {
  async getRandomBeer(delaySecond: number = 0): Promise<Beer | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.get('/beer/random')
          .then((res) => resolve(res.data))
          .catch(reject)
      }, delaySecond * 1000)
    })
  }
}

export default new BeerService()
