//view
   const dayName = [
  'søndag', 'mandag', 'tirsdag',
  'onsdag', 'torsdag', 'fredag',
  'lørdag'
];

function showDrawn() {
    let html = '';
    let cssClass = 'firstDrawn';
    for (let draw of model.drawOne) {
        const time = new Date(draw.time);
        const dateText = makeDateTextNowToShow(time);
        const day = dayName[time.getDay()];
        const winners = draw.winners;
        const participations = draw.participations;
        const winnerText = makeTextList.length === 1 ? 'Vinner' : 'Vinnere';

        html += 
        `<p>
            <small>${day} ${dateText}</small><br/>
            <b class="${cssClass}">${winnerText} er ${makeTextList(winners)}<b><br>
                <small>Trukket fra totalt ${participations.length} personer: ${makeTextList(participations)}</small>
        </p>`;
        cssClass = ''; 
    }
    document.getElementById('board').innerHTML = html;
}
function makeTextList(list) {
    console.log(list.length , " liste sin length")
   
    if (list.length === 0) return '';
    if (list.length ===1) return list[0];

 const textList = list.join(', ');
 console.log(textList, " textlist")
const indexLastComma = textList.lastIndexOf(',');
return textList.substr(0, indexLastComma) 
+ ' og ' + textList.substr(indexLastComma + 1);

}

function drawWinners(listOfParticipants){
    console.log(listOfParticipants);
    let thisDraw = {};
    let participants = [];
    for(var participant of listOfParticipants){
        participants.push(participant.name);
    }
    let possibleWinners = [...listOfParticipants];
    let arrayOfWinners =[];
    let numberOfWinners = model.persons.pick;
    console.log(possibleWinners, " possible winners");
    for(let i =0; i <numberOfWinners ; i++){
        let randomInexOfParticipants = Math.floor(Math.random() * possibleWinners.length);
            arrayOfWinners.push(possibleWinners[randomInexOfParticipants].name)
            possibleWinners.splice(randomInexOfParticipants, 1 );
    }
    thisDraw.winners = arrayOfWinners;
    thisDraw.participations = participants;
    thisDraw.time = new Date();
    model.drawOne.push(thisDraw);
    return arrayOfWinners;
}