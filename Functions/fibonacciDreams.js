var doc = app.activeDocument;

var masterIndex = 0;
var masterSpreadLeft = doc.masterSpreads.item(masterIndex).pages.item(0);
var masterSpreadRight = doc.masterSpreads.item(masterIndex).pages.item(1);

var pageHeight = Math.round(doc.documentPreferences.pageHeight);
var pageWidth = Math.round(doc.documentPreferences.pageWidth);
var pageRatio;
if (pageHeight >= pageWidth) {
    pageRatio = pageWidth / pageHeight;
} else if (pageWidth > pageHeight) {
    pageRatio = pageHeight / pageWidth;
}

var marginTop, marginBottom, marginLeft, marginRight;
var areasRatio = 1 - pageRatio;

var flippingPreferences = ['horizontallyFlipped', 'verticallyStandard'];
var columnsNumber = 5;
var rowsNumber = 3;





clearAllGuides();
fibonacciDreams(flippingPreferences, columnsNumber, rowsNumber);





function fibonacciDreams(flippingPreferences, columnsNumber, rowsNumber) {
    var pageDivider = columnsNumber - 1 + 2 + 3 + 5 * columnsNumber;
    var module = pageWidth / pageDivider;
    var subdivisionsLenght = module * 5;


    // get the user's flipping preferences and set the margins accordingly
    if (flippingPreferences[0] == 'horizontallyStandard') {
        marginRight = module * 2;
        marginLeft = module * 3;
    } else if (flippingPreferences[0] == 'horizontallyFlipped') {
        marginLeft = module * 2;
        marginRight = module * 3;
    }

    if (flippingPreferences[1] == 'verticallyStandard') {
        marginTop = module * 2;
        marginBottom = module * 3;
    } else if (flippingPreferences[1] == 'verticallyFlipped') {
        marginBottom = module * 3;
        marginTop = module * 2;
    }


    var newPageHeight = marginTop + (module * 5) * rowsNumber + module * (rowsNumber - 1) + marginBottom;
    doc.documentPreferences.pageHeight = newPageHeight

    // set a loop to draw the long side guides on the left page
    for (var i = 0; i < columnsNumber; i++) {
        var xPosition = marginLeft + i * (subdivisionsLenght + module);

        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + subdivisionsLenght });
    }

    // set a loop to draw the long side guides on the right page
    for (var j = 0; j < columnsNumber; j++) {
        var xPosition = marginRight + j * (subdivisionsLenght + module);

        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition + subdivisionsLenght });
    }

    // set a loop to draw the short side guides
    for (var k = 0; k < rowsNumber; k++) {
        var yPosition = marginTop + k * (subdivisionsLenght + module);

        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + subdivisionsLenght });

        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + subdivisionsLenght });
    }

    
    // apply the margin values
    masterSpreadLeft.marginPreferences.properties = {
        right: marginLeft,
        top: marginTop,
        left: marginRight,
        bottom: marginBottom,
    };
    masterSpreadRight.marginPreferences.properties = {
        right: marginLeft,
        top: marginTop,
        left: marginRight,
        bottom: marginBottom,
    };
}





function clearAllGuides(){
    var numGuides = doc.guides.length;
    if (numGuides == 0) return;
  
    for (var i = numGuides -1; i >=0; i--)
    {
      doc.guides[i].remove();
    }
  }