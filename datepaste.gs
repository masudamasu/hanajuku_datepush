function search() {
  var _ = Underscore.load();//Underscoreライブラリを使用するためのしるし。
  const Stusheet = SpreadsheetApp.getActive().getSheetByName("生徒マスタ");
  const Datesheet= SpreadsheetApp.getActive().getSheetByName("日付マスタ");
  const Karutesheet = SpreadsheetApp.getActive().getSheetByName("授業カルテ");
  const ss = SpreadsheetApp.getActive().getSheetByName("test");
  const finalRow = Stusheet.getLastRow();

  const DateArray = [["月","火","水","木","金","土"],[3,4,5,6,7,8]];
  //const DateArray = [["月"],[3]];
  //Logger.log(DateArray[1][DateArray[0].indexOf('金')]);//

for (let y = 0; y < DateArray[0].length; y++){
  Logger.log(DateArray[1][DateArray[0].indexOf(DateArray[0][y])]);
  let DateRowNum = DateArray[1][DateArray[0].indexOf(DateArray[0][y])];
  Logger.log(DateArray[0][y]);
  Logger.log (DateRowNum);




  const StuMaster = Stusheet.getRange(2,1,finalRow-1,7).getValues();//生徒マスタA2～Gまで
  const Keyname = [];//検索用主キー
  const KukakuArray = [];
  const KoshiArray = [];
  



for (let i = 0; i < StuMaster.length; i++){//stumasterから抽出
  //if (StuMaster[i][4] === "月"){
  if (StuMaster[i][4] === DateArray[0][y]){

    //横からも「0」から開始する。曜日が月であった場合、絞り込んで氏名を突っ込む
        Logger.log(StuMaster[i][1]);
        Keyname.push(StuMaster[i][1]);//氏名をつっこむ
        KukakuArray.push(StuMaster[i][5]);//区画を突っ込む
        KoshiArray.push(StuMaster[i][6]);//講師をつっこむ
  };//if終了

  };//stumasterから抽出終了

Logger.log(StuMaster);
Logger.log(Keyname);
Logger.log(KoshiArray);
Logger.log(KukakuArray);

dateimport(DateRowNum,Keyname,KukakuArray,KoshiArray)

}//DateArray終了

}//search終了




function dateimport(DateRowNum,Keyname,KukakuArray,KoshiArray){
var _ = Underscore.load();//Underscoreライブラリを使用するためのしるし。
const MonArray = [[],[],[],[]];//2次元配列を定義。日にち、区画、生徒名、担当で配列を作成
const Datesheet= SpreadsheetApp.getActive().getSheetByName("日付マスタ");

  for(let i = 3; i <= 6; i++){
    //iは日付を繰り返す。日付マスタのB3～B6まで

    
    for (let j = 0; j < Keyname.length; j++){
        MonArray[0].push(Datesheet.getRange(i,DateRowNum).getValue());//日付がずれることがあったので、クラシックエディタからタイムゾーンを設定。
        //jは氏名を繰り返す。keyname配列の中身。

        MonArray[1].push(KukakuArray[Keyname.indexOf(Keyname[j])]);//区画を突っ込む
        MonArray[2].push(Keyname[j]);//氏名を突っ込む
        MonArray[3].push(KoshiArray[Keyname.indexOf(Keyname[j])]);//担当を突っ込む
         
        

    }//for(j)終了
  }//for(i)終了

const MonArray_Rev = _.zip.apply(_, MonArray);//配列の行列を入れ替える。
const Karutesheet = SpreadsheetApp.getActive().getSheetByName("授業カルテ");
const ss = SpreadsheetApp.getActive().getSheetByName("test");


Logger.log(MonArray);
Logger.log(MonArray_Rev);

//const LastRow = ss.getRange(ss.getMaxRows(), 1).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();//IDを参照。空白を無視して一番下の行を取得する。
const LastRow = ss.getRange(ss.getMaxRows(), 2).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
Logger.log(LastRow);


//ss.getRange(LastRow + 1,2,MonArray_Rev.length,4).setValues(MonArray_Rev);//MonArray＿Revをカルテに貼り付ける

for (let i = 0; i < MonArray[0].length; i++){
ss.getRange(LastRow + 1 + i ,2).setValue(MonArray[0][i]);//日付をカルテに貼り付ける
ss.getRange(LastRow + 1 + i ,3).setValue(MonArray[1][i]);//区画をカルテに貼り付ける
ss.getRange(LastRow + 1 + i ,6).setValue(MonArray[2][i]);//氏名をカルテに貼り付ける
ss.getRange(LastRow + 1 + i ,7).setValue(MonArray[3][i]);//講師をカルテに貼り付ける
ss.getRange(LastRow + 1 + i ,5).setValue("通常")


}//forsetvalue終了。配列をsetするわけではないので、処理速度は落ちる。。





}//datecreate終了





