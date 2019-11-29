//API url to use in fetch commands
const API_URL = 'https://chainz.cryptoid.info/smly/api.dws?q=txinfo&t='

//String to use for the whole HTML
let resString = ""
//Array for the transaction ID's
let txArray;

//Hex to string function
function hex2a(hex) {
  var str = "";
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

//Fetches data for each txid, pushes to a promise array,
// resolves and adds the OP_RETURN data to resString
function fetchData(stringarray){
  let promisarr = [];
  let i = 0;
  stringarray.forEach(item=>{
    promisarr.push(fetch(`${API_URL}${item}`));
    i++;
  });
  Promise.all(promisarr).then(values=>{
    Promise.all(values.map(value=>value.json()))
    .then(finalVals=>{
      let resarray=[];
      finalVals.forEach(valItem=>{
        valItem['outputs'].forEach(foo=>{
          if(foo['addr']==='nulldata')resarray.push(
                                        hex2a(foo["script"].slice(4))
                                      );
        })
        
      });
      resarray.forEach(item_=>{
        console.log(item_);
        resString+=item_;
      });
      console.log(resString);
      document.write(resString);
      document.close();
    })
  })
}
//Submit handler that initializes txArray with input value and calls fetchData(txArray)
function onSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector("input");
  if (input.value.length > 0 && !input.value.replace(/\s/g, "").length !== 0) {
    txArray=input.value.split(',');
    fetchData(txArray)
  } else {
    alert("Please type your transaction ID.")
  }
}



//Initializing the page
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", onSubmit);
});