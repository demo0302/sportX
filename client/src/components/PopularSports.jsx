import footballImg from "../assets/football.jpg";
import basketballImg from "../assets/basketball.jpg";
import cricketImg from "../assets/cricket.jpg";

const popularSports = [ 
  { name: "Football", image: footballImg },
  { name: "Basketball", image: basketballImg },
  { name: "Cricket", image: cricketImg }
];

const PopularSports = () => {
  return (
    <div className="container mx-auto p-10 pb-15 ">
      <h2 className="text-3xl font-bold text-center mb-6">Popular Sports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {popularSports.map((sport, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img src={sport.image} alt={sport.name} className="h-24 mx-auto mb-3" />
            <h3 className="text-xl font-semibold">{sport.name}</h3>
            <button 
  onClick={() => window.open("https://discord.gg/AWpEt2VB", "_blank")}
  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
>
  Join Now
</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSports;
