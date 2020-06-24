import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import AnimalCard from "./components/AnimalCard";
import Title from "./components/Title";
import Message from "./components/Message";
import animals from "./animals.json";
import './App.css';

let correctGuess = 0;
let highScore = 0;
let clickMessage = "Click on a cute baby animal picture to gain points! Click on the same one twice and you lose!";

class App extends Component {
  state = {
    animals,
    correctGuess,
    highScore,
    clickMessage   
  };

  shuffleAnimal = id => {
    const animals = this.state.animals;

    const clickedAnimal = animals.filter(image => image.id === id);

    if (clickedAnimal[0].clicked){

      console.log ("Correct Guess: " + correctGuess);
      console.log ("Best Score: " + highScore);

      correctGuess = 0;
      clickMessage = "The cuteness tricked you. You lose!"

      for (let i = 0 ; i < animals.length ; i++){
        animals[i].clicked = false;
      }

      this.setState({clickMessage});
      this.setState({ correctGuess });
      this.setState({animals});

    }
    else if (correctGuess < 11) {

            clickedAnimal[0].clicked = true;

            correctGuess++;
            
            clickMessage = "Awww! Now find another cute baby animal.";

            if (correctGuess > highScore){
                highScore = correctGuess;
                this.setState({ highScore });
            }

            animals.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({ animals });
            this.setState({correctGuess});
            this.setState({clickMessage});
        } else {

            clickedAnimal[0].clicked = true;

            correctGuess = 0;

            clickMessage = "You correctly guessed all the animals!!";
            highScore = 12;
            this.setState({ highScore });
            
            for (let i = 0 ; i < animals.length ; i++){
              animals[i].clicked = false;
            }

            animals.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({ animals });
            this.setState({correctGuess});
            this.setState({clickMessage});

        }
  };

  render() {
    return (
      <Wrapper>
        <Title>Clicky Game</Title>
        
        <Message>Correct Guess: {this.state.correctGuess}</Message>
       <br/>
        <Message>High Score: {this.state.highScore} </Message>
        
        <Message>{this.state.clickMessage}</Message>
        
        {this.state.animals.map(animals => (
          <AnimalCard
          shuffleAnimal={this.shuffleAnimal}
            id={animals.id}
            image={animals.image}
          />
        ))}
      </Wrapper>
    );
  }
}
export default App;
