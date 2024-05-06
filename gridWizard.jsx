var doc = app.activeDocument;

var masterIndex = 0;
var master_spread_left = doc.masterSpreads.item(masterIndex).pages.item(0);
var master_spread_right = doc.masterSpreads.item(masterIndex).pages.item(1);

var pageHeight = Math.round(doc.documentPreferences.pageHeight);
var pageWidth = Math.round(doc.documentPreferences.pageWidth);
var pageRatio;
if (pageHeight >= pageWidth) {
    pageRatio = pageWidth / pageHeight;
} else if (pageWidth > pageHeight) {
    pageRatio = pageHeight / pageWidth;
}

var marginTop, marginBottom, marginLeft, marginRight;
var marginRatio = 1 - pageRatio;


clearAllGuides();
gridWizardDialog();

function gridWizardDialog() {
    var myDialog = app.dialogs.add({ name: "Grid Wizard" });
    with (myDialog) {
        with (dialogColumns.add()) {
            var myEverythingFollowsPageRatioGroup = enablingGroups.add({ staticLabel: "Everything Everywhere All At Page Ratio", checkedState: false });
            with (myEverythingFollowsPageRatioGroup) {
                with (dialogColumns.add()) {

                    with (dialogRows.add()) {
                        staticTexts.add({ staticLabel: "BLABLABLA1" })
                    }

                    with (dialogRows.add()) {
                        with (dialogColumns.add()) {
                            staticTexts.add({ staticLabel: "full - empty spaces ratio:" });
                        }
                        with (dialogColumns.add()) {
                            var myMarginRatioField = realEditboxes.add({ editValue: marginRatio });
                        }
                    }

                    with (dialogRows.add()) {
                        with (dialogColumns.add()) {
                            staticTexts.add({ staticLabel: "columns" });
                        }
                        with (dialogColumns.add()) {
                            var myColumnsNumberField = integerEditboxes.add({ editValue: 1 });
                        }
                    }
                }
            }





            var myGutenbergifyGroup = enablingGroups.add({ staticLabel: "Gutenbergify", checkedState: false });
            with (myGutenbergifyGroup) {
                with (dialogColumns.add()) {

                    with (dialogRows.add()) {
                        staticTexts.add({ staticLabel: "BLABLABLA2" })
                    }

                    with (dialogRows.add()) {
                        with (dialogColumns.add()) {
                            var myFlipHorizontalCheckbox = checkboxControls.add({ staticLabel: "Flip horizontally", checkedState: false });
                        }
                        with (dialogColumns.add()) {
                            var myFlipVerticalCheckbox = checkboxControls.add({ staticLabel: "Flip vertically", checkedState: false });
                        }
                    }
                }
            }





            var myMagicSquaresGroup = enablingGroups.add({ staticLabel: "I kissed a square and I liked it", checkedState: false});
            with (myMagicSquaresGroup) {
                with (dialogColumns.add()) {

                    with (dialogRows.add()) {
                        staticTexts.add({ staticLabel: "BLABLABLA3" })
                    }

                    with (dialogRows.add()) {
                        with (dialogColumns.add()) {
                            staticTexts.add({ staticLabel: "full - empty spaces ratio:" });
                        }
                        with (dialogColumns.add()) {
                            var myMarginRatioField2 = realEditboxes.add({ editValue: marginRatio });
                        }
                    }

                    with (dialogRows.add()) {
                        with (dialogColumns.add()) {
                            staticTexts.add({ staticLabel: "short side subdivisions" });
                        }
                        with (dialogColumns.add()) {
                            var myShortSideSubdivisionsNumberField = integerEditboxes.add({ editValue: 1 });
                        }
                    }

                    with (dialogRows.add()) {
                        with (dialogColumns.add()) {
                            staticTexts.add({ staticLabel: "gutter" });
                        }
                        with (dialogColumns.add()) {
                            var myGutterField = integerEditboxes.add({ editValue: 5 });
                        }
                    }
                }
            }
        }
    }
    myReturn = myDialog.show();
    if (myReturn == true && myEverythingFollowsPageRatioGroup.checkedState == true) {
        var myMarginRatio = myMarginRatioField.editValue;
        var myColumnsNumber = myColumnsNumberField.editValue;
        myDialog.destroy();

        everythingFollowsPageRatio(myMarginRatio, myColumnsNumber);
    } else if (myReturn == true && myGutenbergifyGroup.checkedState == true) {
        var myGutenbergifyPreferences = [];
        if (myFlipHorizontalCheckbox.checkedState == true) {
            myGutenbergifyPreferences.push('horizontallyFlipped');
        } else if (myFlipHorizontalCheckbox.checkedState == false) {
            myGutenbergifyPreferences.push('horizontallyStandard');
        }
        if (myFlipVerticalCheckbox.checkedState == true) {
            myGutenbergifyPreferences.push('verticallyFlipped');
        } else if (myFlipVerticalCheckbox.checkedState == false) {
            myGutenbergifyPreferences.push('verticallyStandard');
        }
        myDialog.destroy();

        gutenbergify(myGutenbergifyPreferences);
    } else if (myReturn == true && myMagicSquaresGroup.checkedState == true) {
        var myMarginRatio2 = myMarginRatioField2.editValue;
        var myShortSideSubdivisionsNumber = myShortSideSubdivisionsNumberField.editValue;
        var myGutter = myGutterField.editValue;
        myDialog.destroy();

        magicSquares(myMarginRatio2, myShortSideSubdivisionsNumber, myGutter);
    }
    else {
        myDialog.destroy();
    }
}





function everythingFollowsPageRatio(marginRatio, columns) {
    var marginWidth = pageWidth * marginRatio;
    var marginHeight = pageHeight * marginRatio;

    marginTop = marginHeight / 2;
    marginBottom = marginHeight / 2;
    marginLeft = marginWidth / 2;
    marginRight = marginWidth / 2;

    var columnsWidth = (pageWidth - marginWidth) / columns;
    var rowsHeight = (columnsWidth * (pageHeight - marginHeight)) / (pageWidth - marginWidth);

    var gutterWidth = (columnsWidth * marginRatio) / 2;
    var gutterHeight = (rowsHeight * marginRatio) / 2;

    for (var i = marginLeft + columnsWidth; i < pageWidth - marginRight - 1; i += columnsWidth) {
        with (master_spread_left) {
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (i - gutterWidth / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (i + gutterWidth / 2) });
        }
        with (master_spread_right) {
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (pageWidth + i - gutterWidth / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (pageWidth + i + gutterWidth / 2) });
        }
    }
    for (var j = marginTop + rowsHeight; j < pageHeight - marginBottom - 1; j += rowsHeight) {
        with (master_spread_left) {
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j - gutterHeight / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j + gutterHeight / 2) });
        }
        with (master_spread_right) {
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j - gutterHeight / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j + gutterHeight / 2) });
        }
    }





    master_spread_left.marginPreferences.properties = {
        right: marginRight,
        top: marginTop,
        left: marginLeft,
        bottom: marginBottom,
    };
    master_spread_right.marginPreferences.properties = master_spread_left.marginPreferences.properties;

    doc.pages.item(0).appliedMaster = doc.masterSpreads.item(0);
}

function gutenbergify(myGutenbergifyPreferences) {

    var moduleHeight = pageHeight / 9;

    //equazione della retta marginTop -> y = moduleHeight * ph

    //equazione della diagonale della pagina -> y = ph/pw * x
    //punto di intersezione -> moduleHeight * ph = ph/pw * x -> x = (moduleHeight * ph * pw) / ph = moduleHeight * pw = 1 / 9 *pw

    //equazione della diagonale della doppia pagina -> y = (ph / (2 * pw)) * x
    //punto di intersezione -> moduleHeight * ph = (ph / (2 * pw)) * x -> x = moduleHeight * 2 * pw -> 2 / 9 * pw

    if (myGutenbergifyPreferences[0] == 'horizontallyStandard') {
        marginRight = pageWidth / 9;
        marginLeft = (pageWidth / 9) * 2;
    } else if (myGutenbergifyPreferences[0] == 'horizontallyFlipped') {
        marginLeft = pageWidth / 9;
        marginRight = (pageWidth / 9) * 2;
    }

    if (myGutenbergifyPreferences[1] == 'verticallyStandard') {
        marginTop = moduleHeight;
        marginBottom = moduleHeight * 2;
    } else if (myGutenbergifyPreferences[1] == 'verticallyFlipped') {
        marginBottom = moduleHeight;
        marginTop = moduleHeight * 2;
    }





    var rowsHeight = (pageHeight - marginTop - marginBottom) / 6;
    var columnsWidth = (pageWidth - marginLeft - marginRight) / 6;

    var gutterHeight = rowsHeight / 9;
    var gutterWidth = columnsWidth / 9;

    for (var i = marginLeft + columnsWidth; i < pageWidth - marginRight - 1; i += columnsWidth) {
        with (master_spread_left) {
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (i - gutterWidth) });
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (i + gutterWidth) });
        }
    }

    for (var j = pageWidth + marginRight + columnsWidth; j < pageWidth * 2 - marginLeft - 1; j += columnsWidth) {
        with (master_spread_right) {
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (j - gutterWidth) });
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (j + gutterWidth) });
        }
    }

    for (var k = marginTop + rowsHeight; k < pageHeight - marginBottom - 1; k += rowsHeight) {
        with (master_spread_left) {
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (k - gutterHeight) });
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (k + gutterHeight) });
        }
        with (master_spread_right) {
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (k - gutterHeight) });
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (k + gutterHeight) });
        }
    }





    master_spread_left.marginPreferences.properties = {
        right: marginLeft,
        top: marginTop,
        left: marginRight,
        bottom: marginBottom,
    };
    master_spread_right.marginPreferences.properties = {
        right: marginLeft,
        top: marginTop,
        left: marginRight,
        bottom: marginBottom,
    };
}

function magicSquares(marginRatio, shortSideSubdivisionsNumber, gutter) {
    var pageShortSide, pageLongSide;
    if (pageHeight >= pageWidth) {
        pageShortSide = pageWidth;
        pageLongSide = pageHeight;
    } else if (pageHeight < pageWidth) {
        pageShortSide = pageHeight;
        pageLongSide = pageWidth;
    }

    var shortSideMargins = Math.round(pageShortSide * marginRatio);
    if (pageHeight >= pageWidth) {
        marginLeft = shortSideMargins / 2;
        marginRight = shortSideMargins / 2;
    } else if (pageHeight < pageWidth) {
        marginTop = shortSideMargins / 2;
        marginBottom = shortSideMargins / 2;
    }

    var longSideMarginsDraft = Math.round(pageLongSide * marginRatio);
    var longSideMargins;

    var subdivisionsLenght = (pageShortSide - shortSideMargins) / shortSideSubdivisionsNumber;

    var longSideSubdivisionsNumber = Math.round((pageLongSide - longSideMarginsDraft) / subdivisionsLenght);
    if ((pageLongSide - longSideMarginsDraft) % subdivisionsLenght !== 0) {
        longSideMargins = pageLongSide - (subdivisionsLenght * longSideSubdivisionsNumber);
    }

    if (pageHeight >= pageWidth) {
        marginTop = longSideMargins / 2;
        marginBottom = longSideMargins / 2;
    } else if (pageHeight < pageWidth) {
        marginLeft = longSideMargins / 2;
        marginRight = longSideMargins / 2;
    }

    for (var i = marginLeft + subdivisionsLenght; i < pageWidth - marginRight - 1; i += subdivisionsLenght) {
        with (master_spread_left) {
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (i - gutter / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (i + gutter / 2) });
        }
        with (master_spread_right) {
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (pageWidth + i - gutter / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: (pageWidth + i + gutter / 2) });
        }
    }
    for (var j = marginTop + subdivisionsLenght; j < pageHeight - marginBottom - 1; j += subdivisionsLenght) {
        with (master_spread_left) {
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j - gutter / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j + gutter / 2) });
        }
        with (master_spread_right) {
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j - gutter / 2) });
            guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: (j + gutter / 2) });
        }
    }



    master_spread_left.marginPreferences.properties = {
        right: marginRight,
        top: marginTop,
        left: marginLeft,
        bottom: marginBottom,
    };
    master_spread_right.marginPreferences.properties = {
        right: marginRight,
        top: marginTop,
        left: marginLeft,
        bottom: marginBottom,
    };
}










function clearAllGuides()
{
  var numGuides = doc.guides.length;
  if (numGuides == 0) return;

  for (var i = numGuides -1; i >=0; i--)
  {
    doc.guides[i].remove();
  }
}