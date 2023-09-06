import { Link } from 'react-router-dom';

const ForgotPsw = () => {
    return (
        <div className="uusiSalasana">
            <form action="" className="form">
                <h1 className="title-salasana">Unohtuiko Salasana</h1>
                <p>Lähetämme sinulle linkin sähköpostiin, jonka kautta pääset luomaan uuden salasanan.</p>

                <div className="inputContainer">
                    <input type="email" className="input" placeholder="a" required />
                    <label htmlFor="" className="label">Sähköposti</label>
                </div>

                <input type="submit" className="submitBtn" value="Lähetä" />

                <div className="peruuta">
                <Link to="/kirjaudu">Peruuta</Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPsw;