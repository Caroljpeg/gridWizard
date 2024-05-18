#targetengine 'gridWizard';

// global variables
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
var areasRatio = 1 - pageRatio;





gridWizardPalette();





// interface
function gridWizardPalette() {
    var myPalette = new Window ('palette {text: "Grid Wizard", orientation: "column", alignChildren: ["fill","fill"]}');
    myPalette.main = myPalette.add ('group {preferredSize: [600, 500], alignChildren: ["left","fill"]}');

    myPalette.subTabs = myPalette.main.add ('listbox', undefined, ['Everything Everywhere All At Page Ratio', 'Gutenbergify', 'I Kissed A Square And I Liked It']);
    myPalette.tabGroup = myPalette.main.add ('group {alignment: ["fill","fill"], orientation: "stack"}');

    myPalette.tabs = [];

    //1 - everything everywhere all at page ratio
    myPalette.tabs[0]= myPalette.tabGroup.add('group');
    myPalette.tabs[0].add('statictext{text: "Everything Everywhere All At Page Ratio"}')
    myPalette.tabs[0].add('panel');

        // full - empty area ratio
        var EEAAPRAreasRatioGroup = myPalette.tabs[0].add('group');
        EEAAPRAreasRatioGroup.orientation = 'row';
        var EEAAPRAreasRatioDefaultValue = areasRatio.toFixed(2);
            EEAAPRAreasRatioGroup.add('statictext{text: "Full - Empty Area Ratio:"}');
            var EEAAPRMyAreasRatioField = EEAAPRAreasRatioGroup.add('edittext', undefined, EEAAPRAreasRatioDefaultValue);
            EEAAPRMyAreasRatioField.characters = 5;
            EEAAPRMyAreasRatioField.enabled = false;
                var EEAAPRAreasRatioCheckbox = EEAAPRAreasRatioGroup.add('checkbox', undefined, 'set a custom value');
                    EEAAPRAreasRatioCheckbox.onClick = function() {
                        EEAAPRMyAreasRatioField.enabled = EEAAPRAreasRatioCheckbox.value;
                        if(EEAAPRAreasRatioCheckbox.value == false){
                            EEAAPRMyAreasRatioField.text = EEAAPRAreasRatioDefaultValue;
                        }
                    };
                    
        // columns number
        var EEAAPRColumnsGroup = myPalette.tabs[0].add('group');
        EEAAPRColumnsGroup.orientation = 'row';
            EEAAPRColumnsGroup.add('statictext{text: "Number of columns:"}');
            var EEAAPRMyColumnsField = EEAAPRColumnsGroup.add('edittext', undefined, '3');
            EEAAPRMyColumnsField.characters = 5;





    // 2 - gutenbergify
    myPalette.tabs[1]= myPalette.tabGroup.add('group');
    myPalette.tabs[1].add('statictext{text: "Gutenbergify"}')
    myPalette.tabs[1].add('panel');

        // flipping preferences
        var GFlippingPreferencesGroup = myPalette.tabs[1].add('group');
        GFlippingPreferencesGroup.orientation = 'row';
            var GFlipHorizontallyCheckBox = GFlippingPreferencesGroup.add('checkbox', undefined, 'flip horizontally');
            var GFlipVerticallyCheckBox = GFlippingPreferencesGroup.add('checkbox', undefined, 'flip vertically');

        // subdivisions number
        var GSubdivisionsNumberGroup = myPalette.tabs[1].add('group');
        GSubdivisionsNumberGroup.orientation = 'row';
        var GSubdivisionsNumberDefaultValue = 6;
            GSubdivisionsNumberGroup.add('statictext{text: "Subdivisions number:"}');
            var GSubdivisionsNumberField = GSubdivisionsNumberGroup.add('edittext', undefined, GSubdivisionsNumberDefaultValue);
            GSubdivisionsNumberField.characters = 5;
            GSubdivisionsNumberField.enabled = false;
                var GSubdivisionsNumberCheckbox = GSubdivisionsNumberGroup.add('checkbox', undefined, 'set a custom value');
                    GSubdivisionsNumberCheckbox.onClick = function() {
                        GSubdivisionsNumberField.enabled = GSubdivisionsNumberCheckbox.value;
                        if(GSubdivisionsNumberCheckbox.value == false){
                            GSubdivisionsNumberField.text = GSubdivisionsNumberDefaultValue;
                        }
                    };     




    //3 - i kissed a square and i liked it
    myPalette.tabs[2]= myPalette.tabGroup.add('group');
    myPalette.tabs[2].add('statictext{text: "I Kissed A Square And I Liked It"}')
    myPalette.tabs[2].add('panel');

        // full - empty area ratio
        var IKASAILIAreasRatioGroup = myPalette.tabs[2].add('group');
        IKASAILIAreasRatioGroup.orientation = 'row';
        var IKASAILIAreasRatioDefaultValue = areasRatio.toFixed(2);
            IKASAILIAreasRatioGroup.add('statictext{text: "Full - Empty Area Ratio:"}');
            var IKASAILIMyAreasRatioField = IKASAILIAreasRatioGroup.add('edittext', undefined, IKASAILIAreasRatioDefaultValue);
            IKASAILIMyAreasRatioField.characters = 5;
            IKASAILIMyAreasRatioField.enabled = false;
                var IKASAILIAreasRatioCheckbox = IKASAILIAreasRatioGroup.add('checkbox', undefined, 'set a custom value');
                    IKASAILIAreasRatioCheckbox.onClick = function() {
                        IKASAILIMyAreasRatioField.enabled = IKASAILIAreasRatioCheckbox.value;
                        if(IKASAILIAreasRatioCheckbox.value == false){
                            IKASAILIMyAreasRatioField.text = IKASAILIAreasRatioDefaultValue;
                        }
                    };
        
        // short side subdivisions
        var IKASAILIShortSideSubdivisionsGroup = myPalette.tabs[2].add('group');
        IKASAILIShortSideSubdivisionsGroup.orientation = 'row';
            IKASAILIShortSideSubdivisionsGroup.add('statictext{text: "Short side subdivisions:"}');
            var IKASAILIMyShortSideSubdivisionsField = IKASAILIShortSideSubdivisionsGroup.add('edittext', undefined, '3');
            IKASAILIMyShortSideSubdivisionsField.characters = 5;

        // gutter
        var IKASAILIGutterGroup = myPalette.tabs[2].add('group');
        IKASAILIGutterGroup.orientation = 'row';
            IKASAILIGutterGroup.add('statictext{text: "Gutter:"}');
            var IKASAILIMyGutterField = IKASAILIGutterGroup.add('edittext', undefined, '5');
            IKASAILIMyGutterField.characters = 5;





    for (var i = 0; i < myPalette.tabs.length; i++) {
        myPalette.tabs[i].orientation = 'column';
        myPalette.tabs[i].alignChildren = 'fill';
        myPalette.tabs[i].alignment = ['fill','fill'];
        myPalette.tabs[i].visible = false;
    }

    myPalette.subTabs.onChange = showTab;

    function showTab () {
        if ( myPalette.subTabs.selection !== null) {
            for (var i = myPalette.tabs.length - 1; i >= 0; i--) {
                myPalette.tabs[i].visible = false;
            }
            myPalette.tabs[myPalette.subTabs.selection.index].visible = true;
        }
    }





    var quitBotton = myPalette.add('button', undefined, "quit");
    quitBotton.onClick = function(){
        myPalette.close();
    }
    var okButton = myPalette.add ('button', undefined, "GO !!");
    okButton.onClick = function(){
        clearAllGuides();

        if(myPalette.subTabs.selection == 0){
            var EEAAPRMyAreasRatio = parseFloat(EEAAPRMyAreasRatioField.text);
            var EEAAPRMyColumns = parseFloat(EEAAPRMyColumnsField.text);

            everythingEverywhereAllAtPageRatio(EEAAPRMyAreasRatio, EEAAPRMyColumns);
        }
        
        else if(myPalette.subTabs.selection == 1){
            var GMySubdivisionsNumber = parseFloat(GSubdivisionsNumberField.text);
            var GMyFlippingPreferences = [];

            if (GFlipHorizontallyCheckBox.value == true) {
                GMyFlippingPreferences.push('horizontallyFlipped');
            } else if (GFlipHorizontallyCheckBox.value == false) {
                GMyFlippingPreferences.push('horizontallyStandard');
            }
            if (GFlipVerticallyCheckBox.value == true) {
                GMyFlippingPreferences.push('verticallyFlipped');
            } else if (GFlipVerticallyCheckBox.value == false) {
                GMyFlippingPreferences.push('verticallyStandard');
            }

            gutenbergify(GMyFlippingPreferences, GMySubdivisionsNumber);
        } 

        else if(myPalette.subTabs.selection == 2){
            var IKASAILIMyAreasRatio = parseFloat(IKASAILIMyAreasRatioField.text);
            var IKASAILIMyShortSideSubdivisions = parseFloat(IKASAILIMyShortSideSubdivisionsField.text);
            var IKASAILIMyGutter = parseFloat(IKASAILIMyGutterField.text);

            IKissedASquareAndILikedIt(IKASAILIMyAreasRatio, IKASAILIMyShortSideSubdivisions, IKASAILIMyGutter);
        }
    }
    
    myPalette.show();
}




// methods
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

        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + columnsWidth });

        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition + columnsWidth });
    }
    // set a loop to draw the horizontal guides
    for (var j = 0; j < columns; j++) {
        var yPosition = marginTop + j * (rowsHeight + guttersHeight);

        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });

        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });
    }
    
    
    // apply the margin values
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

        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + columnsWidth });
    }

    // set a loop to draw the vertical guides on the right page
    for (var j = 0; j < subdivisionsNumber; j++) {
        var xPosition = marginRight + j * (columnsWidth + guttersWidth);

        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition + columnsWidth });
    }

    // set a loop to draw the horizontal guides
    for (var k = 0; k < subdivisionsNumber; k++) {
        var yPosition = marginTop + k * (rowsHeight + guttersHeight);

        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        master_spread_left.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });

        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        master_spread_right.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });
    }


    // apply the margin values
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

function IKissedASquareAndILikedIt(areasRatio, shortSideSubdivisions, gutter) {
    var pageShortSide, pageLongSide;
    if (pageHeight >= pageWidth) {
        pageShortSide = pageWidth;
        pageLongSide = pageHeight;
    } else if (pageHeight < pageWidth) {
        pageShortSide = pageHeight;
        pageLongSide = pageWidth;
    }

    var shortSideMargins = Math.round(pageShortSide * areasRatio);
    if (pageHeight >= pageWidth) {
        marginLeft = shortSideMargins / 2;
        marginRight = shortSideMargins / 2;
    } else if (pageHeight < pageWidth) {
        marginTop = shortSideMargins / 2;
        marginBottom = shortSideMargins / 2;
    }

    var longSideMarginsDraft = Math.round(pageLongSide * marginRatio);
    var longSideMargins;

    var subdivisionsLenght = (pageShortSide - shortSideMargins) / shortSideSubdivisions;

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





// utilities
function clearAllGuides(){
  var numGuides = doc.guides.length;
  if (numGuides == 0) return;

  for (var i = numGuides -1; i >=0; i--)
  {
    doc.guides[i].remove();
  }
}