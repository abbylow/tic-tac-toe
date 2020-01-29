# tic-tac-toe

Followed ReactJs tutorial (https://reactjs.org/tutorial/tutorial.html) to complete the following basic features: 
- Let the user to play tic-tac-toe
- Indicates when a player has won the game
- Stores a game’s history as the game progresses
- Allows players to review a game’s history and see previous versions of a game’s board

Implememted extra features as suggested by ReactJs tutorial: 
- Display the location for each move in the format (col, row) in the move history list. (Start counting by 0)
- Bold the currently selected item in the move list.
- Rewrite Board to use two loops to make the squares instead of hardcoding them.
- Add a toggle button that lets you sort the moves in either ascending or descending order.
- When someone wins, highlight the three squares that caused the win.
- When no one wins, display a message about the result being a draw.

Implement more features based on my own preferences:
- Add a button to restart the game (Clear all the moves)
- Allow user change the board size (range: 3 to 5)
- Check the winner dynamically instead of the hardcoded array
- Allow the user to choose the mode of game (play with AI opponent or not) 
- use minimax algorithm to choose the AI's move

TODO: 
1. Optimize the AI player algorithm because the current one is only useable for 3x3 board, 4x4 board will hang
2. Use observables to make AI player

Minimax Algorithm 
https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
