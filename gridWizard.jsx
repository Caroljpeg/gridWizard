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
			with(borderPanels.add()){
				with(dialogColumns.add()){
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
	}
	myReturn = myDialog.show();
	if (myReturn == true){
		var myMarginRatio = myMarginRatioField.editValue;
		var myColumnsNumber = myColumnsNumberField.editValue;
		myDialog.destroy();
		if(myMarginRatio + myColumnsNumber !=0){
			everythingFollowsPageRatio(myMarginRatio, myColumnsNumber);
		}
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