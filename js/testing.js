//Test js throughout your code
//Only have to add the tag:
//  <script src="js/testing.js" type="text/javascript"></script>

//Immediate Envoke Test sweet
(function (window, undefined) {
  //Variables for the Results container(resultsBox),
  // unordered list(resultsList).
  var resultsBox = document.createElement('div'),
      resultsList = document.createElement('ul'),
      resultEntry;
  //Add to HTML in proper place within page  
  document.body.appendChild(resultsBox).setAttribute('class', 'resultsBox');
  resultsBox.appendChild(resultsList).setAttribute('class', 'resultsList');
  //ResultBox Styles
  resultsBox.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  resultsBox.style.minHeight = '1.5em';
  resultsBox.style.maxHeight = '6em';
  resultsBox.style.width = '10em';
  resultsBox.style.position = 'fixed';
  resultsBox.style.bottom = '0';
  resultsBox.style.right = '2em';
  //ResultList Styles
  resultsList.style.height = '100%';
  resultsList.style.width = '100%';
  /*resultsList.style. = '100%';
  resultsList.style.height = '100%';
  resultsList.style.height = '100%';
  resultsList.style.height = '100%';
  resultsList.style.height = '100%';*/
  var test = function () {
    for (var i = arguments.length; i < arguments[i]; i++) {
      if ( typeof(arguments[i]) === 'array' ) {
        createItem('Cannot Handle Array Items')
      } else {
        this.checkBool(arguments[i]);
        this.createItem(arguments[i]);
      }
    }
    this.checkBool = function (passParam, argBool) {
      return argBool;
    };
    this.createItem = function (argToItem) {
      
    };
    return test;
  };
  window.test = test;
}) (window)
console.log(window.test.isPrototypeOf);