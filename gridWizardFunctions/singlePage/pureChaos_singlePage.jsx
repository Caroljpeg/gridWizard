var doc = app.activeDocument;

var masterIndex = 0;
var masterSpread = doc.masterSpreads.item(masterIndex).pages.item(0);

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

var columns = 3;
var rows = 5;
var gutterMinWidth = 2;
var gutterMaxWidth = 10;
var gutterMinHeight = 2;
var gutterMaxHeight = 10;





clearAllGuides();
pureChaos(areasRatio, columns, rows, gutterMinWidth, gutterMaxWidth, gutterMinHeight, gutterMaxHeight);





function pureChaos(areasRatio, columns, rows, gutterMinWidth, gutterMaxWidth, gutterMinHeight, gutterMaxHeight) {
    // define the maximum value of the left and right margins combined as a percentage of the page total width
    var marginMaxWidth = (pageWidth * areasRatio) / 2;
    // pick a random value between 0 and the marginMaxWidth
    marginLeft = genRand(0, marginMaxWidth, 1);
    marginRight = genRand(0, marginMaxWidth, 1);

    // define the maximum value of the top and bottom margins combined as a percentage of the page total height
    var marginMaxHeight = (pageHeight * areasRatio) / 2;
    // pick a random value between 0 and the marginMaxHeight
    marginTop = genRand(0, marginMaxHeight, 1);
    marginBottom = genRand(0, marginMaxHeight, 1);


    var gutterMediumWidth = (gutterMinWidth + gutterMaxWidth) / 2;
    var gutterMediumHeight = (gutterMinHeight + gutterMaxHeight) / 2;
    var columnsWidth = (pageWidth - marginLeft - marginRight - gutterMediumWidth * (columns - 1)) / columns;
    var rowsHeight = (pageHeight - marginTop - marginBottom - gutterMediumHeight * (rows - 1)) / rows;

    // set a loop to draw the vertical guides
    var xPosition = marginLeft;
    for (var i = 0; i < columns - 1; i++) {
        xPosition += columnsWidth;
        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });

        xPosition += genRand(gutterMinWidth, gutterMaxWidth, 1);
        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
    }

    // set a loop to draw the horizontal guides
    var yPosition = marginTop;
    for (var i = 0; i < rows - 1; i++) {
        yPosition += rowsHeight;
        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });

        yPosition += genRand(gutterMinHeight, gutterMaxHeight, 1);
        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
    }


    // apply the margin values

    masterSpread.marginPreferences.properties = {
        right: marginRight,
        top: marginTop,
        left: marginLeft,
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

function genRand (min, max, decimalPlaces) {
    var result = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    var result = Math.floor(result * power) / power;
    return result;
}