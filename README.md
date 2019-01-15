I built this project with the top level component being the App, along 
with two main child components: Formik and Board. Avoided using Redux to avoid boilerplate code. 
I used Formik to make it easier to get input from the player. App calls Board, astateless component, which then iteratively calls rows of cells. I passed down a callback function from App to Cells that handles what happens when a cell is clicked, the state of the App gets updated accordingly, and the cell gets drawed again.
