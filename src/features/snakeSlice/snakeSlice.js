import { createSlice } from '@reduxjs/toolkit'

export const snakesSlice = createSlice({
  name: 'counter',
  initialState: {
    GRID_SIZE : 20,
    CELL_SIZE : 20,
    INITIAL_SNAKE : [
      {
          x : 10,
          y : 10
      },
    ],
    INITIAL_FOOD : 
        {
            x : 15,
            y : 15
        },
    INITIAL_DIRECTION : 'RIGHT',
    score: 0,
    gameOver: false,
    gamePause:false,
    speed: 200
  },
  reducers: {
    generateFood: (state, action) => {
      const snake = state.INITIAL_SNAKE;
      const newFood = {
          x : Math.floor(Math.random() * state.GRID_SIZE),
          y : Math.floor(Math.random() * state.GRID_SIZE),
      }
      return snake.some((item) => item.x === newFood.x && item.y === newFood.y) ? generateFood() : newFood;
    },

    moveSnake: (state, action) => {
      const snake = state.INITIAL_SNAKE;
      const direction = state.INITIAL_DIRECTION;
      let score = state.score
      let speed = state.speed
      let food = state.INITIAL_FOOD

      if(state.gameOver || state.gamePause) return;

      const head = { ...snake[0] };

      switch (direction) {
          case "UP":
              head.y--;
              break;
          case "DOWN":
              head.y++;
              break;
          case "LEFT":
              head.x--;
              break;
          case "RIGHT":
              head.x++;
              break;
      }

      if( head.x < 0 ||
          head.x >= state.GRID_SIZE ||
          head.y < 0 ||
          head.y >= state.GRID_SIZE ||
          snake.some((item)=>item.x === head.x && item.y === head.y)
      ){
              state.gameOver = true; 
              return;
      }

      const newSnake = [head, ...snake]; 
      if(head.x === food.x && head.y === food.y){
        score = (score + 1);
          if( score >= 300){
            speed = 30
          }else if( speed <= 40){
            speed = 40
          }else{
            speed =  speed - 1
          }
          food =generateFood();
      }else{
          newSnake.pop();
      }
      snake = newSnake
      console.log(score)
      console.log(speed)
    },
    renderGrid : (state, action) => {
      const grid = [];
      for( let i = 0; i < state.GRID_SIZE; i++){
          for( let j = 0; j < state.GRID_SIZE; j++){
              const isSnake = state.snake.some((item)=> item.x === j && item.y === i);
              const isFood = food.x === j && food.y === i;
              grid.push(
                  <div key={`${i}-${j}`} className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}></div>
              )
          }
      }
      // return grid;
  }
  },
})

export const { generateFood, moveSnake, renderGrid } = snakesSlice.actions

export default snakesSlice.reducer