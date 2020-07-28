let globalUsers = [];
let globalCountries = [];
let globalUsersCountries = [];


async function start(){
    
   await fetchUsers ();
   await fetchCountries ();

   
    hideSpinner ();
    mergeUsersAndCountries ();
    // render ();
}

async function fetchUsers(){
    const res = await fetch ('http://localhost:3002/users');
    const json = await res.json();
    globalUsers = json.map(({name, picture, login,nat}) =>{
        return {
            useriD: login.uuid,
            userCountry: nat,
            userName: name.first,
            userPicture: picture.large,
        };
    });


}

async function fetchCountries(){
    const res = await fetch ('http://localhost:3001/countries');
    const json = await res.json();
    globalCountries = json.map(({name, flag, alpha2Code}) =>{
        return {
             countryId: alpha2Code,
             countryName: name,
             countryFlag: flag,
        };
    });


}

function hideSpinner(){
    document.querySelector('#spinner').classList.add('hide');
}

function mergeUsersAndCountries(){
    globalUsersCountries = [];

    globalUsers.forEach(user =>{
        const country = globalCountries.find((country) => country.countryId === user.userCountry);

        const {countryName, countryFlag} = country;

        globalUsersCountries.push({
            ...user, 
            countryName,
            countryFlag
        })
    });

    console.log(globalUsersCountries)

}

start();