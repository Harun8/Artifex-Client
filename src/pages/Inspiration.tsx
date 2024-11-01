import axios from "axios";
import React, { useEffect, useState } from "react";

const Inspiration = () => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const getImages = async () => {
      const response = await axios.get("http://localhost:8080/api/v1/images");
      const { data } = response;
      console.log("data", data);
      setImages(data);
    };

    getImages();
  }, []);
  return (
    <div>
      <p
        className="text-4xl letter-spacing: 0.025em;
text-slate-700	 font-black">
        See what others have created!
      </p>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 max-w-[400px] md:max-w-[600px]">
          {images.map((img, index) => (
            <img
              className="hover:opacity-75 mx-auto"
              src={`data:image/png;base64,${img.imageData}`}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
