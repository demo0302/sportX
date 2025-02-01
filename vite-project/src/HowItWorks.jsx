import "./style.css";
function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-grid">
        {["Create an Account", "Choose Your Sport", "Connect and Play"].map((step, index) => (
          <div key={index} className="step-item">
            <h3>{index + 1}. {step}</h3>
            <p>Learn how to {step.toLowerCase()}.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
