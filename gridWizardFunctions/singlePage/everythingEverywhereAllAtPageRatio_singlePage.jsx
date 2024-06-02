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

clearAllGuides();
everythingEverywhereAllAtPageRatio(areasRatio, 5);





function everythingEverywhereAllAtPageRatio(areasRatio, columns) {
    // calculate the total width of vertical margins and the total height of horizontal margins
    // by picking a custom percentage of the page width and height (default: same ratio of the page short to long side)
    var marginWidth = pageWidth * areasRatio;
    var marginHeight = pageHeight * areasRatio;
    
    marginTop = marginHeight / 2;
    marginBottom = marginHeight / 2;
    marginLeft = marginWidth / 2;
    marginRight = marginWidth / 2;


    // calculate a draft for the columns width
    var columnsWidth = (pageWidth - marginWidth) / columns;
    // calculate the gutters width as a portion of the draft columns width
    // with the same ratio with the column width as the total margins width and height to the page width and height
    var guttersWidth = (pageWidth * areasRatio) / (2 * columns);
    // adjust the columns width to suit the gutters width
    columnsWidth = (pageWidth - marginWidth - guttersWidth * (columns - 1)) / columns;

    // calculate a the rows height so that the module of the grid has the same proportions of the page and the rectangle defined by the margins
    // columnsWidth : (pageWidth - marginsWidth) = x : (pageHeight - marginsHeight) -> x = columnsWidth * (pageHeight - marginsHeight) / (pageWidth - marginsWidth)
    var rowsHeight = columnsWidth * (pageHeight - marginHeight) / (pageWidth - marginWidth);
    // Calculate the gutters height as a portion of the draft columns height
    // with the same ratio with the column height as the total margins width and height to the page width and height
    var guttersHeight = (pageHeight * areasRatio) / (2 * columns)


    // set a loop to draw the vertical guides
    for (var i = 0; i < columns; i++) {
        var xPosition = marginLeft + i * (columnsWidth + guttersWidth);

        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        masterSpread.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + columnsWidth });
    }
    // set a loop to draw the horizontal guides
    for (var j = 0; j < columns; j++) {
        var yPosition = marginTop + j * (rowsHeight + guttersHeight);

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