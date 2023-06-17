import { useState } from "react";
import DigimonCard from "./components/DigimonCard";
import { DIGIMONS_DATA } from "./core/db";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [digimonData, setDigimonData] = useState({
    name: "", // false
    image: "Y", // true
  });

  return (
    <div className="px-8">
      <input
        className="mb-4"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <p>Search Result: {searchValue}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  py-8 gap-4 gap-y-5">
        {DIGIMONS_DATA.map((item) => (
          <DigimonCard name={item.name} img={item.image} />
        ))}
        {digimonData.name && (
          <DigimonCard name={digimonData.name} img={digimonData.image} />
        )}
      </div>
      <button
        className="block mb-4 bg-orange-300 px-8 py-4 rounded-md"
        onClick={() =>
          setDigimonData({
            name: "digimon 371",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFkO9wIlu4WYOMmgAIOZ40JS_7goueg1Tsw&usqp=CAU",
          })
        }
      >
        Add:{" "}
      </button>
      {/* Task: Delete */}
      <button className="block bg-orange-300 px-8 py-4 rounded-md">
        Delete
      </button>
    </div>
  );
}

export default App;
