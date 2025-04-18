

  function listabanchetti() {
    return {
      banchetti: ["Loading"],
      loaded: false,
      init() {
        let component = this;
        let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeyfz5PXNwbKrEq9EzxJsjgW_8uGzEs4i-ZeoMHX_ED_kD-mlGiVbR2CwWLDilVKq7TGanknUYsKmO/pub?gid=1915263952&single=true&output=csv";
        Papa.parse(url, {
          download: true,
          header: true,
          complete: function (results) {
            parsedData = results.data;
            const transformedData = {};
            const dateObj = new Date();
            const month   = dateObj.getUTCMonth() + 1; // months from 1-12
            const day     = dateObj.getUTCDate();
            const year    = dateObj.getUTCFullYear();
            parsedData.forEach(item => {
              const { Provincia, Comune, ...rest } = item;
              dates = rest.Giorno.split("/");
              data = new Date(dates[2], dates[1] - 1, dates[0]);

              if((dates[2] < year) || (dates[2] == year && dates[1] < month) || (dates[2] == year && dates[1] == month && dates[0] < day)){
                return;
              }

              if (transformedData[Provincia]) {
                if (transformedData[Provincia][Comune]) {
                  transformedData[Provincia][Comune].push(rest);
                } else {
                  transformedData[Provincia][Comune] = [rest];
                }
              } else {
                transformedData[Provincia] = {};
                transformedData[Provincia][Comune] = [rest];
              }
            });


            component.banchetti = transformedData;
            component.loaded = true;
          },
          error: function (error) {
            console.error('Error parsing CSV:', error);
          }
        });

      }
    };
  }


function province() {
  return {
    province: [
    'Tutte le province',
    'Aosta',
    'Alessandria',
    'Asti',
    'Biella',
    'Cuneo',
    'Novara',
    'Torino',
    'Verbano-Cusio-Ossola'],}
  }

  function to_time(string){
    parts = string.split('.');
    return parts[0] + ':' + parts[1];
  }

  function getType(string){
    if (string == "Banchetto" )
      return "Banchetto";
    else if (string == "Solo volantinaggio")
      return "Volantinaggio";
    else
      return string;
    
  }