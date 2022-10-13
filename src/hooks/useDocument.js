import { doc, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../firebase/config"

export const useDocument = (coll, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    
    useEffect(() => {
        setError(null)
        const docRef = doc(db, coll, id)

        const unsub = onSnapshot( docRef, (snapshot) => {
            if (snapshot.data()) {
                setDocument(snapshot.data())
                console.log(`data`, snapshot.data());
                setError(null)
            } else {
                setError('Could not get this document')
            }
        })
        
        return () => unsub()
    }, [coll, id])

    return { document, error }
}