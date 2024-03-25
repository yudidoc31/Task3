const readline = require('readline');
const validator = require("validator");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// untuk menyimpan informasi yang akan ditampilkan
pertanyaan = ["nama", 
            "no telp", 
            "email"]
pesanErorr = [  "format nama salah",
                "format telephon harus indonesia", 
                "format email salah"]
validasi = [null, validator.isMobilePhone, validator.isEmail]
const contact = {};

function list(pertanyaan,validator, pesanEror){
    return new Promise((resolve, reject) => { 
        rl.question(`masukkan ${pertanyaan}:`,(answer)=>{
            if(validator==null|| validator(answer)){
                resolve(answer)
            }else{
                console.log(pesanEror)
                resolve(list(pertanyaan,validator,pesanEror))
        }
        })
       
    })
}
async function aplikasi(){
    const nama= await list(pertanyaan[0], validasi[0], pesanErorr[0]);
    const noTelp= await list(pertanyaan[1], validasi[1], pesanErorr[1]);
    const email= await list(pertanyaan[2], validasi[2], pesanErorr[2]);
 const contact={nama, noTelp, email}

    const file = fs.readFileSync("data/contact.json","utf8");
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
    rl.close();

}
// membuat folder data apabila tidak ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}
output = [];
module.exports = {aplikasi};