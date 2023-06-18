import { useEffect, useState } from "react";
import DigimonCard from "./components/DigimonCard";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DigimonDataTypes = {
  name: string;
  image: string;
}[];

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [digimonData, setDigimonData] = useState<DigimonDataTypes>([]);
  const [digimonSearch, setDigimonSearch] =
    useState<DigimonDataTypes>(digimonData);
  const [digiName, setDigiName] = useState("");
  const [digiImgUrl, setDigiImgUrl] = useState("");
  // const [editDigi, setEditDigi] = useState({
  //   name: "",
  //   imgUrl: "",
  // });
  const [isLoading, setIsLoading] = useState(true);

  const handleEditDigimon = () => {
    setDigimonSearch([
      ...digimonSearch,
      {
        name: "Digi 0123",
        image: "https://digimon-api.com/images/digimon/w/Ancient_Beatmon.png",
      },
    ]);
  };

  useEffect(() => {
    const getDigimons = async () => {
      try {
        const response = await axios.get(
          "https://www.digi-api.com/api/v1/digimon"
        );

        setDigimonData(response.data.content);
        setDigimonSearch(response.data.content);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast("Unknown error");
      }
    };

    getDigimons();
  }, []);

  useEffect(() => {
    // name === searchValue ? digimonSearch
    // includes / contains
    const filterData = digimonData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setDigimonSearch(filterData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="px-8">
      <ToastContainer />
      <input
        className="mb-4"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <p>Search Result: {searchValue}</p>
      {isLoading ? (
        <p className="h-screen">Loading...</p>
      ) : (
        <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  py-8 gap-4 gap-y-5">
          {digimonSearch.map((item) => (
            <DigimonCard name={item.name} img={item.image} />
          ))}
        </div>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="block p-2 mb-2"
          type="text"
          placeholder="name..."
          value={digiName}
          onChange={(e) => setDigiName(e.target.value)}
        />
        <input
          className="block p-2 mb-2"
          type="text"
          placeholder="image url..."
          value={digiImgUrl}
          onChange={(e) => setDigiImgUrl(e.target.value)}
        />
        <button
          className="block mb-4 bg-orange-300 px-8 py-4 rounded-md"
          onClick={() =>
            setDigimonSearch([
              ...digimonSearch,
              {
                name: digiName,
                image: digiImgUrl,
              },
            ])
          }
        >
          Add:{" "}
        </button>
      </form>
      {/* Task: Delete */}
      <button className="block bg-orange-300 px-8 py-4 rounded-md">
        Delete
      </button>
    </div>
  );
}

export default App;
