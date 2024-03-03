import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot , addDoc,
    deleteDoc, doc, query, where, orderBy , serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8exevj5__ljrfGtpRYWPOwzcvcHJS6v4",
    authDomain: "demoproject-98ad3.firebaseapp.com",
    projectId: "demoproject-98ad3",
    storageBucket: "demoproject-98ad3.appspot.com",
    messagingSenderId: "526460598177",
    appId: "1:526460598177:web:7de83db580164260343de0"
  };

var app = initializeApp(firebaseConfig)
const db = getFirestore(app)

//collection reference
const colRef = collection(db, 'Anime')

//query reference
const q = query(colRef, orderBy('createdAt', 'desc'))
//get collection
/*
getDocs(colRef).then((snapshot) => {
    let anime = []

    snapshot.docs.forEach((doc) => {
        anime.push({ ...doc.data(), id: doc.id });
    })

    console.log(anime);
})
.catch(err => {
    console.log(err.message)
})
*/

//real time data collection added

onSnapshot(q, (snapshot) => {
    let anime = []
    snapshot.docs.forEach((doc) => {
        anime.push({...doc.data(), id : doc.id})
    })

    console.log(anime)
})
const addNewAnime = document.querySelector('.add')
addNewAnime.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        Series: addNewAnime.series.value,
        Character: addNewAnime.character.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addNewAnime.reset()
    })
})

const deleteAnime = document.querySelector('.delete')
deleteAnime.addEventListener('submit', (f) => {
    f.preventDefault()

    var docRef = doc(db, 'Anime', deleteAnime.documentId.value)

    deleteDoc(docRef)
    .then(() => {
        deleteAnime.reset()
    })
})