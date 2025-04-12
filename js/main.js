

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
            parsedData.forEach(item => {
              const { Provincia, Comune, ...rest } = item;
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
            console.log(transformedData);
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