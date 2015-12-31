/*
 Il y a loin de la rivière aux lèvres!
 Crée par Philippe-Alexandre Richard
 Logiciel permettant de faire des présentaion sur le fonctionnement des stations de
 traitement d'eau potable.
*/

// Déclaration des variables
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var toXML=require('./node_modules/toXML/toXML');
var ls = require('./node_modules/listeFichiers/listeFichiers');
var getExplication = require('./node_modules/explication/explication');
var xml2js = require('xml2js');
var presentation = require('./node_modules/presentation/presentation');
var cloudinary = require('cloudinary');
var gUtilisateurs = require('./node_modules/gestionUtilisateur/gestionUtilisateur');
var parser = new xml2js.Parser();
/*var sendgrid  = require('sendgrid')(
    'ryleck',
    'a1069023'
);*/
var routes = require('./routes/index');
var fileUpload = require('./routes/fileUpload');
var users = require('./routes/users');
var app = express();
var debug = require('debug')('cieauWeb');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/fileUpload', fileUpload);


cloudinary.config({ cloud_name: 'dno3dfbgx', api_key: '997542646619133', api_secret: 'CRUd1qUNdz33iIHj9xslA8zyebU' });
gUtilisateurs.chargerFichier();


app.get('/fileUpload', function userIdHandler(req, res, next) {
    //console.log(req.route);
    res.render('fileUpload');
    /*cloudinary.config({ cloud_name: 'dno3dfbgx', api_key: '997542646619133', api_secret: 'CRUd1qUNdz33iIHj9xslA8zyebU' });
    cloudinary.api.resources(function(items){
        res.render('fileUploadCloudinary', { images: items.resources, title: 'Gallerie' });
    });*/
});

/*app.post('/upload', function(req, res){
 var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
 , cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/'); });

 imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
 });*/

app.post('/inscription', function userIdHandler(req, res){
    res.render('inscription', { title: 'Inscription'});
});

app.post('/presentation', function userIdHandler(req, res) {
    //console.log(req.route);
    //console.log(req.body);
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        res.render('presentation', {
            title: 'Présentation',
            valeurIndex: req.body.index,
            blockNavigation: generateHTMLNav(varPresentation),
            blockProcede: generateHTMLFiche('debut')
        });
    }
});

app.post('/glossaire', function userIdHandler(req, res) {
    //console.log(req.route);
    //console.log(req.body);
    res.render('glossaire', { title: 'Glossaire'});
});

app.post('/ficheDosage', function userIdHandler(req, res) {
    //console.log(req.route);
    //console.log(req.body);
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        res.render('presentationDosage', {
            title: 'Fiche Dosage',
            valeurIndex: req.body.index,
            blockNavigation: generateHTMLNavDosage(req.body.dosage)
        });
    }
});

app.post('/conclusion', function userIdHandler(req, res) {
    //console.log(req.route);
    //console.log(req.body);
    res.render('conclusion', { title: 'Conclusion'});
});

app.post('/remerciements', function userIdHandler(req, res) {
    //console.log(req.route);
    //console.log(req.body);
    res.render('remerciements', { title: 'Remerciements'});
});

app.post('/getFiche', function userIdHandler(req, res) {
    //console.log();
    presentation.resetTimeout(req.body.index);
    res.type('html');
    res.send(generateHTMLFiche(req.body.nom));
});

function generateHTMLNav(varPresentation){
    var stringHTML = '';
    var index = 0;

    stringHTML = stringHTML + '<div id="dIconNav' + index + '" class="dIconNavSelect"> <img id="' + 'debut' +
    '" class="iIconNav" onclick="mouseClickEvent(event)"' +
    getProcedeIconName('debut') + ' draggable="false"> </div>';

    for(j = 0; j < varPresentation.varOrdrePresentation.length; j++){
        index = index + 1;
        stringHTML = stringHTML + '<img id="iArrowNav" src="images/arrow.png" height="25px">';
        stringHTML = stringHTML + '<div id="dIconNav' + index + '" class="dIconNav"> <img id="' + varPresentation.varOrdrePresentation[j] +
        '" class="iIconNav" onclick="mouseClickEvent(event)"' +
        getProcedeIconName(varPresentation.varOrdrePresentation[j]) + ' draggable="false"> </div>';
    }
    stringHTML = stringHTML + '<img id="iArrowNav" src="images/arrow.png" height="25px">';
    stringHTML = stringHTML + '<div id="dIconNav' + index + '" class="dIconNav"> <img id="' + 'fin' +
    '" class="iIconNav" onclick="mouseClickEvent(event)"' +
    getProcedeIconName('fin') + ' draggable="false"> </div>';
    return stringHTML;
}

function generateHTMLNavIntro(varPresentation){
    var stringHTML = '';
    var index = 0;

    stringHTML = stringHTML + '<div id="dIconNav' + index + '" class="dIconNav"> <img id="' + 'debut' +
    '" class="iIconNav"' +
    getProcedeIconName('debut') + ' draggable="false"> </div>';

    for(j = 0; j < varPresentation.varOrdrePresentation.length; j++){
        index = index + 1;
        stringHTML = stringHTML + '<img id="iArrowNav" src="images/arrow.png" height="25px">';
        stringHTML = stringHTML + '<div id="dIconNav' + index + '" class="dIconNav"> <img id="' + varPresentation.varOrdrePresentation[j] +
        '" class="iIconNav"' +
        getProcedeIconName(varPresentation.varOrdrePresentation[j]) + ' draggable="false"> </div>';
    }
    stringHTML = stringHTML + '<img id="iArrowNav" src="images/arrow.png" height="25px">';
    stringHTML = stringHTML + '<div id="dIconNav' + index + '" class="dIconNav"> <img id="' + 'fin' +
    '" class="iIconNav"' +
    getProcedeIconName('fin') + ' draggable="false"> </div>';
    return stringHTML;
}

function generateHTMLNavDosage(dosages){
    var stringHTML = '';
    var index = 0;

    if((typeof dosages) == 'string'){
        //console.log('chaine');
        stringHTML = stringHTML + '<div id="dFicheNav' + 1 + '" class="dFicheNav"> <img id="' + dosages +
        '" class="iFicheNav" onclick="mouseClickEventDosage(event)"' +
        getFicheName(dosages) + 'draggable="false"> </div>';
    }else if((typeof dosages) == 'object'){
        for(j = 0; j < dosages.length; j++){
            index = index + 1;
            stringHTML = stringHTML + '<div id="dFicheNav' + index + '" class="dFicheNav"> <img id="' + dosages[j] +
            '" class="iFicheNav" onclick="mouseClickEventDosage(event)"' +
            getFicheName(dosages[j]) + 'draggable="false"> </div>';
        }
        //console.log('objet');
    }
    stringHTML = stringHTML + '<button id="bFicheNavFin" onclick="javascript:history.go(-2)">Cliquer ici pour retourner directement à la filière de traitement.</button>';

    return stringHTML;
}

function generateHTMLFiche(nomProcede){
    var stringHTML = '';
    stringHTML = stringHTML + '<img id="imgFiche" ' + getFicheName(nomProcede) + 'draggable="false">'
    return stringHTML;
}

function getFicheName(nomProcede){
    var nomIcon;
    switch (nomProcede) {
        case 'libre':
            nomIcon = 'title="Prise d\'eau en eau libre" src="images/ILLUSTRATIONS/1-Prise eau de surface en eau libre.jpg"';
            break;
        case 'enfouie':
            nomIcon = 'title="Prise d\'eau de surface enfouie" src="images/ILLUSTRATIONS/2-Prise eau de surface enfouie.jpg"';
            break;
        case 'berge':
            nomIcon = 'title="Prise d\'eau de surface en berge" src="images/ILLUSTRATIONS/3-Prise eau de surface en berge.jpg"';
            break;
        case 'tubulaire':
            nomIcon = 'title="Puits tubulaire foré" src="images/ILLUSTRATIONS/6-Puits tubulaire fore.jpg"';
            break;
        case 'surface':
            nomIcon = 'title="Puits de surface et pointe filtrante" src="images/ILLUSTRATIONS/4-Puits de surface et pointe filtrante.jpg"';
            break;
        case 'captage':
            nomIcon = 'title="Captage d\'une source" src="images/ILLUSTRATIONS/5-Captage source.jpg"';
            break;
        case 'artesien':
            nomIcon = 'title="Puits artésien" src="images/ILLUSTRATIONS/7-Puits artesien.jpg"';
            break;
        case 'microtamis':
            nomIcon = 'title="Microtamisage" src="images/ILLUSTRATIONS/8-Microtamis.jpg"';
            break;
        case 'manuelle':
            nomIcon = 'title="Dégrillage à nettoyage manuel" src="images/ILLUSTRATIONS/9-Grille manuelle.jpg"';
            break;
        case 'mecanique':
            nomIcon = 'title="Dégrillage à nettoyage mécanique" src="images/ILLUSTRATIONS/10-Degrillage mecanique.jpg"';
            break;
        case 'basse':
            nomIcon = 'title="Pompage basse pression" src="images/ILLUSTRATIONS/11a-Pompage basse pression-pompe verticale.jpg"';
            break;
        case 'basseCentrifuge':
            nomIcon = 'title="Pompage basse pression" src="images/ILLUSTRATIONS/11b-Pompage basse pression-pompe centrifuge.jpg"';
            break;
        case 'haute':
            nomIcon = 'title="Pompage haute pression" src="images/ILLUSTRATIONS/12-Pompage haute pression.jpg"';
            break;
        case 'integre':
            nomIcon = 'title="Pompage intégré (captage et distribution)" src="images/ILLUSTRATIONS/13-Pompage integre (captage et distribution).jpg"';
            break;
        case 'gravite':
            nomIcon = 'title="Alimentation par gravité" src="images/ILLUSTRATIONS/14-Alimentation par gravite.jpg"';
            break;
        case 'oxydation':
            nomIcon = 'title="Oxydation" src="images/ILLUSTRATIONS/15-Oxydation.jpg"';
            break;
        case 'adsorption':
            nomIcon = 'title="Adsorption" src="images/ILLUSTRATIONS/16-Adsorption.jpg"';
            break;
        case 'coagulation':
            nomIcon = 'title="Coagulation" src="images/ILLUSTRATIONS/17-Coagulation.jpg"';
            break;
        case 'aideCoagulation':
            nomIcon = 'title="Aide à la coagulation" src="images/ILLUSTRATIONS/18-Aide a la coagulation.jpg"';
            break;
        case 'chlores':
            nomIcon = 'title="Désinfection à base de produits chlorés" src="images/ILLUSTRATIONS/19-Desinfection a base de produits chlores.jpg"';
            break;
        case 'adoucissement':
            nomIcon = 'title="Adoucissement" src="images/ILLUSTRATIONS/20-Adoucissement.jpg"';
            break;
        case 'correction':
            nomIcon = 'title="Correction du pH" src="images/ILLUSTRATIONS/21-Correction du pH.jpg"';
            break;
        case 'alcalinite':
            nomIcon = 'title="Correction de l\'alcalinité" src="images/ILLUSTRATIONS/22-Correction alcalinite.jpg"';
            break;
        case 'corrosion':
            nomIcon = 'title="Contrôle de la corrosion" src="images/ILLUSTRATIONS/23-Controle de la corrosion.jpg"';
            break;
        case 'ions':
            nomIcon = 'title="Échanges d\'ions" src="images/ILLUSTRATIONS/24-Echange ions.jpg"';
            break;
        case 'statique':
            nomIcon = 'title="Décantation statique-dynamique" src="images/ILLUSTRATIONS/25-Decantation statique-dynamique.jpg"';
            break;
        case 'boue':
            nomIcon = 'title="Décantation à voile de boue" src="images/ILLUSTRATIONS/26-Decantation a voile de boue.jpg"';
            break;
        case 'lestes':
            nomIcon = 'title="Décantation a flocs lestées" src="images/ILLUSTRATIONS/27-Decantation a flocs lestes.jpg"';
            break;
        case 'dissous':
            nomIcon = 'title="Flottation à air dissous" src="images/ILLUSTRATIONS/28-Flottation a air dissous.jpg"';
            break;
        case 'gravitaire':
            nomIcon = 'title="Filtration gravitaire" src="images/ILLUSTRATIONS/29-Filtration granulaire gravitaire.jpg"';
            break;
        case 'granulaire':
            nomIcon = 'title="Filtration granulaire sous pression" src="images/ILLUSTRATIONS/30-Filtration granulaire sous pression.jpg"';
            break;
        case 'sable':
            nomIcon = 'title="Filtration sur sable vert" src="images/ILLUSTRATIONS/31-Filtration sur sable vert-media specialise.jpg"';
            break;
        case 'membranaire':
            nomIcon = 'title="Filtration membranaire" src="images/ILLUSTRATIONS/32-Filtration membranaire.jpg"';
            break;
        case 'cartouches':
            nomIcon = 'title="Filtration à cartouches et autres" src="images/ILLUSTRATIONS/33-Filtration a cartouche ou autre filtration.jpg"';
            break;
        case 'ozonation':
            nomIcon = 'title="Ozonation" src="images/ILLUSTRATIONS/34-Ozonation.jpg"';
            break;
        case 'uv':
            nomIcon = 'title="Désinfection UV" src="images/ILLUSTRATIONS/35-Desinfection aux UV.jpg"';
            break;
        case 'potable':
            nomIcon = 'title="Réservoir d\'eau potable" src="images/ILLUSTRATIONS/36-Reservoir eau potable.jpg"';
            break;
        case 'solide':
            nomIcon = 'title="Dosage de produit solide" src="images/ILLUSTRATIONS/D1-Dosage produit solide.jpg"';
            break;
        case 'liquide':
            nomIcon = 'title="Dosage de produit liquide" src="images/ILLUSTRATIONS/D2-Dosage produit liquide.jpg"';
            break;
        case 'gazeux':
            nomIcon = 'title="Dosage de produit gazeux" src="images/ILLUSTRATIONS/D3-Dosage produit gazeux.jpg"';
            break;
        case 'gazeuxHydroejecteur':
            nomIcon = 'title="Hydroéjecteur" src="images/ILLUSTRATIONS/D3-Dosage produit gazeux (hydroejecteur).jpg"';
            break;
        case 'gazeuxDiffuseur':
            nomIcon = 'title="Diffuseur poreux" src="images/ILLUSTRATIONS/D3-Dosage produit gazeux (diffuseur poreux).jpg"';
            break;
        case 'gazeuxReacteur':
            nomIcon = 'title="Réacteur" src="images/ILLUSTRATIONS/D3-Dosage produit gazeux (reacteur).jpg"';
            break;
        case 'diffLiquide':
            nomIcon = 'title="Diffuseurs de liquides" src="images/ILLUSTRATIONS/D4-Diffuseurs de liquides.jpg"';
            break;
        case 'piston':
            nomIcon = 'title="Pompe à piston" src="images/ILLUSTRATIONS/P1-Pompe a piston.jpg"';
            break;
        case 'peristaltique':
            nomIcon = 'title="Pompe péristaltique" src="images/ILLUSTRATIONS/P2-Pompe peristaltique.jpg"';
            break;
        case 'diaphragme':
            nomIcon = 'title="Pompe doseuse à diaphragme" src="images/ILLUSTRATIONS/P3-Pompe a diaphragme.jpg"';
            break;
        case 'debut':
            nomIcon = 'title="Eau brute" src="images/ILLUSTRATIONS/0-texte eau brute.jpg"';
            break;
        case 'fin':
            nomIcon = 'title="Eau potable" src="images/ILLUSTRATIONS/X-texte eau potable.jpg"';
            break;
    }
    return nomIcon;
}

app.post('/getLienFiche', function userIdHandler(req, res) {
    //console.log(req.body.nom);
    var varPresentation = presentation.getVar(req.body.index);
    var html = getLien(req.body.nom, varPresentation);
    //console.log(JSON.stringify(jsonEx));
    res.type('html');
    res.send(html);
});

function getLien(nom, varPresentation){
    var html = '<h2>Lien(s) externe(s)</h2>';
    html = html + getAutreLien(nom);
    for(i = 0; i < varPresentation.varProcedes.length; i++){
        if(varPresentation.varProcedes[i].varItem == nom){
            for(j = 0; j < varPresentation.varProcedes[i].varLink.length; j++) {
                var lien = varPresentation.varProcedes[i].varLink[j];
                html = html + '<p><a href="'+ lien +'" target="_blank">' + lien + '</a></p>';
            }
        }
    }
    return html;
}

function getAutreLien(nom){
    var returnHtml = '';
    switch (nom){
        case 'libre':

            break;
        case 'enfouie':

            break;
        case 'tubulaire':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=SDdOF-81vow&feature=youtu.be&t=30s" target="_blank">' + "(Vidéo) Opérations de forage d'un puits (camion de forage)" + '</a></p>';
            returnHtml += '<p><a href="http://www.technologystudent.com/images6/watwh1.gif" target="_blank">' + "http://www.technologystudent.com/images6/watwh1.gif" + '</a></p>';
            break;
        case 'surface':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=IzMhPza_QVs" target="_blank">' + "(Vidéo) Installation de sections de tuyaux en béton dans un puits." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=ySLO8k4iVeQ" target="_blank">' + "(vidéo) Construction d'un puits de surface." + '</a></p>';
            break;
        case 'captage':
            break;
        case 'artesien':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=CWb6S1s6bW0" target="_blank">' + "(Vidéo) Puits artésien débordant et dérivation de l'eau pour bétonnage autour du tuyau." + '</a></p>';
            break;
        case 'microtamis':
            break;
        case 'manuelle':
            break;
        case 'mecanique':
            break;
        case 'basse':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=5v8rj3Pyvds" target="_blank">' + "Animation montrant l'assemblage d'une pompe (vue intérieure) incluant l'impulseur." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=CMnGk0Y2ssQ" target="_blank">' + "Cette animation présente l'assemblage d'une pompe verticale à plusieurs impulseurs, son installation sur un bassin et son fonctionnement." + '</a></p>';
            break;
        case 'basseCentrifuge':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=BaEHVpKc-1Q" target="_blank">' + "Animation montrant le fonctionnement d'une pompe (vue intérieure)." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=iygacPUfuRA&spfreload=10" target="_blank">' + "Cette animation présente sommairement l'assemblage d'une pompe centrifuge et son fonctionnement." + '</a></p>';
            break;
        case 'haute':
            break;
        case 'integre':
            break;
        case 'gravite':
            break;
        case 'oxydation':
            break;
        case 'adsorption':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=5JQi2Ii4p_U" target="_blank">' + "(Vidéo) Explications sur le principe de l'adsorption. La seconde partie présente une démonstration avec la fumée de cigarette." + '</a></p>';
            break;
        case 'coagulation':
            break;
        case 'aideCoagulation':
            break;
        case 'chlores':
            break;
        case 'adoucissement':
            break;
        case 'correction':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=nUnEuaVHMY8 " target="_blank">' + "(Vidéo) Préparation d'une échelle de teintes comme indicateurs de pH dans un laboratoire." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=vcwzRXY2kVM" target="_blank">' + "(Vidéo) Mesure du pH avec un pH­mètre dans un laboratoire." + '</a></p>';
            break;
        case 'alcalinite':
            break;
        case 'corrosion':
            break;
        case 'ions':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=ryhwTTcYdns" target="_blank">' + "Animation montrant le processus d'adoucissement de l'eau par échange d'ions." + '</a></p>';
            break;
        case 'statique':
            break;
        case 'boue':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=UNhygQov69Q" target="_blank">' + "Animation montrant le fonctionnement d'un clarificateur à voile de boue du type «SUPERPULSATOR» (vue intérieure)." + '</a></p>';
            break;
        case 'lestes':
            returnHtml = '<p><a href="http://www.traitement-eau-annet.veoliaenvironnement.com/technologies/decantation.aspx" target="_blank">' + "Animation montrant la comparaison du temps de décantation avec et sans l'ajout de microsable." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=bzjZxHyss30" target="_blank">' + "Animation montrant le fonctionnement d'un décanteur à flocs lestés de microsable du type «ACTIFLO» (vue intérieure)." + '</a></p>';
            break;
        case 'dissous':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=8Vob29pmVbU&index=32&list=PLFJiZG4CIc94K3cns6q9FolPPv2xV6jsR" target="_blank">' + "(Vidéo) Démonstration de l'effet de l'air dissous sur la flotation des particules dans un cylindre gradué." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=0neTyDvk-ek" target="_blank">' + "Animation montrant en vue agrandie l'effet de l'air dissous dans un clarificateur." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=2E5c8j0whgE" target="_blank">' + "Animation montrant le fonctionnement d'un clarificateur à air dissous du type «AquaDAF» (vue intérieure)." + '</a></p>';
            break;
        case 'gravitaire':
            break;
        case 'granulaire':
            break;
        case 'sable':
            break;
        case 'membranaire':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=MEfFq_SJ0Pk" target="_blank">' + "Animation montrant le processus de filtration membranaire avec membrane tubulaire (vue intérieure)." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=HLj0nXEWUs0" target="_blank">' + "Animation montrant le processus de dessalement de l'eau de mer par osmose inverse." + '</a></p>';
            break;
        case 'cartouches':
            break;
        case 'ozonation':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=UzjMyIdYbA0" target="_blank">' + "Animation montrant par des schémas animés les principes de l'ozonation." + '</a></p>';
            break;
        case 'uv':
            break;
        case 'potable':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=xID­zx3FCq8" target="_blank">' + "Animation montrant la construction d'une réserve d'eau en béton." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=Ah4SFoYVdeA" target="_blank">' + "Animation montrant la construction d'une réserve d'eau en acier." + '</a></p>';
            break;
        case 'solide':
            break;
        case 'liquide':
            break;
        case 'gazeuxHydroejecteur':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=A-nzHE1gK34" target="_blank">' + "Animation montrant le fonctionnement d'un type d'hydroéjecteur." + '</a></p>';
            break;
        case 'diffLiquide':
            break;
        case 'piston':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=tsErCmZPWsw&list=PLDA9711043B5A31C" target="_blank">' + "Animation montrant le fonctionnement d'un type de pompe à piston sans clapets." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=9YI9xEQMoG0" target="_blank">' + "Cette animation présente clairement la différence entre une pompe à piston et une à diaphragme." + '</a></p>';
            break;
        case 'peristaltique':
            returnHtml = '<p><a href="http://upload.wikimedia.org/wikipedia/commons/e/e1/Peristaltic_pump_LAMBDA_PRECIFLOW_-_pumping_mechanism.gif" target="_blank">'
            + "(Vidéo) Fonctionnement d'une pompe péristaltique à 3 galets." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=YxMdbPcAXcQ" target="_blank">' + "Animation montrant l'assemblage et le fonctionnement d'une pompe péristaltique à 2 galets." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=nK9p8bEaPxM&index=6&list=PLDA9711043B5A31C2" target="_blank">' + "La première partie de cette courte animation montre le fonctionnement d'une pompe péristaltique à 3 galets." + '</a></p>';
            break;
        case 'diaphragme':
            returnHtml = '<p><a href="https://www.youtube.com/watch?v=Rpyu0LVXVRw " target="_blank">' + "Courte animation montrant le principe de base du pompage pour toutes ces pompes." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=Qrh01utI90A&feature=youtu.be&t=1m22s" target="_blank">' + "Animation montrant le principe de fonctionnement de ces pompes mues par un moteur (vue intérieure)." + '</a></p>';
            returnHtml += '<p><a href="https://www.youtube.com/watch?v=9YI9xEQMoG0" target="_blank">' + "Cette animation présente clairement la différence entre une pompe à piston et une à diaphragme." + '</a></p>';
            break;
    }
    return returnHtml;
}

app.post('/getButtonUnlock', function userIdHandler(req, res) {
    //console.log(req.body.nom);
    var varPresentation = presentation.getVar(req.body.index);
    //console.log(varPresentation);

    var jsonEx = getButtonUnlock(req.body.nom, varPresentation);
    //console.log(JSON.stringify(jsonEx));
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
});

function getButtonUnlock(nom, varPresentation){
    var procDescription = 'oui';
    var procPhoto = 'oui';
    var procLien = 'non';
    var procDosage = 'non';

    if((nom == 'debut') || (nom == 'fin')){
        procDescription = 'non';
        procPhoto = 'non';
    }

    for(i = 0; i < varPresentation.varProcedes.length; i++){
        if((varPresentation.varProcedes[i].varItem == nom) && (varPresentation.varProcedes[i].varLink.length > 0)){
            procLien = 'oui';
        }
    }

    switch (nom) {
        case 'libre':
            break;
        case 'enfouie':
            break;
        case 'tubulaire':
            procLien = 'oui';
            break;
        case 'surface':
            procLien = 'oui';
            break;
        case 'captage':
            break;
        case 'artesien':
            procLien = 'oui';
            break;
        case 'microtamis':
            break;
        case 'manuelle':
            break;
        case 'mecanique':
            break;
        case 'basse':
            procLien = 'oui';
            break;
        case 'basseCentrifuge':
            procLien = 'oui';
            break;
        case 'haute':
            break;
        case 'integre':
            break;
        case 'gravite':
            break;
        case 'oxydation':
            procDosage = 'oui';
            break;
        case 'adsorption':
            procDosage = 'oui';
            break;
        case 'coagulation':
            procDosage = 'oui';
            break;
        case 'aideCoagulation':
            procDosage = 'oui';
            break;
        case 'chlores':
            procDosage = 'oui';
            break;
        case 'adoucissement':
            procDosage = 'oui';
            break;
        case 'correction':
            procLien = 'oui';
            procDosage = 'oui';
            break;
        case 'alcalinite':
            procDosage = 'oui';
            break;
        case 'corrosion':
            procDosage = 'oui';
            break;
        case 'ions':
            break;
        case 'statique':
            break;
        case 'boue':
            procLien = 'oui';
            break;
        case 'lestes':
            procLien = 'oui';
            break;
        case 'dissous':
            procLien = 'oui';
            break;
        case 'gravitaire':
            break;
        case 'granulaire':
            break;
        case 'sable':
            break;
        case 'membranaire':
            break;
        case 'cartouches':
            break;
        case 'ozonation':
            procDosage = 'oui';
            procLien = 'oui';
            break;
        case 'uv':
            break;
        case 'potable':
            break;
        case 'solide':
            break;
        case 'liquide':
            break;
        case 'gazeux':
            break;
        case 'gazeuxHydroejecteur':
            procLien = 'oui';
            break;
        case 'diffLiquide':
            break;
        case 'piston':
            procLien = 'oui';
            break;
        case 'peristaltique':
            procLien = 'oui';
            break;
        case 'diaphragme':
            procLien = 'oui';
            break;
    }

    return '{"description" : "'+ procDescription +'", "photo" : "'+ procPhoto +'", "lien" : "'+ procLien +'", "dosage" : "'+ procDosage +'"}';
}

app.post('/getExplication', function userIdHandler(req, res) {
    //console.log(getExplication.getExplication(req.body.iconselect));
    res.type('html');
    res.send(getExplication.getExplication(req.body.iconselect));
});

app.post('/getExplicationPlus', function userIdHandler(req, res) {
    //console.log(getExplication.getExplication(req.body.iconselect));
    res.type('html');
    res.send(getExplication.getExplicationPlus(req.body.iconselect));
});

app.post('/presentationsExistantes', function(req, res) {
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        var fichiers = ls.listeFichiersHTML(varPresentation.varUtilisateur, req.body.index);
        //console.log(varPresentation.varUtilisateur);
        res.render('presentationsExistantes', {title: 'Liste des présentations', blockFichiers: fichiers});
    }
});

app.post('/dosage', function(req, res) {
    //console.log(req.body);
   // var fichiers = ls.listeFichiersHTML(varPresentation.varUtilisateur);
    //console.log(varPresentation.varUtilisateur);
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        res.render('dosage', {title: 'Dosage', valeurIndex: req.body.index});
    }
});

app.post('/presentationIntro', function(req, res) {
    var utilisateur = req.body.utilisateur;
    var varPresentation = presentation.getVar(req.body.index);
    var path;
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        if(utilisateur == 'admin'){
            path = 'files/' + utilisateur + '/' + req.body.fichier + '.xml';
        }else {
            path = 'files/' + varPresentation.varUtilisateur + '/' + req.body.fichier + '.xml';
        }
        var data = fs.readFileSync(path);

        parser.parseString(data, function (err, result) {
            //console.log(result);
            varPresentation = InitVar(result, varPresentation.varUtilisateur);
            varPresentation.varDateAcces = getDateDuJour();
            //console.dir(result.presentation.procedes[0].procede.length);
            //console.dir(result);
            saveFile(varPresentation,'','non');
            presentation.setVar(varPresentation, req.body.index, req.ip);
            res.render('presentationIntro', {
                title: 'Introduction de la station',
                valeurIndex: req.body.index,
                nomAnim: varPresentation.varNomAnimateur
            });
        });
    }
    //var fichiers = ls.listeFichiersHTML(varPresentation.varUtilisateur);
    //console.log(varPresentation);
});

app.post('/getFichier', function(req, res) {

    var varPresentation = presentation.getVar(req.body.index);
    var path
    if(req.body.fichier != 'utilisateurs') {
        path = 'files/' + req.body.utilisateur + '/' + req.body.fichier + '.xml';
    }else{
        path = 'files/utilisateurs.xml';
    }
    var data = fs.readFileSync(path);

    res.type('xml');
    res.send(data);
});

app.post('/gererUtilisateur', function(req, res) {

    if(presentation.getVar(req.body.index).varUtilisateur == 'admin'){
        var utilisateurs = listeUtilisateur();
        res.render('gestionUtilisateur', {title: 'Gestion des utilisateurs', blockUtilisateur: utilisateurs});
    }

});

app.post('/supprimerUtilisateur', function(req, res) {
    //console.log(req.body);
    var utilisateur = req.body.user.toLowerCase();
    gUtilisateurs.supprimerUtilisateur(utilisateur);
    res.type('html');
    res.send(listeUtilisateur());
});

function listeUtilisateur(){
    var data = fs.readFileSync('files/utilisateurs.xml');
    var s = '';
    parser.parseString(data, function (err, result) {

        s = '<table width="700" align="center">';
        s = s + '<tr><td>Nom d\'utilisateur</td><td>Mot de passe</td><td>Courriel</td><td>Action</td></tr>';
        for(var i = 0; i < result.utilisateurs.utilisateur.length; i++){
            s = s + '<tr><td>'+ result.utilisateurs.utilisateur[i].nom +'</td><td>'+ result.utilisateurs.utilisateur[i].mdp +'</td><td>'+
            result.utilisateurs.utilisateur[i].courriel +'</td><td><button onclick="supprimerUtilisateur(event)" name="'+ result.utilisateurs.utilisateur[i].nom +'">Supprimer</button></td></tr>';
        }
        s = s + '</table>';
        console.log(s);
    });
    return s;
}

app.post('/resumeFichier', function(req, res) {

    var varPresentation = presentation.getVar(req.body.index);
    var path = 'files/' + req.body.utilisateur + '/' + req.body.fichier + '.xml';
    var data = fs.readFileSync(path);
    var derniereModif = 'Aucune modification';
    var dernierAcces = 'Aucun accès';


    parser.parseString(data, function (err, result) {
        varPresentation = InitVar(result, varPresentation.varUtilisateur);
        if(varPresentation.varDateModif != ''){
            derniereModif = varPresentation.varDateModif;
        }

        if(varPresentation.varDateAcces != ''){
            dernierAcces = varPresentation.varDateAcces;
        }
        var innerDiv = 'Ordre des procédés : <br>';
        for(var i = 0; i < varPresentation.varOrdrePresentation.length - 1; i++){
            innerDiv += getProcedeName(varPresentation.varOrdrePresentation[i]) + ' <img src="images/arrow.png" height="10px"> ';
        }
        innerDiv += getProcedeName(varPresentation.varOrdrePresentation[varPresentation.varOrdrePresentation.length - 1]) + '<br><br>';
        innerDiv += 'Date de création du fichier : ' + varPresentation.varDateCreation + '<br>';
        innerDiv += 'Date de la dernière modification du fichier : ' + derniereModif + '<br>';
        innerDiv += 'Date du dernier accès au fichier : ' + dernierAcces;
            res.type('html');
        res.send(innerDiv);
    });
});

function getProcedeName(nomProcede){
    var nomProcede;
    switch (nomProcede) {
        case 'libre':
            nomProcede = "Prise d\'eau en eau libre";
            break;
        case 'enfouie':
            nomProcede = "Prise d\'eau de surface enfouie";
            break;
        case 'berge':
            nomProcede = "Prise d\'eau de surface en berge";
            break;
        case 'tubulaire':
            nomProcede = "Puits tubulaire foré";
            break;
        case 'surface':
            nomProcede = "Puits de surface et pointe filtrante";
            break;
        case 'captage':
            nomProcede = "Captage d\'une source";
            break;
        case 'artesien':
            nomProcede = "Puits artésien";
            break;
        case 'microtamis':
            nomProcede = "Microtamisage";
            break;
        case 'manuelle':
            nomProcede = "Dégrillage à nettoyage manuel";
            break;
        case 'mecanique':
            nomProcede = "Dégrillage à nettoyage mécanique";
            break;
        case 'basse':
            nomProcede = "Pompage basse pression";
            break;
        case 'basseCentrifuge':
            nomProcede = "Pompage basse pression";
            break;
        case 'haute':
            nomProcede = "Pompage haute pression";
            break;
        case 'integre':
            nomProcede = "Pompage intégré (captage et distribution)";
            break;
        case 'gravite':
            nomProcede = "Alimentation par gravité";
            break;
        case 'oxydation':
            nomProcede = "Oxydation";
            break;
        case 'adsorption':
            nomProcede = "Adsorption";
            break;
        case 'coagulation':
            nomProcede = "Coagulation";
            break;
        case 'aideCoagulation':
            nomProcede = "Aide à la coagulation";
            break;
        case 'chlores':
            nomProcede = "Désinfection à base de produits chlorés";
            break;
        case 'adoucissement':
            nomProcede = "Adoucissement";
            break;
        case 'correction':
            nomProcede = "Correction du pH";
            break;
        case 'alcalinite':
            nomProcede = "Correction de l\'alcalinité";
            break;
        case 'corrosion':
            nomProcede = "Contrôle de la corrosion";
            break;
        case 'ions':
            nomProcede = "Échanges d\'ions";
            break;
        case 'statique':
            nomProcede = "Décantation statique-dynamique";
            break;
        case 'boue':
            nomProcede = "Décantation à voile de boue";
            break;
        case 'lestes':
            nomProcede = "Décantation a flocs lestées";
            break;
        case 'dissous':
            nomProcede = "Flottation à air dissous";
            break;
        case 'gravitaire':
            nomProcede = "Filtration gravitaire";
            break;
        case 'granulaire':
            nomProcede = "Filtration granulaire sous pression";
            break;
        case 'sable':
            nomProcede = "Filtration sur sable vert";
            break;
        case 'membranaire':
            nomProcede = "Filtration membranaire";
            break;
        case 'cartouches':
            nomProcede = "Filtration à cartouches et autres";
            break;
        case 'ozonation':
            nomProcede = "Ozonation";
            break;
        case 'uv':
            nomProcede = "Désinfection UV";
            break;
        case 'potable':
            nomProcede = "Réservoir d\'eau potable";
            break;
        case 'solide':
            nomProcede = "Dosage de produit solide";
            break;
        case 'liquide':
            nomProcede = "Dosage de produit liquide";
            break;
        case 'gazeux':
            nomProcede = "Dosage de produit gazeux";
            break;
        case 'diffLiquide':
            nomProcede = "Diffuseurs de liquides";
            break;
        case 'piston':
            nomProcede = "Pompe à piston";
            break;
        case 'peristaltique':
            nomProcede = "Pompe péristaltique";
            break;
        case 'diaphragme':
            nomProcede = "Pompe doseuse à diaphragme";
            break;
        case 'debut':
            nomProcede = "Eau brute";
            break;
        case 'fin':
            nomProcede = "Eau potable";
            break;
    }
    return nomProcede;
}

app.post('/presentationCarte', function(req, res) {
    var adresseStation = '';
    var vRue = '';
    var vVille = '';
    var vSource = '';
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        //console.log(varPresentation.varMapsLink.maplink[0]);
        if ((varPresentation.varMapsLink.length > 0) && (varPresentation.varMapsLink[0] != '') && (varPresentation.varMapsLink[1] != '')) {
            vRue = varPresentation.varMapsLink[0];
            vVille = varPresentation.varMapsLink[1];
            /*adresseStation = 'https://www.google.com/maps/'
             + 'embed/v1/directions?key=AIzaSyBhsBgquaG4-ADF9x6C-wuudin8cycfwcQ&origin=' + varPresentation.varMapsLink.maplink[1] +
             '&destination=' + varPresentation.varMapsLink.maplink[0] + ',' + varPresentation.varMapsLink.maplink[1];*/
            adresseStation = 'https://www.google.com/maps/'
            + 'embed/v1/place?key=AIzaSyBhsBgquaG4-ADF9x6C-wuudin8cycfwcQ&q=' + vRue + ',' + vVille +
            '&q=' + vVille;
        } else {
            adresseStation = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBhsBgquaG4-ADF9x6C-wuudin8cycfwcQ' +
            '&q=quebec canada'
        }
        switch (varPresentation.varProvenance) {
            case 'riviere':
                vSource = "imagesSource/Source_eau-riviere.jpg";
                break;
            case 'fleuve':
                vSource = "imagesSource/Source_eau-fleuve.jpg";
                break;
            case 'lac':
                vSource = "imagesSource/Source_eau-lac.jpg";
                break;
            case 'souterrain':
                vSource = "imagesSource/Source_eau-souterraine.jpg";
                break;
        }
        //console.log(varPresentation.varMapsLink);
        res.render('presentationCarte', {
            title: 'Emplacement de la Station',
            valeurIndex: req.body.index,
            image: vSource,
            adresse: adresseStation,
            source: varPresentation.varNomPlanDEau,
            nomStation: varPresentation.varNomStation,
            rue: vRue,
            ville: vVille
        });
    }
});

app.post('/majCarte', function(req, res) {
    //console.log(req.body);
    var adresseStation = '';
    var vRue = '';
    var vVille = '';
    var vSource = '';
    var varPresentation = presentation.getVar(req.body.index);
    //console.log(varPresentation.varMapsLink.maplink[0]);
    if((varPresentation.varMapsLink.length > 0) && (varPresentation.varMapsLink[0] != '') && (varPresentation.varMapsLink[1] != '')) {
        vRue = varPresentation.varMapsLink[0];
        vVille = varPresentation.varMapsLink[1];
        adresseStation = 'https://www.google.com/maps/'
         + 'embed/v1/directions?key=AIzaSyBhsBgquaG4-ADF9x6C-wuudin8cycfwcQ&origin=' + req.body.lieu.rue + ',' + req.body.lieu.ville +
         '&destination=' + vRue + ',' + vVille;
    } else {
        if(req.body.lieu.rue != ''){
            adresseStation = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBhsBgquaG4-ADF9x6C-wuudin8cycfwcQ' +
            '&q='+ req.body.lieu.rue + ',' + req.body.lieu.ville;
        }else{
            adresseStation = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBhsBgquaG4-ADF9x6C-wuudin8cycfwcQ' +
            '&q=quebec canada';
        }
    }
    res.type('html');
    res.send(adresseStation);
});

app.post('/presentationProduction', function(req, res) {

    var user;
    var nomPresentation;
    var photoStation;
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        /*if(varPresentation.varMapsLink.maplink){
         vVille = varPresentation.varMapsLink.maplink[1]
         }*/
        if (varPresentation.varNomImage == '') {
            photoStation = 'imagesStation/Station Ste-Rose.jpg';
        } else {
            photoStation = cloudinary.url(varPresentation.varNomImage);
        }

        if ((varPresentation.varUtilisateur) && (varPresentation.varUtilisateur != '') && (varPresentation.varUtilisateur != 'aucune')) {
            user = varPresentation.varUtilisateur;
        } else {
            user = 'default';
        }
        if ((varPresentation.varNomStation) && (varPresentation.varNomStation != '') && (varPresentation.varNomStation != 'aucune')) {
            nomPresentation = varPresentation.varNomStation;
        } else {
            nomPresentation = 'default';
        }

        //console.log(varPresentation.varNomImage);

        res.render('presentationProduction', {
            title: 'Production de la station',
            valeurIndex: req.body.index,
            ville: varPresentation.varNomStation,
            villesFournies: varPresentation.varVilles,
            capacite: varPresentation.varCapacite,
            population: varPresentation.varPopulation,
            imageStation: photoStation
        });
    }
});

app.post('/presentationCaracteristiques', function(req, res) {

    //var caracArr = changeCarac();
    var user;
    var nomPresentation;
    var vVille = '';
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        /*if(varPresentation.varMapsLink.maplink){
         vVille = varPresentation.varMapsLink.maplink[1]
         }*/
        if (varPresentation.varNomImage == '') {
            varPresentation.varNomImage = 'Station Ste-Rose.jpg';
        }

        if ((varPresentation.varUtilisateur) && (varPresentation.varUtilisateur != '') && (varPresentation.varUtilisateur != 'aucune')) {
            user = varPresentation.varUtilisateur;
        } else {
            user = 'default';
        }
        if ((varPresentation.varNomStation) && (varPresentation.varNomStation != '') && (varPresentation.varNomStation != 'aucune')) {
            nomPresentation = varPresentation.varNomStation;
        } else {
            nomPresentation = 'default';
        }

        //console.log(varPresentation.varNomImage);

        res.render('presentationCaracteristiques', {
            title: 'Caractéristiques de la station',
            valeurIndex: req.body.index,
            source: varPresentation.varNomPlanDEau,
            caracteristiques: changeCarac(varPresentation)
        });
    }
});

function changeCarac(varPresentation){
    var caracStr = '<br><ul>';
    if(varPresentation.varParticularite.length == 0){
        caracStr += '<li>elle n\'a pas de caractéristiques particulières</li><br>';
    }else {
        for (var i = 0; i < varPresentation.varParticularite.length; i++) {
            switch (varPresentation.varParticularite[i]) {
                case 'turbidite':
                    caracStr += '<li>Sa turbidité est élevée.</li><br>';
                    break;
                case 'gout':
                    caracStr += '<li>Elle contient des substances qui créent des goûts et des odeurs.</li><br>';
                    break;
                case 'couleur':
                    caracStr += '<li>Elle contient des substances qui colorent l\'eau.</li><br>';
                    break;
                case 'algues':
                    caracStr += '<li>Elle contient des algues microscopiques.</li><br>';
                    break;
                case 'durete':
                    caracStr += '<li>Sa dureté est élevée.</li><br>';
                    break;
                case 'bacteries':
                    caracStr += '<li>Elle contient des virus ou des bactéries.</li><br>';
                    break;
                case 'fer':
                    caracStr += '<li>Son contenu en fer ou en manganèse est élevé.</li><br>';
                    break;
                case 'matieres':
                    caracStr += '<li>Son contenu en matières organiques est élevé.</li><br>';
                    break;
                default:
                    caracStr += '<li>Elle n\'a pas de caractéristiques particulières.</li><br>';
                    break;
            }
        }
    }
    return caracStr + '</ul><br>';
}

/*function changeCarac(){
    var caracArray = [['Non','Non','Non','Non','Non','Non','Non','Non'],
        ['labelNon','labelNon','labelNon','labelNon','labelNon','labelNon','labelNon','labelNon']];
    for (var i = 0; i < varPresentation.varParticularite.length; i++){
        switch (varPresentation.varParticularite[i]) {
            case 'turbidite':
                caracArray[0][0] = 'Oui';
                caracArray[1][0] = 'labelOui';
                break;
            case 'gout':
                caracArray[0][1] = 'Oui';
                caracArray[1][1] = 'labelOui';
                break;
            case 'couleur':
                caracArray[0][2] = 'Oui';
                caracArray[1][2] = 'labelOui';
                break;
            case 'algues':
                caracArray[0][3] = 'Oui';
                caracArray[1][3] = 'labelOui';
                break;
            case 'durete':
                caracArray[0][4] = 'Oui';
                caracArray[1][4] = 'labelOui';
                break;
            case 'bacteries':
                caracArray[0][5] = 'Oui';
                caracArray[1][5] = 'labelOui';
                break;
            case 'fer':
                caracArray[0][6] = 'Oui';
                caracArray[1][6] = 'labelOui';
                break;
            case 'matieres':
                caracArray[0][7] = 'Oui';
                caracArray[1][7] = 'labelOui';
                break;
        }
    }
    return caracArray;
}*/

app.post('/presentationProcedes',function(req, res){
    var varPresentation = presentation.getVar(req.body.index);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        res.render('presentationProcedes', {
            title: 'Présentation des procédés',
            valeurIndex: req.body.index,
            blockRevision: generateHTMLNavIntro(varPresentation)
        });
    }
    //console.log(varPresentation);
});

app.post('/info', function(req, res) {
    //initVarPresentationCmp();
    //console.log(req.body);
    var indice = req.body.index;
    var varPresentation = presentation.getVar(indice);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        var vRue = '';
        var vVille = '';


        presentation.resetVar(indice, req.ip);

        if (req.body.action == 'Modifier') {
            var path = 'files/' + req.body.utilisateur + '/' + req.body.fichier + '.xml';
            var data = fs.readFileSync(path);
            //varPresentation.varUtilisateur = req.body.utilisateur;
            parser.parseString(data, function (err, result) {
                varPresentation = InitVar(result, varPresentation.varUtilisateur);
                varPresentation.varEtat = "modifie";
                presentation.setVar(varPresentation, indice, req.ip);
                //console.dir(result.presentation.procedes[0].procede.length);
                //console.dir(result);
            });
            if (varPresentation.varMapsLink.length > 0) {
                vRue = varPresentation.varMapsLink[0];
                vVille = varPresentation.varMapsLink[1];
            }
        }
        //console.log(indice);
        res.render('info', {
            title: 'Informations',
            valeurIndex: indice,
            nomAnim: varPresentation.varNomAnimateur,
            nomStation: varPresentation.varNomStation,
            numeroRueAdd: vRue,
            villeAdd: vVille,
            capacite: varPresentation.varCapacite,
            villes: varPresentation.varVilles,
            population: varPresentation.varPopulation
        });
    }
});

function InitVar(result, utilisateur){
    var item = {
        varItem: '', varImg: [], varLink: []
    };
    //console.log(result);
    var varPresentation = {
        varUtilisateur: '',
        varNomAnimateur: '',
        varNomStation: '',
        varCapacite: '',
        varVilles: '',
        varPopulation: '',
        varProvenance: '',
        varNomPlanDEau: '',
        varParticularite: [],
        varProcedes: [],
        varMapsLink: [],
        varOrdrePresentation: [],
        varNomImage: '',
        varDateCreation: '',
        varDateModif: '',
        varDateAcces: '',
        varEtat: ''
    };
    varPresentation.varUtilisateur = utilisateur;
    varPresentation.varNomAnimateur = result.presentation.nomanimateur[0];
    varPresentation.varNomStation = result.presentation.nomstation[0];
    varPresentation.varCapacite = result.presentation.capacite[0];
    varPresentation.varVilles = result.presentation.villes[0];
    varPresentation.varPopulation = result.presentation.population[0];
    varPresentation.varProvenance = result.presentation.provenance[0];
    varPresentation.varNomPlanDEau = result.presentation.nomplandeau[0];
    varPresentation.varParticularite = [];
    //console.log();
    if(result.presentation.particularites[0].length != 0) {
        for(i = 0; i < result.presentation.particularites[0].particularite.length; i++) {
            varPresentation.varParticularite.push(result.presentation.particularites[0].particularite[i]);
        }
    }
    varPresentation.varProcedes = [];
    if(result.presentation.procedes[0].length != 0) {
        for (i = 0; i < result.presentation.procedes[0].procede.length; i++) {
            item.varItem = result.presentation.procedes[0].procede[i].nom[0];
            if (result.presentation.procedes[0].procede[i].lien) {
                for (j = 0; j < result.presentation.procedes[0].procede[i].lien.length; j++) {
                    item.varLink.push(result.presentation.procedes[0].procede[i].lien[j]);
                }
            }
            varPresentation.varProcedes.push(item);
            item = {
                varItem: '', varImg: [], varLink: []
            };
            //varPresentation.varParticularite.push(result.presentation.particularites[0].particularite[i]);
        }
    }
    if (result.presentation.maplinks[0].maplink.length != 0) {
        for (i = 0; i < result.presentation.maplinks[0].maplink.length; i++) {
            varPresentation.varMapsLink.push(result.presentation.maplinks[0].maplink[i]);
        }
    }

    varPresentation.varOrdrePresentation = [];
    if(result.presentation.ordrepresentation[0].fiche) {
        for (i = 0; i < result.presentation.ordrepresentation[0].fiche.length; i++) {
            varPresentation.varOrdrePresentation.push(result.presentation.ordrepresentation[0].fiche[i]);
        }
    }
    varPresentation.varNomImage = result.presentation.nomimage[0];
    varPresentation.varDateCreation = result.presentation.datecreation[0];
    varPresentation.varDateModif = result.presentation.datemodif[0];
    varPresentation.varDateAcces = result.presentation.dateacces[0];
    varPresentation.varEtat = result.presentation.etat[0];
   //console.dir(varPresentation);
    return varPresentation;
}

/*app.post('/insertionMaps', function(req, res) {
    varPresentation.varMapsLink = [];
    //console.log(req.body.lien[0].adr);
    varPresentation.varMapsLink.push(req.body.lien[0].adr);
    varPresentation.varMapsLink.push(req.body.lien[0].ville);
    //console.log(req.body.lien);
    var jsonEx = '{ "result" : "OK"}';
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
});*/

app.post('/imageList', function(req, res) {
    var listeFichiers = fs.readdirSync('./public/pictures/' + req.body.fiche.iconselect);
    var ListeFichiersHTML = '<p id="pDivSel"><h3>Images pour le procédé : '+req.body.fiche.procede.toLowerCase()+'</h3></p>';
    var classImage = 'imageNotSelect';

    //console.log(req.body.fiche);
    for (i=1; i <= listeFichiers.length; i++){
        ListeFichiersHTML = ListeFichiersHTML + '<img name="imagesProcedes' +
        '" id="'+listeFichiers[i-1]+
        '" src="pictures/'+req.body.fiche.iconselect+'/'+listeFichiers[i-1]+ '" class="'+classImage+'" onclick="imageOriginal(event)">';
    }
    ListeFichiersHTML = ListeFichiersHTML + '<br>(Vous pouvez agrandir l\'image en cliquant dessus)';
    //console.log(varPresentation);
    res.type('html');
    res.send(ListeFichiersHTML);
});

/*app.post('/insertionImages', function(req, res) {

    for(i = 0; i < varPresentation.varProcedes.length; i++){
        if(varPresentation.varProcedes[i].varItem == req.body.procAss) {
            varPresentation.varProcedes[i].varImg = [];
            for (j = 0; j < req.body.imagesProc.length; j++) {
                if(req.body.imagesProc[j].select == 'imageSelect'){
                    varPresentation.varProcedes[i].varImg.push(req.body.imagesProc[j].imageProc);
                }

            }
        }
    }
    var jsonEx = '{ "result" : "OK"}';
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
    //console.log(varPresentation.varProcedes);
});*/

app.post('/uploadimage', function(req, res) {
    //console.log(req.files);
    if(done==true){
        //console.log(req.body);
        res.end("File uploaded.");
    }
});

/*app.post('/linkList', function(req, res) {
    var ListeFichiersHTML = '<p id="pDivSel">Ajoux de liens pour le procédé '+req.body.iconselect+'</p>';
    //var classImage = 'imageNotSelect';

    //console.log(varPresentation);

    for (j = 0; j < varPresentation.varProcedes.length; j++){
        if(varPresentation.varProcedes[j].varItem == req.body.iconselect) {
            for (k = 0; k < varPresentation.varProcedes[j].varLink.length; k++) {
                ListeFichiersHTML = ListeFichiersHTML + '<input id="iText" type="text" value="'+ varPresentation.varProcedes[j].varLink[k] +'" name="link" placeholder="Liens internet" size=40 class="linksYoutube">'
            }
        }
    }
    ListeFichiersHTML = ListeFichiersHTML + '<input id="iText" type="text" name="link" placeholder="Liens internet" size=40 class="linksYoutube">'
    /*ListeFichiersHTML = ListeFichiersHTML + '<img name="imagesProcedes' +
    '" id="'+listeFichiers[i-1]+
    '" src="Pictures/'+listeFichiers[i-1]+ '" class="'+classImage+'" onclick="imageStationClick(event)">';*/
    //classImage = 'imageNotSelect';

    //console.log(varPresentation);
    /*res.type('html');
    res.send(ListeFichiersHTML);
});*/

/*app.post('/insertionYoutube', function(req, res) {
    for(i = 0; i < varPresentation.varProcedes.length; i++) {
        if(varPresentation.varProcedes[i].varItem == req.body.procAss) {
            varPresentation.varProcedes[i].varLink = [];
            for (j = 0; j < req.body.liens.length; j++) {
                varPresentation.varProcedes[i].varLink.push(req.body.liens[j].lien);
            }
        }
    }
    //console.log(varPresentation.varProcedes);
    var jsonEx = '{ "result" : "OK"}';
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
});*/

app.post('/revision',function(req, res){

    var indice = req.body.index;
    var varPresentationAvant = presentation.getVar(indice);
    if (varPresentationAvant == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        var cloudinary_cors = "http://" + req.headers.host + "/cloudinary_cors.html";
        var nomDuFichier;
        var htmlPreview;
        initVarPresentation(varPresentationAvant);
        var varPresentation = parseFormProcedes(req, varPresentationAvant);

        presentation.setVar(varPresentation, indice, req.ip);
        //console.log(cloudinary_cors);
        //parseFormProcedes(req);
        saveFile(varPresentation,'','non');
        //console.log();
        if (varPresentation.varNomImage != '') {
            htmlPreview = cloudinary.image(varPresentation.varNomImage, {width: 150, height: 100, crop: 'fill'});

        }
        if (varPresentation.varNomStation == '') {
            nomDuFichier = 'default';
        } else {
            nomDuFichier = varPresentation.varNomStation;
        }
        res.render('revision', {
            title: 'Révision',
            valeurIndex: indice,
            inputPhoto: cloudinary.uploader.image_upload_tag('image_id', {callback: cloudinary_cors,
                crop: "limit", width: 1000, height: 1000}),
            blockRevision: generateHTMLIcon(varPresentation, req.body.modifie),
            nomUtilisateur: varPresentation.varUtilisateur,
            nomFichier: nomDuFichier,
            preview: htmlPreview
        });
    }
    //console.log(varPresentation);
    //config: cloudinary.cloudinary_js_config(),
});

function parseFormInfo(req, varPresentationAvant){
    //console.log(req.body);
    var varPresentation = varPresentationAvant;
    varPresentation.varNomAnimateur = req.body.anim;
    varPresentation.varNomStation = req.body.station;
    varPresentation.varMapsLink = [];
    varPresentation.varMapsLink.push(req.body.numAdresse);
    varPresentation.varMapsLink.push(req.body.villeAdresse);
    varPresentation.varCapacite = req.body.cap;
    varPresentation.varVilles = req.body.villes;
    varPresentation.varPopulation = req.body.pop;
    return varPresentation;
}

function parseFormSource(req, varPresentationAvant){
    var varPresentation = varPresentationAvant;
    varPresentation.varProvenance = req.body.sourceAlim;
    varPresentation.varNomPlanDEau = req.body.nomPlanEau;
    varPresentation.varParticularite = [];
    separateElementsArraySimple(varPresentation.varParticularite, req.body.caracEau);
    return varPresentation;
}

function parseFormProcedes(req, varPresentationAvant){
    var varPresentation = varPresentationAvant;
    var item = {
        varItem: '', varImg: [], varLink: []
    };
    item.varItem = req.body.typeAlim;
    //console.log(item);
    varPresentation.varProcedes = [];
    varPresentation.varProcedes.push(item);
    item = {
        varItem: '', varImg: [], varLink: []
    };

    separateElementsArray(varPresentation.varProcedes, req.body.degrillage);
    separateElementsArray(varPresentation.varProcedes, req.body.pompage);
    separateElementsArray(varPresentation.varProcedes, req.body.traitements);

    if(req.body.ions) {
        item.varItem = req.body.ions;
        varPresentation.varProcedes.push(item);
        item = {
            varItem: '', varImg: [], varLink: []
        };
    }

    separateElementsArray(varPresentation.varProcedes, req.body.clarification);
    separateElementsArray(varPresentation.varProcedes, req.body.filtration);
    if(req.body.ozonation) {
        item.varItem = req.body.ozonation;
        varPresentation.varProcedes.push(item);
        item = {
            varItem: '', varImg: [], varLink: []
        };
    }
    if(req.body.uv) {
        item.varItem = req.body.uv;
        varPresentation.varProcedes.push(item);
    }

    separateElementsArray(varPresentation.varProcedes, req.body.emmagasinement);
    return varPresentation;
    //console.log(varPresentation);
}

function generateHTMLIcon(varPresentation, modifie){

    var stringHTML = '';
    var index = 0;

    stringHTML = stringHTML + '<div id="dIcon' + index + '" class="dIconRevision"> <img id="' + 'debut' +
    '" class="iIconRevision"' +
    getProcedeIconName('debut') + 'height="120" width="120"> </div>';

    /*if(varPresentation.varOrdrePresentation.length >0) {
        for (j = 0; j < varPresentation.varOrdrePresentation.length; j++) {
            index = index + 1;
            stringHTML = stringHTML + '<img id="iArrow" src="images/arrow.png" height="25px">';
            stringHTML = stringHTML + '<div id="dIcon' + index + '" class="dIconRevision" ondrop="drop(event)" ondragover="allowDrop(event)"> <img id="' + varPresentation.varOrdrePresentation[j] +
            '" class="iIconRevision" draggable="true" ondragstart="drag(event)" onclick="mouseClickEvent(event)"' +
            getProcedeIconName(varPresentation.varOrdrePresentation[j]) + 'height="120" width="120"> </div>';
        }
    }else{*/
    if ((modifie == 'oui') || (varPresentation.varProcedes.length != varPresentation.varOrdrePresentation.length)){
        for (j = 0; j < varPresentation.varProcedes.length; j++) {
            index = index + 1;
            stringHTML = stringHTML + '<img id="iArrow" src="images/arrow.png" height="25px">';
            stringHTML = stringHTML + '<div id="dIcon' + index + '" class="dIconRevision" ondrop="drop(event)" ondragover="allowDrop(event)"> <img id="' + varPresentation.varProcedes[j].varItem +
            '" class="iIconRevision" draggable="true" ondragstart="drag(event)" onclick="mouseClickEvent(event)"' +
            getProcedeIconName(varPresentation.varProcedes[j].varItem) + 'height="120" width="120"> </div>';
        }
    }else{
        for (j = 0; j < varPresentation.varOrdrePresentation.length; j++) {
            index = index + 1;
            stringHTML = stringHTML + '<img id="iArrow" src="images/arrow.png" height="25px">';
            stringHTML = stringHTML + '<div id="dIcon' + index + '" class="dIconRevision" ondrop="drop(event)" ondragover="allowDrop(event)"> <img id="' + varPresentation.varOrdrePresentation[j] +
            '" class="iIconRevision" draggable="true" ondragstart="drag(event)" onclick="mouseClickEvent(event)"' +
            getProcedeIconName(varPresentation.varOrdrePresentation[j]) + 'height="120" width="120"> </div>';
        }
    }

    //}
    stringHTML = stringHTML + '<img id="iArrow" src="images/arrow.png" height="25px">';
    stringHTML = stringHTML + '<div id="dIcon' + index + '" class="dIconRevision"> <img id="' + 'fin' +
    '" class="iIconRevision"' +
    getProcedeIconName('fin') + 'height="120" width="120"> </div>';    //index = 0;
    return stringHTML;
}

function getProcedeIconName(nomProcede){
    var nomIcon;
    switch (nomProcede) {
        case 'libre':
            nomIcon = 'title="Prise d\'eau en eau libre" src="images/1-Prise eau de surface en eau libre.png"';
            break;
        case 'enfouie':
            nomIcon = 'title="Prise d\'eau de surface enfouie" src="images/2-Prise eau de surface enfouie.png"';
            break;
        case 'berge':
            nomIcon = 'title="Prise d\'eau de surface en berge" src="images/3-Prise eau de surface en berge.png"';
            break;
        case 'tubulaire':
            nomIcon = 'title="Puits tubulaire foré" src="images/6-Puits tubulaire fore.png"';
            break;
        case 'surface':
            nomIcon = 'title="Puits de surface" src="images/4-Puits de surface et pointe filtrante.png"';
            break;
        case 'captage':
            nomIcon = 'title="Captage d\'une source" src="images/5-Captage source.png"';
            break;
        case 'artesien':
            nomIcon = 'title="Puits artésien" src="images/7-Puits tubulaire artesien.png"';
            break;
        case 'microtamis':
            nomIcon = 'title="Microtamisage" src="images/8-Microtamis.png"';
            break;
        case 'manuelle':
            nomIcon = 'title="Dégrillage à nettoyage manuel" src="images/9-Grille manuelle.png"';
            break;
        case 'mecanique':
            nomIcon = 'title="Dégrillage à nettoyage mécanique" src="images/10-Degrillage mecanique.png"';
            break;
        case 'basse':
            nomIcon = 'title="Pompage basse pression - pompe verticale" src="images/11a-Pompage basse pression-pompe verticale.png"';
            break;
        case 'basseCentrifuge':
            nomIcon = 'title="Pompage basse pression - pompe centrifuge" src="images/11b-Pompage basse pression-pompe centrifuge.png"';
            break;
        case 'haute':
            nomIcon = 'title="Pompage haute pression" src="images/12-Pompage haute pression.png"';
            break;
        case 'integre':
            nomIcon = 'title="Pompage intégré" src="images/13-Pompage integre (captage et distribution).png"';
            break;
        case 'gravite':
            nomIcon = 'title="Alimentation par gravité" src="images/14-Alimentation par gravite.png"';
            break;
        case 'oxydation':
            nomIcon = 'title="Oxydation" src="images/15-Oxydation.png"';
            break;
        case 'adsorption':
            nomIcon = 'title="Adsorption" src="images/16-Adsorption.png"';
            break;
        case 'coagulation':
            nomIcon = 'title="Coagulation" src="images/17-Coagulation.png"';
            break;
        case 'aideCoagulation':
            nomIcon = 'title="Aide à la coagulation" src="images/18-Aide a la coagulation.png"';
            break;
        case 'chlores':
            nomIcon = 'title="Désinfection à base de produits chlorés" src="images/19-Desinfection a base de produits chlores.png"';
            break;
        case 'adoucissement':
            nomIcon = 'title="Adoucissement" src="images/20-Adoucissement.png"';
            break;
        case 'correction':
            nomIcon = 'title="Correction du pH" src="images/21-Correction du pH.png"';
            break;
        case 'alcalinite':
            nomIcon = 'title="Correction de l\'alcalinité" src="images/22-Correction alcalinite.png"';
            break;
        case 'corrosion':
            nomIcon = 'title="Contrôle de la corrosion" src="images/23-Controle de la corrosion.png"';
            break;
        case 'ions':
            nomIcon = 'title="Échanges d\'ions" src="images/24-Echange ions.png"';
            break;
        case 'statique':
            nomIcon = 'title="Décantation statique-dynamique" src="images/25-Decantation statique-dynamique.png"';
            break;
        case 'boue':
            nomIcon = 'title="Décantation à voile de boue" src="images/26-Decantation a voile de boue.png"';
            break;
        case 'lestes':
            nomIcon = 'title="Décantation à flocs lestés" src="images/27-Decantation a flocs lestes.png"';
            break;
        case 'dissous':
            nomIcon = 'title="Flottation à air dissous" src="images/28-Flottation a air dissous.png"';
            break;
        case 'gravitaire':
            nomIcon = 'title="Filtration gravitaire" src="images/29-Filtration granulaire gravitaire.png"';
            break;
        case 'granulaire':
            nomIcon = 'title="Filtration granulaire sous pression" src="images/30-Filtration granulaire sous pression.png"';
            break;
        case 'sable':
            nomIcon = 'title="Filtration sur sable vert" src="images/31-Filtration sur sable vert et sur medias specialises.png"';
            break;
        case 'membranaire':
            nomIcon = 'title="Filtration membranaire" src="images/32-Filtration membranaire.png"';
            break;
        case 'cartouches':
            nomIcon = 'title="Filtration à cartouches et autres" src="images/33-Filtration a cartouche ou autre filtration.png"';
            break;
        case 'ozonation':
            nomIcon = 'title="Ozonation" src="images/34-Ozonation.png"';
            break;
        case 'uv':
            nomIcon = 'title="Désinfection UV" src="images/35-Desinfection aux UV.png"';
            break;
        case 'potable':
            nomIcon = 'title="Réservoir d\'eau potable" src="images/37-Reservoir eau potable.png"';
            break;
        case 'debut':
            nomIcon = 'title="Eau brute" src="images/0-Eau brute.png"';
            break;
        case 'fin':
            nomIcon = 'title="Eau potable" src="images/38-Eau potable.png"';
            break;
    }
    return nomIcon;
}

function initVarPresentation(varPresentation){
    varPresentation.varProcedes = [];
    //varPresentation.varOrdrePresentation = [];
    //varPresentation.varNomImage = '';
}

/*function initVarPresentationCmp(){

    varPresentation.varNomAnimateur = '';
    varPresentation.varNomStation = '';
    varPresentation.varCapacite = '';
    varPresentation.varVilles = '';
    varPresentation.varPopulation = '';
    varPresentation.varProvenance = '';
    varPresentation.varNomPlanDEau = '';
    varPresentation.varParticularite = [];
    varPresentation.varProcedes = [];
    varPresentation.varMapsLink = [];
    varPresentation.varOrdrePresentation = [];
    varPresentation.varNomImage = '';
}*/

function separateElementsArray(varElements, arrayElements){
    var item = {
        varItem: '', varImg: [], varLink: []
    };

    if(arrayElements) {
        var typeElement = typeof arrayElements;
        var nbElement = arrayElements.length;
        //console.log(nbElement);
        //console.log(typeElement);
        //console.log(arrayElements);
        if((nbElement > 1) && (typeElement == 'object')){
            //console.log(arrayElements[0]);
            for (i = 0; i < nbElement; i++){
                item.varItem = arrayElements[i];
                varElements.push(item);
                item = {
                    varItem: '', varImg: [], varLink: []
                };
            }
        }
        else{
            item.varItem = arrayElements;
            varElements.push(item);
            //console.log(arrayElements);
        }
    }
}

function separateElementsArraySimple(varElements, arrayElements){

    if(arrayElements) {
        var typeElement = typeof arrayElements;
        var nbElement = arrayElements.length;
        //console.log(nbElement);
        //console.log(typeElement);
        //console.log(arrayElements);
        if((nbElement > 1) && (typeElement == 'object')){
            //console.log(arrayElements[0]);
            for (i = 0; i < nbElement; i++){
                varElements.push(arrayElements[i]);
            }
        }
        else{
            varElements.push(arrayElements);
            //console.log(arrayElements);
        }
    }
}

app.post('/deletePresentation', function(req,res){
    //console.log(req.body.index);
    var varPresentation = presentation.getVar(req.body.index);
    deleteFile(req.body.deletebutton, varPresentation);
    var innerDiv = ls.listeFichiersHTML(varPresentation.varUtilisateur, req.body.index);
    res.type('html');
    res.send(innerDiv);
});

app.post('/listeFichiers', function(req,res){
    //console.log(req.body.index);
    var varPresentation = presentation.getVar(req.body.index);
    var innerDiv = ls.listeFichiersHTML(varPresentation.varUtilisateur, req.body.index);
    res.type('html');
    res.send(innerDiv);
});

function deleteFile(fileName, varPresentation){
    var userDir;
    if((varPresentation.varUtilisateur) && (varPresentation.varUtilisateur != '') && (varPresentation.varUtilisateur != 'aucune')) {
        userDir = 'files/' + varPresentation.varUtilisateur + '/';
    }else{
        userDir = 'files/default/';
    }
    //console.log(userDir);
    //console.log(fileName);
    var path = userDir + fileName + '.xml';
    //console.log(path);
    try {
        fs.unlinkSync(path);
        /*if(varPresentation.varNomImage != '') {
            deletePhoto(varPresentation.varNomImage);
        }*/
    }catch(e){}
}

function deletePhoto(adressePhoto){
    cloudinary.api.delete_resources([adressePhoto],function(result){
        console.log(result);
    });
}

app.post('/enregistrement',function(req, res){
    //console.log(req.body);
    //separateElementsArray(varPresentation.varOrdrePresentation, req.body.ordre);
    var varPresentation = presentation.getVar(req.body.index);
    if(req.body.ordre) {
        varPresentation.varOrdrePresentation = [];
        for (i = 0; i < req.body.ordre.length; i++) {
            varPresentation.varOrdrePresentation.push(req.body.ordre[i].fiche);
        }
    }
    if(req.body.photo != '') {
        if ((varPresentation.varNomImage != '') && (varPresentation.varNomImage != req.body.photo)) {
            deletePhoto(varPresentation.varNomImage);
        }
        varPresentation.varNomImage = req.body.photo;
    }

    varPresentation.varEtat = "complete";
    presentation.setVar(varPresentation,req.body.index,req.ip);
    var jsonEx = '{"result":"OK","nom":"'+saveFile(varPresentation,'','oui')+'"}';
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
});

function getDateDuJour(){
    var d = new Date();
    var month = new Array();
    month[0] = "Janvier";
    month[1] = "Février";
    month[2] = "Mars";
    month[3] = "Avril";
    month[4] = "Mai";
    month[5] = "Juin";
    month[6] = "Juillet";
    month[7] = "Août";
    month[8] = "Septembre";
    month[9] = "Octobre";
    month[10] = "Novembre";
    month[11] = "Décembre";
    var n = month[d.getMonth()];

    return d.getDate() + ' ' + n + ' ' + d.getFullYear();
}

app.post('/enregistrementRetourInfo',function(req, res){
    var varPresentationAvant = presentation.getVar(req.body.index);
    var nomAvant = varPresentationAvant.varNomStation;
    var varPresentation = parseFormInfo(req, varPresentationAvant);
    if(varPresentation.varDateCreation == ''){
        varPresentation.varDateCreation = getDateDuJour();
    } else{
        varPresentation.varDateModif = getDateDuJour();
    }
    presentation.setVar(varPresentation,req.body.index,req.ip);
    var jsonEx = '{"result":"OK","nom":"'+saveFile(varPresentation, nomAvant,'non')+'"}';
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
});

app.post('/enregistrementRetourSource',function(req, res){
    //console.log(req.body);
    var varPresentationAvant = presentation.getVar(req.body.index);
    var varPresentation = parseFormSource(req, varPresentationAvant);

    presentation.setVar(varPresentation,req.body.index,req.ip);
    var jsonEx = '{"result":"OK","nom":"'+saveFile(varPresentation,'','non')+'"}';
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
});

app.post('/enregistrementRetourProcedes',function(req, res){
    //console.log(req.body);
    var varPresentationAvant = presentation.getVar(req.body.index);
    var varPresentation = parseFormProcedes(req, varPresentationAvant);

    presentation.setVar(varPresentation,req.body.index,req.ip);
    var jsonEx = '{"result":"OK","nom":"'+saveFile(varPresentation,'','non')+'"}';
    res.type('application/json');
    res.send(JSON.stringify(jsonEx));
});

function saveFile(varPresentation, ancienNom, saveCloud){
    //var ancienNom = '';
    var fileName;
    var path;
    if((varPresentation.varUtilisateur) && (varPresentation.varUtilisateur != '') && (varPresentation.varUtilisateur != 'aucune')) {
        path = 'files/' + varPresentation.varUtilisateur + '/';
    }else{
        path = 'files/default/';
    }
    try {
        fs.mkdirSync('files');
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
    if ((varPresentation.varNomStation != '') && (varPresentation.varNomStation != 'aucune')){
        fileName = varPresentation.varNomStation + '.xml';
    }else{
        fileName = 'default.xml';
    }
    var sXML =toXML.toXMLString(varPresentation);
    //console.log(sXML);
    if((ancienNom != '')&&(ancienNom != varPresentation.varNomStation)) {
        console.log('renommer');
        fs.renameSync(path + ancienNom + '.xml', path + fileName);
    }
    fs.writeFile(path + fileName, sXML);
    if(saveCloud == 'oui'){
        //console.log('cloud');
        /*cloudinary.uploader.upload(path + fileName, function(result) {
            console.log(result);
        });*/
    }
    return fileName;
}

app.post('/source',function(req, res){
    //console.log(req.body);
    var indice = req.body.index;
    var varPresentationAvant = presentation.getVar(indice);
    if (varPresentationAvant == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        var nomAvant = varPresentationAvant.varNomStation;
        var varPresentation = parseFormInfo(req, varPresentationAvant);
        if (varPresentation.varDateCreation == '') {
            varPresentation.varDateCreation = getDateDuJour();
        } else {
            varPresentation.varDateModif = getDateDuJour();
        }
        presentation.setVar(varPresentation, req.body.index, req.ip);
        //console.log(varPresentationAvant);

        saveFile(varPresentation, nomAvant,'non');
        res.render('source', {
            title: 'Source',
            valeurIndex: indice,
            selectionProvenance: provenance(varPresentation),
            nomPlanEau: varPresentation.varNomPlanDEau,
            tableParticularite: genereTableParticularite(varPresentation)
        });
    }
});

function provenance(varPresentation){
    var stringSelect = '';
    stringSelect += "<select id='selectAlim' name='sourceAlim'>"+
        "<option value='riviere' "+ selectListeProvenance('riviere', varPresentation) +">Rivière</option>"+
        "<option value='fleuve' "+ selectListeProvenance('fleuve', varPresentation) +">Fleuve</option>"+
        "<option value='lac' "+ selectListeProvenance('lac', varPresentation) +">Lac</option>"+
        "<option value='souterrain' "+ selectListeProvenance('souterrain', varPresentation) +">Nappe d'eau souterraine</option>"+
    "</select>";
    return stringSelect;
}

function selectListeProvenance(source, varPresentation){
    if(varPresentation.varProvenance == source){
        return 'selected';
    }else{
        return '';
    }
}

function genereTableParticularite(varPresentation){
    var stringTable = '';
    var idChkBox = ['turbidite','gout','couleur','algues','durete','bacteries','fer','matieres'];
    var labelChkBox = [
        'Turbidité élevée',
        'Présence de substances qui créent des goûts et/ou des odeurs',
        "Présence de substances qui colorent l'eau brute",
        "Présence d'algues microscopiques",
        'Dureté élevée',
        'Présence de virus ou de bactéries',
        'Présence de fer ou de manganèse',
        'Contenu élevé en matières organiques'
    ];

    for(var i = 0; i < 8; i++){
        stringTable += '<tr><td>';
        if(verifieCochee(idChkBox[i], varPresentation)){
            stringTable += "<input type='checkbox' name='caracEau' id='"+ idChkBox[i] +"' value='"+ idChkBox[i] +"' checked>" ;
        }else{
            stringTable += "<input type='checkbox' name='caracEau' id='"+ idChkBox[i] +"' value='"+ idChkBox[i] +"'>" ;
        }

        stringTable += "<label id='lCarEauD' for='" + idChkBox[i] + "'>"+ labelChkBox[i] +"</label>" +
        '</td></tr>';
    }
    return stringTable;
}

function verifieCochee(idChkBox, varPresentation){
    var cochee = false;
    for(var i = 0; i < varPresentation.varParticularite.length; i++){
        if(varPresentation.varParticularite[i] == idChkBox){
            cochee = true;
        }
    }
    return cochee;
}

app.enable('trust proxy');

app.post('/selection',function(req, res){
    //console.log(req.body);
  
    if((gUtilisateurs.bonMDP(req.body.user.toLowerCase(),req.body.password) == 1)||((req.body.user.toLowerCase() == 'admin')&&(req.body.password == 'Cieau2015'))) {
        var indice = req.body.index;
        var varPresentation = presentation.getVar(indice);
        if (varPresentation == -1) {
            res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
        } else {
            if (req.body.user.toLowerCase() == '') {
                varPresentation.varUtilisateur = 'default';
            } else {
                varPresentation.varUtilisateur = req.body.user.toLowerCase();
            }
            presentation.setVar(varPresentation, indice, req.ip);
            //console.log(varPresentation.varUtilisateur);
            res.render('choixPresentation', {title: "Sélection d'une présentation", valeurIndex: indice});
            //res.render('choixPresentation', {title: "Sélection d'une présentation", user: varPresentation.varUtilisateur});
        }
    }else{
        res.render('mauvaiseIdentification', {title: "Erreur d'identification", lien: req.headers.host});
    }
});

app.post('/selectionRetour',function(req, res){
    //console.log(req.ips[0]);
    var indice = req.body.index;
    var varPresentation = presentation.getVar(indice);
    if (varPresentation == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        if (req.body.user.toLowerCase() == '') {
            varPresentation.varUtilisateur = 'default';
        } else {
            varPresentation.varUtilisateur = req.body.user.toLowerCase();
        }
        presentation.setVar(varPresentation, indice, req.ip);
        //console.log(varPresentation.varUtilisateur);
        res.render('choixPresentation', {title: "Sélection d'une présentation", valeurIndex: indice});
        //res.render('choixPresentation', {title: "Sélection d'une présentation", user: varPresentation.varUtilisateur});
    }
});

function envoieEmail(email,utilisateur,motDePasse){
    /*sendgrid.send({
        to: email,
        from: 'info@cieau.qc.ca',
        subject: 'Informations compte',
        text: 'Voici les informations sur votre compte.\nNom d\'utilisateur : ' + utilisateur +
        '\nMot de passe : ' + motDePasse
    }, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });*/
}

app.post('/recuperationMDP',function(req, res){
    var mdp = gUtilisateurs.retournerMDP(req.body.email);
    var innerDiv = '';
    if(mdp != -1) {
        envoieEmail(req.body.email,gUtilisateurs.retournerUtilisateur(req.body.email),mdp);
        innerDiv = '<button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' +
            "<h3>Récupération des informations</h3>" +
            "Une copie de vos informations a été envoyée à l'adresse suivante : " + req.body.email;
    }else{
        innerDiv = '<button id="bGlossaire" onclick="clickClose()" style="float: right;">Fermer</button><br>' +
            "<h3>Récupération du mot de passe</h3>" +
            "L'adresse suivante : " + req.body.email + " n'est pas valide.";

    }
    res.type('html');
    res.send(innerDiv);
});

app.post('/inscriptionUtilisateur',function(req, res){
    var innerDiv = '';
    if((req.body.user.toLowerCase() != 'admin')&&(gUtilisateurs.utilisateurExiste(req.body.user.toLowerCase()) != 1)) {
        gUtilisateurs.ajouterUtilisateur(req.body.user.toLowerCase(), req.body.password, req.body.email);
        envoieEmail(req.body.email, req.body.user.toLowerCase(), req.body.password);
        innerDiv = "<h3>Inscription</h3>" +
            'Inscription réussie. Une confirmation a été envoyée par courriel. Vous pouvez maintenant vous connectez en cliquant le bouton '+
            'ci-dessous.<form action="/selection" method="post"><input type="hidden" name="user" value="'+ req.body.user.toLowerCase() +'">' +
            '<input type="hidden" name="password" value="'+ req.body.password +'">' +
            '<input type="hidden" name="index" value="'+ req.body.index +'">' +
            '<input id="button" type="submit" value="Commencer"></form>';
    }else{
        innerDiv = "<h3>Inscription</h3>" +
        'Erreur lors de l\'inscription. Le nom d\'utilisateur est invalide';
    }
    res.type('html');
    res.send(innerDiv);
});

app.post('/procedes',function(req, res){
    //console.log(req.body);
    //var indice = presentation.addVar(req.ip);
    //var varPresentation = presentation.getVar(indice);

    var indice = req.body.index;
    var varPresentationAvant = presentation.getVar(indice);
    if (varPresentationAvant == -1){
        res.render('sessionExpiree', {title: 'Session expirée', lien: req.headers.host});
    }else {
        varPresentationAvant.varParticularite = [];
        var varPresentation = parseFormSource(req, varPresentationAvant);
        //var varPresentation = parseFormInfo(req, varPresentationAvant);

        presentation.setVar(varPresentation, indice, req.ip);

        /*varPresentation.varParticularite = [];
         parseFormSource(req, varPresentation);*/
        saveFile(varPresentation,'','non');
        res.render('procedes', {
            title: 'Procédés', typeAlimentation: alimentation(varPresentation), valeurIndex: indice,
            tableDegrillage: genereTableProcedes('degrillage', ['microtamis', 'manuelle', 'mecanique'],
                ['Microtamisage', 'Dégrillage à nettoyage manuel', 'Dégrillage à nettoyage mécanique'], varPresentation),
            tablePompage: genereTableProcedes('pompage', ['basse', 'basseCentrifuge', 'haute', 'integre', 'gravite'],
                ['Pompage basse pression - pompe verticale', 'Pompage basse pression - pompe centrifuge', 'Pompage haute pression', 'Pompage intégré', 'Alimentation par gravité'], varPresentation),
            tableTraitements: genereTableProcedes('traitements', ['oxydation', 'adsorption', 'coagulation', 'aideCoagulation', 'chlores', 'adoucissement', 'correction', 'alcalinite', 'corrosion'],
                ['Oxydation', 'Adsorption', 'Coagulation', 'Aide à la coagulation', 'Désinfection à base de produits chlorés', 'Adoucissement', 'Correction du pH', 'Correction de l\'alcalinité', 'Contrôle de la corrosion'], varPresentation),
            tableIons: genereTableProcedes('ions', ['ions'],
                ['Échanges d\'ions'], varPresentation),
            tableClarification: genereTableProcedes('clarification', ['statique', 'boue', 'lestes', 'dissous'],
                ['Décantation statique-dynamique', 'Décantation à voile de boue', 'Décantation à flocs lestés', 'Flottation à air dissous'], varPresentation),
            tableFiltration: genereTableProcedes('filtration', ['gravitaire', 'granulaire', 'sable', 'membranaire', 'cartouches'],
                ['Filtration granulaire gravitaire', 'Filtration granulaire sous pression', 'Filtration sur sable vert ou sur d\'autres médias spécialisés', 'Filtration membranaire', 'Filtration à cartouche ou autre filtration'], varPresentation),
            tableOzonation: genereTableProcedes('ozonation', ['ozonation'],
                ['Ozonation'], varPresentation),
            tableUV: genereTableProcedes('uv', ['uv'],
                ['Désinfection UV'], varPresentation),
            tableEmmagasinement: genereTableProcedes('emmagasinement', ['potable'],
                ['Réservoir d\'eau potable'], varPresentation)
        });
    }
});


function alimentation(varPresentation){
    var stringSelect = '';
    stringSelect += "<select id='selectAlim2' name='typeAlim'>"+
        "<option value='libre' "+ selectListeAlimentation('libre', varPresentation) +">Prise d'eau de surface en eau libre</option>"+
        "<option value='enfouie' "+ selectListeAlimentation('enfouie', varPresentation) +">Prise d'eau de surface enfouie</option>"+
        "<option value='berge' "+ selectListeAlimentation('berge', varPresentation) +">Prise d'eau de surface en berge</option>"+
        "<option value='tubulaire' "+ selectListeAlimentation('tubulaire', varPresentation) +">Puits tubulaire foré</option>"+
        "<option value='surface' "+ selectListeAlimentation('surface', varPresentation) +">Puits de surface et/ou pointe filtrante</option>"+
        "<option value='captage' "+ selectListeAlimentation('captage', varPresentation) +">Captage d'une source</option>"+
        "<option value='artesien' "+ selectListeAlimentation('artesien', varPresentation) +">Puits artésien</option>"+
    "</select>";
    return stringSelect;
}

function selectListeAlimentation(alim, varPresentation){
    if(varPresentation.varProcedes.length > 0) {
        if (varPresentation.varProcedes[0].varItem == alim) {
            return 'selected';
        } else {
            return '';
        }
    }
}

function genereTableProcedes(nom, id, label, varPresentation){
    var stringTable = '';
    for(var i = 0; i < id.length; i++){
        stringTable += '<tr><td>';
        if(verifieCocheeProcedes(id[i], varPresentation)){
            stringTable += "<input type='checkbox' class='classChkBoxProcedes' name='"+ nom +"' id='"+ id[i] +"' value='"+ id[i] +"' checked>" ;
        }else{
            stringTable += "<input type='checkbox' class='classChkBoxProcedes' name='"+ nom +"' id='"+ id[i] +"' value='"+ id[i] +"'>" ;
        }

        stringTable += "<label id='lCarEauD' for='" + id[i] + "'>"+ label[i] +"</label>" +
        '</td></tr>';
    }
    return stringTable;
}

function verifieCocheeProcedes(idChkBox, varPresentation){
    var cochee = false;
    for(var i = 1; i < varPresentation.varProcedes.length; i++){
        if(varPresentation.varProcedes[i].varItem == idChkBox){
            cochee = true;
        }
    }
    return cochee;
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

setInterval(function() {
    presentation.verifyVarTimeout();
}, 600 * 1000);

module.exports = app;
