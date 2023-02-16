import React from 'react'
import { useSubscribe } from 'replicache-react-util'
import { nanoid } from 'nanoid'

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
    <AddPlant rep={rep}/>
    {plants && <Plants plants={plants}/>}
    </div>
  )
}

function AddPlant({rep}){
  const nameRef = React.useRef()
  const speciesRef = React.useRef()

  function doSomething(){
    console.log('do something')
    console.log(nameRef.current.value)
    const createdBy = nameRef.current.value
    const species = speciesRef.current.value
    const thing = newPlant({createdBy, species})
    console.log({thing})
    rep.mutate.createPlant(thing)

  }

  function newPlant({createdBy, species}) {
    let newPlant = {
      id: nanoid(),
      createdBy,
      species,
    }
    return newPlant
  }
  return (
    <div>
      <input ref={nameRef} type="text" placeholder="your name"/>
      <input ref={speciesRef} type="text" placeholder="species"/>
      <button onClick={() => doSomething()}>add plant</button>
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
    })}g
    </div>
  )
}
