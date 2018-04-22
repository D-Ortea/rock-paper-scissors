Rock, Paper, Scissors game
===========================

Objective
---------
Create a Rock, Paper, Scissors game. 
In the first version the game will consist on a set of Javascript functions that can be used 
to play from the browser's console.
In the next version a GUI is added to the game, so it can be played directly without using the
console. There will be several versions of the GUI oriented game.

From the Odin project's [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/rock-paper-scissors "The Odin Project")

Version list
-------------
* V0
  * Only the basic javascript functionality in charge of the game's logic
  * Index.html without elements
  * No CSS
* V1
  * Basic scoreboard's algorithm. Each number has it's own formula for drawing itself in any matrix size that is bigger than 5x3
  * Almost no HTML, only three containing divs and one button.
  * Used javascript DOM manipulation to create, delete, edit HTML elements and add/remove styling already defined in CSS file.
  * Used CSS for styling.
* V2
  * Changed scoreboard's algorithm. Now it uses two methods that draw vertical and horizontal lines, and each
  of the numbers specifies how to draw themselves specifying the number of lines they have and how many points
  each line spans
  * Divided the game into four separate HTML files.
  * Divided the Javascript into six files:
    * One controls the scoreboard, creating both the matrix of circles and generating the numbers
    * One file for the game's logic
    * Four files for each of the HTML files, in charge of adding listeners and some DOM manipulations
  * Some minor changes to V1's main.css
* V3
  * New algorithm for drawing the score, based on simple Linear Algebra matrix transformations.
  This algorithm is more versatile and only needs the smallest matrix, 5x3, to draw any number 
  at higher matrix sizes.
  * In progress
