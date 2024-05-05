var doc = app.activeDocument;
var masterIndex = 0;
var master_spread_left = doc.masterSpreads.item(masterIndex).pages.item(0);
var master_spread_right = doc.masterSpreads.item(masterIndex).pages.item(1);

var pageHeight = doc.documentPreferences.pageHeight;
var pageWidth = doc.documentPreferences.pageWidth;
var pageLongSide, pageShortSide;
if(pageHeight > pageWidth){
    pageLongSide = pageHeight;
    pageShortSide = pageWidth;
} else if (pageWidth > pageHeight){
    pageLongSide = pageWidth;
    pageShortSide = pageHeight;
}
var pageRatio = pageShortSide / pageLongSide;
var marginTop, marginBottom, marginLeft, marginRight;
var marginRatio = 1 - pageRatio;

gridWizardDialog();

function gridWizardDialog(){
	var myLabelWidth = 100;
	var myDialog = app.dialogs.add({name:"grid wizard"});
	with(myDialog){
		with(dialogColumns.add()){
            var myEverythingFollowsPageRatioGroup = enablingGroups.add({staticLabel:"Everything Follows Page Ratio", checkedState:false});
            with(myEverythingFollowsPageRatioGroup){
                with(borderPanels.add()){
                    with(dialogColumns.add()){

                        with(dialogRows.add()){
                            staticTexts.add({staticLabel:"This method produces a layout based on harmony with the dimensional proportions of the page."})
                        }

                        with(dialogRows.add()){
                            with(dialogColumns.add()){
                                staticTexts.add({staticLabel:"margins ratio:", minWidth:myLabelWidth});
                            }
                            with(dialogColumns.add()){
                                var myMarginRatioField = realEditboxes.add({editValue:marginRatio});
                            }
                        }

                        with(dialogRows.add()){
                            with(dialogColumns.add()){
                                staticTexts.add({staticLabel:"columns", minWidth:myLabelWidth});
                            }
                            with(dialogColumns.add()){
                                var myColumnsNumberField = integerEditboxes.add({editValue:5});
                            }
                        }
                    }
                }
            }





            var myGutenbergifyGroup = enablingGroups.add({staticLabel:"Gutenbergify", checkedState:false});
            with(myGutenbergifyGroup){
                with(borderPanels.add()){
                    with(dialogColumns.add()){

                        with(dialogRows.add()){
                            staticTexts.add({staticLabel:"This method produces a layout based on the construction of the 42-lines bible's layout."})
                        }

                        with(dialogRows.add()){
                            with(dialogColumns.add()){
                                var myFlipHorizontalCheckbox = checkboxControls.add({staticLabel:"Flip horizontally", checkedState:false});
                            }
                            with(dialogColumns.add()){
                                var myFlipVerticalCheckbox = checkboxControls.add({staticLabel:"Flip vertically", checkedState:false});
                            }
                        }
                    }
                }
            }
		}
	}
	myReturn = myDialog.show();
	if (myReturn == true && myEverythingFollowsPageRatioGroup.checkedState == true){
		var myMarginRatio = myMarginRatioField.editValue;
		var myColumnsNumber = myColumnsNumberField.editValue;
		myDialog.destroy();
		if(myMarginRatio + myColumnsNumber != 0){
			everythingFollowsPageRatio(myMarginRatio, myColumnsNumber);
		}
	} else if (myReturn == true && myGutenbergifyGroup.checkedState == true){
        var myGutenbergifyPreferences = []; 
        if(myFlipHorizontalCheckbox.checkedState == true){
            myGutenbergifyPreferences.push('horizontallyFlipped');
        } else if(myFlipHorizontalCheckbox.checkedState == false){
            myGutenbergifyPreferences.push('horizontallyStandard');
        }
        if(myFlipVerticalCheckbox.checkedState == true){
            myGutenbergifyPreferences.push('verticallyFlipped');
        } else if(myFlipHorizontalCheckbox.checkedState == false){
            myGutenbergifyPreferences.push('verticallyStandard');
        }
		myDialog.destroy();
        gutenbergify(myGutenbergifyPreferences);
    }
	else{
		myDialog.destroy();
	}
}





function everythingFollowsPageRatio(marginRatio, columns){    
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

    for(var i = marginLeft + columnsWidth; i < pageWidth - marginRight - 1; i += columnsWidth){
        with(master_spread_left){
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(i - gutterWidth / 2)});
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(i + gutterWidth / 2)});
        }
        with(master_spread_right){
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(pageWidth + i - gutterWidth / 2)});
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(pageWidth + i + gutterWidth / 2)});
        }
    }
    for(var j = marginTop + rowsHeight; j < pageHeight - marginBottom - 1; j += rowsHeight){
        with(master_spread_left){
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(j - gutterHeight / 2)});
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(j + gutterHeight / 2)});
        }
        with(master_spread_right){
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(j - gutterHeight / 2)});
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(j + gutterHeight / 2)});
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

function gutenbergify(myGutenbergifyPreferences){

    var moduleHeight = pageHeight / 9;

    //equazione della retta marginTop -> y = moduleHeight * ph

    //equazione della diagonale della pagina -> y = ph/pw * x
    //punto di intersezione -> moduleHeight * ph = ph/pw * x -> x = (moduleHeight * ph * pw) / ph = moduleHeight * pw = 1 / 9 *pw
    
    //equazione della diagonale della doppia pagina -> y = (ph / (2 * pw)) * x
    //punto di intersezione -> moduleHeight * ph = (ph / (2 * pw)) * x -> x = moduleHeight * 2 * pw -> 2 / 9 * pw

    if(myGutenbergifyPreferences[0] == 'horizontallyStandard'){
        marginRight = pageWidth / 9;
        marginLeft = (pageWidth / 9) * 2;
    } else if(myGutenbergifyPreferences[0] == 'horizontallyFlipped'){
        marginLeft = pageWidth / 9;
        marginRight = (pageWidth / 9) * 2;
    }

    if(myGutenbergifyPreferences[1] == 'verticallyStandard'){
        marginTop = moduleHeight;
        marginBottom = moduleHeight * 2;
    } else if(myGutenbergifyPreferences[1] == 'verticallyFlipped'){
        marginBottom = moduleHeight;
        marginTop = moduleHeight * 2;
    }



    

    var rowsHeight = (pageHeight - marginTop - marginBottom) / 6;
    var columnsWidth = (pageWidth - marginLeft - marginRight) / 6;

    var gutterHeight = rowsHeight / 9;
    var gutterWidth = columnsWidth / 9;

    for(var i = marginLeft + columnsWidth; i < pageWidth - marginRight - 1; i += columnsWidth){
        with(master_spread_left){
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(i - gutterWidth)});
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(i + gutterWidth)});
        }
    }

    for(var j = pageWidth + marginRight + columnsWidth; j < pageWidth * 2 - marginLeft - 1; j += columnsWidth){
        with(master_spread_right){
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(j - gutterWidth)});
            guides.add(undefined, {orientation:HorizontalOrVertical.vertical, location:(j + gutterWidth)});
        }
    }

    for(var k = marginTop + rowsHeight; k < pageHeight - marginBottom - 1; k += rowsHeight){
        with(master_spread_left){
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(k - gutterHeight)});
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(k + gutterHeight)});
        }
        with(master_spread_right){
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(k - gutterHeight)});
            guides.add(undefined, {orientation:HorizontalOrVertical.horizontal, location:(k + gutterHeight)});
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