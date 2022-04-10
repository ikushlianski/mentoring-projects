# Tamagotchi example app

## Summary
This is an example app for mentees to review. It offers to practice basic  React skills such as state management, hooks, props, environment variables and CRA.

## Requirements

### Pet name
- When the game begins, a user fills in the name of the pet
- The name is recorded to the state of the main component
- The pet’s name is shown in the top left corner of the game screen

### Indicators:
Pet has the following indicators:
- overall state (“fine” by default)
- food (100% by default)
- Age: (0 by default)

Display:
- overall state as text (sick, hungry, etc.) 
- food indicator as a bar that goes from 0% (red) to 100% (green). Use CSS

### Food

Create a button called “feed”. 

When clicking the button the pet’s food indicator is filled to 100% and the pet’s age increments by 1

Food indicator slowly goes from 100% to 0% in 1 minute. When food is below 35%, the state changes to “hungry”. 

If pet’s food indicator is 0% 
- the state of the parent changes to “dead” and the game ends
- User sees with a <DeadMessage /> component. It contains
A message saying 
> “Your pet has died aged X because of <reason>”, where X is the number of years
- If the death was not natural (because of hunger or illness) the reason should be displayed


### Treatment

Pet can randomly get sick at times. In this case its overall state is set to “sick”

If a pet is sick
- the “feed” button is disabled (food won’t help treat the illness anyway)
- the food indicator freezes (stops moving to 0%), because when the pet is sick, it does not want any food and doesn’t become hungry

If a pet is sick for more than 15 seconds, it dies. If the death because or an illness, the reason should be displayed inside the <DeadMessage /> component

Create a button called “treat” to give the pet some pills. When clicking “treat”:
- the overall state becomes “fine”
- the food indicator continues from where it was before illness and slowly reduces to 0%

## Getting older
When you feed the parent 5 times, it becomes old enough to peacefully die, and you cannot do anything about it.

If the death was because of age (natural), then you display in the <DeadMessage /> the following text: 
> “Your pet has lived a long great life… Rest in peace, <pet-name-here>!”.

Insert here your pet’s name. You should use the same <DeadMessage /> component as for all other death messages, but it should look slightly different.


## Game end

When the game ends:
- Pet’s name is set to empty string 
- Food indicator is reset 
- Statuses are reset

## Technical notes
Try extracting each part of the game (buttons, state, messages etc.) into its own component. Better have more small components than one large (like “big ball of mud”).

Think about where the state is stored and how it flows down.

Use event handlers to manage clicks. Consider using custom hooks to hide some state changing operations there, in order not to bloat your main component's code. Try separating logic from presentation.

After you write your own implementation, review this repository to compare to your code. Look at how each requirement was fulfilled. Pay attention to file structure.

## Additional optional tasks
- try making age and illnesses configurable (not hardcoded in the app) using environment variables
- style your app using Tailwind, Material UI, Bootstrap or any other UI library of your choice 
- create a Git repo with your code, add a fancy Readme to it, including screenshots
