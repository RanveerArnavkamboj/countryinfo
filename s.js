
let btn = document.querySelector(".btn");
let img = document.querySelector(".flag");
let input = document.querySelector("#country");
let capital = document.querySelector(".details");
let cname = document.querySelector(".cname");
let dataarray = [];
async function getdetails() {
  try {
    const response = await fetch("https://api.worldbank.org/v2/country?format=json&per_page=300")
    const data = await response.json();
    console.log(data)
    dataarray = data[1];
  } catch (err) {
    console.log("error found to load countries : ", err)
  }
}
getdetails();
function showdetails() {
  const inputvalue = input.value.trim().toLowerCase();
  input.value=""
  let conobj;
  for (let i = 0; i < dataarray.length; i++) {
    if (dataarray[i].name.toLowerCase() === inputvalue) {
      conobj = dataarray[i]
      break;
    }
  }
  if (!conobj) {
    cname.textContent = "Country not found";
    capital.textContent = "Try again";
    img.classList.add("before")
    return;
  }
  cname.textContent = "COUNTRY : " + conobj.name
  capital.textContent = "CAPITAL : " + conobj.capitalCity

  img.classList.remove("before")
  img.src = "https://flagcdn.com/w320/" + conobj.iso2Code.toLowerCase() + ".png";

}
btn.addEventListener("click", showdetails);

