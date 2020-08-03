import React from "react";
import whatsAppIcon from "../../assets/images/icons/whatsapp.svg";
import "./styles.css";

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/63209462?s=460&u=df54d99538ae00bba4485dea1c8eda3bc33cfe0e&v=4"
          alt="Samuel Santos"
        />
        <div>
          <strong>Samuel Santos</strong>
          <span>Matemática</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores fórmulas de matemática avançada.
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, iure?
        Totam perferendis nobis aspernatur corrupti, non dolore hic voluptas rem
        sed? Reiciendis pariatur illum autem rerum sint voluptatibus!
        Consectetur, tempora.
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsAppIcon} alt="Icone Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
