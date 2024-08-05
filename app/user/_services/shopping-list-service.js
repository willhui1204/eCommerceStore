import { collection, getDocs, addDoc, query, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../_utils/firebase";

const getCartItems = async (userId) => {
  const q = query(collection(db, "users", userId, "carts"));
  const querySnapshot = await getDocs(q);

  let items = [];
  querySnapshot.forEach((doc) => {
    items.push({ ...doc.data() });
  });
  return items;
};

const addCartItem = async (userId, item) => {
  const productRef = doc(db, "users", userId, "carts", item.id.toString());
  const productSnap = await getDoc(productRef);
  try {
    if (productSnap.exists()) {
      // If the product already exists in the cart, update the quantity
      await updateDoc(productRef, {
        quantity: productSnap.data().quantity + 1,
      });
    } else {    
      // Otherwise, add the product to the cart
      await setDoc(productRef, {
        ...item,
        quantity: 1,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return productRef.id;
};

export { getCartItems, addCartItem };
