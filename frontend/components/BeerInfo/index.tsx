import React from 'react'
import { Beer } from '~backend/beer/beer.entity'

interface Props {
  beer?: Beer
}

export default function BeerInfo({ beer }: Props) {
  if (!beer) {
    return null
  }

  return (
    <div>
      <div className="text-3xl">{beer.name}</div>

      <div className="flex flex-col border rounded-md p-3">
        {Object.keys(beer).map((beerField) => {
          const value = beer[beerField as keyof Beer]

          return (
            <span>
              {beerField}: {value}
            </span>
          )
        })}
      </div>
    </div>
  )
}
