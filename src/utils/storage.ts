import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface Moto {
  id: string; // Firebase document ID
  name: string;
  image: string; // Base64 comprimida
  cilindrada: string;
  peso: string;
  caracteristicas?: { name: string; value: string }[]; // Detalles dinámicos (color, frenos, etc)
  createdAt?: number;
}

const COLLECTION_NAME = 'motos';

export const getMotos = async (): Promise<Moto[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const motos: Moto[] = [];
    snapshot.forEach((document) => {
      motos.push({ id: document.id, ...document.data() } as Moto);
    });
    return motos;
  } catch (error) {
    console.error("Error fetching motos:", error);
    return [];
  }
};

export const addMoto = async (moto: Omit<Moto, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: moto.name,
      cilindrada: moto.cilindrada,
      peso: moto.peso,
      caracteristicas: moto.caracteristicas || [],
      image: moto.image, // Guardamos la imagen comprimida directamente en la BD de texto
      createdAt: Date.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding moto:", error);
    throw error;
  }
};

export const deleteMoto = async (moto: Moto) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, moto.id));
  } catch (error) {
    console.error("Error deleting moto:", error);
    throw error;
  }
};

export const getUserRole = async (uid: string): Promise<string> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists() && userDoc.data().role) {
      return userDoc.data().role;
    }
    
    // TRUCO DE ONBOARDING:
    await setDoc(userDocRef, {
      role: 'admin',
      createdAt: Date.now()
    });
    return 'admin';
  } catch (e) {
    return 'empleado';
  }
};
