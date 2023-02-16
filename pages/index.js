import { useState, useEffect } from 'react';
import { Replicache } from 'replicache';
import Plant from '../components/plant'

export default function Home(){
  const [rep, setRep] = useState(null);

  useEffect(() => {
    if (rep) {
      return;
    }

    const r = new Replicache({
      pushURL: '/api/replicache-push',
      pullURL: '/api/replicache-pull',
      name: 'oahu-plants-user-id',
      mutators: {
        async createPlant(tx, {id, createdBy, species}) {
          await tx.put(`plant/${id}`, {
            createdBy,
            species,
          });
        },
      },
      licenseKey : process.env.REPLICACHE_LICENSE_KEY
    })
    setRep(r)

  }, [rep])

  if (!rep) {
    return null;
  }

  return (
    <div>
    hi
    <Plant rep={rep}/>
    </div>
  )
}