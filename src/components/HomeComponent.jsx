import React, { useEffect, useState } from 'react';

const HomeComponent = () => {

    const GRID_SIZE = 20;
    const CELL_SIZE = 20;
    const INITIAL_SNAKE = [
        {
            x : 10,
            y : 10
        }
    ];
    const INITIAL_FOOD =
        {
            x : 15,
            y : 15
        }
    ;
    const INITIAL_DIRECTION = 'RIGHT';
    const [ snake, setSnake] = useState(INITIAL_SNAKE);
    const [ food, setFood] = useState(INITIAL_FOOD);
    const [ direction, setDirection] = useState(INITIAL_DIRECTION);
    const [ score, setScore] = useState(0);
    const [ gameOver, setGameOver] = useState(false);
    const [ gamePause, setGamePause] = useState(false);
    const [ speed, setSpeed] = useState(200);

    const generateFood = ()=>{
        const newFood = {
            x : Math.floor(Math.random() * GRID_SIZE),
            y : Math.floor(Math.random() * GRID_SIZE),
        }
        return snake.some((item) => item.x === newFood.x && item.y === newFood.y) ? generateFood() : newFood;
    }

    const moveSnake = ()=>{
        if(gameOver || gamePause) return;

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
            head.x >= GRID_SIZE ||
            head.y < 0 ||
            head.y >= GRID_SIZE ||
            snake.some((item)=>item.x === head.x && item.y === head.y)
        ){
                setGameOver(true);
                return;
        }

        const newSnake = [head, ...snake]; 
        if(head.x === food.x && head.y === food.y){
            setScore(score + 1);
            if( score >= 300){
                setSpeed( 30)
            }else if( speed <= 40){
                setSpeed( 40)
            }else{
                setSpeed( speed - 1)
            }
            setFood(generateFood());
        }else{
            newSnake.pop();
        }
        setSnake(newSnake)
        console.log(score)
        console.log(speed)
    }

    useEffect(()=>{
        const handleKeyPress = (e) => {
            switch (e.key) {
                case "ArrowUp":
                    if( direction !== "DOWN") setDirection("UP")
                    break;
                case "ArrowDown":
                    if( direction !== "UP") setDirection("DOWN")
                    break;
                case "ArrowLeft":
                    if( direction !== "RIGHT") setDirection("LEFT")
                    break;
                case "ArrowRight":
                    if( direction !== "LEFT") setDirection("RIGHT")
                    break;
            }
        }
        window.addEventListener("keydown",handleKeyPress)
        return () => {
            window.removeEventListener("keydown",handleKeyPress)
        };
    },[direction])

    useEffect(() => {
        const gameLoop = setInterval(moveSnake, speed)
        return () => {
            clearInterval(gameLoop);
        };
    },[snake, direction, gameOver, gamePause])

    const renderGrid = () => {
        const grid = [];
        for( let i = 0; i < GRID_SIZE; i++){
            for( let j = 0; j < GRID_SIZE; j++){
                const isSnake = snake.some((item)=> item.x === j && item.y === i);
                const isFood = food.x === j && food.y === i;
                grid.push(
                    <div key={`${i}-${j}`} className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}></div>
                )
            }
        }
        return grid;
    }

    let pauseGame = () => {
        setGamePause(true)
    }
    let resumeGame = () => {
        setGamePause(false)
    }
    let resetGame = () => {
        setSnake(INITIAL_SNAKE)
        setFood(INITIAL_FOOD)
        setDirection(INITIAL_DIRECTION)
        setScore(0)
        setGameOver(false)
    }

    return (
        <>
            <div className="game-container">
                <div className="score">Score: {score}</div>
                <div className="game-board overflow-hidden rounded-md" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`, width: `${GRID_SIZE * CELL_SIZE + 6}px`, height: `${GRID_SIZE * CELL_SIZE  + 5}px`}}>
                    {
                        renderGrid()
                    }
                </div>
                {
                    gamePause ?
                    <button className='pauseBtn' onClick={()=>resumeGame()}>Resume</button>
                    :
                    <button className='pauseBtn' onClick={()=>pauseGame()}>Pause</button>
                }
                {
                    gameOver ?
                    <div className="game-over">
                        <h2 className='font-bold text-3xl capitalize'>Game Over</h2>
                        <p>Your Score: {score}</p>
                        <button className='restart-button' onClick={()=>resetGame()}>Restart</button>
                    </div>
                    : ""
                }
            </div>
        </>
    );
};

export default HomeComponent;