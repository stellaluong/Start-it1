function makeDateTextNowToShow(date) {
    return date.toLocaleString().replace(',','').substr(0, 15);
}
function makeDateTextToSave(date) {
    console.log(date , "date i maketexttodate")
    return date.toISOString().substr(0, 16).replace('T', ' ');
}
function makeDateTextNowToSave() {
  return makeDateTextNowToSave(new Date());
}
