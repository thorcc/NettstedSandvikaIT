const resultat = document.getElementById("resultat");
var tilbake = {
    prosjekt: "spill",
    tilbakemelding: "bra!"
};
var elev = {
    navn: "Per Tangen",
    karakter: 5,
    tilbakemeldinger: tilbake,
    innleveringer: " "

};

resultat.innerHTML += ` 
 <div id="wrapper">
 <article>
    <p>Navn: </>${elev.navn}</p>
    <p>Karakter: ${elev.karakter}</p>
    <p>Innleveringer: ${elev.innleveringer}</p>
    <p>Tilbakemeldinger: ${tilbake.prosjekt +" "+ tilbake.tilbakemelding}</p>
    </article>
    
    </div>
   
`;

