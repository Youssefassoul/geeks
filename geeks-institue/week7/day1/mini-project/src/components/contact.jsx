function Contact() {
  return (
    <div className="text-center p-4">
      <h4>Contact us</h4>
      <p>We respond within 24 hours.</p>
      <form className="w-75 mx-auto">
        <input type="text" className="form-control mb-2" placeholder="Name" />
        <input type="email" className="form-control mb-2" placeholder="Email" />
        <textarea
          className="form-control mb-2"
          placeholder="Message"
        ></textarea>
        <button className="btn btn-danger w-100">Send</button>
      </form>
    </div>
  );
}

export default Contact;
