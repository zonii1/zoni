const express = require('express');
const app = express();

app.use(express.json());

let listaNekretnina = [];
let listaPonuda = [];

app.get('/nekretnine', (req, res) => {
    res.json(listaNekretnina);
});


app.get('/nekretnine/:id', (req, res) => {
    const trazeniId = parseInt(req.params.id);
    let odabranaNekretnina = null;
    for (let i = 0; i < listaNekretnina.length; i++) {
        if (listaNekretnina[i].id === trazeniId) {
            // izjednaci
            odabranaNekretnina = listaNekretnina[i];
            break;
        }
    }

    res.json(odabranaNekretnina);
});

app.post('/nekretnine', (req, res) => {
    const { id, naziv, opis, cijena, lokacija, sobe, povrsina } = req.body;
    const novaNekretnina = { id, naziv, opis, cijena, lokacija, sobe, povrsina };
    listaNekretnina.push(novaNekretnina);
    res.status(201).json(novaNekretnina);
});

app.put('/nekretnine/:id', (req, res) => {
    const trazeniId = parseInt(req.params.id);
    let pronadena = false;
    for (let i = 0; i < listaNekretnina.length; i++) {
        if (listaNekretnina[i].id === trazeniId) {
            const { naziv, opis, cijena, lokacija, sobe, povrsina } = req.body;
            listaNekretnina[i] = { id: trazeniId, naziv, opis, cijena, lokacija, sobe, povrsina };
            res.json(listaNekretnina[i]);
            pronadena = true;
            break;
        }
    }

});
 // update za nekretnine
app.patch('/nekretnine/:id', (req, res) => {
    const trazeniId = parseInt(req.params.id);
    let odabranaNekretnina = null;
    for (let i = 0; i < listaNekretnina.length; i++) {
        if (listaNekretnina[i].id === trazeniId) {
            odabranaNekretnina = listaNekretnina[i];
            const { naziv, opis, cijena, lokacija, sobe, povrsina } = req.body;
            if (naziv)
            {odabranaNekretnina.naziv = naziv;
            }
            if (opis)
            { odabranaNekretnina.opis = opis;
            }
            if (cijena)
            { odabranaNekretnina.cijena = cijena;
            }
            if (lokacija)
            { odabranaNekretnina.lokacija = lokacija;
            }
            if (sobe)
            { odabranaNekretnina.sobe = sobe;
            }
            if (povrsina)
            { odabranaNekretnina.povrsina = povrsina;
            }
            res.json(odabranaNekretnina);
            break;
        }
    }

});

app.delete('/nekretnine/:id', (req, res) => {
    const trazeniId = parseInt(req.params.id);
    let pronadena = false;
    for (let i = 0; i < listaNekretnina.length; i++) {
        if (listaNekretnina[i].id === trazeniId) {
            listaNekretnina.splice(i, 1);
            pronadena = true;
            break;
        }
    }

});

app.post('/ponude', (req, res) => {
    const { id, nekretninaId, imeKupca, prezimeKupca, ponudaCijena, telefonKupca } = req.body;
    let odabranaNekretnina = null;
    for (let i = 0; i < listaNekretnina.length; i++) {
        if (listaNekretnina[i].id === nekretninaId) {
            odabranaNekretnina = listaNekretnina[i];
            break;
        }
    }


    const novaPonuda = { id, nekretninaId, imeKupca, prezimeKupca, ponudaCijena, telefonKupca };
    listaPonuda.push(novaPonuda);
    res.status(201).json(novaPonuda);
});

app.get('/ponude', (req, res) => {
    res.json(listaPonuda);
});


// provjera dali radi
app.listen(3000, () => {
    console.log('radi');
});
