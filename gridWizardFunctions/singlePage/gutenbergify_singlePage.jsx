var doc = app.activeDocument;

var masterIndex = 0;
var masterSpread = doc.masterSpreads.item(masterIndex).pages.item(0);

var pageHeight = Math.round(doc.documentPreferences.pageHeight * 10) / 10;
var pageWidth = Math.round(doc.documentPreferences.pageWidth * 10) / 10;
var pageRatio;
if (pageHeight >= pageWidth) {
    pageRatio = pageWidth / pageHeight;
} else if (pageWidth > pageHeight) {
    pageRatio = pageHeight / pageWidth;
}

var marginTop, marginBottom, marginLeft, marginRight;
var areasRatio = 1 - pageRatio;

var flippingPreferences = ['horizontallyStandard', 'verticallyStandard']
var subdivisionsNumber = 6;

clearAllGuides();
gutenbergify(flippingPreferences, subdivisionsNumber);





function gutenbergify(flippingPreferences, subdivisionsNumber) {
    // set a custom number of modules to subdivide the square defined by the margins in vertically and horizontally (default: 6)
    var moduleHeight = pageHeight / 9;

    // get the user's flipping preferences and set the margins accordingly
    if (flippingPreferences[0] == 'horizontallyStandard') {
        marginRight = pageWidth / 9;
        marginLeft = (pageWidth / 9) * 2;
    } else if (flippingPreferences[0] == 'horizontallyFlipped') {
        marginLeft = pageWidth / 9;
        marginRight = (pageWidth / 9) * 2;
    }

    if (flippingPreferences[1] == 'verticallyStandard') {
        marginTop = moduleHeight;
        marginBottom = moduleHeight * 2;
    } else if (flippingPreferences[1] == 'verticallyFlipped') {
        marginBottom = moduleHeight;
        marginTop = moduleHeight * 2;
    }


    // marginTop equation -> y = moduleHeight * ph

    // Page's diagonal equation -> y = ph/pw * x
    // intersection point with marginTop -> moduleHeight * ph = ph/pw * x -> x = (moduleHeight * ph * pw) / ph = moduleHeight * pw = 1 / 9 *pw

    // facing pages' diagonal equation -> y = (ph / (2 * pw)) * x
    // intersection point with marginTop -> moduleHeight * ph = (ph / (2 * pw)) * x -> x = moduleHeight * 2 * pw -> 2 / 9 * pw

    var rowsHeight = (pageHeight - marginTop - marginBottom) / subdivisionsNumber;
    var columnsWidth = (pageWidth - marginLeft - marginRight) / subdivisionsNumber;

    var guttersHeight = rowsHeight / 9;
    var guttersWidth = columnsWidth / 9;

    rowsHeight = (pageHeight - marginTop - marginBottom - guttersHeight * (subdivisionsNumber - 1)) / subdivisionsNumber;
    columnsWidth = (pageWidth - marginLeft - marginRight - guttersWidth * (subdivisionsNumber - 1)) / subdivisionsNumber;


    // set a loop to draw the vertical guides on the left page
    for (var i = 0; i < subdivisionsNumber; i++) {
        var xPosition = marginLeft + i * (columnsWidth + guttersWidth);

        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + columnsWidth });
    }

    // set a loop to draw the horizontal guides
    for (var k = 0; k < subdivisionsNumber; k++) {
        var yPosition = marginTop + k * (rowsHeight + guttersHeight);

        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });
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