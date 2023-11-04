"use client";

import { Auth } from "@/components/Auth";
import { db, auth, storage } from "@/configs/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";

type MovieList = {
  id: string;
  receivedOscar: boolean;
  releaseDate: number;
  title: string;
};

export default function Home() {
  const [movieList, setMovieList] = useState<MovieList[]>();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDate, setMovieDate] = useState("");
  const [isMovieOscar, setIsMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        receivedOscar: doc.data().receivedOscar,
        releaseDate: doc.data().releaseDate,
        title: doc.data().title,
      }));

      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovieTitle = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movieTitle,
        releaseDate: movieDate,
        receivedOscar: isMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };

  // hello world
  return (
    <main>
      <h1 className="font-bold text-3xl underline text-center my-3">
        Firebase
      </h1>
      <br />
      <Auth />

      <br />

      <div>
        <input
          onChange={(e) => setMovieTitle(e.target.value)}
          type="text"
          placeholder="Movie title"
          className="border-[1px] border-black"
        />
        <input
          onChange={(e) => setMovieDate(e.target.value)}
          type="text"
          placeholder="Movie releaseDate"
          className="border-[1px] border-black"
        />
        <input
          type="checkbox"
          checked={isMovieOscar}
          onChange={(e) => setIsMovieOscar(e.target.checked)}
        />
        <label> Received Oscar</label>
        <br />
        <button
          className="bg-indigo-500 text-white font-semibold p-3"
          onClick={onSubmitMovie}
        >
          Submit Movie
        </button>
      </div>

      <div>
        <h1 className="font-bold text-3xl text-center my-4">Movies List : </h1>
        {movieList?.map((movie) => (
          <div
            className="my-4 w-[400px] mx-auto shadow-md p-3 bg-gray-100"
            key={movie.id}
          >
            <h1>
              <b>{movie.title}</b>
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <p>
              Received Oscar :{" "}
              <span
                className={`${
                  movie.receivedOscar
                    ? "text-green-600 uppercase font-bold text-lg"
                    : "text-red-500 uppercase font-bold text-lg"
                }`}
              >
                {JSON.stringify(movie.receivedOscar)}
              </span>
            </p>
            <button
              onClick={() => deleteMovie(movie.id)}
              className="text-red-500 uppercase font-bold text-lg"
            >
              Delete
            </button>
            <input
              onChange={(e) => setUpdatedTitle(e.target.value)}
              type="text"
              placeholder="new Title..."
            />
            <button
              onClick={() => updateMovieTitle(movie.id)}
              className="bg-indigo-500 text-white font-semibold p-3"
            >
              Update Title
            </button>
          </div>
        ))}
      </div>
      <div className="">
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              setFileUpload(file);
            }
          }}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </main>
  );
}
