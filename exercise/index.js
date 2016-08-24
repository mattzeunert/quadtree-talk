"use strict";

/*
 * Image is an array of booleans = [true, false, true, ...]
 *
 * Tree returned (you can represent it internally however you like)
 * should be [topLeft, topRight, bottomLeft, bottomRight]. It should use
 * true | false for constant nodes (all black or all white), or
 * arrays for sub-trees.
 *
 * So the 4x4 image below:
 *
 *     tttf
 *     ttft
 *     tfff
 *     ftff
 *
 * would be:
 *
 *     [
 *       t,
 *       [t,f,f,t],
 *       [t,f,f,t],
 *       f,
 *     ]
 *
 * There's no need to return the size etc - the rest of the code will do this book-keeping.
 */
exports.tree = function tree(image) {

        // return correctTree(image)
  if (image.length == 4) {
    // console.log("is 4", image)
    return quadEquals(image);

  } else {
    
    var chunked = [topLeft(image), topRight(image), bottomLeft(image), bottomRight(image)].map(tree);

    return quadEquals(chunked);

  }

}

var quadEquals = function(image) {

    if (JSON.stringify(image[0]) === JSON.stringify(image[1]) && JSON.stringify(image[1]) === JSON.stringify(image[2]) 
        && JSON.stringify(image[2]) === JSON.stringify(image[3])) {
        return image[0];
    }
    else {
        return image;
    }

}

var topLeft = function(image) {
    var height =  Math.sqrt(image.length);
    var width = Math.sqrt(image.length);
    var quadSize = width / 2;


    var newImg = [];
    for (var y=0;y<quadSize;y++) {
        for (var x = 0; x< quadSize;x++) {
            newImg.push(image[y * width + x])
        }
    }
    
    return newImg;

}

var topRight = function(image) {
    var height =  Math.sqrt(image.length);
    var width = Math.sqrt(image.length);
    var quadSize = width / 2;

    var newImg = [];
    
        for (var y=0;y< quadSize;y++) {
            for (var x = quadSize; x< width;x++) {
            newImg.push(image[y * width + x])
        }
    }
    return newImg;

}

var bottomLeft = function(image) {
    
    var height =  Math.sqrt(image.length);
    var width = Math.sqrt(image.length);
    var quadSize = width / 2;

    var newImg = [];
    
        for (var y=quadSize; y<height;y++) {
            for (var x = 0; x< quadSize;x++) {
            newImg.push(image[y * width + x])
        }
    }
    return newImg;

}

var bottomRight = function(image) {
    
    var height =  Math.sqrt(image.length);
    var width = Math.sqrt(image.length);
    var quadSize = width / 2;

    var newImg = [];
    
        for (var y=quadSize; y<height;y++) {
            for (var x = quadSize; x<width;x++) {
            newImg.push(image[y * width + x])
        }
    }
    return newImg;

}





/*
 * Take a tree - [true, [true, false, [true, ...], false], true, false ...]
 * and return a flat array of true/false pixel values
 *
 * Tree order is topLeft, topRight, bottomLeft, bottomRight. Image order
 * is row-centric, so the 4 pixel image below:
 *
 *     A B
 *     C D
 *
 * would be 
 *
 *     [A, B, C, D]
 *
 * 
 *
 */
exports.expand = function expand(quadtree, size) {
    var resultLength = size * size
    if (typeof quadtree === "boolean") {
        var ret = [];
        for (var i =0;i< resultLength;i++) {
            ret.push(quadtree)
        }
        return ret
    } else {
        var expandedSubtrees = quadtree.map(function(subtree){
            var ex = expand(subtree, size / 2)
            return ex
        })
    
        return joinSubtrees(expandedSubtrees, resultLength)
    }
}

// subtrees are expanded
function joinSubtrees(subtrees, resultLength){
    var arr = new Array(resultLength)
    var size = Math.sqrt(resultLength)
    var quadSize = size / 2
    
    for (var y=0; y<size; y++) {
        for (var x=0;x<size;x++) {
            var subtree = ["no"];
            var nX = 0, nY =0 
            var subtreeIndex = null
            if (x < quadSize) {
                nX = x
                if (y< quadSize) {
                    subtreeIndex = 0
                    nY = y
                } else {
                    subtreeIndex = 2
                    nY = y - quadSize
                }
            } else {
                nX = x - quadSize
                if (y < quadSize) {
                    subtreeIndex = 1
                    nY = y
                } else {  
                    subtreeIndex = 3
                    nY = y - quadSize
                }
            }
            subtree = subtrees[subtreeIndex]
            arr[y * size + x] = subtree[nX + nY * quadSize];
        }
    }
    return arr
}

/*
 * Finds the square dimension from an input array - e.g
 * a 64 length input array is an 8x8 image.
 */
function imageSquareDimension(image) {
  return Math.sqrt(image.length);
}

/*
 * This will be a useful function to define - given a
 * certain dimension of image, which of topLeft, topRight...
 * etc should the point be in?
 */
function xyToNodeIndex(x, y, dimension) {
  
}

