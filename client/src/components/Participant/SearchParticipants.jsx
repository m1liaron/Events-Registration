import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import resetIcon from "../../assets/reset-icon.png";

const SearchParticipants = ({search, setSearch, onSearch, fetchData}) => {
    const {fullName, email} = search

    const handleChange = (e, key) => {
        setSearch({...search, [key]: e.target.value});
    }
    const resetSearch = async () => {
        await setSearch({email: '', fullName: ''});
        fetchData()
    }

    return (
        <div className='p-2'>
            <h4>Search</h4>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    value={email}
                    onChange={(e) => handleChange(e, 'email')}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Participant's full name"
                    aria-label="Participant's full name"
                    aria-describedby="basic-addon2"
                    value={fullName}
                    onChange={(e) => handleChange(e, 'fullName')}
                />
            </InputGroup>
            <div className='d-flex gap-2 align-items-center'>
                <Button onClick={onSearch}>Search</Button>
                <Button variant="info" onClick={resetSearch}>
                    <img
                        src={resetIcon}
                        alt='reset button'
                        style={{width: 20, height: 20}}
                    />
                </Button>
            </div>
        </div>
    )
}

export default SearchParticipants;