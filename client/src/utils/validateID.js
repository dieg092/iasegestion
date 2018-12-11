const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const cifRexp = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

export default id => {
  const str = id.toString().toUpperCase();
  let state = false;
  let result = '';

  if (!nifRexp.test(str) && !nieRexp.test(str) && !cifRexp.test(str)) return false;

  const nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

  const letter = str.substr(-1);
  const charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  var valueCif=str.substr(1,str.length-2);
  var suma=0;
  for(let i=1;i<valueCif.length;i=i+2){
    suma=suma+parseInt(valueCif.substr(i,1));
  }
  var suma2=0;

  for(let i=0;i<valueCif.length;i=i+2){
    result=parseInt(valueCif.substr(i,1))*2;
    if(String(result).length==1)
    {
      suma2=suma2+parseInt(result);
    } else {
      suma2=suma2+parseInt(String(result).substr(0,1))+parseInt(String(result).substr(1,1));
    }
  }

  suma=suma+suma2;
  var unidad=String(suma).substr(1,1)

  unidad=10-parseInt(unidad);

  var primerCaracter=str.substr(0,1).toUpperCase();
  if (primerCaracter.match(/^[FJKNPQRSUVW]$/)) {
    if(String.fromCharCode(64+unidad).toUpperCase()==str.substr(str.length-1,1).toUpperCase())
      return true;

  } else if (primerCaracter.match(/^[XYZ]$/)){
    var newcif;

    if(primerCaracter=="X")
      newcif=str.substr(1);

    else if(primerCaracter=="Y")
      newcif="1"+str.substr(1);

    else if(primerCaracter=="Z")
      newcif="2"+str.substr(1);

  } else if (primerCaracter.match(/^[ABCDEFGHLM]$/)){
    if (unidad==10)
      unidad=0;
    if (str.substr(str.length-1,1)==String(unidad))
      return true;
  }
  return state;
};
