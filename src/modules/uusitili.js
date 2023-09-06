import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Loginsivu.css"

const Uusitili = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="rekisteröidyFrm">
            <form action="" className="form">
                <h1 className="title-rekisteröidy">Rekisteröidy</h1>

                <div className="inputContainer">
                    <input type="text" className="input" placeholder="a" required />
                    <label htmlFor="" className="label">Etunimi</label>
                </div>

                <div className="inputContainer">
                    <input type="text" className="input" placeholder="a" required />
                    <label htmlFor="" className="label">Sukunimi</label>
                </div>

                <div className="inputContainer">
                    <input type="email" className="input" placeholder="a" required />
                    <label htmlFor="" className="label">Sähköposti</label>
                </div>

                <div className="inputContainer">
                <input type={passwordShown ? "text" : "password"} className="input" name="password" placeholder="a" required />
                    <label htmlFor="" className="label">Salasana</label><br></br>
                </div>
                <input type="checkbox" className="showPsw" onClick={togglePassword}/> Näytä Salasana

                <input type="submit" className="submitBtn" value="Rekisteröidy" />

                <div className="kirjaudu">
                  <h4 className="hr-lines">TAI</h4>
                  <p>Onko sinulla jo käyttäjä?</p>
                  <Link to="/Loginsivu">Kirjaudu Sisään</Link>
                </div>
            </form>
        </div>
    )
}

export default Uusitili;