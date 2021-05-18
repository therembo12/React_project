import { getAllByAltText } from "@testing-library/react"
const URL = 'https://web-03-cl-default-rtdb.firebaseio.com/List.json' 

export const  getAllContacts = () =>{
    const AllContacts = fetch(URL).then(response =>{
       return response.json()
    }).then(data =>{
        return data
    }).catch(err =>{
        console.log(err)
    })
    return AllContacts
}

export const updateContacts = (contacts) =>{
     fetch(URL, {
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(contacts)
    })
}
