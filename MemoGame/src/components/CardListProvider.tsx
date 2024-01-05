import { CardType } from "./CardType";
import React, { useEffect, useState } from "react";
import "../custom.css";

function shuffle(array: CardType[]): CardType[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const CardListProvider = () => {
  const [cardList, setCardList] = useState<CardType[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        const pokemonData = data.results;
        const newCardList: CardType[] = [];

        for (let i = 0; i < pokemonData.length; i++) {
          const card: CardType = {
            id: i,
            name: pokemonData[i].name,
            wasChosen: false,
          };
          newCardList.push(card);
        }

        setCardList(shuffle(newCardList));
      });
  }, []);

  const cardsToDisplay = cardList.map((card) => (
    <li
      className="card"
      key={card.id}
      data-index={card.id}
      onClick={(e: React.MouseEvent<HTMLLIElement>) => {
        const idToChange: number = Number(
          e.currentTarget.getAttribute("data-index")
        );

        e.currentTarget.classList.add("red");

        setCardList(
          shuffle(
            cardList.map((card) => {
              if (card.id === idToChange) return { ...card, wasChosen: true };
              else return card;
            })
          )
        );
      }}
    >
      {card.name}
    </li>
  ));

  return <ul>{cardsToDisplay}</ul>;
};
