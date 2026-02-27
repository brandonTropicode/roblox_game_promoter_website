import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

export async function getUserByID(uid) {
    if (!uid) return null

    const snapshot = await getDoc(doc(db, 'users', uid));

    if (!snapshot.exists()) {
        return null
    }

    return snapshot.data() //<- {email, firstname, lastname}
}