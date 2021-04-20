import './index.css'
import { useState} from 'react'
import axios from 'axios'

function App() {

    const config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [addedName, setAddedName] = useState('');
    const [addedSurname, setAddedSurname] = useState('');
    const [overall, setOverall] = useState(0);
    const [club, setClub] = useState('');
    const [rare, setRare] = useState(false);
    const [nationality, setNationality] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onSurnameChange = (event) => {
        setSurname(event.target.value);
    }

    const onAddedNameChange = (event) => {
        setAddedName(event.target.value);
    }

    const onAddedSurnameChange = (event) => {
        setAddedSurname(event.target.value);
    }

    const onOverallChange = (event) => {
        setOverall(event.target.value);
    }

    const onClubChange = (event) => {
        setClub(event.target.value);
    }

    const onRareChange = (event) => {
        setRare(event.target.value);
    }

    const onNationalityChange = (event) => {
        setNationality(event.target.value);
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
            overall:     overall,
            rare:        rare,
            club:        club,
            nationality: nationality
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
            <input placeholder="Ocena" value={overall} onChange={onOverallChange}/>
            <br/>
            <input type="checkbox" placeholder="Rzadkość" value={rare} onChange={onRareChange}/>
            <br/>
            <input placeholder="Club" value={club} onChange={onClubChange}/>
            <br/>
            <input placeholder="Reprezentacja" value={nationality} onChange={onNationalityChange}/>
            <br/>
            <button onClick={addPlayer}>
                POST
            </button>
        </div>
    );
}

export default App;