import {useState, useEffect} from "react"


let CardGame = () => {
    const [deck,setDeck] = useState([])
    const [playerOptions, togglePlayerOptions] = useState(false)
    const [numberOfPlayers,setNumberOfPlayers] = useState("")
    const [cardsPerPlayer,setCardsPerPlayer] = useState("")
    const [errors,setErrors] = useState([])
    const [playerHands,setPlayerHands] = useState([])

    useEffect(()=>{
        setDeck(["Ac","Kc","Qc","Jc","10c","9c","8c","7c","6c","5c","4c","3c","2c","Ad","Kd","Qd","Jd","10d","9d","8d","7d","6d","5d","4d","3d","2d","As","Ks","Qs","Js","10s","9s","8s","7s","6s","5s","4s","3s","2s","Ah","Kh","Qh","Jh","10h","9h","8h","7h","6h","5h","4h","3h","2h",])
    },[])

    const dealCards = () => {
        let player = 1
        let playerHandsCopy = []
        while(player <= numberOfPlayers){
            let card = 1
            let playerHand = []
            while(card <= cardsPerPlayer){
                playerHand.push(deck.pop())
                card++
            }
            playerHandsCopy = [...playerHandsCopy,playerHand]
            player++
        }
        console.log("NUM PLAYERS: ",numberOfPlayers)
        console.log("CARDS PER PLAYER: ",cardsPerPlayer)
        console.log("HERE: ",playerHandsCopy)
        setPlayerHands(playerHandsCopy)
    }

    useState(()=>{
        console.log("PLAYER HANDS CHANGED", playerHands)
    },playerHands)

    const shuffleDeck = () => {
        let deckCopy = ["Ac","Kc","Qc","Jc","10c","9c","8c","7c","6c","5c","4c","3c","2c","Ad","Kd","Qd","Jd","10d","9d","8d","7d","6d","5d","4d","3d","2d","As","Ks","Qs","Js","10s","9s","8s","7s","6s","5s","4s","3s","2s","Ah","Kh","Qh","Jh","10h","9h","8h","7h","6h","5h","4h","3h","2h",]
        let i,j,sub
        for (i = deckCopy.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            sub = deckCopy[i];
            deckCopy[i] = deckCopy[j];
            deckCopy[j] = sub;
        }
        setDeck(deckCopy)
        console.log(deckCopy)
    }

    const submitForm = (e) => {

        e.preventDefault()
        let currentErrors = []
        if(isNaN(numberOfPlayers) || numberOfPlayers === 0){
            currentErrors.push("Please input valid number of players")
        }
        if(isNaN(cardsPerPlayer) || cardsPerPlayer === 0){
            currentErrors.push("Please input valid cards per player")
        }
        if(!currentErrors.length && numberOfPlayers * cardsPerPlayer > 52){
            currentErrors.push("Not enough cards for that amount of players and cards per player")
        }
        if(!currentErrors.length){
            togglePlayerOptions(false)
            dealCards()
        }
        else setErrors(currentErrors)

    }
    console.log("PLAYER HANDS: ",playerHands)
    if(playerHands.length){
        console.log(playerHands.map(hand => hand.map(card => card)))
    }

    return (
        <>
            <h1>CardGame Page</h1>
            <button onClick = {()=>shuffleDeck()}>Shuffle Deck</button>
            <button onClick = {()=>togglePlayerOptions(!playerOptions)}>Deal Cards</button>
            <form onSubmit = {(e)=>submitForm(e)} style = {playerOptions ? {display:"block"} : {display:"none"}}>
                <div id = "errors">{errors.map(error=>(
                    {error}
                )
                )}</div>
                <input type = "Number" placeholder = "Number of Players" onChange = {e=>setNumberOfPlayers(Number(e.target.value))}></input>
                <input type = "Number" placeholder = "Cards Per Player" onChange = {e=>setCardsPerPlayer(Number(e.target.value))}></input>
                <input type = "submit"></input>
            </form>
            <div>
                {playerHands && playerHands.map(hand => {
                    <div>
                        {hand.map(card=>{
                            <div>{card}</div>
                        })}
                    </div>
                })}
            </div>
        </>
    )

}

export default CardGame
