import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //   First way to get data
  useEffect(() => {
    setLoading(true);
    getDocs(collection(db, collectionName))
      .then((data) => {
        const docs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setData(docs);
      })
      .then(() => {
        setLoading(false);
      });
  }, [collectionName]);

  //   Second way to get data
  //   useEffect(() => {
  //     setLoading(true);
  //     try {
  //       onSnapshot(collection(db, collectionName), (snapshot) => {
  //         setData(
  //           snapshot.docs.map((doc) => ({
  //             ...doc.data(),
  //             id: doc.id,
  //           }))
  //         );
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error.message);
  //     }
  //   }, [collectionName, setLoading]);

  return { data, setData, loading, setLoading };
};

export default useGetData;
