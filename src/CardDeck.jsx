import React, {useState, useEffect} from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

/**
 * Draw a random card by pressing a button
 *
 * props: none
 * state: cards, deck
 *
 * App --> CardDeck
 */

function CardDeck() {
    //TODO: more descriptive name for cards (cardsDrawn)
    const [cards, setCards] = useState([])
    const [cardsRemaining, setCardsRemaining] = useState(52);
    const [deck, setDeck] = useState({
        data: null,
        isLoading: true
    })

    /** fetches a deck ID from the Deck of Cards API */
    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const response = await fetch(`${BASE_URL}/new/shuffle/`);
            const data = await response.json();
            setDeck({
                data: data,
                isLoading: false
            })
        }
        fetchDeck();
    }, [])

    /** fetches one card from the Deck of Cards API with the deck ID */
    async function drawCard() {
        const response = await fetch(`${BASE_URL}/${deck.data.deck_id}/draw`)
        const data = await response.json();

        const card = data.cards[0]

        //TODO: use cards.length
        setCards(cards => ([...cards, card]))
        setCardsRemaining(data.remaining);
    }

    if (deck.isLoading) return <i>Loading...</i>

    return (
        <div>
            <div>
                {/* // TODO: cards.length */}
                {cardsRemaining > 0 && <button onClick={drawCard}>Draw A Card!</button>}
            </div>
            {cards.map(card => <img key={card.code} src={`${card.image}`}/>)}
        </div>
    )
}

export default CardDeck;