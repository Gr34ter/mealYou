import { addDoc, doc, deleteDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { useReducer } from "react"
import { db } from "../firebase/config";


let initialState = {
    document: null,
    isPending: false,
    success: null,
    error: null,
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'ADDED_DOCUMENT':
            return { document: action.payload, isPending: false, success: true, error: null };
        case 'DELETED_DOCUMENT':
            return { document: null, isPending: false, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { document: action.payload, isPending: false, success: true, error: null }
        case 'ERROR' : 
            return { document: null, isPending: false, success: false, error: action.payload }
        default:
            return state;
    }
}

export const useFirestore = (coll) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    
    const collRef = collection(db, coll);
    

    // add document
    const addDocument = async(doc) => {
        try {
            const createdAt = serverTimestamp()
            const addedDocument = await addDoc(collRef, {...doc, createdAt})

            dispatch({type: 'ADDED_DOCUMENT', payload: addedDocument})
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message})
        }
    }

    //delete document
    const deleteDocument = async (id) => {
        try {
            const deletedDocument = await deleteDoc(doc(db, coll, id))
            
            dispatch({ type: 'DELETED_DOCUMENT', payload: deletedDocument })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message})
        }
    }
    
    // updateDocument
    const updateDocument = async (id, updates) => {
        try {
            const docRef = doc(db, coll, id)
            const updatedDocument = updateDoc(docRef, updates)
            dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDocument })

            return updatedDocument
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message})
        }
    }

    return { addDocument, deleteDocument, updateDocument, response }
}
