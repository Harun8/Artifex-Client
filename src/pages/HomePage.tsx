import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

import "../App.css";
import axios from "axios";
import Loader from "../components/loader";

function HomePage() {
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const getImage = async () => {
    setIsFetching(true);
    try {
      const response: any = await axios.post(
        "http://localhost:8080/api/v1/prompt",
        {
          prompt,
        }
      );
      const { data } = response;
      console.log(data, response);

      setImages(data);
    } catch (error) {
      // show a different loader here since there's an error
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <div className="sticky p-3 mb-1.5  h-header-height font-semibold bg-token-main-surface-primary max-md:hidden">
        <p className=" text-xl text-bold hover:text-blue-800 text-blue-600 ">
          <a href="/inspiration"> Inspiration </a>
        </p>
      </div>
      <div className="mt-52 sm:mt-52 md:mt-52 lg:mt-52 ">
        <TypeAnimation
          className="text-gray-800"
          aria-label="We produce food for Mice, Hamsters, Guinea Pigs and Chinchillas"
          sequence={["What image do you want created?"]}
          speed={50}
          wrapper="strong"
          style={{ fontSize: "2em" }}
          repeat={0}></TypeAnimation>
        <label
          for="search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Describe an image you want created"
            required
          />
          <button
            onClick={getImage}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gray-950 hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
      </div>

      {isFetching ? (
        <div className="flex flex-col items-center">
          <Loader />
          <p className="mt-2">We are creating your images, please wait ...</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 max-w-[400px] md:max-w-[600px]">
            {images.map((img, index) => (
              <img className="hover:opacity-75 mx-auto" src={img} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
