# gridWizard
GridWizard is an open-source tool developed by [caroljpeg](https://www.instagram.com/carol.jpegg/) to generate and manage grid systems within Adobe InDesign.  
if you have any question / request / consideration / report or if you want to share what you made with it, feel free to reach me at a.martinelli0601@gmail.com

## introduction
within the initial tab (GridWizard), select the target parent spread from those available in the active document.
then simply choose a generation method by navigating through the tabs, fill in the customizable fields, press ok, and let the magic happen.

## methods
### 1 - Everything Everywhere All At Page Ratio
Everything Everywhere All At Page Ratio generates a layout grid wherein everything - the dimensions of the rectangle defined by the margins, those of the modules resulting in the grid and those of the gutters - is related to the aspect ratio of the page.
  - **Full - Empty areas ratio**: defines the ratio between the area covered by the margins and the one covered by the grid (*the default value is the same as the aspect ratio of the page*).
  - **Subdivisions number**: defines the number of rows and columns occupying the rectangle defined by the margins.

### 2 - I Kissed A Square And I Liked It
I Kissed A Square And I Liked It generates a square-based layout system.
  - **Full - Empty areas ratio**: defines the ratio between the area covered by the margins and the one covered by the grid (*the default value is the same as the aspect ratio of the page*).
  - **Short side subdivisions**: defines the number of sections dividing the short side of the rectangle defined by the margins. Long side subdivisions are calculated accordingly to accommodate square modules only.
  - **Gutter**: defines the gutter size (*the measurement unit is the same of the active document*).

### 3 - Gutenbergify
Gutenbergify parametrically recreates the layout grid developed by Gutenberg for his 42-line bible.
  - **Subdivisions number**: defines the number of rows and columns occupying the rectangle defined by the margins (*the default value is the one used by Gutenberg*).
  - **Flip horizontally / Flip vertically**: provides the option to reflect the grid horizontally or vertically, allowing the creation of a wider variety of layout systems.

### 4 - Fibonacci Dreams
Fibonacci Dreams uses the Fibonacci sequence, starting with a procedurally defined module based on the page size, to create a mathematically harmonious layout grid.
  - **Columns / Rows number**: defines the number of rows and columns occupying the rectangle defined by the margins (*it is possible to pick values from the first six elements of the Fibonacci sequence*).
  - **Flip horizontally / Flip vertically**: provides the option to reflect the grid horizontally or vertically, allowing the creation of a wider variety of layout systems.

### 5 - Pure Chaos
Just some pseudo-random chaos.
  - **Columns / Rows number**: defines the number of rows and columns occupying the rectangle defined by the margins.
  - **Gutter min / max width / height**: defines the minimum and maximum values for the width and height of the gutters.
  - **Facing pages handling**: defines the treatment of facing pages.

## execution
save the gridWizardx.x.js file in the InDesign scripts folder:  
on macos  
`/Users/<username>/Library/Preferences/Adobe InDesign/Version x.x/<locale>/Scripts`  
on windows  
`C:\Users\<username>\AppData\Roaming\Adobe\InDesign\Version x.x\<locale>\Scripts`  

now open indesign, go to the scripts panel and simply doubleclick on gridWizardx.x.js
