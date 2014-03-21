var Tabletop = require('tabletop');
var fs = require('fs');

module.exports = function(grunt) {

  grunt.registerMultiTask('bakeproviders', 'Bake provider list to JSON', function() {
    var done = this.async();
    var spreadsheetId = this.data.spreadsheetId;
    var outputFile = this.data.output;
    Tabletop.init({
      key: spreadsheetId,
      callback: function(data, tabletop) {
        var d;
        for (var i = 0; i < data.length; i++) {
          d = data[i];
          d.nearbus = d.nearbus.toLowerCase() === 'true' ? true : false;
          d.lowincome = d.lowincome.toLowerCase() === 'true' ? true : false;
          d.completedculturalcompetencytraining = d.completedculturalcompetencytraining.toLowerCase() === 'true' ? true : false; 
        }
        fs.writeFile(outputFile, JSON.stringify(data), function(err) {
          if (err) {
            grunt.fatal(err);
          }
          else {
            done();
          }
        });
      },
      simpleSheet: true
    });
  });
};
