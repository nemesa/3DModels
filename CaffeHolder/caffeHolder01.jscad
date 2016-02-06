//Editor: http://openjscad.org/#https://raw.githubusercontent.com/nemesa/3DModels/master/CaffeHolder/caffeHolder01.jscad

function midlePilar(width, height) {
    var shape =
    difference(
    cube({ size: [10, width, height], center: [true, true, false] })
    , translate([5, 2, 0], cube({ size: [5, width - 2, height], center: [true, true, false] }))
    , translate([-5, 2, 0], cube({ size: [5, width - 2, height], center: [true, true, false] }))
    );
    return shape;
}

function sidePilar(width, height, isLeft) {
    var shape =
    difference(
    cube({ size: [10, width, height], center: [true, true, false] })
    , translate([5, 2, 0], cube({ size: [5, width - 2, height], center: [true, true, false] }))
    );
    if (isLeft) {
        return shape;
    }
    else {
        return shape.mirroredX();
    }

}

function pilars(width, height)
{
    
    var shape= union(
        translate([-90, 0, 0], sidePilar(width, height, true))
        , translate([-60, 0, 0], midlePilar(width, height))
        , translate([-30, 0, 0], midlePilar(width, height))
        , translate([0, 0, 0], midlePilar(width, height))
        , translate([30, 0, 0], midlePilar(width, height))
        , translate([60, 0, 0], midlePilar(width, height))
        , translate([90, 0, 0], sidePilar(width, height, false))
        );
        
        return translate([0, 0, 20],shape);
}

function back()
{
    var shape =
    union(
        translate([0, 13, 90],cube({ size: [190, 5, 10], center: [true, true, false] }))
        ,translate([0, 13, 60],cube({ size: [190, 5, 10], center: [true, true, false] }))
        ,translate([0, 13, 30],cube({ size: [190, 5, 10], center: [true, true, false] }))
        ,translate([0, 13, 0],cube({ size: [190, 5, 10], center: [true, true, false] }))
        );
    return translate([0, 0, 20],shape);
}

function bottomBlock(width)
{
    //hole:25
    var shape =cube({ size: [width, 30, 10],center: [true, true, false] })
    return translate([0, 5, 4],shape).rotateX(30);
}

function main() {

    return union(
        pilars(20,100)
        ,back()
        ,bottomBlock(190)
        );
}