let globalUsers = [];
let globalCountries = [];
let globalUsersCountries = [];


async function start(){
    
//    await fetchUsers ();
//    await fetchCountries ();
    await promiseUsers();
    await promiseCountries();
    



    hideSpinner ();
    mergeUsersAndCountries ();
    render ();
}

function promiseUsers(){
    return new Promise(async(resolve, reject) =>{
        await fetchUsers();
        resolve();

    });
}
function promiseCountries(){
    return new Promise(async(resolve, reject) =>{
        await fetchCountries();
        resolve();

    });
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

function render(){
    const divUser = document.querySelector('#users');


    divUser.innerHTML = `
        <div class='row'>
            ${globalUsersCountries.map(({countryFlag,userPicture,userName,countryName})=>{
                return`
                <div class='col s6 m4 l3'>
                    <div class='flex-row bordered'>
                        <img class='avatar' src='${userPicture}' alt='${userName}'/>

                        <div class='flex-column'>
                        <span> ${userName}</span>
                        <img class='flag' src='${countryFlag}' alt='${countryName}'>
                        </div>
                    </div>
                </div>
                `;

            }).join('')}
        </div>
    `
};



start();