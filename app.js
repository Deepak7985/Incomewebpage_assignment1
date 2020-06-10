 let database=[];

 document.getElementById("submit-btn").addEventListener("click",getdata);
 let out=document.getElementById("table").innerHTML;

// get data from user

function getdata(){
    data=document.getElementById("text-input").value;
    document.getElementById("text-input").value=null;
    data=refine_data(data);                                  // converts data from csv to array form
    if(validatedata(data)==false){
        alert("Invalid Input");
        return;
    }
    putdata(data);
}


//put data in form 

function putdata(data){
    adddatabase(data);                       //add new data to database
    renderpage();                            // render HTML
    listenforremoval();                      // listen for delete event
    
}

// validate the data 
 function validatedata(data){
     let len=data.length;
     for(var i=0;i<len;i++){
         console.log(data[i].length);
         if(data[i].length!==4)return false;
         if(data[i][0]==="I"||data[i][0]==="E"){
               if(isNaN(data[i][3])) return false;
         }else{
             return false;
         }
     }
     return true;
 }

//preprocessing of  input

function refine_data(data){
    data=data.split("\n");
    let len=data.length;
    for(var i=0;i<len;i++){
        data[i]=data[i].split(",");
    }
    return data;

}

//add new data to the database

function adddatabase(data){
    let db=database.length;
    let len =data.length;
    let last_id;
    if(db===0) last_id=0;
    else 
    last_id=database[db-1][0];
    for(var i=0;i<len;i++){
       database.push(data[i]);       
       database[db+i].unshift(i+last_id+1);
       
    }

}

function listenforremoval(){
   let db=database.length;
   for(var i=0;i<db;i++){
     document.getElementById(`del-${database[i][0]}`).addEventListener("click",deletedata.bind(null,database[i][0]));
    }
}

function deletedata(index){
    let db=database.length;
    console.log(database);
    console.log(index);
    for(var i=0;i<db;i++){
        if(database[i][0]===index){
            database.splice(i,1);
            break;
        }
    }
    console.log(database);
    renderpage(); 
    listenforremoval();
}

// Render the webpage

function renderpage(){
    let output=out;
    let color="";
    let db=database.length;
    let totalincome=0;
    let totalexpense=0;
    let avg_income=0,avg_expense=0,ic=0,ec=0;

    for(var i=0;i<db;i++){
         if(database[i][1]=="I" ){ic++;totalincome+=parseInt(database[i][4]);color="rgb(150,250,150,0.5)";}
         else {ec++;totalexpense+=parseInt(database[i][4]);color="rgb(250,150,150,0.5)";}  

       output+= `<tr style="background-color:${color}" style="text-align:center"><td>${database[i][1]}</td><td>${database[i][2]}</td><td>${database[i][3]}</td><td>${database[i][4]}</td><td id="del-${database[i][0]}"><img src="C:\\Users\\DEEPAK\\Downloads\\delete.jpg" height="30px" width="30px"></img></td></tr>`;

    }
    avg_income=totalincome/ic;
    avg_expense=totalexpense/ec;
    let output2=document.getElementById("list").innerHTML;
    output2=`<li>Total income=${totalincome}</li><li>Total expenses=${totalexpense}</li><li>Average income=${avg_income}</li><li>Average expenses=${avg_expense}</li>`;
    document.getElementById("table").innerHTML=output;
    document.getElementById("list").innerHTML=output2;
}

