const Beers = ({ beers = [] }) => (
  <section className="beers">
    {beers.map((b) => (
      <article key={b.id}>
        <h3>{b.name}</h3>
        <p>{b.description}</p>
        <span>{b.abv}%</span>
      </article>
    ))}
  </section>
);

export default Beers;
