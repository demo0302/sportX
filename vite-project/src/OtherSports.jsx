import "./style.css";
import "./style2.css";
function OtherSports() {
  return (
    <section className="other-sports">
      <h2>Other Sports</h2>
      <p>If your sport isn't listed in the popular sports, feel free to explore or suggest other sports.</p>
      <div className="other-sports-form">
        <input type="text" placeholder="Enter your sport..." />
        <button
          className="submit"
          onClick={(e) => {
            e.preventDefault();
            const button = e.target;
            button.innerText = button.innerText === "Submit" ? "Submitted" : "Submit";
          }}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default OtherSports;
