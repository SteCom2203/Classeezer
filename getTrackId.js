// contourner problème de certificat https
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// importation de bibliothèques et initialisation
const axios = require("axios");
const playlistId = 14857074483;
let idArray = [];
let titleArray = [];
let chillArray = [];
let danceArray = [];

async function main()
{
    try
    {
        // attendre que les titres de la playlist soient récupérés
        const response = await axios.get(`https://api.deezer.com/playlist/${playlistId}/tracks`);

        // remplir idArray avec les ids des titres et titleArray avec les titres
        response.data.data.forEach(track => 
            {
                idArray.push(track.id);
                titleArray.push(track.title);
            });
    } 
    catch (error)
    {
        console.log("Oups... ça n'a pas marché :");
        console.log(error);
    }

}

async function getTrackBPM(id)
{
    try
    {
        //attendre de récupérer toutes les caractéristiques du titre
        const response = await axios.get(`https://api.deezer.com/track/${id}`)

        //renvoyer le bpm
        return response.data.bpm;
    }
    catch(e)
    {   
        console.log(e);
        return -1;
    }
}

async function classByBPM(idArr)
{
    for (let i = 0; i < idArr.length; i++)
    {
        try {
            // attendre la d'obtenir le bpm
            const bpm = await getTrackBPM(idArr[i]);

            // mettre à jour le bon array en fonction de la valeur de bpm
            if (bpm >= 110)
            {
                danceArray.push (
                    {
                        'titre': titleArray[i],
                        'bpm': bpm
                    }
                )
            } else   if (bpm < 110)
            {
                chillArray.push (
                    {
                        'titre': titleArray[i],
                        'bpm': bpm
                    }
                )
            }
        }
        catch(e)
        {
            console.log("Erreur pour bpm");
            console.log(e);
        }
        
    }

    
}

function displayArray(arr)
{
    for (let i = 0; i < arr.length; i++)
    {
        console.log(
            `Titre : ${arr[i].titre} -  BPM : ${arr[i].bpm}`
        );
    }
}

main()
.then( async () => 
   { 
    // attendre la mise à jour de toutes les array
    await classByBPM(idArray);
    console.log ("--- Les playlists classées ----");

    console.log ("-->Chill");
    displayArray(chillArray);

    console.log ("\n-->Dance");
    displayArray(danceArray);
   }
);

