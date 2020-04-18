//Editor: http://openjscad.org/#https://raw.githubusercontent.com/nemesa/3DModels/master/SnapingBox/SnapingBox.jscad
// license    : MIT License


function main () {
    let sizeX=154;
    let sizeY=70;
    let sizeZ=30;
    let sizeSideWallThichnes=6;
    let sizeBottomWallThichnes=3;
    let sizeSpearationGuideHeight=5;
    
    
  return union(
   translate([0,(sizeY/2)+10,0], bottom(sizeX,sizeY,sizeZ,sizeSideWallThichnes,sizeBottomWallThichnes,sizeSpearationGuideHeight)),
   translate([0,(-1*((sizeY/2)+10)),0], top(sizeX,sizeY,sizeZ,sizeSideWallThichnes,sizeBottomWallThichnes,sizeSpearationGuideHeight))
    
  ).translate([0, 0, 0]).scale(1);
}

function bottom(sizeX,sizeY,sizeZ,sideWallThichnes,bottomWallThichnes,spearationGuideHeight) {
	let bottomHeight=sizeZ/2;
    var shape =
    difference(
        union(
		    body(sizeX,sizeY,bottomHeight,sideWallThichnes,bottomWallThichnes),
		    translate([0,0,bottomHeight], partSeparationGuide(sizeX,sizeY,spearationGuideHeight,sideWallThichnes,true)),
		    translate([(sizeX/2+((sideWallThichnes/2)/2)),0,(bottomHeight+(spearationGuideHeight/2))],snap((sideWallThichnes/2),(sizeY-(sizeY/3)),true)),
		    translate([(-1*(sizeX/2+((sideWallThichnes/2)/2))),0,(bottomHeight+(spearationGuideHeight/2))],snap((sideWallThichnes/2),(sizeY-(sizeY/3)),false))
        ),
       translate([(sizeX/2+((sideWallThichnes/2)/2)),0,(bottomHeight+(spearationGuideHeight/2))-((sideWallThichnes/2))],separatorHole(((sideWallThichnes/2)/2),(sizeY-(sizeY/3)))),
       translate([(sizeX/2+((sideWallThichnes/2)/2)),0,(bottomHeight+(spearationGuideHeight/2))-sideWallThichnes+((sideWallThichnes/2)/2)],separatorHole(((sideWallThichnes/2)/2),(sizeY-(sizeY/3)))),
       translate([-1*((sizeX/2+(sideWallThichnes/2))),0,(bottomHeight+(spearationGuideHeight/2))-((sideWallThichnes/2))],separatorHole(((sideWallThichnes/2)/2),(sizeY-(sizeY/3)))),
       translate([-1*((sizeX/2+(sideWallThichnes/2))),0,(bottomHeight+(spearationGuideHeight/2))-sideWallThichnes+((sideWallThichnes/2)/2)],separatorHole(((sideWallThichnes/2)/2),(sizeY-(sizeY/3))))
    );
    
    return shape;
}

function top(sizeX,sizeY,sizeZ,sideWallThichnes,bottomWallThichnes,spearationGuideHeight) {
	let bottomHeight=sizeZ/2;
    var shape =
    difference(
        union(
		    body(sizeX,sizeY,bottomHeight,sideWallThichnes,bottomWallThichnes),
		    translate([0,0,bottomHeight], partSeparationGuide(sizeX,sizeY,spearationGuideHeight,sideWallThichnes,false))
        ),
		translate([(sizeX/2+((sideWallThichnes/2)/2)),0,(bottomHeight+(spearationGuideHeight/2))],snap((sideWallThichnes/2),(sizeY-(sizeY/3)),true)),
		translate([(-1*(sizeX/2+((sideWallThichnes/2)/2))),0,(bottomHeight+(spearationGuideHeight/2))],snap((sideWallThichnes/2),(sizeY-(sizeY/3)),false))
        
    );
    
    return shape;
}

function body(sizeX,sizeY,sizeZ,sideWallThichnes,bottomWallThichnes){	
    var shape =
    difference(
     cube({ size: [sizeX+sideWallThichnes, sizeY+sideWallThichnes, sizeZ], center: [true, true, false] }),
     translate([0,0,bottomWallThichnes],cube({ size: [sizeX, sizeY, sizeZ], center: [true, true, false] }))
    );    
    return shape;	
}

function partSeparationGuide(sizeX,sizeY,sizeZ,sideWallThichnes,isInternal){
    let separatorWallThichnes=sideWallThichnes/2;
	let wallSizeX=sizeX;
	let wallSizeY=sizeY;
	let holeSizeX=sizeX;
	let holeSizeY=sizeY;
	if (isInternal)	{
		wallSizeX=sizeX+separatorWallThichnes;
		wallSizeY=sizeY+separatorWallThichnes;
		holeSizeX=sizeX;
		holeSizeY=sizeY;
	}
	else {		
		wallSizeX=sizeX+sideWallThichnes;
		wallSizeY=sizeY+sideWallThichnes;
		holeSizeX=sizeX+separatorWallThichnes;
		holeSizeY=sizeY+separatorWallThichnes;
	}
	
    var shape =
    difference(
     translate([0,0,0],cube({ size: [wallSizeX , wallSizeY, sizeZ], center: [true, true, false] })),
     translate([0,0,0],cube({ size: [holeSizeX, holeSizeY, sizeZ], center: [true, true, false] }))
    );
    return shape;
}


function snap(sizeX,sizeY,isLeft){
    let snapSizeX=(sizeX/3);
    let snapSizeY=sizeY;
    let snapSizeZ=(sizeX/3);
    let xOffset=(snapSizeX/2);
    if(isLeft){
        xOffset=xOffset*-1;
    }
    
    var shape =
    difference(
     cube({ size: [snapSizeX , snapSizeY, snapSizeZ], center: [true, true, true] }).rotateY(45),
     translate([xOffset,0,0],cube({ size: [snapSizeX , snapSizeY, 2*snapSizeZ], center: [true, true, true] }))
    );
    return shape;
}

function separatorHole(sizeX,sizeY){
    let holeSizeX=sizeX;
    let holeSizeY=sizeY;
     var shape =
    difference(
     cube({ size: [holeSizeX , holeSizeY, holeSizeX], center: [false, true, false] })
    );
    return shape;
}
