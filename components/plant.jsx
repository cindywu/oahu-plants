import React from 'react'
import { useSubscribe } from 'replicache-react-util'

export default function Plant({rep}) {
  console.log({rep})
  const plants = useSubscribe(
    rep,
    async tx => {
      const list = await tx.scan({prefix: 'plant/'}).entries().toArray();
      return list;
    },
    [],
  );

  console.log({plants})
  return (
    <div>
    plants
    {plants && <Plants plants={plants}/>}
    </div>
  )
}

function Plants({plants}) {
  return (
    <div>
    {plants.map(([key, value]) => {
      return (
        <div key={key}>
        {value.species}
        </div>
      )
    })}
    </div>
  )
}
