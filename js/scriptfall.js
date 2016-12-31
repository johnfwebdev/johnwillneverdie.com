(function(window, undefined){
    
    var parentContainer = document.getElementsByClassName('stringFall_Container'),
        paras = document.getElementsByClassName('para'),
        running = false,
        containerWidth,
        paraWidth,
        difference,
        paraAmount; 
    
    function checkContainerWidth () {
        console.log('Running checkContainerWidth();')
        containerWidth = parentContainer[0].offsetWidth;
        console.log('The containers size is:' + containerWidth)
        return true;
    }
    
    function checkParaWidth () {
        console.log('Running checkParaWidth();')
        paraWidth = paras[0].offsetWidth;
        console.log('The Paragraphs size is:' + paraWidth)
        return true;
    }
    
    function checkParaAmount () {
        console.log('Running checkParaAmount();');
        paraAmount = paras.length;
        console.log(paraAmount);
        return true;
    }
    
    function checkDifference () {
        console.log('Running checkDifference();');
        difference = Math.floor(containerWidth / paraWidth) - paraAmount;
        return true;
    }
    
    function addPara (number) {
        console.log('Running addPara();');
        number = number === undefined ? 1 : number;
        console.log(number);
        for (var i = 0; i < number; i++) {
            var create = document.createElement('p');
            parentContainer[0].appendChild(create).setAttribute('class', 'para');
        }
        return true;
    }
    
    function removePara (number) {
        console.log('Running removePara()');
        var lastElement = paras[paras.length - 1];
        checkParaAmount();
        number = number === undefined ? 1 : number;
        for (var i = 0; i < number; i++) {
            parentContainer[0].removeChild(lastElement);
        }
        return true;
    }
    
    function throttle(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    }
    
    function executeOnResize () {
        checkParaAmount();
        checkDifference();
        console.log('Running executeOnResize();');
        checkContainerWidth();
        if (difference > paraAmount) {
            addPara(difference - paraAmount);
        } else if (paraAmount > difference) {
            removePara(paraAmount - difference)
        }
        running = false;
    }
    
    // Loads                                                    Given
    // Add a Paragraph                                          Done
    // Get Container width                                      Done
    // Get Paragraph width                                      Done
    // Divide the Container Width by Paragraph Width            Done
    // Add Paragraphs until equal to the difference             Done
    // Add Listener to repeat the step.                         Done
    addPara();
    checkContainerWidth();
    checkParaWidth();
    checkParaAmount();
    checkDifference();
    console.log(difference);
    addPara(difference - 1);
    
    window.addEventListener('resize', function () {
        if (running) {
            return;
        } else {
            executeOnResize();
        }
        running = true;
    }, false);
})(this);




























