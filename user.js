// Asincronia

/*function getUsersWithCallbacks(callback){
    fetch('https://randomuser.me/api/')
    .then(response => response.json()) // Traducir a JSON
    .then(data =>{
        const {results} = data;
        callback(null, results)
    })
    .catch(error =>{
        callback(error, null)
    })
}

getUsersWithCallbacks((error, results)=> {
    if(error) console.error('Error al obtener datos', error)
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const phone = document.getElementById('phone');
    for(let user of results){
        name.innerText = user.name.first;
        surname.innerText = user.surname.last;
        phone.innerText = user.phone.phone;
    }
});

// PROMESAS

const getUsersWithPromises = () => {
    return new Promise((resolve, reject) =>{
        fetch('c')
        .then(response  => response.json())
        .then(data =>{
            const { results } = data;
            resolve(results)
        })
        .catch(error => reject(error))
    })
}

getUsersWithPromises()
    .then(results => {
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
        for(const user of results){
            name.innerText = user.name.first;
            surname.innerText = user.name.last;
            phone.innerText = user.phone;
        }
    })
    .catch(error => console.log(error));
    

// ASYNC / AWAIT

const getUsersWitAsync = async() =>{
    try{
        const response = await fetch('https://randomuser.me/api/?results=10')
        const { results } = await response.json()
        console.log(results)

        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
        for(const user of results){
            name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone
        }
    }catch(error){
        console.error(error)
    }
}

getUsersWitAsync();
*/  

// //////////// EJERCICIO //////////////////

// Consultar 10 usuarios del API Random user generator y que se muestren en la tabla como:
// Los datos del API no se agreguen a un td (forma individual) sino que se agreguen a un tr.

const getUsersWithAsync = async() =>{
    try{
        const response = await fetch('https://randomuser.me/api/?results=10')
        const { results } = await response.json()
        const users = document.getElementById('users')
        console.log(results)
        
        for (const user of results) {
            users.innerHTML += `
                <tr id="${user.id.name}">
                    <td>${user.name.first}</td>
                    <td>${user.asdf?.surname ?? ''}</td>
                    <td>${user.phone}</td>
                </tr>
            `
        }
    }catch(error){
        console.error(error)
    }
}

getUsersWithAsync();