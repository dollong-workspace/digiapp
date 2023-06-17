// type / interface
type DigimonCardPropsType = {
  name: string;
  img: string;
};

// props, DRY
const DigimonCard: React.FC<DigimonCardPropsType> = ({ name, img }) => (
  <div className="max-w-sm rounded shadow-lg overflow-hidden">
    <img className="w-full" src={img} alt="" />
    <p className="py-4 px-5 bg-slate-800 text-gray-400">{name}</p>
  </div>
);

export default DigimonCard;
