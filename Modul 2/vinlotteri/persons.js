function showPersons() {
    let html = `<table>
        <tr>
            <td><input type="checkbox" 
                onclick="checkOrUncheck(this.checked)" 
                ${makeHtmlChecked(model.persons.chooseAll)}/></td>
            <td><b>Personer</b></td>
                <td>
                    <!--<button class="smallButton" onclick="editPersons()">✎</button>-->
                </td>
        </tr>`;
for (let person of model.persons.list) {
    console.log(person.name , " person.name i")
    html += `<tr>
        <td><input type="checkbox" 
            onclick="chosePerson(${person.id})" 
            ${makeHtmlChecked(person.isChosen)}"/></td>
        <td>${person.name}</td>
        <td><button class="smallButton" onclick="deletePerson(${person.id})">x</button></td>
        </tr> `;
}
html += `<tr>
        <td></td>
        <td colspan="3">
            <input size="6" type="text" id="newPerson"/>
            <button class="smallButton" onclick="addNewPerson()"> Legg til Person</button>
                </td>
            </tr>
            
            <tr>
                <td colspan="3">
                    <button class="knapp" onclick="drawWinners(model.persons.list)">Trekk!</button>
                    <input type="number" size="1" value="${model.persons.pick}" onchange="model.persons.pick = parseInt(this.value)"/>
                    <button class="" onclick="adjustNumber(1)">▲</button>
                    <button class="" onclick="adjustNumber(-1)">▼</button>
                    </td>
                    </tr>
                    </table>`;
                    document.getElementById('board').innerHTML = html;
}


function makeHtmlChecked(chosen) {
    return chosen ? 'checked="checked"' : '';
}

//controller
function checkOrUncheck(all) {
    model.persons.chooseAll = all;
    for (let person of model.persons.list) {
        person.isChosen = all;
    }
    showPersons();
}
function addNewPerson() {
    const name = document.getElementById('newPerson').value;

    const id = model.persons.list.map(p => p.id).reduce((max, value) => Math.max(max, value), -1) + 1;
    model.persons.list.push(
        {id: id, name: name, isChosen: true});
        showPersons();
        console.log(name)
 }
function chosePerson(id) {
    const person = findPerson(id);
    person.isChosen = !person.isChosen;
    showPersons();
}

function deletePerson(id) {
    model.persons.list = model.persons.list.filter(p => p.id !== id);
    showPersons();
}

function drawPerson() {
    let antall = model.persons.pick;
    const personsList = model.persons.list.filter(p => p.isChosen);
    console.log(personsList , " persoinlist");
    const indexes = Array.from(personsList.keys());
    const winners = [];
    while (antall-- > 0 && indexes.lenght > 0) {
        const randomIndex = Math.floor(Math.random() * indexes.lenght);
        const index = indexes.splice(randomIndex, 1);
        winners.push(personsList[index].name);
    }
    model.drawOne.unshift({
    winners: winners,
    time: makeDateTextToSave(new Date()),
    participations: personsList.map(p => p.name)
    
});
showPersons();
}
function adjustNumber(delta) {
    model.persons.pick = 
    Math.max(1, model.persons.pick + delta);
    showPersons();
}
function findPerson(id) {
    return model.persons.list.filter(p => p.id === id)[0];
}

