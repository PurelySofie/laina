const ListItems = (props) => {
    let teksti, kirjanNimi,
        lainaaja, lainattu,
        viimeinenPalautus, tunniste,
        palautettavaViimeistaan, palautettu;

    const kirja = props.kirja;
    // Antaa kirjalle nimen

    kirjanNimi = kirja.Kirjanimi

    console.log(kirja.kirjanNimi)
    /**
     * If-lause joka katsoo
     * onko kirjalla lainaajaa 
     * ja antaa kirjan tiedoille
     * arvoja sen perusteella
     */
    if(props.lainaaja !== "nA"){ // nA:n tilalle jokin jolla merkitään että kirja ei ole lainassa
        lainaaja = kirja.lainaaja;
        lainattu = kirja.lainauspv
        palautettu = kirja.palautettupv
        palautettavaViimeistaan = kirja.viimpalautuspv
        viimeinenPalautus = kirja.palautettupv
    }else{
        lainaaja = "Ei lainassa"
        /*
        lainattu = kirja.lainauspv
        palautettu = kirja.palautettupv
        palautettavaViimeistaan = kirja.viimpalautuspv
        viimeinenPalautus = kirja.palautettupv
        */
    }
    // Antaa tunnisteen
    tunniste = kirja.Kirjatunnitse

    teksti = 
    "Kirjan nimi: " + kirjanNimi
    + ". Lainaaja: " + lainaaja
    + ". Lainattu: " + lainattu
    + ". Palautetattava viimeistään: " + palautettavaViimeistaan
    + ". Viimeisin palautus: " + viimeinenPalautus
    + ". Tunniste: " + tunniste;

    return(
        <>
            {
                <li className="admin-li">
                    {teksti}
                </li>
            }
        </>
    )
}

export default ListItems;