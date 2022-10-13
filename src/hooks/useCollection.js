import { db } from "../firebase/config"
import { onSnapshot, collection } from "firebase/firestore"
import { useEffect, useState } from "react";



export const useCollection = (coll, uid) => {
    const [documents, setDocuments] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        const collRef = collection(db, coll);
        setError(null)
        setIsPending(true)

        const unsub = onSnapshot(collRef, (snapshot) => {
                let result = []
                snapshot.docs.map((doc) => {
                return result.push({ ...doc.data(), id: doc.id })
            })

            // filter result - get only current users documents.
            const usersDocuments = result.filter((doc) => {
                return doc.createdBy === uid
            })

            setDocuments(usersDocuments)

            setIsPending(false)
            setError(null)
        }, (err) => {
            setError('could not fetch the data')
            console.log(err.message);
        })

        return () => unsub()
    }, [coll, uid])


    return { documents, error, isPending }

}