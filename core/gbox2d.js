/****************************************************************************
 Copyright (c) 2012 - Chris Hannon / http://www.channon.us

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var Box2D = require('./../lib/box2d/box2d.js');

// Shorthand "imports"
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2AABB = Box2D.Collision.b2AABB,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
    b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    b2ContactListener = Box2D.Dynamics.b2ContactListener;

GBox2D = (typeof GBox2D === 'undefined') ? {} : GBox2D;

/**
 * Allows a package to create a namespace within GBox2D
 * From Javascript Patterns book
 * @param ns_string
 */
GBox2D.namespace = function(ns_string)
{
    var parts = ns_string.split('.'),
        parent = GBox2D,
        i = 0;

    // strip redundant leading global
    if (parts[0] === "RealtimeMultiplayerGame") {
        parts = parts.slice(1);
    }

    var len = parts.length,
        aPackage = null;
    for (i = 0; i < len; i += 1) {
        var singlePart = parts[i];
        // create a property if it doesn't exist
        if (typeof parent[singlePart] === "undefined") {
            parent[singlePart] = {};
        }
        parent = parent[singlePart];

    }
    return parent;
};

/**
 * Allows a simple inheritance model
 * based on http://www.kevs3d.co.uk/dev/canvask3d/scripts/mathlib.js
 */
GBox2D.extend = function(subc, superc, overrides)
{
    /**
     * @constructor
     */
    var F = function() {};
    var i;

    if (overrides) {
        F.prototype = superc.prototype;
        subc.prototype = new F();
        subc.prototype.constructor = subc;
        subc.superclass = superc.prototype;
        if (superc.prototype.constructor == Object.prototype.constructor)   {
            superc.prototype.constructor = superc;
        }
        for (i in overrides) {
            if (overrides.hasOwnProperty(i)) {
                subc.prototype[i] = overrides[i];
            }
        }
    } else {

        subc.prototype.constructor = subc;
        subc.superclass= superc.prototype;
        if (superc.prototype.constructor == Object.prototype.constructor)   {
            superc.prototype.constructor = superc;
        }
        for( i in superc.prototype ) {
            if ( false==subc.prototype.hasOwnProperty(i)) {
                subc.prototype[i]= superc.prototype[i];
            }
        }

    }
}