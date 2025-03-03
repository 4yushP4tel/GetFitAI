# GetFitAI

## GetFitAI is a full stack website that uses the OpenAI Gpt-4o LLM to give users workout plans and diet advice curated for them

The front-end of this website is built using HTML, Javascript and CSS. The HTML files are located in the templates folder and the JS and Css files are in the static folder. The JS in this repository ensures that forms have the appropriate input and gives alerts if there are any problems with user inputs. This leads to a very clean and simple UI.

The back-end of this website is built using the Python programming language and the Flask framework. The openai library was also used while building this application to be able to use the OpenAI API. The get_response function in fitness.py allows for a prompt to be sent to the server and with the help of the API, a response is created. To allow the API to work, an api key is needed. To keep this secret, I have added the api key to a .env file which is included in the gitignore file. Dotenv and os are then used to access the api key from the .env file. 

This website is fully functional, but does have a few issues:
- When the form is submitted to get a custom workout plan or diet advice, there is a wait time, since it takes time for the server to generate a response. My solution to this problem is that I will create a loading page, which will display a spinning circle to let users 
know that the response to their form submission is being created. This will be done in another branch.
    -This has been fixed in the new.js file by creating a loading div that is displayed until the output from the API has been generated. It is a Gif with a small message at the bottom. This was done on the loading_page branch and has been merged with the main branch.


- If a field in the form is not field, an alert is sent to notify the user that all the fields must be filled, but right after, the page reloads and the already filled input fields are cleared. 
    - This problem has been fixed. It was fixed by using the event.preventDefault() method in the new.js file whenever all the input fields were not filled. This prevented the form to get submitted via POST and this allows the form to not get erased. This also allows me to make my python code cleaner as I can remove all the code that reloaded the page when input fields were not filled.

This web app will now be deployed using Vercel