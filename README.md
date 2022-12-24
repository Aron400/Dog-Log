Capstone Project - The Dog Log   <br/> <br/>
The dog log is a simple and easy way for you  to keep track of everything related to your dog. Like when the last time they were walked or fed was. Or if they are up to date on their vaccines. The Dog Log was designed for households with dogs to keep track of everything their pups do in one simple and organized space.

<strong>Technologies used: </strong> <br/>
Axios <br/>
react, react-router-dom, react scripts <br/>
styled-components <br/>
CSS <br/>
bcrypt <br/>
body-parser <br/>
cookie-parser <br/>
cors <br/>
express <br/>
Mysql <br/>
node.js <br/>

How it works  <br/>
When the site loads you are prompted to register for an account with an email, username and password. If you already have an account you can click the login button in the header to enter your email and password to login. Once you are registered and logged in you will have access to the entire site.  <br/> <br/>
The home page lists all of your pups' most recent data, like their most recent walk and feeding. You can also add new users and dogs to your account here.  <br/> <br/>
At the top of every page there is a header with a link to display the side-toggle navigation bar. This side bar has links to the feeding, walks, and medical page.  <br/> <br/>
The feeding and walk pages have similar functionalities. At the top of the page you can add your dog's most recent feeding or walk. You must select the dog you walked or fed and the user that walked or fed the dog, then hit add feeding or add walk. Your walk/feeding history will then be stored and displayed right below the input with the date and time you submit.  <br/> <br/>
The medical page features a section to keep track of your dog's vaccine information and a section to any notes you want to remember related to your dog. You can add, edit and delete each of these sections and any changes will be stored and displayed on the page.  <br/> <br/>
Once you’re finished you can logout using the logout button at the top of the page! <br/>


Routing <br/>
Each route checks if the user is authenticated. It means if the correct email and password were supplied and what role it has. 

Sessions  <br/>
The webpage uses sessions to confirm that user is registered. 

Database  <br/>
Each table is connected to the user login page and will not be displayed on the page until you login. 
The database has tables tracking the following information: <br/>
Vaccine history <br/>
Walk history <br/>
Feeding history <br/> 
User login information  <br/>
Notes <br/>
Dogs <br/>
Users <br/> <br/>

Possible improvements <br/>
Ability to change account details <br/>
Filter the tables based on dog <br/>
Add vet information and upcoming appointments <br/>
Add home or away status <br/>

How to launch application <br/>

$ git clone https://github.com/TrisanHarto/dogApp.git <br/>
$ cd capstone-project <br/>
$ npm install <br/>
$ npm start <br/>
