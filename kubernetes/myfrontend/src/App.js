import './index.css'
import { useState} from 'react'
import axios from 'axios'

function App() {

    const config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };

    //Get
    const [id,setId] = useState('');

    //Post
    const [addedName, setAddedName] = useState('');
    const [addedSurname, setAddedSurname] = useState('');
    const [addedOverall, setAddedOverall] = useState(0);
    const [addedClub, setAddedClub] = useState('');
    const [addedRare, setAddedRare] = useState(false);
    const [addedNationality, setAddedNationality] = useState('');

    //Delete
    const [deletedId, setDeletedId] = useState('');

    //Put
    const [updatedId, setUpdatedId] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedSurname, setUpdatedSurname] = useState('');
    const [updatedOverall, setUpdatedOverall] = useState(0);
    const [updatedClub, setUpdatedClub] = useState('');
    const [updatedRare, setUpdatedRare] = useState(false);
    const [updatedNationality, setUpdatedNationality] = useState('');

    //Get

    const onIdChange = (event) => {
        setId(event.target.value);
    }

    //Post

    const onAddedNameChange = (event) => {
        setAddedName(event.target.value);
    }

    const onAddedSurnameChange = (event) => {
        setAddedSurname(event.target.value);
    }

    const onOverallChange = (event) => {
        setAddedOverall(event.target.value);
    }

    const onClubChange = (event) => {
        setAddedClub(event.target.value);
    }

    const onRareChange = (event) => {
        setAddedRare(event.target.checked);
    }

    const onNationalityChange = (event) => {
        setAddedNationality(event.target.value);
    }

    //Delete

    const onDeletedIdChange = (event) => {
        setDeletedId(event.target.value);
    }

    //Put

    const onUpdatedIdChange = (event) => {
        setUpdatedId(event.target.value);
    }

    const onUpdatedNameChange = (event) => {
        setUpdatedName(event.target.value);
    }

    const onUpdatedSurnameChange = (event) => {
        setUpdatedSurname(event.target.value);
    }

    const onUpdatedOverallChange = (event) => {
        setUpdatedOverall(event.target.value);
    }

    const onUpdatedClubChange = (event) => {
        setUpdatedClub(event.target.value);
    }

    const onUpdatedRareChange = (event) => {
        setUpdatedRare(event.target.checked);
    }

    const onUpdatedNationalityChange = (event) => {
        setUpdatedNationality(event.target.value);
    }

    const getPlayer = () => {
        axios.get('http://localhost/api/getCardById/'+id+'' , config)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

    const addPlayer = () => {
        console.log(addedRare);
        axios.post('http://localhost/api/createCard',
        {
            name:        addedName,
            surname:     addedSurname,
            overall:     addedOverall,
            rare:        addedRare,
            club:        addedClub,
            nationality: addedNationality
        },config)
        .then(response => console.log(addedName + ' ' + addedSurname + ' was added to db'))
        .catch(error => console.log(error));
    }

    const deletePlayer = () => {
        axios.delete('http://localhost/api/delete/'+deletedId+'',config)
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
    }

    const updatePlayer = () => {
        console.log(updatedRare);
        axios.put('http://localhost/api/update/'+updatedId+'',
        {
            id:          updatedId,
            name:        updatedName,
            surname:     updatedSurname,
            overall:     updatedOverall,
            rare:        updatedRare,
            club:        updatedClub,
            nationality: updatedNationality
        },config)
        .then(response => console.log('Card '+updatedName + ' ' + updatedSurname + ' was updated'))
        .catch(error => console.log(error));
    }


    return (
        <div>
            {id};
            <br></br>
            <h3>Getting playar card by id</h3>
            <input placeholder="ID" value={id} onChange={onIdChange}/>
            <button onClick={getPlayer}>
                GET
            </button>

            <br></br>

            <h3>Add playar card</h3>
            <input placeholder="Imię" value={addedName} onChange={onAddedNameChange}/>
            <br/>
            <input placeholder="Nazwisko" value={addedSurname} onChange={onAddedSurnameChange}/>
            <br/>
            <input placeholder="Ocena" value={addedOverall} onChange={onOverallChange}/>
            <br/>
            <input type="checkbox" placeholder="Rzadkość" checked={addedRare} onChange={onRareChange}/>
            <br/>
            <input placeholder="Club" value={addedClub} onChange={onClubChange}/>
            <br/>
            <input placeholder="Reprezentacja" value={addedNationality} onChange={onNationalityChange}/>
            <br/>
            <button onClick={addPlayer}>
                POST
            </button>

            <br></br>

            <h3>Delete playar card by id</h3>
            <input placeholder="Id" value={deletedId} onChange={onDeletedIdChange}/>
            <button onClick={deletePlayer}>
                DELETE
            </button>

            <br></br>

            <h3>Update playar card</h3>
            <input placeholder="Id" value={updatedId} onChange={onUpdatedIdChange}/>
            <br/>
            <input placeholder="Imię" value={updatedName} onChange={onUpdatedNameChange}/>
            <br/>
            <input placeholder="Nazwisko" value={updatedSurname} onChange={onUpdatedSurnameChange}/>
            <br/>
            <input placeholder="Ocena" value={updatedOverall} onChange={onUpdatedOverallChange}/>
            <br/>
            <input type="checkbox" placeholder="Rzadkość" checked={updatedRare} onChange={onUpdatedRareChange}/>
            <br/>
            <input placeholder="Club" value={updatedClub} onChange={onUpdatedClubChange}/>
            <br/>
            <input placeholder="Reprezentacja" value={updatedNationality} onChange={onUpdatedNationalityChange}/>
            <br/>
            <button onClick={updatePlayer}>
                UPDATE
            </button>


        </div>
    );
}

export default App;