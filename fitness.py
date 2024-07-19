#imports OpenAI class from openai library
# the api response is sent in a JSON and contains lots of info, including a choices list, which contains multiple different responses
from openai import OpenAI
from flask import Flask, render_template, request, url_for, redirect
import os
from dotenv import load_dotenv, find_dotenv

#defines path to find the dotenv in directory
dotenv_path = find_dotenv()

#loads the variables from the .env file
load_dotenv(dotenv_path)

#store .env file's variable in a python variable
get_fit_key = os.getenv("api_key")

#api key is used to authenticate who uses the api,
#this must stay hidden so instead of hardcoding it in my source code, I make it and environment variable using .env file


# instance of OpenAI class is assigned to client variable
client = OpenAI(api_key= get_fit_key)

app = Flask(__name__, static_url_path='/static')

# function takes a prompt and returns first element of choices
# temperature controls how creative LLM is, lower is less creative more consistent
def get_response(prompt):
        completion = client.chat.completions.create(
            model= "gpt-4o",
            messages= [
                {"role": "system", "content": "You are a fitness expert that gives workout advice to people in code"},
                {"role": "user", "content": prompt}
            ],
            temperature = 0.05
        )
        return completion.choices[0].message.content

@app.route("/home")
def main():
    return render_template("main.html")

#repeat in the function below that all inputs must be filled, if not redirect back to the page
@app.route("/workout_plan_generator", methods= ["GET","POST"])
def plan():
    if request.method == "POST":
        try:
            #weight
            wt_unit = request.form["weight_unit"]
            if wt_unit == "kg":
                wt_in_kg_ = request.form["weight_kg"]
                if not wt_in_kg_ :
                    #uses query parameters to keep the already-inputted values in the form
                    return redirect(url_for("plan"))
            elif wt_unit == "lbs":
                wt_in_lb_ = request.form["weight_lb"]
                if not wt_in_lb_:
                    return redirect(url_for("plan" ))
                wt_in_lb_ = int(wt_in_lb_)
                wt_in_kg_ = float(wt_in_lb_) * 0.453592
                wt_in_kg_ = str(wt_in_kg_)
            #age
            age = request.form["age_name"]

            #height
            ht_unit = request.form["height_unit"]
            if ht_unit == "meters":
                ht_in_m_ = request.form["height"]
                if not ht_in_m_ :
                    return redirect(url_for("plan"))
            elif ht_unit == "feet":
                inches = request.form["height_inches"]
                feet = request.form["height_feet"]
                if not inches or not feet:
                    return redirect(url_for("plan"))
                #change from str to int to do math
                inches = int(inches)
                feet = int(feet)
                ht_in_in = inches + feet*12
                ht_in_m_ = float(ht_in_in)*0.0254
                ht_in_m_ = str(ht_in_m_)

            #activity level
            act_level = request.form["act_level"]

            #activity type
            activity_type = request.form["activity_type"]

            #fitness goal
            fitness_goal = request.form["fit_goal"]

            #days
            days = request.form["num_of_days"]
            num_rest = 7- int(days)
            num_rest = str(num_rest)

            if not (age and act_level and activity_type and fitness_goal and days):
                # brings the client back to the form but erases already filled things 
                return redirect(url_for("plan")) 
            
            return redirect(url_for("your_plan", wt_in_kg=wt_in_kg_, ag=age, ht_in_m=ht_in_m_, act_lvl=act_level, act_type=activity_type, fit_goal=fitness_goal, num_days=days, rest_days = num_rest)) # add the info from the form
        except:
            #if error occurs, redirect to plan page
            print("an error has occured")
            return redirect(url_for("plan"))
    else:
            #if form not submitted just render the plan template
        print("get method used")
        return render_template("plan.html") 
    
@app.route("/macronutrient_calculator" , methods = ["GET", "POST"])
def nutrition():
    if request.method == "POST":
        try:
            #weight
            weight_unit = request.form["weight_units"]
            if weight_unit == "kilo":
                weight_in_kg = request.form["weight_kgs"]
                if not weight_in_kg:
                    print("weight kg not submitted")
                    return redirect(url_for("nutrition"))
            elif weight_unit == "pound":
                weight_in_lbs = request.form["weight_lbs"]
                if not weight_in_lbs:
                    print("weight lbs not submitted")
                    return redirect(url_for("nutrition"))
                weight_in_lbs = int(weight_in_lbs)
                weight_in_kg = float(weight_in_lbs) * 0.453592
                weight_in_kg = str(weight_in_kg)
            
            #age
            age_value = request.form["age_value"]
            if not age_value:
                print("age not submitted")
                return redirect(url_for("nutrition"))
            #height
            height_units = request.form["height_units"]
            if height_units == "meters":
                height_in_meters = request.form["height_in_meters"]
                if not height_in_meters:
                    print("height m not submitted")
                    return redirect(url_for("nutrition"))
            elif height_units == "feets":
                height_value_feets = request.form["height_value_feets"]
                height_value_inches =  request.form["height_value_inches"]
                if not(height_value_feets or height_value_inches):
                    print("height feet not submitted")
                    return redirect(url_for("nutrition"))
                height_value_feets = int(height_value_feets)
                height_value_inches = int(height_value_inches)
                height_value_inches = height_value_inches + height_value_feets*12
                height_in_meters = float(height_value_inches)*0.0254
                height_in_meters = str(height_in_meters)
            #activity_level
            activity_level = request.form["activity_level_value"]
            if not activity_level:
                print("activity level not submitted")
                return redirect(url_for("nutrition"))
            # weight_change
            weight_change_unit = request.form["weight_change_unit"]
            if weight_change_unit == "kg_change_value":
                weight_change_kg = request.form["weight_change_kg"]
                if not weight_change_kg:
                    print("weight change kg not submitted")
                    return redirect(url_for("nutrition"))
            elif weight_change_unit == "lbs_change_value":
                weight_change_lbs = request.form["weight_change_lbs"]
                if not weight_change_lbs:
                    print("weight change lbs not submitted")
                    return redirect(url_for("nutrition"))
                # page kept refreshing here due to not taking into account that the weight change is a float and not an integer
                weight_change_lbs = float(weight_change_lbs)
                weight_change_kg = weight_change_lbs* 0.453592
                weight_change_kg = str(weight_change_kg)


            return redirect(url_for("your_macros", wt_kg=weight_in_kg, age_number=age_value, ht_meters=height_in_meters, activity_lvl=activity_level, wt_change=weight_change_kg), code=302)
                   
        except:
            print("an error occured")
            return redirect(url_for("nutrition"))
    else:  
        print("could not give new data")    
        return render_template("nutrition.html")

@app.route("/your_plan")
def your_plan():
    
    #takes value from query (search_bar)
    wt_in_kg = request.args.get('wt_in_kg')
    ag = request.args.get('ag')
    ht_in_m = request.args.get('ht_in_m')
    act_lvl = request.args.get('act_lvl')
    act_type = request.args.get('act_type')
    fit_goal = request.args.get('fit_goal')
    num_days = request.args.get('num_days')
    rest_days = request.args.get('rest_days')
    
    plan_prompt = f"""In just a table format (no other text) (in HTML code), please give me a full week of a workout plan including rest days(according to info given below) and workouts containing 3-5 exercises for the following person:
                age: {ag},
                weight: {wt_in_kg}kg,
                height: {ht_in_m}m,
                activity_level: {act_lvl},
                desired activity type: {act_type},
                number workouts per week desired: {num_days},
                number of rest days per week desired: {rest_days}
                fitness goal: {fit_goal}
                
                Rest days are only if the number of workouts per week is not 7. If it is not 7, then only add rest days according to the number of days
                that the user wishes not to workout on. For example, if the number of workouts per week desired is 6 only add 1 rest day.
                The table should have one row for each day of the week and columns titled respectively: day, exercises, set x reps, note
                If a workout contains multiple exercises, it should still be included in the same row of the day, but
                Each exercise should be in its own row
                Every exercise should include a note
                Do not include the title html and ''' in the response
                At the bottom of the table include a small paragraph with a short sentence that should motivate someone to continue this workout plan
                this short paragraph should have a left margin of 160px and a font size of 25px
                """ 
                # This specific prompt gives me exactly what I want, that is why it is long
    
    plan_response = get_response(plan_prompt)
    print(plan_response)
    return render_template("your_plan.html", plan_response = plan_response)


@app.route("/your_macros")
def your_macros():
    # takes values from query
    wt_kg = request.args.get('wt_kg')
    age_number = request.args.get('age_number')
    ht_meters = request.args.get('ht_meters')
    activity_lvl = request.args.get('activity_lvl')
    wt_change = request.args.get('wt_change')
    macro_prompt = f"""In just a table format (no other text), please give me the calories and macronutrients in HTML code for the following person:
                age: {age_number},
                weight: {wt_kg}kg,
                height: {ht_meters}m,
                activity_level: {activity_lvl},
                weight change desired: {wt_change}kg (take into account the positive or negative sign)
                Do not include the title html or ''' in the reponse
                The table should have rows labeled calories, fats, protein, carbohydrates and columns named macronutrient and amount
                At the bottom of the table include a small paragraph with a short sentence that should motivate someone to continue this diet
                this short paragraph should have a left margin of 160px and a font size of 25px
                """
    macro_response = get_response(macro_prompt)
    print(macro_response)
    return render_template("your_macros.html" , macro_response = macro_response)

if __name__ == "__main__":
    app.run(debug=True)



