var doc = app.activeDocument;

var masterIndex = 0;
var masterSpreadLeft = doc.masterSpreads.item(masterIndex).pages.item(0);
var masterSpreadRight = doc.masterSpreads.item(masterIndex).pages.item(1);

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

var shortSideSubdivisions = 4;
var gutter = 5;

clearAllGuides();
IKissedASquareAndILikedIt(areasRatio, shortSideSubdivisions, gutter);





function IKissedASquareAndILikedIt(areasRatio, shortSideSubdivisions, gutter) {
    var pageShortSide, pageLongSide;
    if (pageHeight >= pageWidth) {
        pageShortSide = pageWidth;
        pageLongSide = pageHeight;
    } else if (pageHeight < pageWidth) {
        pageShortSide = pageHeight;
        pageLongSide = pageWidth;
    }


    // assign the short side margins value
    var shortSideMargins = Math.round(pageShortSide * areasRatio);
    if (pageHeight >= pageWidth) {
        marginLeft = shortSideMargins / 2;
        marginRight = shortSideMargins / 2;
    } else if (pageHeight < pageWidth) {
        marginTop = shortSideMargins / 2;
        marginBottom = shortSideMargins / 2;
    }

    // define the width = height for the subsivisios to fit in the short side  
    var subdivisionsLenght = (pageShortSide - shortSideMargins - gutter * (shortSideSubdivisions - 1)) / shortSideSubdivisions;

    // calculate a draft for the long side margins lenght
    var longSideMarginsDraft = Math.round(pageLongSide * areasRatio);
    var longSideMargins;
    // calculate a draft for the number of subdivisions of the long side, then refine it considering the gutters
    var longSideSubdivisionsDraft = (pageLongSide - longSideMarginsDraft) / subdivisionsLenght;
    var longSideSubdivisions = Math.round((pageLongSide - longSideMarginsDraft - gutter * (longSideSubdivisionsDraft - 1)) / subdivisionsLenght);
    // check if the inner part of the long side (defined by the margins) is divisible by the subdivisions lenght
    // if it's not, recalculate the long side margins accordingly
    if ((pageLongSide - longSideMarginsDraft) % subdivisionsLenght !== 0) {
        longSideMargins = pageLongSide - (subdivisionsLenght * longSideSubdivisions) - gutter * (longSideSubdivisions - 1);
    }

    // assign the long side margins value
    if (pageHeight >= pageWidth) {
        marginTop = longSideMargins / 2;
        marginBottom = longSideMargins / 2;
    } else if (pageHeight < pageWidth) {
        marginLeft = longSideMargins / 2;
        marginRight = longSideMargins / 2;
    }


    if (pageHeight >= pageWidth) {
        // set a loop to draw the long side guides
        for (var i = 0; i < shortSideSubdivisions; i++) {
            var xPosition = marginLeft + i * (subdivisionsLenght + gutter);

            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + subdivisionsLenght });

            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition + subdivisionsLenght });
        }

        // set a loop to draw the short side guides
        for (var j = 0; j < longSideSubdivisions; j++) {
            var yPosition = marginTop + j * (subdivisionsLenght + gutter);

            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + subdivisionsLenght });

            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + subdivisionsLenght });
        }
    }
    
    else if (pageHeight < pageWidth) {
        // set a loop to draw the long side guides
        for (var i = 0; i < longSideSubdivisions; i++) {
            var yPosition = marginLeft + i * (subdivisionsLenght + gutter);

            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: yPosition });
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: yPosition + subdivisionsLenght });

            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + yPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + yPosition + subdivisionsLenght });
        }

        // set a loop to draw the short side guides
        for (var j = 0; j < shortSideSubdivisions; j++) {
            var xPosition = marginTop + j * (subdivisionsLenght + gutter);

            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: xPosition });
            masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: xPosition + subdivisionsLenght });

            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: xPosition });
            masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: xPosition + subdivisionsLenght });
        }
    }


    masterSpreadLeft.marginPreferences.properties = {
        right: marginRight,
        top: marginTop,
        left: marginLeft,
        bottom: marginBottom,
    };
    masterSpreadRight.marginPreferences.properties = {
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