import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isEmail = () => {
    let mail = document.getElementById("not-mail");
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(regex)) {
      mail.style.display = "none";
      return true;
    } else {
      mail.style.display = "block";
      mail.style.animation = "dongle 1s";
      setTimeout(() => {
        mail.style.animation = "none";
      }, 1000);
      return false;
    }
  };

  const failMessage = (message) => {
    let formMessage = document.querySelector(".form-message");
    formMessage.innerHTML = message;
    formMessage.style.opacity = "1";
    formMessage.style.background = "rgb(253,87,87)";

    document.getElementById("name").classList.add("error");
    document.getElementById("email").classList.add("error");
    document.getElementById("message").classList.add("error");
  };

  const succesMessage = () => {
    let formMessage = document.querySelector(".form-message");
    formMessage.innerHTML =
      "Message envoyer ! Nous vous contacterant le plut tôt possible ";
    formMessage.style.background = "#00c1ec";
    formMessage.style.opacity = "1";

    document.getElementById("name").classList.remove("error");
    document.getElementById("email").classList.remove("error");
    document.getElementById("message").classList.remove("error");

    setTimeout(() => {
      formMessage.style.opacity = "0";
    }, 5000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && isEmail() && message) {
      sendFeedback(
        "template_s3dfmps",
        {
          name,
          company,
          phone,
          email,
          message,
        },
        "user_qGkkTQNt8R2dqtKhHjrnB"
      );
    } else {
      failMessage("Merci de remplir correctement le champs requis");
    }
  };

  const sendFeedback = (templateId, variables, UserId) => {
    window.emailjs
      .send("service_ku0qjl8", templateId, variables, UserId)
      .then((res) => {
        console.log("success !");
        succesMessage();
        setName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setMessage("");
      })
      .catch((err) =>
        failMessage("Une erreur s'est produite, veuillez réessayer.")
      );
  };

  return (
    <form className='contact-form'>
      <h2>Contacter nous </h2>
      <div className='form-content'>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off'
          placeholder='Name *'
        />
        <input
          type='text'
          name='company'
          id='company'
          placeholder='Company'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type='text'
          name='phone'
          id='phone'
          placeholder='Phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className='email-content'>
          <label id='not-mail'>Email non valide</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            placeholder='Email *'
          />
        </div>
        <textarea
          id='message'
          name='message'
          placeholder='Message *'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />{" "}
      </div>
      <input
        className='button'
        type='button'
        name='button'
        value='Envoyer'
        onClick={handleSubmit}
      />
      <div className='form-message'></div>
    </form>
  );
};

export default App;
