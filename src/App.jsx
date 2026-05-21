import { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function App({ url, limit = 10, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setImages(data.products);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrentSlide(x => x === 0 ? images.length - 1 : x - 1);
  }

  function handleNext() {
    setCurrentSlide(x => x === images.length - 1 ? 0 : x + 1);
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);

  console.log(currentSlide);

  if (loading) {
    return <div className="min-h-screen bg-white font-bold flex flex-col items-center p-10">Loading data ...</div>
  }

  if (errorMsg !== null) {
    return <div className="min-h-screen bg-white font-bold flex flex-col items-center p-10">Error occured! {errorMsg}</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-5 bg-white">
      <div className="flex flex-row gap-15 items-center justify-center">
        <BsArrowLeftCircleFill size={40} className="cursor-pointer" onClick={handlePrevious} />
        <div className="rounded-lg w-[50%]">
          {images && images.length
          ? images.map((image, index) => (
            <img
              key={image.id}
              alt={image.images[0]}
              src={image.images[0]}
              className={currentSlide == index ? "" : "hidden"}
            />
          )) : null}
        </div>
        <BsArrowRightCircleFill size={40} className="cursor-pointer" onClick={handleNext} />
      </div>
      <div className="flex flex-row gap-2 mt-2">
        {images && images.length
        ? images.map((image, index) => (
          <button 
            className={`flex w-3 h-3 me-3 rounded-full ${index == currentSlide ? "bg-black" : "bg-gray-300"} hover:cursor-pointer`}
            onClick={() => setCurrentSlide(index)}  
          >
          </button>
        )) : null}
        
      </div>
    </div>
  );
}