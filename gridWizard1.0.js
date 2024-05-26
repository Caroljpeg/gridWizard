#targetengine 'gridWizard';

// global variables
var doc = app.activeDocument;
 
var masterIndex, masterSpreadLeft, masterSpreadRight;

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





gridWizardPalette();





// interface
function gridWizardPalette() {
    var myPalette = new Window ('palette {text: "Grid Wizard", orientation: "column", alignChildren: ["fill","fill"]}');
    myPalette.main = myPalette.add ('group {preferredSize: [600, 300], alignChildren: ["left","fill"]}');

    myPalette.subTabs = myPalette.main.add ('listbox', undefined, ['Grid Wizard', 'Everything Everywhere All At Page Ratio', 'I Kissed A Square And I Liked It', 'Gutenbergify', 'Fibonacci Dreams', 'Pure Chaos']);
    myPalette.tabGroup = myPalette.main.add ('group {alignment: ["fill","fill"], orientation: "stack"}');

    myPalette.tabs = [];
    myPalette.subTabs.selection = 0;

    // 0 - grid wizard
    myPalette.tabs[0]= myPalette.tabGroup.add('group');
    myPalette.tabs[0].add('statictext{text: "Grid Wizard"}');
    var gridWizardDescriptionGroup = myPalette.tabs[0].add('group {alignChildren: ["left", "center"], orientation: "column", spacing: "0"}');
        gridWizardDescriptionGroup.add('statictext{text: "This script serves as a tool for creating and managing grid systems within Adobe InDesign."}');
        gridWizardDescriptionGroup.add('statictext{text: ""}');
        gridWizardDescriptionGroup.add('statictext{text: "In the current tab it is possible to select a target Parent Spread."}');
        gridWizardDescriptionGroup.add('statictext{text: "You can then choose a method to use by navigating through the panels."}');
        gridWizardDescriptionGroup.add('statictext{text: "When you are done inputting your custom values, just press ok and let the magic happen."}');
    myPalette.tabs[0].add('panel');

        // target master
        var targetMasterGroup = myPalette.tabs[0].add('group');
        targetMasterGroup.orientation = 'row';
            targetMasterGroup.add('statictext{text: "target parent spread:"}');
                var masterSpreadsArray = [];
                var masterSpreads = doc.masterSpreads;
                for (var i = 0; i < masterSpreads.length; i++){
                    masterSpreadsArray.push(masterSpreads[i].name);
                }

                var targetMasterSpreadDropdown = targetMasterGroup.add('dropdownlist', undefined, undefined, {name: 'masters', items: masterSpreadsArray});
                targetMasterSpreadDropdown.selection = 0;





    // 1 - everything everywhere all at page ratio
    myPalette.tabs[1]= myPalette.tabGroup.add('group');
    myPalette.tabs[1].add('statictext{text: "Everything Everywhere All At Page Ratio"}');
    var EEAAPRDescriptionGroup = myPalette.tabs[1].add('group {alignChildren: ["left", "center"], orientation: "column", spacing: "0"}');
        EEAAPRDescriptionGroup.add('statictext{text:"This function generates a grid system where everything - from the rectangle defined"}');
        EEAAPRDescriptionGroup.add('statictext{text:"by the margins to the modules into which it is divided - mirrors the page aspect ratio."}');
        EEAAPRDescriptionGroup.add('statictext{text:"It is possible to specify the number of columns and adjust the full-empty areas ratio."}');
        EEAAPRDescriptionGroup.add('statictext{text:""}');
        EEAAPRDescriptionGroup.add('statictext{text:"Note: the default value of the full-empty areas ratio is the same of the page aspect ratio."}');
    myPalette.tabs[1].add('panel');

        // full - empty area ratio
        var EEAAPRAreasRatioGroup = myPalette.tabs[1].add('group');
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
        var EEAAPRColumnsGroup = myPalette.tabs[1].add('group');
        EEAAPRColumnsGroup.orientation = 'row';
            EEAAPRColumnsGroup.add('statictext{text: "Number of columns:"}');
            var EEAAPRMyColumnsField = EEAAPRColumnsGroup.add('edittext', undefined, '3');
            EEAAPRMyColumnsField.characters = 5;





    // 2 - i kissed a square and i liked it
    myPalette.tabs[2]= myPalette.tabGroup.add('group');
    myPalette.tabs[2].add('statictext{text: "I Kissed A Square And I Liked It"}');
    var IKASAILIDescriptionGroup = myPalette.tabs[2].add('group {alignChildren: ["left", "center"], orientation: "column", spacing: "0"}');
        IKASAILIDescriptionGroup.add('statictext{text:"This function creates a square-based grid system."}');
        IKASAILIDescriptionGroup.add('statictext{text:"It is possible to set the number of subdivisions along the short side of the page:"}');
        IKASAILIDescriptionGroup.add('statictext{text:"the subdivisions for the long side are automatically calculated accordingly."}');
        IKASAILIDescriptionGroup.add('statictext{text:"It is also possible to specify the gutter size, for precise control over the grid spacing,"}');
        IKASAILIDescriptionGroup.add('statictext{text:"as well as the full-empty areas ratio."}');
        IKASAILIDescriptionGroup.add('statictext{text:""}');
        IKASAILIDescriptionGroup.add('statictext{text:"Note: the default value of the full-empty areas ratio is the same of the page aspect ratio."}');
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





    // 3 - gutenbergify
    myPalette.tabs[3]= myPalette.tabGroup.add('group');
    myPalette.tabs[3].add('statictext{text: "Gutenbergify"}');
    var GDescriptionGroup = myPalette.tabs[3].add('group {alignChildren: ["left", "center"], orientation: "column", spacing: "0"}');
        GDescriptionGroup.add('statictext{text:"This function recreates parametrically the grid used by Gutenberg in his 42-lines bible."}');
        GDescriptionGroup.add('statictext{text:"It is possible to specify the number of subdivisions and choose to flip the grid"}');
        GDescriptionGroup.add('statictext{text:"horizontally or vertically, allowing for a wider variety of layout systems."}');
    myPalette.tabs[3].add('panel');

        // flipping preferences
        var GFlippingPreferencesGroup = myPalette.tabs[3].add('group');
        GFlippingPreferencesGroup.orientation = 'row';
            var GFlipHorizontallyCheckBox = GFlippingPreferencesGroup.add('checkbox', undefined, 'flip horizontally');
            var GFlipVerticallyCheckBox = GFlippingPreferencesGroup.add('checkbox', undefined, 'flip vertically');

        // subdivisions number
        var GSubdivisionsNumberGroup = myPalette.tabs[3].add('group');
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
    




    // 4 - fibonacci dreams
    myPalette.tabs[4]= myPalette.tabGroup.add('group');
    myPalette.tabs[4].add('statictext{text: "Fibonacci Dreams"}');
    var FDDescriptionGroup = myPalette.tabs[4].add('group {alignChildren: ["left", "center"], orientation: "column", spacing: "0"}');
        FDDescriptionGroup.add('statictext{text:"This function uses Fibonacci sequence numbers to create aesthetically pleasing grid systems."}');
        FDDescriptionGroup.add('statictext{text:"It is possible to select the columns and rows number from the first 6 elements in the sequence,"}');
        FDDescriptionGroup.add('statictext{text:"and choose to flip the grid horizontally or vertically."}');
        FDDescriptionGroup.add('statictext{text:""}');
        FDDescriptionGroup.add('statictext{text:"Note: The module used to build the grid is based on the page width: the page height"}');
        FDDescriptionGroup.add('statictext{text:"will be calculated consequentially and varies depending on the number of rows selected."}');
    myPalette.tabs[4].add('panel');

        // columns & rows number
        var FDColumnsAndRowsGroup = myPalette.tabs[4].add('group');
        FDColumnsAndRowsGroup.orientation = 'row';
            FDColumnsAndRowsGroup.add('statictext{text: "Columns number:"}');
                var FDColumnsNumberArray = ['1', '2', '3', '5', '8', '13'];
                var FDColumnsNumberDropdown = FDColumnsAndRowsGroup.add('dropdownlist', undefined, undefined, {name: 'columns number', items: FDColumnsNumberArray});
                FDColumnsNumberDropdown.selection = 0;
            FDColumnsAndRowsGroup.add('statictext{text: "Rows number:"}');
                var FDRowsNumberArray = ['1', '2', '3', '5', '8', '13'];
                var FDRowsNumberDropdown = FDColumnsAndRowsGroup.add('dropdownlist', undefined, undefined, {name: 'rows number', items: FDRowsNumberArray});
                FDRowsNumberDropdown.selection = 0;

        // flipping preferences
        var FDFlippingPreferencesGroup = myPalette.tabs[4].add('group');
        FDFlippingPreferencesGroup.orientation = 'row';
            var FDFlipHorizontallyCheckBox = FDFlippingPreferencesGroup.add('checkbox', undefined, 'flip horizontally');
            var FDFlipVerticallyCheckBox = FDFlippingPreferencesGroup.add('checkbox', undefined, 'flip vertically');





    // 5 - pure chaos
    myPalette.tabs[5]= myPalette.tabGroup.add('group');
    myPalette.tabs[5].add('statictext{text: "Pure Chaos"}');
    var PCDescriptionGroup = myPalette.tabs[5].add('group {alignChildren: ["left", "center"], orientation: "column", spacing: "0"}');
        PCDescriptionGroup.add('statictext{text:"Just some pseudo-random chaos"}');
    myPalette.tabs[5].add('panel');

        // full - empty area ratio
        var PCAreasRatioGroup = myPalette.tabs[5].add('group');
        PCAreasRatioGroup.orientation = 'row';
        var PCAreasRatioDefaultValue = areasRatio.toFixed(2);
            PCAreasRatioGroup.add('statictext{text: "Full - Empty Area Ratio:"}');
            var PCMyAreasRatioField = PCAreasRatioGroup.add('edittext', undefined, PCAreasRatioDefaultValue);
            PCMyAreasRatioField.characters = 5;
            PCMyAreasRatioField.enabled = false;
                var PCAreasRatioCheckbox = PCAreasRatioGroup.add('checkbox', undefined, 'set a custom value');
                    PCAreasRatioCheckbox.onClick = function() {
                        PCMyAreasRatioField.enabled = PCAreasRatioCheckbox.value;
                        if(PCAreasRatioCheckbox.value == false){
                            PCMyAreasRatioField.text = PCAreasRatioDefaultValue;
                        }
                    };

        // columns & rows number
        var PCColumnsAndRowsNumberGroup = myPalette.tabs[5].add('group');
        PCColumnsAndRowsNumberGroup.orientation = 'row';
            PCColumnsAndRowsNumberGroup.add('statictext{text: "Columns:"}');
            var PCMyColumnsNumberField = PCColumnsAndRowsNumberGroup.add('edittext', undefined, '3');
            PCMyColumnsNumberField.characters = 5;
            PCColumnsAndRowsNumberGroup.add('statictext{text: "Rows:"}');
            var PCMyRowsNumberField = PCColumnsAndRowsNumberGroup.add('edittext', undefined, '5');
            PCMyRowsNumberField.characters = 5;

        // gutter min/max width
        var PCGutterWidthGroup = myPalette.tabs[5].add('group');
        PCGutterWidthGroup.orientation = 'row';
            PCGutterWidthGroup.add('statictext{text: "Gutter min width:"}');
            var PCMyGutterMinWidthField = PCGutterWidthGroup.add('edittext', undefined, '2');
            PCMyGutterMinWidthField.characters = 5;
            PCGutterWidthGroup.add('statictext{text: "Gutter max width:"}');
            var PCMyGutterMaxWidthField = PCGutterWidthGroup.add('edittext', undefined, '10');
            PCMyGutterMaxWidthField.characters = 5;

        // gutter min/max height
        var PCGutterHeightGroup = myPalette.tabs[5].add('group');
        PCGutterHeightGroup.orientation = 'row';
            PCGutterHeightGroup.add('statictext{text: "Gutter min height:"}');
            var PCMyGutterMinHeightField = PCGutterHeightGroup.add('edittext', undefined, '2');
            PCMyGutterMinHeightField.characters = 5;
            PCGutterHeightGroup.add('statictext{text: "Gutter max height:"}');
            var PCMyGutterMaxHeightField = PCGutterHeightGroup.add('edittext', undefined, '10');
            PCMyGutterMaxHeightField.characters = 5;


        
        // facing pages preferences
        var PCFacingPreferencesGroup = myPalette.tabs[5].add('group');
         PCFacingPreferencesGroup.orientation = 'row';
             PCFacingPreferencesGroup.add('statictext{text: "Facing pages handling:"}');
                 var PCFacingPagesPreferencesArray = ['specular', 'symmetrical', 'untied'];
                 var PCFacingPagesPreferencesDropDown = PCFacingPreferencesGroup.add('dropdownlist', undefined, undefined, {name: 'facing pages preferences', items: PCFacingPagesPreferencesArray});
                 PCFacingPagesPreferencesDropDown.selection = 0;

        





    for (var i = 0; i < myPalette.tabs.length; i++) {
        myPalette.tabs[i].orientation = 'column';
        myPalette.tabs[i].alignChildren = 'fill';
        myPalette.tabs[i].alignment = ['fill','fill'];
    }
    for (var i = 1; i < myPalette.tabs.length; i++) {
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




    var buttonsGroup = myPalette.add('group');
    buttonsGroup.orientation = 'row';
    buttonsGroup.alignChildren = ['fill', 'fill'];

        var quitBotton = buttonsGroup.add('button', undefined, "Quit");
        quitBotton.onClick = function(){
            myPalette.close();
        }

        var okButton = buttonsGroup.add ('button', undefined, "Ok");
        okButton.onClick = function(){
            masterIndex = targetMasterSpreadDropdown.selection.index;
            masterSpreadLeft = doc.masterSpreads.item(masterIndex).pages.item(0);
            masterSpreadRight = doc.masterSpreads.item(masterIndex).pages.item(1);

            clearAllGuides(masterIndex);

            if(myPalette.subTabs.selection == 0){
                alert('select a function')
            }

            else if(myPalette.subTabs.selection == 1){
                var EEAAPRMyAreasRatio = parseFloat(EEAAPRMyAreasRatioField.text);
                var EEAAPRMyColumns = parseFloat(EEAAPRMyColumnsField.text);

                everythingEverywhereAllAtPageRatio(EEAAPRMyAreasRatio, EEAAPRMyColumns);
            }

            else if(myPalette.subTabs.selection == 2){
                var IKASAILIMyAreasRatio = parseFloat(IKASAILIMyAreasRatioField.text);
                var IKASAILIMyShortSideSubdivisions = parseFloat(IKASAILIMyShortSideSubdivisionsField.text);
                var IKASAILIMyGutter = parseFloat(IKASAILIMyGutterField.text);

                IKissedASquareAndILikedIt(IKASAILIMyAreasRatio, IKASAILIMyShortSideSubdivisions, IKASAILIMyGutter);
            }

            else if(myPalette.subTabs.selection == 3){
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

            else if(myPalette.subTabs.selection == 4){
                var FDMyColumnsNumber = parseFloat(FDColumnsNumberDropdown.selection.text);
                var FDMyRowsNumber = parseFloat(FDRowsNumberDropdown.selection.text);

                var FDMyFlippingPreferences = [];

                if (FDFlipHorizontallyCheckBox.value == true) {
                    FDMyFlippingPreferences.push('horizontallyFlipped');
                } else if (FDFlipHorizontallyCheckBox.value == false) {
                    FDMyFlippingPreferences.push('horizontallyStandard');
                }
                if (FDFlipVerticallyCheckBox.value == true) {
                    FDMyFlippingPreferences.push('verticallyFlipped');
                } else if (FDFlipVerticallyCheckBox.value == false) {
                    FDMyFlippingPreferences.push('verticallyStandard');
                }

                fibonacciDreams(FDMyFlippingPreferences, FDMyColumnsNumber, FDMyRowsNumber);
            }
            else if(myPalette.subTabs.selection == 5){
                var PCMyAreasRatio = parseFloat(PCMyAreasRatioField.text);

                var PCMyColumnsNumber = parseFloat(PCMyColumnsNumberField.text);
                var PCMyRowsNumber = parseFloat(PCMyRowsNumberField.text);

                var PCMyGutterMinWidth = parseFloat(PCMyGutterMinWidthField.text);
                var PCMyGutterMaxWidth = parseFloat(PCMyGutterMaxWidthField.text);

                var PCMyGutterMinHeight = parseFloat(PCMyGutterMinHeightField.text);
                var PCMyGutterMaxHeight = parseFloat(PCMyGutterMaxHeightField.text);

                var PCMyFacingPagesPreferences = [];

                if (PCFacingPagesPreferencesDropDown.selection.text == 'specular') {
                    PCMyFacingPagesPreferences.push('specular');
                } else if (PCFacingPagesPreferencesDropDown.selection.text == 'symmetrical') {
                    PCMyFacingPagesPreferences.push('symmetrical');
                } else if (PCFacingPagesPreferencesDropDown.selection.text == 'untied') {
                    PCMyFacingPagesPreferences.push('untied');
                }

                pureChaos(PCMyAreasRatio, PCMyColumnsNumber, PCMyRowsNumber, PCMyGutterMinWidth, PCMyGutterMaxWidth, PCMyGutterMinHeight, PCMyGutterMaxHeight, PCMyFacingPagesPreferences);
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

        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + columnsWidth });

        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition + columnsWidth });
    }
    // set a loop to draw the horizontal guides
    for (var j = 0; j < columns; j++) {
        var yPosition = marginTop + j * (rowsHeight + guttersHeight);

        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });

        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });
    }
    
    
    // apply the margin values
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

        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition });
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: xPosition + columnsWidth });
    }

    // set a loop to draw the vertical guides on the right page
    for (var j = 0; j < subdivisionsNumber; j++) {
        var xPosition = marginRight + j * (columnsWidth + guttersWidth);

        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.vertical, location: pageWidth + xPosition + columnsWidth });
    }

    // set a loop to draw the horizontal guides
    for (var k = 0; k < subdivisionsNumber; k++) {
        var yPosition = marginTop + k * (rowsHeight + guttersHeight);

        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadLeft.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });

        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition });
        masterSpreadRight.guides.add(undefined, { orientation: HorizontalOrVertical.horizontal, location: yPosition + rowsHeight });
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





// utilities
function clearAllGuides(masterIndex){
  var numGuides = doc.masterSpreads.item(masterIndex).guides.length;
  if (numGuides == 0) return;

  for (var i = numGuides -1; i >=0; i--)
  {
    doc.masterSpreads.item(masterIndex).guides[i].remove();
  }
}

function genRand (min, max, decimalPlaces) {
    var result = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    var result = Math.floor(result * power) / power;
    return result;
}