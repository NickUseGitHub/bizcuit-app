import { Beer } from '@backend/beer/beer.entity'
import React from 'react'

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
    </div>
  )
}
