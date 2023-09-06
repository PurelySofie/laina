import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Loginsivu.css";


const Loginsivu = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
            <div className="kirjauduFrm">
                <form action="" className="form">
                    <h1 className="title-kirjaudu">Kirjaudu Sisään</h1>

                    <div className="inputContainer">
                        <input type="email" className="input" placeholder="a" required />
                        <label htmlFor="" className="label">Sähköposti</label>
                    </div>

                    <div className="inputContainer">
                        <input type={passwordShown ? "text" : "password"} className="input" name="password" placeholder="a" required />
                        <label htmlFor="" className="label">Salasana</label><br></br>
                    </div>
                    <div className="showPassword">
                        <input type="checkbox" className="showPsw" onClick={togglePassword} />
                        <p className='showpass'>Näytä Salasana</p>
                    </div>

                    <input type="submit" className="submitBtn" value="Kirjaudu Sisään" />

                    <div className="forgotPsw">
                        <Link to="/salasana">Unohtuiko Salasana?</Link>
                    </div>

                    <div className="rekisteröidy">
                    <h4 className="hr-lines">TAI</h4>
                    <p>Oletko uusi käyttäjä?</p>
                    <Link to="/Uusitili">Rekisteröidy</Link>
                    </div>
                </form>
            </div>
    )
}

export default Loginsivu;