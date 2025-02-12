import { INewNominated } from "@/components/organisms/CreateNominatedForm";
import { authService, database } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  QuerySnapshot,
  writeBatch,
  doc,
  DocumentReference,
  query,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export const getVotes = (callback: (item: QuerySnapshot) => void) => {
  try {
    return onSnapshot(
      query(collection(database, "votes"), orderBy("created")),
      (querySnapshot) => {
        callback(querySnapshot);
      }
    );
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const getNominateds = async (): Promise<Nominated[]> => {
  try {
    const querySnapshot = await getDocs(collection(database, "nominateds"));

    return querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as Nominated[];
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const querySnapshot = await getDocs(collection(database, "categories"));
    // Filter by active true
    // const querySnapshot = await getDocs(
    //   query(collection(database, "categories"), where("active", "==", true))
    // );

    return querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as Category[];
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const getInitialData = async (): Promise<TInitialData | null> => {
  try {
    const categories = await getCategories();

    return {
      categories,
    };
  } catch (error) {
    console.error("Error getting data:", error);
    return null;
  }
};

export const getImagesNominateds = async (): Promise<string[]> => {
  try {
    const imagesRef = ref(getStorage(), "new-nominateds");

    const { items } = await listAll(imagesRef);

    const urls = await Promise.all(
      items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      })
    );
    return urls;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createVote = async (vote: Vote) => {
  try {
    const docRef = await addDoc(collection(database, "votes"), vote);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const updateNominateds = async (
  nominateds: Nominated[],
  votesForDelete?: Vote[]
) => {
  try {
    const batch = writeBatch(database);

    for (const item of nominateds) {
      const nominatedRef: DocumentReference = doc(
        database,
        "nominateds",
        item.id
      );
      batch.update(nominatedRef, { ...item });
    }

    if (votesForDelete) {
      for (const item of votesForDelete) {
        const voteRef: DocumentReference = doc(
          database,
          "votes",
          item.id as string
        );
        batch.delete(voteRef);
      }
    }

    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const createNominated = async (nominated: INewNominated) => {
  try {
    const docRef = await addDoc(collection(database, "nominateds"), {
      ...nominated,
      winner: false,
      created: Date.now(),
      votes: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      authService,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error(error);
  }
};
