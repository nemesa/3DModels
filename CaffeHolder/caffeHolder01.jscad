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

function main() {

    var pilarHeight = 100;
    return union(

        translate([-90, 0, 0], sidePilar(20, pilarHeight, true))
        , translate([-60, 0, 0], midlePilar(20, pilarHeight))
        , translate([-30, 0, 0], midlePilar(20, pilarHeight))
        , translate([0, 0, 0], midlePilar(20, pilarHeight))
        , translate([30, 0, 0], midlePilar(20, pilarHeight))
        , translate([60, 0, 0], midlePilar(20, pilarHeight))
        , translate([90, 0, 0], sidePilar(20, pilarHeight, false))
        );
}