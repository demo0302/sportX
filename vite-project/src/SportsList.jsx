import "./style.css";
function SportsList() {
  return (
    <section className="sports-list">
      <h2>Popular Sports</h2>
      <div className="sports-grid">
        {["Basketball", "Soccer", "Tennis", "Badminton", "Volleyball", "Cricket"].map((sport, index) => (
          <div key={index} className="sport-item">{sport}</div>
        ))}
      </div>
    </section>
  );
}

export default SportsList;
