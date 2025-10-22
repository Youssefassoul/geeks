function Card({ icon, title, text }) {
  return (
    <div className="col-md-4 mb-4">
      <i className={`fa ${icon} fa-3x text-danger mb-3`}></i>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default Card;
