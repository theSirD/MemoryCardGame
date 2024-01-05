import { CardType } from "./CardType";
import React, { useEffect, useState } from "react";
import "../custom.css";

type PropsType = {
  currentScore: number;
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>;
  bestScore: number;
  setBestScore: React.Dispatch<React.SetStateAction<number>>;
};

function shuffle(
  array: CardType[],
  setWasChosenFieldToDefault: boolean
): CardType[] {
  if (setWasChosenFieldToDefault) {
    for (let i = 0; i < array.length; i++) {
      array[i].wasChosen = false;
    }
  }

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

export const CardListProvider = ({
  currentScore,
  setCurrentScore,
  bestScore,
  setBestScore,
}: PropsType) => {
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

        setCardList(shuffle(newCardList, false));
      });
  }, []);

  const cardsToDisplay = cardList.map((card) => (
    <li
      className="card"
      key={card.id}
      data-index={card.id}
      onClick={(e: React.MouseEvent<HTMLLIElement>): void => {
        const idToChange: number = Number(
          e.currentTarget.getAttribute("data-index")
        );

        if (cardList.find((card) => card.id === idToChange)?.wasChosen) {
          console.log(idToChange);
          if (currentScore > bestScore) setBestScore(currentScore);
          setCurrentScore(0);
          setCardList(
            shuffle(
              cardList.map((card) => {
                if (card.id === idToChange) return { ...card, wasChosen: true };
                else return card;
              }),
              true
            )
          );

          for (let i = 0; i < cardList.length; i++) {
            const DOMCardElements = document.querySelectorAll(".card");
            if (DOMCardElements != null) {
              for (let i = 0; i < DOMCardElements.length; i++) {
                DOMCardElements[i].classList.remove("red");
              }
            }
          }
          return;
        }
        e.currentTarget.classList.add("red");
        setCurrentScore(currentScore + 1);

        setCardList(
          shuffle(
            cardList.map((card) => {
              if (card.id === idToChange) return { ...card, wasChosen: true };
              else return card;
            }),
            false
          )
        );

        console.log(cardList);
      }}
    >
      {card.name}
    </li>
  ));

  return <ul>{cardsToDisplay}</ul>;
};
