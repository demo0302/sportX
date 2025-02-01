import "./style.css";
function Scheduling() {
  return (
    <section id="scheduling">
      <h2>Real-Time Scheduling and Availability</h2>
      <form>
        <label htmlFor="availability">Your Availability:</label>
        <input type="text" id="availability" placeholder="Enter available dates/times" />
        <button type="submit">Find Common Slots</button>
      </form>
    </section>
  );
}

export default Scheduling;
