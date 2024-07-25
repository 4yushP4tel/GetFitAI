// For plan.html
// display feet/inches when feet is checked, meters when meters is checked
function display_height(){
    let feet_display = document.getElementById("feet_input");
    let meters_display = document.getElementById("meters_input");
    let display_choice = document.getElementsByName("height_unit");
    let selected_display;

    for(let choice of display_choice){
        if(choice.checked){
            selected_display = choice.value;
        }

    }
    
    if(selected_display === "meters"){
        feet_display.style.display = "none";
        meters_display.style.display = "flex";
    }
    if(selected_display === "feet"){
        feet_display.style.display = "flex";
        meters_display.style.display = "none";
    }
}
/* below, we call the function as soon as the page loads and
when the radio box is changed, we run the function
*/
window.addEventListener("load", display_height);

let radios = document.getElementsByName("height_unit");
for(let radio of radios){
    radio.addEventListener("change", display_height);
}
// function to choose between kg and lbs
function weight_display(){
    let kg_display = document.getElementById("kg_number");
    let lbs_display = document.getElementById("lb_number");
    let choices = document.getElementsByName("weight_unit");
    let selection;

    for(let choice of choices){
        if(choice.checked){
        selection = choice.value;
        }
    }
        
    if(selection === "lbs"){
        kg_display.style.display = "none";
        lbs_display.style.display = "block";
    }
            
    if(selection === "kg"){
        kg_display.style.display = "block";
        lbs_display.style.display = "none";
    }
    
}

window.addEventListener("load", weight_display);

let weight_choice = document.getElementsByName("weight_unit");
for(let choice of weight_choice){
    choice.addEventListener("change", weight_display);
}

function store_plan_inputs(){
    let activity_level = document.getElementById("activity_level_choice");
    let activity_type = document.getElementById("activity_type_choice");
    let goal = document.getElementById("goal_choice");
    let days = document.getElementById("num_days");
    let age = document.getElementById("age");


    let activity_level_value = activity_level.value;
    let activity_type_value = activity_type.value;
    let goal_value = goal.value;
    let days_value = days.value;
    age = age.value;

    if(activity_level_value ==="" || activity_type_value ==="" || goal_value ==="" || days_value ==="" || age === "" ){
        // prevents the form to be posted
        event.preventDefault();
        alert("All fields must be filled");
        return;
    }
    if(age>100 || age<15 || !Number.isInteger(Number(age))){
        alert("Please enter a valid age");
        return;
    }
    if(days_value > 7 || !Number.isInteger(Number(days_value)) || days_value < 1){
        alert("Please enter a valid number of days that you wish to workout");
        return;
    }

    // height
    let height_choice = document.getElementsByName("height_unit");
    let height_unit;

    for(let choice of height_choice){
        if(choice.checked){
            height_unit = choice.value;
        }

    }
    let height;
    if(height_unit === "feet"){
        let feet = document.getElementById("feets").value;
        let inches = document.getElementById("inches").value;
        height = `${feet} feet and ${inches} inches`;
        if(feet ==="" || inches ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(feet<1 || !Number.isInteger(Number(feet)) || feet > 8 || inches < 0 || inches > 11 || !Number.isInteger(Number(inches))){
            alert("Please enter a valid height");
            return;
        }


    }
    if(height_unit === "meters"){
        let meter = document.getElementById("meter_number").value;
        height = `${meter} meters`;
        if(meter ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(meter>2.50 || meter<1.00){
            alert("Please enter a valid height");
            return;
        }

    }

    // weight
    let weight_unit = document.getElementsByName("weight_unit");
    let selected_weight_unit;

    for(let unit of weight_unit){
        if(unit.checked){
        selected_weight_unit= unit.value;
        }
    }
      
    let weight;
    if(selected_weight_unit === "lbs"){
        lb = document.getElementById("lb_number").value;
        weight = `${lb} lbs`;
        if(lb ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(lb>300 || lb<90){
            alert("Please enter a valid weight")
            return;
        }
    }
            
    if(selected_weight_unit === "kg"){
        kg = document.getElementById("kg_number").value;
        weight = `${kg} kg`;
        if(kg ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(kg>150 || kg<45){
            alert("Please enter a valid weight")
            return;
        }
    }
    
    // just to get an idea what a prompt could look like in the OpenAI API
    let plan_output = (`Give me in just a table format (No text before or after, just table) a ${days_value} day workout plan with exercises, sets and reps including all the days of the week for someone who is ${age} years old, measures ${height}, weighs ${weight}, who is ${activity_level_value}, wants to do stricly ${activity_type_value} and has for goal to ${goal_value} in html form`);
    console.log(plan_output);
}
// for nutrition.html
function weight_change_nutrition_display(){
   
    //weight change display
    let kg_change_display = document.getElementById("kg_change_number");
    let lbs_change_display = document.getElementById("lb_change_number");
    let change_choices = document.getElementsByName("weight_change_unit");
    let change_selection;

    for(let change_choice of change_choices){
        if(change_choice.checked){
            change_selection = change_choice.value;
        }
        if(change_selection === "lbs_change_value"){
            kg_change_display.style.display = "none";
            lbs_change_display.style.display = "block";
        }
        if(change_selection === "kg_change_value"){
            kg_change_display.style.display = "block";
            lbs_change_display.style.display = "none";
        }
    }
}
window.addEventListener("load", weight_change_nutrition_display);

let change_choices = document.getElementsByName("weight_change_unit");
for(let change_choice of change_choices){
    change_choice.addEventListener("change", weight_change_nutrition_display);
}



function height_nutrition_display(){
 //height_display
    let feet_display = document.getElementById("feets_input");
    let meters_display = document.getElementById("meters_input");
    let display_choice = document.getElementsByName("height_units");
    let selected_display;

    for(let choice of display_choice){
        if(choice.checked){
            selected_display = choice.value;
        }

    }
    
    if(selected_display === "meters"){
        feet_display.style.display = "none";
        meters_display.style.display = "flex";
    }
    if(selected_display === "feets"){
        feet_display.style.display = "flex";
        meters_display.style.display = "none";
    }

}
window.addEventListener("load", height_nutrition_display);

let height_nutrition_choices = document.getElementsByName("height_units");
for(let height_nutrition_choice of height_nutrition_choices){
    height_nutrition_choice.addEventListener("change", height_nutrition_display);
}


function weight_nutrition_display(){
    let kg_display = document.getElementById("kg_number");
    let lbs_display = document.getElementById("lb_number");
    let choices = document.getElementsByName("weight_units");
    let selection;

    for(let choice of choices){
        if(choice.checked){
        selection = choice.value;
        }
    }
        
    if(selection === "pound"){
        kg_display.style.display = "none";
        lbs_display.style.display = "block";
    }
            
    if(selection === "kilo"){
        kg_display.style.display = "block";
        lbs_display.style.display = "none";
    }
    
}

window.addEventListener("load", weight_nutrition_display);

let weight_nutrition_choices = document.getElementsByName("weight_units");
for(let weight_nutrition_choice of weight_nutrition_choices){
    weight_nutrition_choice.addEventListener("change", weight_nutrition_display);
}

function store_nutrition_inputs(){
    let activity_level_value = document.getElementById("activity_level_choice").value;
    let age = document.getElementById("age").value;
    //height
    let height_choice = document.getElementsByName("height_units");
    let height_unit;

    if(activity_level_value ==="" || age ===""){
        event.preventDefault();
        alert("All fields must be filled");
        return;
    }

    if(age>100 || age<15 || !Number.isInteger(Number(age))){
        alert("Please enter a valid age");
        return;
    }

    for(let choice of height_choice){
        if(choice.checked){
            height_unit = choice.value;
        }

    }
    let height;
    if(height_unit === "feets"){
        let feet = document.getElementById("feets").value;
        let inches = document.getElementById("inches").value;
        height = `${feet} feet and ${inches} inches`;
        if(feet ==="" || inches ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(feet<1 || !Number.isInteger(Number(feet)) || feet > 8 || inches < 0 || inches > 11 || !Number.isInteger(Number(inches))){
            alert("Please enter a valid height");
            return;
        }
    }
    if(height_unit === "meters"){
        meter = document.getElementById("meter_number").value;
        height = `${meter} meters`;
        if(meter ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(meter>2.50 || meter<1.00){
            alert("Please enter a valid height");
            return;
        }
    }
    //weight
    let weight_unit = document.getElementsByName("weight_units");
    let selected_weight_unit;

    for(let unit of weight_unit){
        if(unit.checked){
        selected_weight_unit= unit.value;
        }
    }
      
    let weight;
    if(selected_weight_unit === "pound"){
        lb = document.getElementById("lb_number").value;
        weight = `${lb} lbs`;
        if(lb ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(lb>300 || lb < 90){
            alert("Please input a valid weight");
            return;
        }
    }
            
    if(selected_weight_unit === "kilo"){
        kg = document.getElementById("kg_number").value;
        weight = `${kg} kg`;
        if(kg ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(kg>150 || kg< 45){
            alert("Please input a valid weight");
            return;
        }
    }
    //weight change
    let weight_change_units = document.getElementsByName("weight_change_unit");
    let change_unit;
    let weight_change;
    for(let units of weight_change_units){
        if(units.checked){
            change_unit = units.value;
        }
    }
    if(change_unit === "lbs_change_value"){
        lb_change = document.getElementById("lb_change_number").value;
        weight_change = `${lb_change} lbs`;
        if(lb_change ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(lb_change>5 || lb_change < -5){
            alert("You can not healthily lose that much weight every week, Please enter a valid number");
            return;
        }
    }
    if(change_unit === "kg_change_value"){
        kg_change = document.getElementById("kg_change_number").value;
        weight_change = `${kg_change} kg`;
        if(kg_change ===""){
            event.preventDefault();
            alert("All fields must be filled");
            return;
        }
        if(kg_change>3 || kg_change< -3){
            alert("You can not healthily lose that much weight every week, Please enter a valid number");
            return;
        }
    }
    // just to get an idea what a prompt could look like in the OpenAI API
    let nutrition_output = (`Give me just the numbers in table format (no calculations at all) of the macronutrients and calories that someone who is ${age}years old, ${height} tall, weighs ${weight} and wishes to change their weight by ${weight_change} per week and has a ${activity_level_value} activity level should consume. In html form`);
    console.log(nutrition_output);   
}