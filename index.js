const fs = require('fs')
const file = process.argv[2]

fs.readFile(file, 'utf8', (err, contents) => { // fileの読み込み処理が終わったときに実行される関数を指定
  // fs.readFile(file, 'utf8', callback) can also be used // 読み込みのフォーマットを指定した書き方も可能
 const lines = contents.toString().split('\n'); // 文字列に変換し改行で配列に分割

 
 const regexZip = new RegExp(/^\d{3}-?\d{4}/, 'gm');
 const regexPhone = new RegExp(/0\d{1,4}-\d{1,4}-\d{4}|0120-\d{3}-\d{3}/, 'gm');
 const regexId = new RegExp(/^\d{1,3}/, 'gm');
 const regexSyoshin = new RegExp(/〇〇|○○/, 'gm');
 const regexSaishin = new RegExp(/〇|○/, 'gm');
 const regexSetsumei = new RegExp(/施設名郵便番号住所（都道府県から記載）電話番号ウェブサイトURL\n初診の電話等を用いた\n診療の実施の有無\n再診の電話等を用いた\n診療の実施の有無\n対応診療科担当医師名\n対面診療が必要と判断した場合に連携する医療機関名\n（複数ある場合は複数、住所も併せて記載）\n事務連絡に基づく対応について\n電話や情報通信機器を用いて診療を実施する医療機関の一覧（都道府県集計用）\n基本情報\n別紙１－3\n/, 'gm');
 
 const modified = contents
                      .replace(regexZip, (match) => (`\nzip: ${match}, \n`))
                      .replace(regexPhone, (match) => (`\nphone: ${match}, \n`))
                      .replace(regexId, (match) => ('},\n{ \n'))
                      .replace(regexSyoshin, (match) => ('\nSyoshin: true,\nSaishin: true, \n'))
                      .replace(regexSaishin, (match) => ('\nSyoshin: false,\nSaishin: true, \n'))
                      .replace(regexSetsumei, (match) => ('\n'))
 



 const modifyfinal = contents.replace(/\d\n/g, '},\n{');

  console.log(lines.length-1);
  console.log(lines[0]);
  console.log(lines[1]);
  console.log(lines[2]); 
  console.log(lines[3]);
  
 
  fs.writeFileSync("./data/output.txt", modified, (err) => {
    if (err) throw err;
    console.log('ファイルが正常に出力されました。');
  

  // const newContents1 = contents.

})

}
)