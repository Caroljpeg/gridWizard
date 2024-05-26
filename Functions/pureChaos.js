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

var facingPagesPreferences = ['untied'];
var columns = 3;
var rows = 5;
var gutterMinWidth = 2;
var gutterMaxWidth = 10;
var gutterMinHeight = 2;
var gutterMaxHeight = 10;





clearAllGuides();
pureChaos(areasRatio, columns, rows, gutterMinWidth, gutterMaxWidth, gutterMinHeight, gutterMaxHeight, facingPagesPreferences);





function pureChaos(areasRatio, columns, rows, gutterMinWidth, gutterMaxWidth, gutterMinHeight, gutterMaxHeight, facingPagesPreferences) {
    // define the maximum value of the left and right margins combined as a percentage of the page total width
    var marginMaxWidth = (pageWidth * areasRatio) / 2;
    // pick a random value between 0 and the marginMaxWidth
    marginLeft = genRand(0, marginMaxWidth, 1);
    marginRight = genRand(0, marginMaxWidth, 1);
    if(facingPagesPreferences == 'untied'){
        var marginLeft2 = genRand(0, marginMaxWidth, 1);
        var marginRight2 = genRand(0, marginMaxWidth, 1);
    }

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

    if(facingPagesPreferences == 'specular'){
        for (var i = 0; i < columns - 1; i++) {
            xPosition += columnsWidth;
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth * 2 - xPosition });
            xPosition += genRand(gutterMinWidth, gutterMaxWidth, 1);
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth * 2 - xPosition });
        }
    }
    else if(facingPagesPreferences == 'symmetrical'){
        for (var i = 0; i < columns - 1; i++) {
            xPosition += columnsWidth;
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
            xPosition += genRand(gutterMinWidth, gutterMaxWidth, 1);
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
        }
    }
    else if(facingPagesPreferences == 'untied'){
        var xPosition2 = pageWidth + marginLeft2;

        for (var i = 0; i < columns - 1; i++) {
            xPosition += columnsWidth;
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
            xPosition += genRand(gutterMinWidth, gutterMaxWidth, 1);
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        }
        for (var j = 0; j < columns - 1; j++) {
            xPosition2 += columnsWidth;
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition2 });
            xPosition2 += genRand(gutterMinWidth, gutterMaxWidth, 1);
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition2 });
        }
    }

    // set a loop to draw the horizontal guides
    var yPosition = marginTop;
    for (var i = 0; i < rows - 1; i++) {
        yPosition += rowsHeight;
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        yPosition += genRand(gutterMinHeight, gutterMaxHeight, 1);
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
    }


    // apply the margin values
    if(facingPagesPreferences == 'specular'){
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
    else if(facingPagesPreferences == 'symmetrical'){
        masterSpreadLeft.marginPreferences.properties = {
            right: marginLeft,
            top: marginTop,
            left: marginRight,
            bottom: marginBottom,
        };
        masterSpreadRight.marginPreferences.properties = {
            right: marginRight,
            top: marginTop,
            left: marginLeft,
            bottom: marginBottom,
        };
    }
    else if(facingPagesPreferences == 'untied'){
        masterSpreadLeft.marginPreferences.properties = {
            right: marginLeft,
            top: marginTop,
            left: marginRight,
            bottom: marginBottom,
        };
        masterSpreadRight.marginPreferences.properties = {
            right: marginRight2,
            top: marginTop,
            left: marginLeft2,
            bottom: marginBottom,
        };
    }
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