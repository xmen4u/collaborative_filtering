/**
********************************************************************************************
* name:     Distance
********************************************************************************************
* desc:   module is responsible for distance metric functionc
********************************************************************************************
* code: written by Gil Tamari, you may not use it without my permission, BSD license
* date: sep-2012
********************************************************************************************
**/
var Distance = function(){}

Distance.prototype = {
  /************************************************************************
  }
  *   name:  euclidean
  *   desc:  calculating euclid metric between 2 vectors, using Pythagorean formula
  *************************************************************************
  *   in:    v1, v2 - Array[Double], each is an n-vector
  *************************************************************************
  *   out:   distance - Double
  *************************************************************************
  */
  euclidean: function(v1, v2, power) {
      var total = 0,
          i
      for (i = 0; i < v1.length; i++) {
         total += Math.pow(v2[i] - v1[i], 2)
      }
      return power ? total :  Math.sqrt(total)
   },
  /************************************************************************
  }
  *   name:  manhattan distance
  *   desc:  calculating manhattan distance between 2 vectors, which is the sum of abs delts
  *************************************************************************
  *   in:    v1, v2 - Array[Double], each is an n-vector
  *************************************************************************
  *   out:   distance - Double
  *************************************************************************
  */
   manhattan: function(v1, v2) {
     var total = 0,
         i


     for (i = 0; i < v1.length;  i++) {
        total += Math.abs(v2[i] - v1[i])
     }
     return total
   },
   /************************************************************************
  }
  *   name:  haversine
  *   desc:    Using Haversine distance , the earth, being a "punched" ellipsoid
  *     and not flat, needs a different distance measure. Haversine is an approximation
  *     to a sphere. Google maps uses mercator projection, so it fitts.
  *     we use trigo to compensate for the curvature of the earth
  *     notice we're using 2 dimensional vectors, no n-vectors here
  *************************************************************************
  *   in:    v1, v2 - Array[Double], each is an 2-vector
  *************************************************************************
  *   out:   distance - Double
  *************************************************************************
  */
  haversine: function(point_a,point_b){
    var R     = 6367.5, // the earth's radius
        dLat  = (point_a[0] - point_b[0]) * Math.PI/180,
        dLong = (point_a[1] - point_b[1]) * Math.PI/180,
        lat1  = point_a[0] * Math.PI/180,
        lat2  = point_b[0] * Math.PI/180,
        a     = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLong/2) * Math.sin(dLong/2) * Math.cos(lat1) * Math.cos(lat2),
        c     = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),
        d     = R*c;
    return d;
  },
  /************************************************************************
  }
  *   name:  tanimoto coefficient
  *   desc:  the ratio of the intersection set (only the item that are in both sets)
  *          to the union set (all the items in either set)
  *************************************************************************
  *   in:    v1, v2 - Array[BOOL], each is an n-vector
  *************************************************************************
  *   out:   0...1.0 | 1.0 => nobody who wants the first item wants the second one
  *          0.0 => exatl the same set of people want the two items
  *************************************************************************
  */
  tanimoto: function(v1, v2, power) {
      var c1 = 0,
          c2 = 0,
          shared = 0,
          i
      for (i = 0; i < v1.length; i++) {

        if (v1[i] != 0){ c1++} // # in v1
        if (v2[i] != 0){ c2++} // #in v2
        if (v1[i] != 0 && v2[i] != 0) { shared++} // in both
      }
      return 1.0 - ( Mat.float(shared) / ( c1 + c2 - shared))
   },
  /************************************************************************
  }
  *   name:  max
  *   desc:  returns the biggest manhattan delta between 2 vectors
  *************************************************************************
  *   in:    v1, v2 - Array[Double], each is an n-vector
  *************************************************************************
  *   out:   distance - Double
  *************************************************************************
  */
   max: function(v1, v2) {
     var max = 0,
         i

     for (i = 0; i < v1.length; i++) {
        max = Math.max(max , Math.abs(v2[i] - v1[i]))
     }
     return max
   }
}

if (module && module.exports)
module.exports = Distance