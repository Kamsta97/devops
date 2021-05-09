import './index.css'
import { useState} from 'react'
import axios from 'axios'

function App() {

    const config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };

    //Get
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    //Post
    const [addedName, setAddedName] = useState('');
    const [addedSurname, setAddedSurname] = useState('');
    const [addedOverall, setAddedOverall] = useState(0);
    const [addedClub, setAddedClub] = useState('');
    const [addedRare, setAddedRare] = useState(false);
    const [addedNationality, setAddedNationality] = useState('');

    //Delete
    const [deleteName, setDeleteName] = useState('');
    const [deleteSurname, setDeleteSurname] = useState('');

    //Put
    const [updatedName, setUpdatedName] = useState('');
    const [updatedSurname, setUpdatedSurname] = useState('');
    const [updatedOverall, setUpdatedOverall] = useState(0);
    const [updatedClub, setUpdatedClub] = useState('');
    const [updatedRare, setUpdatedRare] = useState(false);
    const [updatedNationality, setUpdatedNationality] = useState('');

    //Get

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onSurnameChange = (event) => {
        setSurname(event.target.value);
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
        setAddedRare(event.target.value);
    }

    const onNationalityChange = (event) => {
        setAddedNationality(event.target.value);
    }

    //Delete

    const onDeleteNameChange = (event) => {
        setDeleteName(event.target.value);
    }

    const onDeleteSurnameChange = (event) => {
        setDeleteSurname(event.target.value);
    }

    //Put

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
        setUpdatedRare(event.target.value);
    }

    const onUpdatedNationalityChange = (event) => {
        setUpdatedNationality(event.target.value);
    }

    const getPlayer = () => {
        console.log(name+surname);
        axios.get('http://localhost:8080/getCardById/'+name+'/'+surname+'' , config)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

    const addPlayer = () => {
        axios.post('http://localhost:8080/createCard',
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
        axios.delete('http://localhost:8080/delete/'+deleteName+'/'+deleteSurname+'',config)
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
    }

    const updatePlayer = () => {
        axios.post('http://localhost:8080/update/'+updatedName+'/'+updatedSurname+'',config,
        {
            name:        updatedName,
            surname:     updatedSurname,
            overall:     updatedOverall,
            rare:        updatedRare,
            club:        updatedClub,
            nationality: updatedNationality
        },config)
        .then(response => console.log(addedName + ' ' + addedSurname + ' was added to db'))
        .catch(error => console.log(error));
    }


    return (
        <div>
            {name+surname};
            <br></br>
            <h3>Getting playar card by name and surname</h3>
            <input placeholder="Imię" value={name} onChange={onNameChange}/>
            <input placeholder="Nazwisko" value={surname} onChange={onSurnameChange}/>
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
            <input type="checkbox" placeholder="Rzadkość" value={addedRare} onChange={onRareChange}/>
            <br/>
            <input placeholder="Club" value={addedClub} onChange={onClubChange}/>
            <br/>
            <input placeholder="Reprezentacja" value={addedNationality} onChange={onNationalityChange}/>
            <br/>
            <button onClick={addPlayer}>
                POST
            </button>

            <br></br>

            <h3>Delete playar card by name and surname</h3>
            <input placeholder="Imię" value={deleteName} onChange={onDeleteNameChange}/>
            <input placeholder="Nazwisko" value={deleteSurname} onChange={onDeleteSurnameChange}/>
            <button onClick={deletePlayer}>
                DELETE
            </button>

            <br></br>

            <h3>Update playar card</h3>
            <input placeholder="Imię" value={updatedName} onChange={onUpdatedNameChange}/>
            <br/>
            <input placeholder="Nazwisko" value={updatedSurname} onChange={onUpdatedSurnameChange}/>
            <br/>
            <input placeholder="Ocena" value={updatedOverall} onChange={onUpdatedOverallChange}/>
            <br/>
            <input type="checkbox" placeholder="Rzadkość" value={updatedRare} onChange={onUpdatedRareChange}/>
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