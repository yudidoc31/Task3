const readline = require('readline');//pembacaan teks yang kita ketik dalam satu baris//require meminta input
const validator = require("validator");//untuk mengimpor file eksternal ke dalam program
const fs = require("fs");//mengimpor file dari node.js

// untuk berinteraksi dengan pengguna melalui terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// menyimpan data untuk ditampilkan pada console
pertanyaan = ["nama", 
            "no telp", 
            "email"]
pesanErorr = [  "format nama salah",
                "format telephon harus indonesia", 
                "format email salah"]
validasi = [null, validator.isMobilePhone, validator.isEmail]
const contact = {};

// menayakan pertanyaan pada user agar bisa ditampilkan
function list(pertanyaan,validator, pesanEror){ //untuk proses interaksi dengan user dalam array
    return new Promise((resolve, reject) => { //ntuk mengembalikan nilai fungsi pda objek(promise)ansyscronus pemanggil)di promise. Fungsi ini akan dijalankan secara asynchronous ketika objek Promise dibuat, dan akan menerima dua argumen: resolve dan reject.
        rl.question(`masukkan ${pertanyaan}:`,(answer)=>{//metode dari modul readline digunakan untuk mengajukan pertanyaan kepada pengguna melalui terminal dan mendapatkan jawaban dari pengguna.
            if(validator==null|| validator(answer)){//memeriksa apakah variabel validator memiliki nilai null atau tidak.kalau null, jadi tidak ada fungsi validasi yang diberikan untuk pertanyaan tersebut
                resolve(answer)//untuk fungsi promis berhasil, maka hasil eksekusinya akan disampaikan ke dalam fungsi 
            }else{
                console.log(pesanEror)//menampilkan pesan eror apabila pengisian salah
                resolve(list(pertanyaan,validator,pesanEror))//apabila pengisiannya benar lalu disampaikan ke fungsi
        }
        })
       
    })
}
// fungsi asyncronus untuk kembali meminta data dari pemakai
async function aplikasi(){
    const nama= await list(pertanyaan[0], validasi[0], pesanErorr[0]);//await untuk menunggu ke pertanyaan selanjutnya  melaui list
    const noTelp= await list(pertanyaan[1], validasi[1], pesanErorr[1]);//      ""
    const email= await list(pertanyaan[2], validasi[2], pesanErorr[2]);//       ""
 const contact={nama, noTelp, email}

//  untuk menyimpan data/pharse ke file json
    const file = fs.readFileSync("data/contact.json","utf8");
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
    rl.close();

}
// membuat folder data apabila tidak ada/ jadi oomatis ada di sidebar
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
// untuk membuat file data apabila tidak ada/ jadi otomatis ada di sidebar
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}
output = [];
module.exports = {aplikasi};