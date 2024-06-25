import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];
  useEffect(() => {
    
    const timer = setTimeout(
      // Vérification que l'index ne dépasse pas la longueur du tableau - 1
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );

    
    return () => clearTimeout(timer);
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Nous utilisons une clé unique pour chaque élément de la liste
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => {
            // eslint-disable-next-line react/no-array-index-key
            const key = `${radioIdx}`;
            return (
              <input
                key={key}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Slider;
