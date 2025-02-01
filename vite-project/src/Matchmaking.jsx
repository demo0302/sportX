import "./style.css";

function Matchmaking() {
  return (
    <section id="matchmaking">
      <h2 className="match">Game Connect!!!!</h2>
      <p 
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          color: "rgb(38, 2, 80)",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        Find players of similar skill level to play with!
      </p>
      <div className="parent-container">
        <img 
          className="img1" 
          src="https://cdn-icons-png.flaticon.com/512/16272/16272337.png" 
          alt="Player Icon 1"
        />
        <img 
          className="img1" 
          src="https://cdn-icons-png.flaticon.com/512/16272/16272279.png" 
          alt="Player Icon 2"
        />
        <div className="parent-container">
          <button id="play">Match and play</button>
        </div>
      </div>
      <hr style={{ height: "3px", backgroundColor: "rgb(83, 0, 161)" }} />
    </section>
  );
}

export default Matchmaking;
