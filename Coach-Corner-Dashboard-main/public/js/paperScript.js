paper.install(window);

//var ctx=c.getContext("2d");
//ctx.font="Rubik";

var pbtFactory = new function() {
    
    INTERACTION_RADIUS = 13
    this.INTERACTION_RADIUS = INTERACTION_RADIUS

    SYMBOL_RADIUS = 13
    this.SYMBOL_RADIUS = SYMBOL_RADIUS

    this.rolloverHighlightStrokeWidth = 12
    this.selectionStrokeWidth = 12

    var fdpbTypes = {
        SVG_SYMBOL: 'SVG_SYMBOL',
        PLAYER_OBJECT: 'PLAYER_OBJECT',
        PRESENTATION_OBJECT: 'PRESENTATION_OBJECT',
        BASKETBALL_DEFENSE_PLAYER_OBJECT: 'BASKETBALL_DEFENSE_PLAYER_OBJECT',
        BASKETBALL_DEFENSE_PLAYER_SYMBOL: 'BASKETBALL_DEFENSE_PLAYER_SYMBOL',
        FAST_BREAK_NOTES_BOX: 'FAST_BREAK_NOTES_BOX',
        TEXT_BOX: 'TEXT_BOX',
        KNOB: 'KNOB',
        PLAYER_SYMBOL: 'PLAYER_SYMBOL',
        INSERT_SYMBOL: 'INSERT_SYMBOL',
        PRESENTATION_SYMBOL: 'PRESENTATION_SYMBOL',
        END_SYMBOL: 'END_SYMBOL',
        LINE_OF_SCRIMMAGE: 'LINE_OF_SCRIMMAGE',
        FDPB_GROUP: 'FDPB_GROUP',
        LINE_SEGMENT: 'LINE_SEGMENT',
        MULTISELECTION: 'MULTISELECTION'
    }
    this.fdpbTypes = fdpbTypes; // exposes it externally

    var symbolTypes = {
        HAND_OFF: 'HAND_OFF',
        FAKE_HAND_OFF: 'FAKE_HAND_OFF',
        STUTTER_STEP: 'STUTTER_STEP',
        T_BLOCK: 'T_BLOCK',
        T_BLOCKRIGHT: 'T_BLOCKRIGHT',
        T_BLOCKLEFT: 'T_BLOCKLEFT',
        BALL: 'BALL',
        TRIANGLE: 'TRIANGLE',
        PLAYERS_RUB: 'PLAYERS_RUB',
        ARROW: 'ARROW'
    }
    this.symbolTypes = symbolTypes; // exposes it externally

    var shapeTypes = {
        NONE: 'NONE',
        CIRCLE: 'CIRCLE',
        SQUARE: 'SQUARE',
        RECTANGLE: 'RECTANGLE',
        ELIPSE: 'ELIPSE',
        DIAMOND: 'DIAMOND',
        TRIANGLE: 'TRIANGLE',
        HEXAGON: 'HEXAGON',
        DEFENSIVE_PLAYER: 'DEFENSIVE_PLAYER', // Football defense player
        BASKETBALL_PLAYER: 'BASKETBALL_PLAYER', // Basketball offense player
        BASKETBALL_DEFENSE_PLAYER_SHAPE: 'BASKETBALL_DEFENSE_PLAYER_SHAPE', // Basketball defense player
    }
    this.shapeTypes = shapeTypes; // exposes it externally

    var colorDefs = {
        SELECTION: "#00ffa4",
        ROLLOVER: "#80ffa4",
        BLUE: "#006AFF",
        RED: "#F5161D",
        GREEN: "#00BD26",
        BLACK: "#000000",
        LINE_OF_SCRIMMAGE: "#0035D6"

    }
    this.colorDefs = colorDefs;

    var uiElementTypes = {
        SYMBOL_ROLLOVER: 'SYMBOL_ROLLOVER',
        SYMBOL_SELECTOR: 'SYMBOL_SELECTOR',
        KNOB_SELECTOR: 'KNOB_SELECTOR',
        CURVE_KNOB_SELECTOR: 'CURVE_KNOB_SELECTOR',
        LINE_SELECTOR: 'LINE_SELECTOR',
        BOX_ROLLOVER: 'BOX_ROLLOVER',
        BOX_SELECTOR: 'BOX_SELECTOR'
    }
    this.uiElementTypes = uiElementTypes; // exposes it externally

    // Default football line style
    this.lineStyle = {
        //paths
        strokeColor: '#000000',
        strokeWidth: 4,
        strokeStyle: 'Solid',
        customDashArray: [2, 10],
        strokeJoin: 'miter',
        strokeCap: 'butt',
        fillColor: null
    }

    // Default football player style
    this.playerStyle = {
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        strokeWidth: 4,
        strokeJoin: 'miter',
        strokeCap: 'flat',
        fontSize: 17,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        shadowStyle: 'NONE',
        textColor: '#000000',
        shapeType: shapeTypes.ELIPSE,
        text: '',
        playerShapeWidth: 30,
        playerShapeHeight: 20,
        defaultDistanceBetweenPlayers: 4,
    }

    // Default basketball line style
    this.defaultBasketballLineStyle = {
        //paths
        strokeColor: '#000000',
        strokeWidth: 2,
        strokeStyle: 'Solid',
        customDashArray: [2, 10],
        strokeJoin: 'miter',
        strokeCap: 'butt',
        fillColor: null
    }

    // Default basketball offense player style
    this.defaultBasketballPlayerStyle = {
        fillColor: null,
        strokeColor: null,
        strokeWidth: 0,
        strokeJoin: 'miter',
        strokeCap: 'flat',
        fontSize: 17,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        shadowStyle: 'NONE',
        textColor: '#000000',
        shapeType: shapeTypes.BASKETBALL_PLAYER,
        text: '1', // Default to player 1 if none is specified
        playerShapeWidth: 25,
        playerShapeHeight: 25,
        defaultDistanceBetweenPlayers: 30,
        playerHasBall: false,
    }

    // Default basketball defense player style
    this.defaultBasketballDefensePlayerStyle = {
        fillColor: null,
        strokeColor: null,
        strokeWidth: 0,
        strokeJoin: 'miter',
        strokeCap: 'flat',
        fontSize: 14,
        fontFamily: 'Rubik',
        fontWeight: 'normal',
        shadowStyle: 'NONE',
        textColor: '#000000',
        shapeType: shapeTypes.BASKETBALL_DEFENSE_PLAYER_SHAPE,
        text: 'x1', // Default to player 1 if none is specified
        playerShapeWidth: 20,
        playerShapeHeight: 20,
        defaultDistanceBetweenPlayers: 30,
        playerHasBall: false,
    }

    // Default text style
    this.textStyle = {
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        strokeWidth: 2,
        strokeJoin: 'miter',
        strokeCap: 'flat',
        fontSize: 27,
        fontFamily: 'Rubik',
        fontWeight: '',
        bold: false,
        italic: false,
        underline: false,
        text: 'Edit in TextArea'
    }

    var nullStyle = {
        fillColor: null,
        strokeColor: null,
        strokeWidth: 0,
        strokeJoin: 'miter',
        strokeCap: 'miter'
    }

    project.currentStyle = nullStyle;


    paper.PointText.prototype.wordwrap = function(txt, max) {
        var lines = [];
        var space = -1;
        times = 0;

        function cut() {
            for (var i = 0; i < txt.length; i++) {
                (txt[i] == ' ') && (space = i);
                if (i >= max) {
                    (space == -1 || txt[i] == ' ') && (space = i);
                    if (space > 0) {
                        lines.push(txt.slice((txt[0] == ' ' ? 1 : 0), space));
                    }
                    txt = txt.slice(txt[0] == ' ' ? (space + 1) : space);
                    space = -1;
                    break;
                }
            }
            check();
        }

        function check() {
            if (txt.length <= max) {
                lines.push(txt[0] == ' ' ? txt.slice(1) : txt);
                txt = '';
            } else if (txt.length) {
                cut();
            }
            return;
        }
        check();
        return this.content = lines.join('\n');
    }


    function getMultiselectionBounds(items) {
        var bounds = items[0].bounds
        for (var i = 1; i < items.length; i++) bounds = bounds.unite(items[i].bounds);
        return bounds;
    }
    this.getMultiselectionBounds = getMultiselectionBounds;

};


this.version = 0.11;

if (!window.pbt) {
    window.pbt = {};
}

window.pbt.factory = pbtFactory;

var debug = false

window.trace = function stackTrace() {
    var err = new Error();
    return err.stack;
};

window.engineDebug = (function() {
    return function() {
        if (typeof window.console !== 'undefined' && debug) {
            var line = window.trace()
            var lines = line.split("\n")
            var args = Array.prototype.slice.call(arguments)
            if (lines.length) {
                // let caller = line.split('\n')[3].split('at ')[1].split(' (')[0];
                let lineNo = lines[2].substring(lines[2].indexOf("("), lines[2].lastIndexOf(")") + 1);
                // args.unshift('[Play Engine Log]', `${caller}()`);
                args.unshift('%c[Play Engine Log]', 'color: red;');
                args.push(lineNo);
                window.console.log.apply(this, args);
            } else {
                args.unshift('[Play Engine Log]');
                window.console.log.apply(this, args);
            }
        }
    }
}());

// ==========================

/*
a customCanvasObject is any stand alone customCanvasObject: playerObject, SVGSymbol, textBox, group;
must have data.fdpbType

a playerObject  can hold one player symbol and  multiple routes
active item could be a knob or customCanvasObject, but NOT a  playerObject

each route holds path plus control points
Each route has an array of segmentStyles;
Each route has an array of displayPaths for display
*/

/**
 * The item that is currently selected.
 */
var activeItem

/**
 * The corresponding player object that is currently selected, if applicable.
 */
var activePlayerObject

/**
 * The route that is currently selected.
 */
var activeRoute

/**
 * The curves that are currently selected.
 */
var selectedCurves = []

/**
 * An array of all the animations.
 */
var animations = []


/**
 * Is the user currently dragging an item?
 */
var currentlyDraggingItem = false

/**
 * Factory/default styles
 */
var Factory = window.pbt.factory
var lineStyle
var playerStyle
var textStyle = Object.assign({}, Factory.textStyle)
var defaultEndSymbolType = "TRIANGLE"

var startDrag = false
var dragOffset = new Point(0, 0)

var lineOfScrimmage
var smartGuideLocs = []

/**
 * Each project should have its own undo/redo stack array (set in initializeFrame()).
 */
var undoStack = []
var redoStack = []

/**
 * The view bounds after the script is loaded.
 */
var viewBoundsOnLoad

/**
 * The dashed selection box (for users to select objects/items), previously called the "marquis"
 */
var selectionBox = null

/**
 * Is the user currently trying to select items?
 */
var userIsSelectingItems = false

/**
 * The Point where we should start drawing the selection box.
 */
var startSelectionBoxAtPoint = new Point (0,0)

/**
 * A local clipboard to store the object the user wants to copy.
 */
var clipboard = null

/**
 * Is the user currently editing text?
 */
var editingText = false

/**
 * Is the onKeyDownHandler currently enabled?
 */
var onKeyDownHandlerEnabled = true

/**
 * The product the user is currently viewing (firstdown or fastbreak)
 */
var product = null

//CONSTANTS
var CURVE_MULTIPLIER = .65


/**
 * The watermark SVG to be used on all frames in this play (we only need to load it once)
 */
var watermarkSvg = null


/**
 * The background SVG to be used on all frames in this play (we only need to load it once, unless it changes)
 */
var backgroundSvg = null

/**
 * Initialize the script upon page load.
 */
initializeFrame()


/**
 * Initialize project layers and other necessary items.
 */
function initializeFrame(frameNumber = 1)
{
    addSentryBreadcrumb("Initialized frame #" + frameNumber + ".")
    console.log("FrameNumber",frameNumber)
    // First let's set up a new Paper project for the new canvas if it doesn't exist yet.
    if (!paper.projects[frameNumber - 1]) {
        paper.setup(document.getElementById('play-canvas-frame-' + frameNumber))
    }

    // Set up undo/redo stacks for this project, if they don't already exist.
    if (!undoStack[paper.project.index]) {
        undoStack[paper.project.index] = []
    }
    if (!redoStack[paper.project.index]) {
        redoStack[paper.project.index] = []
    }

    // Deselect all items on the current project before we activate the new one.
    deselectAllCanvasObjects()

    // Make sure all notes are defocused when switching to another frame
    if (product == 'fastbreak') {
        for (var i = 0; i < window.app.config.globalProperties.$pinia.state._value.counter.visibleFrames.length; i++) {
            blurFastBreakNotes(i + 1)
        }
    }

    // Make sure our PlayEditor knows which frame is active now, too!
    // window.app.config.globalProperties.$playEditorRef.value.activeFrame = frameNumber
    window.app.config.globalProperties.$pinia.state._value.counter.activeFrame = frameNumber;

    // Now we can activate the project for the specified frame number.
    activateFrame(frameNumber)

    // Now we can reset all of the layers for the view.
    createAllProjectLayers(frameNumber)

    // Activate the main layer and set the default font.
    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.activate()
    mainLayer.fontFamily = '"Rubik", sans-serif'

    // Restore data properties on all main layer objects.
    // restoreDataPropertiesOnAllMainLayerObjects()

    // Reset view bounds after the correct project has been activated.
    viewBoundsOnLoad = view.bounds.clone()

    // Set default line style and player style and based on product.
    lineStyle = Object.assign({}, product == 'firstdown' ? Factory.lineStyle : Factory.defaultBasketballLineStyle)
    playerStyle = Object.assign({}, product == 'firstdown' ? Factory.playerStyle : Factory.defaultBasketballPlayerStyle)

    // If this is a FirstDown play, create a line of scrimmage
    if (product == 'firstdown') {
        createLineOfScrimmage()
    }
}


/**
 * Activate the canvas associated with the specified frame number.
 */
function activateFrame(frameNumber = 1)
{
    addSentryBreadcrumb("Activated frame #" + frameNumber + ".")

    //NOTE: The project index *should* always be 1 less than the frame number.
    if (paper.projects[frameNumber - 1]) {
        paper.projects[frameNumber - 1].activate()
    }
}


/**
 * Activate the object's parent player object.
 */
function activateParentPlayerObject(childObject)
{
    setActivePlayerObject(childObject)

    if (activePlayerObject) {
        showPlayerObjectKnobs(activePlayerObject)
    }
}


/**
 * Add a curved line to a player.
 */
function addCurvedLine()
{
    addPathSegment(true)
}


/**
 * Add a dribble line to the active player.
 */
function addDribbleLine(hasCurve = false)
{
    addPathSegment(hasCurve, 'Zig Zag')
    applyLineStyle('strokeStyle', 'Zig Zag')
}


/**
 * Add a pass line to the active player.
 */
function addPassLine(hasCurve = false)
{
    addPathSegment(hasCurve, 'Dotted')
    applyLineStyle('strokeStyle', 'Dotted')
}


/**
 * Add a rn line to the active player.
 */
function addRunLine(hasCurve = false)
{
    addPathSegment(hasCurve, 'Solid')
    applyLineStyle('strokeStyle', 'Solid')
}


/**
 * Add a line with a screen on the end to the active player.
 */
function addScreenLine(hasCurve = false)
{
    addPathSegment(hasCurve, 'Solid')
    applyLineStyle('strokeStyle', 'Solid')
    updateLineEndPoint('T_BLOCK') // This is the same as a screen symbol in basketball
}


/**
 * Add a Sentry breadcrumb if Sentry is loaded.
 */
function addSentryBreadcrumb(message = "No message", level = "info", category = "Automatic Action")
{
    if (window.Sentry) {
        window.Sentry.addBreadcrumb({
            category: category,
            message: message,
            level: level,
        });
    }
}


/**
 * Send a message to Sentry.
 */
function addSentryMessage(message = "No message")
{
    if (window.Sentry) {
        window.Sentry.captureMessage(message);
    }
}


/**
 * Add five basketball players to the court.
 */
function addFiveBasketballPlayers(playerType = 'Offense', isBackCourt = false)
{
    if (playerType == 'Offense') {
        playerStyle.text = '1'
        addPlayer(isBackCourt ? new Point(117, 120) : new Point(117, 330))

        playerStyle.text = '2'
        addPlayer(isBackCourt ? new Point(177, 120) : new Point(177, 330))

        playerStyle.text = '3'
        addPlayer(isBackCourt ? new Point(237, 120) : new Point(237, 330))

        playerStyle.text = '4'
        addPlayer(isBackCourt ? new Point(297, 120) : new Point(297, 330))

        playerStyle.text = '5'
        addPlayer(isBackCourt ? new Point(357, 120) : new Point(357, 330))
    }

    else if (playerType == 'Defense') {
        addBasketballDefensePlayer('x1', (isBackCourt ? new Point(147, 120) : new Point(147, 330)))
        addBasketballDefensePlayer('x2', (isBackCourt ? new Point(207, 120) : new Point(207, 330)))
        addBasketballDefensePlayer('x3', (isBackCourt ? new Point(267, 120) : new Point(267, 330)))
        addBasketballDefensePlayer('x4', (isBackCourt ? new Point(327, 120) : new Point(327, 330)))
        addBasketballDefensePlayer('x5', (isBackCourt ? new Point(387, 120) : new Point(387, 330)))
    }
}


/**
 * Add a new frame to the play.
 */
function addFrame(frameNumber = 1, fieldBackgroundUrl = null, isSmartFrame = false)
{
    // Clone the previous canvas, change the ID, and add it to the left pane container.
    var newCanvasWrapper = $('#play-canvas-wrapper-' + (frameNumber - 1)).clone().prop('id', 'play-canvas-wrapper-' + frameNumber)

    // Now we need to re-initialize the play editor script.
    initializeFrame(frameNumber)

    // Set the background SVG to null (it will be reset once the new image is loaded)
    backgroundSvg = null

    // Force redraw of watermarks as well
    watermarkSvg = null

    // And load the field background...
    loadFieldBackground(fieldBackgroundUrl, frameNumber)

    // If this is a smart frame, then let's build the JSON based on the previous frame's movements.
    if (isSmartFrame) {

        var previousFrameJson = this.generateFrameJson(frameNumber - 1) // -1 to get the previous frame's JSON
        replaceJson('frame', previousFrameJson, frameNumber)

        // Activate the new frame.
        activateFrame(frameNumber)

        // Restore data properties on all main layer objects.
        restoreDataPropertiesOnAllMainLayerObjects()

        // Get the player objects on the new frame.
        var mainLayerOnNewFrame = getLayerByName('MAIN_LAYER', frameNumber)
        var playerObjectsOnNewFrame = mainLayerOnNewFrame.getItems({ data: { fdpbType: Factory.fdpbTypes.PLAYER_OBJECT } })

        // Now move the players to their next positions.
        smartMovePlayers(playerObjectsOnNewFrame)
    }
}


/**
 * Add the bezier lines coming off the specified curve knob.
 */
function addBezierIndicatorLinesToCurveKnob(knob, pbObject)
{
    curve = knob.curve
    var bezierColor = Factory.colorDefs.SELECTION

    // Create the bezier lines if they don't exist yet.
    if (!knob.bezierLine1) {
        knob.bezierLine1 = new Path.Line(curve.point1, curve.point1)
    }
    if (!knob.bezierLine2) {
        knob.bezierLine2 = new Path.Line(curve.point2, curve.point2)
    }

    knob.bezierLine1.strokeColor = bezierColor
    knob.bezierLine2.strokeColor = bezierColor
    knob.bezierLine1.strokeWidth = 1;
    knob.bezierLine2.strokeWidth = 1;
    pbObject.handlesGroup.addChild(knob.bezierLine1);
    pbObject.handlesGroup.addChild(knob.bezierLine2);
}


/**
 * Update the given player style with any missing properties. This is for player symbols created before we added new properties in 3.0.
 */
function addPlayerShapeWidthAndHeightToV2Players(originalPlayerStyle)
{
    var newPlayerStyle = originalPlayerStyle

    // Add default player shape width using the old font sizes to map.
    if (!originalPlayerStyle.playerShapeWidth) {

        switch (originalPlayerStyle.fontSize) {
            case '17':
                newPlayerShapeWidth = 30
                break
            case '31':
                newPlayerShapeWidth = 50
                break
            case '40':
                newPlayerShapeWidth = 50
                break
            default:
                newPlayerShapeWidth = 30
        }

        newPlayerStyle.playerShapeWidth = newPlayerShapeWidth
    }

    // Add default player shape height using the old font sizes to map.
    if (!originalPlayerStyle.playerShapeHeight) {

        switch (originalPlayerStyle.fontSize) {
            case '17':
                newPlayerShapeHeight = 20
                break
            case '31':
                newPlayerShapeHeight = 33
                break
            case '40':
                newPlayerShapeHeight = 33
                break
            default:
                newPlayerShapeHeight = 20
        }

        newPlayerStyle.playerShapeHeight = newPlayerShapeHeight
    }

    return newPlayerStyle
}


/**
 * Add a named child group to the specified item, with the specified name.
 */
function addNamedChildGroupToItem(item = null, groupName = 'defaultGroup')
{
    var childGroup = new Group()
    childGroup.name = groupName
    childGroup.data.groupName = groupName

    /* Add the group to the specified item. */
    if (item) {
        item.addChild(childGroup)
        item[groupName] = childGroup
    }

    return childGroup
}


/**
 * Add a path segment to the player. Set tangentMultiplier = 0 to make a curved line appear straight.
 */
function addPathSegment(hasCurveKnob = false, strokeStyle = null, tangentMultiplier = 40)
{
    /* If we don't have a player object, exit now. */
    if (!activePlayerObject) {
        return
    }

    /* If we want to add a specific stroke style to the segment automatically, we need to do so here. Otherwise, it will default to our Factory strokeStyle, which is Solid. */
    if (strokeStyle) {
        lineStyle.strokeStyle = strokeStyle
    }

    pushMainLayerToUndoStack()

    var newRoute = null
    var branchingKnob = null

    /* If we don't have any selected curves yet, then add the route path coming off the player object. */
    if (!selectedCurves.length) {
        addSentryBreadcrumb("No selected curves. Route added directly to player object.")
        newRoute = createRoute(activePlayerObject)
    }

    // If we only have 1 curve selected, either create a new route off that branch or add a path to the existing route (see below)
    else if (selectedCurves.length == 1) {

        /* If the selected curve is NOT the last curve on the route, it means that the user wants to branch off somewhere in the middle of the route, so we need to create a new route branching off that point. */
        /* If the selected curve IS the last curve on the route, it means the user just wants to add another path to the route. */

        /* Start a new route off the selected knob. */
        if (!selectedCurves[0].isLast()) {
            addSentryBreadcrumb('New route created branching off selected knob.')
            branchingKnob = selectedCurves[0].segment2.knob
            newRoute = createRoute(activePlayerObject, branchingKnob)
            //branchingKnob.segments.push(activeRoute.path.firstSegment)
        }

        /* Or just add a new path segment to the end of the active route . */
        else {
            addSentryBreadcrumb('New path segment added to active route.')
        }
    }

    /* If we have multiple curves selected. */
    else {
        /* Do we ever get here? */
        addSentryBreadcrumb('Multiple curves selected when trying to add a new path segment.', 'warning')
        return
    }

    /* If we have a new route, add it to our routes group and make it the active route. */
    if (newRoute) {
        activePlayerObject.routesGroup.appendBottom(newRoute)
        setActiveRoute(newRoute)
    }

    /* Now get the path on our active route. */
    var activePath = activeRoute.path

    /**
     * MAKE SURE THE SEGMENT STAYS IN BOUNDS!
     */

    /* Now we need to make sure the segment doesn't end up out of bounds. */
    var viewBounds = viewBoundsOnLoad.clone()
    viewBounds = viewBounds.expand(-10) // Leave a 10 pixel padding on each edge

    /* How long do we want our segment to be? */
    var newSegmentLength = 80

    /* Where does that take us to? */
    var newSegmentEndPoint = activePath.lastSegment.point.add(0,-newSegmentLength)

    /* Move the new segment until it's completely in bounds. */
    while (!viewBounds.contains(newSegmentEndPoint)) {

        /* Rotate the line around the last curve's end point by 15 degrees to the right until it's in bounds. */
        newSegmentEndPoint = newSegmentEndPoint.rotate(15, activePath.lastSegment.point)

    }

    /* Now we can add the new segment to our active route path. */
    activePath.add(newSegmentEndPoint)

    /**
     * CREATE CURVE KNOBS IF NECESSARY (OR MAKE THE SEGMENT'S CURVE HANDLERS NULL)
     */

    // If our line segment is a curve, we need to add a knob to control the curve angle.
    if (hasCurveKnob) {
        var curveKnob = createKnobObject(null, true, tangentMultiplier) // true to make it a curve knob

        // All curve knobs need to belong to the knob group!
        activePlayerObject.knobsGroup.addChild(curveKnob)
    }

    // If our line segment is straight, then make sure the handlers on the last curve of our active path are null (null handlers define a straight line in Paper.js)
    else {
        activePath.lastCurve.handle1 = null
        activePath.lastCurve.handle2 = null
    }

    // Now create a non-curve segment knob and make it the branching knob
    var nonCurveKnob = createKnobObject() // false to make it a non-curve knob
    activePlayerObject.knobsGroup.addChild(nonCurveKnob)
    activePath.lastCurve.rootKnob = branchingKnob

    // Now we can draw the display path and display corner // @TODO - Are these the curve knob lines?
    var displayPath = new Path.Line(activePath.lastCurve.point1, activePath.lastSegment.point)
    displayPath.style = Object.assign({}, lineStyle)
    activeRoute.displayPathsGroup.addChild(displayPath)

    var displayCorner = createRouteCorner(lineStyle)
    displayCorner.position = activePath.lastSegment.point
    activeRoute.displayCornersGroup.addChild(displayCorner)
    activeRoute.data.customStyles.push(Object.assign({}, lineStyle))
    activeRoute.data.customStyles = duplicateObjectViaJson(activeRoute.data.customStyles)

    // What's the symbol name of our path's last end symbol?
    var lastCurveEndSymbolName = null

    // In football, when adding a line segment to another one, we want to delete the previous one's end symbol (so that only the knob shows).
    if (product == 'firstdown') {
        if (activePath.lastCurve.previous) {
            if (activePath.lastCurve.previous.endSymbol) {
                //show knob that WAS at end, now will be 2nd to last
                var lastCurveEndSymbolName = activePath.lastCurve.previous.endSymbol.data.symbolType
                activePath.lastCurve.previous.segment2.knob.visible = true
                activePath.lastCurve.previous.segment2.knob.opacity = 1
                activePath.lastCurve.previous.endSymbol.remove()
                activePath.lastCurve.previous.endSymbol = null
            }
        }
    }

    // In basketball, when adding a line segment to another one, the logic gets a little more complex...
    else if (product == 'fastbreak') {

        // The stroke style of the curve that was just added.
        var lastCurveStrokeStyle = activeRoute.data.customStyles[activePath.lastCurve.index].strokeStyle

        // Now we need to get info about the curve right before the one we just added.
        var secondToLastCurve = activePath.lastCurve.previous
        var secondToLastCurveEndSymbol = secondToLastCurve ? secondToLastCurve.endSymbol : null
        var secondToLastCurveEndSymbolType = secondToLastCurveEndSymbol ? secondToLastCurveEndSymbol.data.symbolType : null

        // If we have a curve before the one that was just added, continue...
        if (secondToLastCurve) {

            var secondToLastCurveIndex = secondToLastCurve.index // So we can use it to reference the line's style
            var secondToLastCurveStrokeStyle = activeRoute.data.customStyles[secondToLastCurveIndex].strokeStyle

            // If user is adding a line of the same type as the previous one, then delete the end symbol on the previous line.
            if (secondToLastCurveStrokeStyle == lastCurveStrokeStyle) {

                // If our second to last curve has an end symbol, continue...
                if (secondToLastCurveEndSymbolType) {

                    // If the previous symbol was a screen symbol, don't delete it! Otherwise, delete it!
                    if (secondToLastCurveEndSymbolType != Factory.symbolTypes.T_BLOCK
                        && secondToLastCurveEndSymbolType != Factory.symbolTypes.T_BLOCKLEFT
                        && secondToLastCurveEndSymbolType != Factory.symbolTypes.T_BLOCKRIGHT) {

                        //show knob that WAS at end, now will be 2nd to last
                        var lastCurveEndSymbolName = secondToLastCurveEndSymbolType
                        secondToLastCurve.segment2.knob.visible = true
                        secondToLastCurve.segment2.knob.opacity = 1
                        secondToLastCurve.endSymbol.remove()
                        secondToLastCurve.endSymbol = null

                    }

                    // If the previous symbol was a screen symbol and the new line is NOT a screen symbol, use the default triangle end point.
                    else {

                        var lastCurveEndSymbolName = 'TRIANGLE'
                    }
                }
            } else {
                // If there is not previous line then we should default endpoint to be triangle.
                var lastCurveEndSymbolName = 'TRIANGLE'
            }

        } else {
            // If there is not previous line then we should default endpoint to be triangle.
            var lastCurveEndSymbolName = 'TRIANGLE'
        }
    }

    // Draw default end symbol on the new curve.
    drawEndSymbolOnCurve(activePath.lastCurve, lastCurveEndSymbolName)

    selectItem(nonCurveKnob)
    redrawPlayerRoute(activePlayerObject)
    updateAllPlayerRoutesOnLayer()

    nonCurveKnob.opacity = 0
}


/**
 * Add a player to the canvas at the specified point (otherwise player will be placed in the center of the canvas).
 */
function addPlayer(placeAtPoint = null)
{
    // Unselect everything first.
    deselectAllCanvasObjects()

    // Save the current state so we can undo.
    pushMainLayerToUndoStack()

    // Generate an empty player object first.
    var playerObject = createEmptyPlayerObject()

    // Draw a default player symbol based on Factory specs.
    var playerSymbol = drawPlayerSymbol(playerStyle)

    // Add the player symbol to the player object.
    playerObject.addChild(playerSymbol)
    playerObject.pivot = new Point(0, 0)
    playerSymbol.pivot = new Point(0, 0)
    playerSymbol.data.fdpbType = Factory.fdpbTypes.PLAYER_SYMBOL;

    // Make the player symbol selectable.
    makeItemSelectable(playerSymbol)
    playerSymbol.onDoubleClick = onDoubleClickPlayerSymbol

    playerObject.playerSymbol = playerSymbol
    playerObject.position = view.center

    // Add the player object to the main layer.
    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.addChild(playerObject)

    // Now place and select the player symbol.
    placePlayer(playerObject, placeAtPoint, true)
    selectItem(playerObject.playerSymbol)
}


/**
 * Add a basketball defense player to the canvas at the specified point (otherwise player will be placed in the center of the canvas).
 */
function addBasketballDefensePlayer(playerText = 'x1', placeAtPoint = null)
{
    // Unselect everything first.
    deselectAllCanvasObjects()

    // Save the current state so we can undo.
    pushMainLayerToUndoStack()

    // Generate the player object.
    var basketballDefensePlayerObject = new Group()
    basketballDefensePlayerObject.data.fdpbType = Factory.fdpbTypes.BASKETBALL_DEFENSE_PLAYER_OBJECT

    // Draw a default player symbol based on Factory specs.
    var basketballDefensePlayerStyle = Factory.defaultBasketballDefensePlayerStyle
    basketballDefensePlayerStyle.text = playerText // Update the player text before drawing the player symbol.
    var basketballDefensePlayerSymbol = drawPlayerSymbol(basketballDefensePlayerStyle)

    // Add the player symbol to the player object.
    basketballDefensePlayerObject.addChild(basketballDefensePlayerSymbol)
    basketballDefensePlayerObject.pivot = new Point(0, 0)
    basketballDefensePlayerSymbol.pivot = new Point(0, 0)
    basketballDefensePlayerSymbol.data.fdpbType = Factory.fdpbTypes.BASKETBALL_DEFENSE_PLAYER_SYMBOL

    // Make the player symbol selectable.
    makeItemSelectable(basketballDefensePlayerSymbol)
    basketballDefensePlayerObject.playerSymbol = basketballDefensePlayerSymbol
    basketballDefensePlayerObject.position = view.center

    // Add the player object to the main layer.
    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.addChild(basketballDefensePlayerObject)

    // Now place and select the player symbol.
    placePlayer(basketballDefensePlayerObject, placeAtPoint, true)
    selectItem(basketballDefensePlayerObject.playerSymbol)
}



/**
 * Add a straight line to a player object.
 */
function addStraightLine()
{
    addPathSegment()
}


/**
 * Add styled curves to the specified array.
 */
function addStyledCurvesToArray(styledCurves, arrayToAddTo)
{
    if (styledCurves.length > 0) {
        for (var i = 0; i < styledCurves.length; i++) {
            var selectedCurve = styledCurves[i];
            var route = selectedCurve.path.parent;
            var style = Object.assign({}, route.data.customStyles[selectedCurve.index])
            arrayToAddTo.push({
                fdpbType: Factory.fdpbTypes.LINE_SEGMENT,
                style: style
            });
            var endSymbol = selectedCurve.endSymbol;
            if (endSymbol) {
                arrayToAddTo.push({
                    fdpbType: Factory.fdpbTypes.END_SYMBOL,
                    style: endSymbol.data.customStyle
                });
            }
        }
    }
}


/**
 * Add a styled end symbol to the specified array.
 */
function addStyledEndSymbolToArray(playerObject, arrayToAddTo)
{
    if (playerObject.endSymbolsGroup) {
        var endSymbols = playerObject.endSymbolsGroup.children;
        for (var i = 0; i < endSymbols.length; i++) {
            var endSymbol = endSymbols[i];
            addStyledItemToArray(endSymbol, arrayToAddTo)
        }
    }
}

/**
 * Copy the styles from the styled item to the specified array.
 */
function addStyledItemToArray(styledItem, arrayToAddTo, speed = null)
{
    var selectionObject = {
        fdpbType: "",
        style: {},
        speed: null
    };
    selectionObject.fdpbType = styledItem.data.fdpbType;
    selectionObject.style = styledItem.data.customStyle;
    selectionObject.speed = speed;
    arrayToAddTo.push(selectionObject);
}


/**
 * Add a styled line insert to the specified array.
 */
function addStyledLineInsertToArray(playerObject, arrayToAddTo)
{
    if (playerObject.insertsGroup) {
        var inserts = playerObject.insertsGroup.children;
        for (var i = 0; i < inserts.length; i++) {
            var insert = inserts[i];
            addStyledItemToArray(insert, arrayToAddTo)
        }
    }
}


/**
 * Add the selected symbol from the UI to the canvas and make it the active item.
 */
function addSymbol(playerShapeFileName)
{
    pushMainLayerToUndoStack()

    // Make the symbol the active item.
    activeItem = paper.project.importSVG('/imgs/' + playerShapeFileName + '.svg', {
        onLoad: onSymbolLoad,
        insert: false
    })
    // window.app.config.globalProperties.$playEditorRef.value.activeItem = activeItem
    window.app.config.globalProperties.$pinia.state._value.counter.activeItem = activeItem

}


/**
 * When user adds a text box.
 */
function addTextBox()
{
    pushMainLayerToUndoStack();
    var textBox = createTextBox(textStyle)
    textBox.data.fdpbType = Factory.fdpbTypes.TEXT_BOX
    textBox.position = viewBoundsOnLoad.center

    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.addChild(textBox)

    makeItemSelectable(textBox)
    selectItem(textBox)
}


/**
 * Apply dashes count?
 */
function applyDashesCount(item, count, gap)
{
    var perimeterLength = item.length
    var compoundLength = perimeterLength / count
    var dashLength = compoundLength - gap
    item.dashArray = [dashLength, gap]
    //  item.dashOffset = dashLength/2;
}


/**
 * Apply the specified style to the line.
 */
function applyLineStyle(styleKey = null, styleValue = null)
{
    addSentryBreadcrumb("Applied line style (stylekey = " + styleKey + "; styleValue = " + styleValue + ").")

    // If we have no active item, we can't really do anything.
    if (!activeItem) {
        addSentryMessage('No active item to apply line style to.')
    }

    // If we have a multiselect or group, make sure all lines within it are selected.
    else if (activeItem.data.fdpbType == Factory.fdpbTypes.MULTISELECTION || activeItem.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        selectAllCurvesInMultiSelect(activeItem)
    }

    pushMainLayerToUndoStack()

    // Set the global line style key/value.
    lineStyle[styleKey] = styleValue

    lineStyle.customDashArray = [11, 5]
    if (lineStyle.strokeStyle == 'Dashed') {
        lineStyle.customDashArray = [26, 10]
    }

    //change style of all selected curves
    for (var i = 0; i < selectedCurves.length; i++) {

        var selectedCurve = selectedCurves[i];
        var route = selectedCurve.path.parent;

        var newCustomStyle = Object.assign({}, route.data.customStyles[selectedCurve.index]);

        if (!styleKey) {
            newCustomStyle = Object.assign({}, lineStyle)
        } else {
            newCustomStyle[styleKey] = styleValue
            if (styleKey == "strokeStyle") {
                newCustomStyle.strokeCap = lineStyle.strokeCap
                newCustomStyle.customDashArray = lineStyle.customDashArray
            }
        }
        //copy  to destroy references?
        route.data.customStyles = duplicateObjectViaJson(route.data.customStyles)
        route.data.customStyles[selectedCurve.index] = newCustomStyle

        // Get the curve's parent player object so we can redraw it
        var parentPlayerObject = getParentPlayerObjectFromChild(route)
        setStylePropertiesOnPlayerObjectSymbols(parentPlayerObject)
        redrawPlayerRoute(parentPlayerObject)
    }

    updateAllPlayerRoutesOnLayer()
}

/**
 * Update the specified player speed to the specified player object.
 */

function updatePlayerSpeed(itemToUpdate = null, speed = null){
        // If we didn't specify an item to update the speed to, then try to use the active player object.
        if (!itemToUpdate) {

            // If there's an active player object, update the speed to the player object.
            if (activePlayerObject) {
                itemToUpdate = activePlayerObject
            }
    
            // If there's an active item (like a multiselect), update the speed to the active item.
            else if (activeItem) {
                itemToUpdate = activeItem
            }
        }
    
        // If we still don't have an item to apply a style to, exit now.
        if (!itemToUpdate) {
            return
        }
    
        // update player speed to every player in a multiselection or group.
        if (itemToUpdate.data.fdpbType == Factory.fdpbTypes.MULTISELECTION || itemToUpdate.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
            var pbObjects = itemToUpdate.children
            for (var i = 0; i < pbObjects.length; i++) {
                updatePlayerSpeed(pbObjects[i], speed)
            }
        }

        else if (itemToUpdate.data.fdpbType === Factory.fdpbTypes.PLAYER_OBJECT) {
            pushMainLayerToUndoStack()
            itemToUpdate.data.speed = speed;
        }else{
            addSentryMessage('No player object to update speed.')
            return 
        }
        
        console.log("Updated>>",activePlayerObject)
}


/**
 * Apply the specified player style to the specified player object.
 */
function applyPlayerStyle(itemToApplyStyleTo = null, styleKey = null, styleValue = null)
{
    // If we didn't specify an item to apply a style to, then try to use the active player object.
    if (!itemToApplyStyleTo) {

        // If there's an active player object, apply the style to the player object.
        if (activePlayerObject) {
            itemToApplyStyleTo = activePlayerObject
        }

        // If there's an active item (like a multiselect), apply the style to the active item.
        else if (activeItem) {
            itemToApplyStyleTo = activeItem
        }
    }

    // If we still don't have an item to apply a style to, exit now.
    if (!itemToApplyStyleTo) {
        return
    }

    // Apply player style to every player in a multiselection or group.
    if (itemToApplyStyleTo.data.fdpbType == Factory.fdpbTypes.MULTISELECTION || itemToApplyStyleTo.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        var pbObjects = itemToApplyStyleTo.children
        for (var i = 0; i < pbObjects.length; i++) {
            applyPlayerStyle(pbObjects[i], styleKey, styleValue)
        }
    }

    // If the item to apply the style to is a player object, make sure we style just the player symbol.
    else if (itemToApplyStyleTo.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
        itemToApplyStyleTo = itemToApplyStyleTo.playerSymbol
    }

    // If the item is not a player symbol or a basketball defense player symbol, exit now, nothing to style.
    if (itemToApplyStyleTo.data.fdpbType != Factory.fdpbTypes.PLAYER_SYMBOL && itemToApplyStyleTo.data.fdpbType != Factory.fdpbTypes.BASKETBALL_DEFENSE_PLAYER_SYMBOL) {
        addSentryMessage('No player symbol to style.')
        return
    }

    pushMainLayerToUndoStack()
    applyPlayerSymbolStyle(itemToApplyStyleTo, styleKey, styleValue)
    //highlightAllMainLayerItems()
    redrawMainLayer()
}


/**
 * Apply the specified style to the specified player symbol.
 */
function applyPlayerSymbolStyle(itemToApplyStyleTo = null, styleKey = null, styleValue = null)
{
    var factoryPlayerStyle = playerStyle
    var customStyle = Object.assign({}, itemToApplyStyleTo.data.customStyle)

    if (!styleKey) {
        customStyle = Object.assign({}, factoryPlayerStyle)
        window.engineDebug("NO STYLE DO WE EVER GET HERE?)")
    } else {
        customStyle[styleKey] = styleValue
    }

    itemToApplyStyleTo.data.customStyle = customStyle

    updatePlayerSymbolShapeAndText(itemToApplyStyleTo)
    updateSelector(itemToApplyStyleTo, 'persistent_selector')
}


/**
 * Apply the specified text box style to the specified text box object.
 */
function applyTextBoxStyle(itemToApplyStyleTo = null, styleKey = null, styleValue = null)
{
    // If we didn't specify an item to apply a style to, then try to use the active item.
    if (!itemToApplyStyleTo) {
        if (activeItem) {
            itemToApplyStyleTo = activeItem
        }
    }

    // If we still don't have an item to apply a style to, exit now.
    if (!itemToApplyStyleTo) {
        return
    }

    // If the item is a multiselect, apply the text box style to every item in the group.
    if (itemToApplyStyleTo.data.fdpbType == Factory.fdpbTypes.MULTISELECTION || itemToApplyStyleTo.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        var pbObjects = itemToApplyStyleTo.children
        for (var i = 0; i < pbObjects.length; i++) {
            applyTextBoxStyle(pbObjects[i], styleKey, styleValue)
        }
    }

    // If the item is not a text box, exit now.
    if (itemToApplyStyleTo.data.fdpbType != Factory.fdpbTypes.TEXT_BOX) {
        return
    }

    var factoryTextStyle = textStyle

    // If this is a multi-selection or group, apply the style to each item in the group...
    if (itemToApplyStyleTo.data.fdpbType == Factory.fdpbTypes.MULTISELECTION || itemToApplyStyleTo.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        var pbObjects = itemToApplyStyleTo.children;
        for (var i = 0; i < pbObjects.length; i++) {
            applyTextBoxStyle(itemToApplyStyleTo, styleKey, styleValue)
        }
    }

    // If this is not a text box, exit now, nothing to style.
    if (itemToApplyStyleTo.data.fdpbType != Factory.fdpbTypes.TEXT_BOX) {
        return
    }

    pushMainLayerToUndoStack()

    //decouple
    var customStyle = Object.assign({}, itemToApplyStyleTo.data.customStyle);

    /*if (styleKey == "fontFamily") {
        customStyle.bold = textStyle.bold
        customStyle.italic = textStyle.italic
        customStyle.underline = textStyle.underline
        //s
    }*/

    if (!styleKey) {
        customStyle = Object.assign({}, factoryTextStyle);
    } else {
        customStyle[styleKey] = styleValue
    }

    itemToApplyStyleTo.data.customStyle = customStyle

    updateTextBox(itemToApplyStyleTo)

    // Set this to true to clear the selector before adding the new one.
    updateSelector(itemToApplyStyleTo, 'persistent_selector', true)
    //highlightAllMainLayerItems()
}


/**
 * Are the specified items in the same playbook object?
 */
function areItemsInSameCustomCanvasObject(item, item2)
{
    if (item == item2) {
        return true;
    }
    if (item.isDescendant(item2)) return true;
    if (item2.isDescendant(item)) return true;
    var rootPlayerObject = getParentPlayerObjectFromChild(item);
    var rootPlayerObject2 = getParentPlayerObjectFromChild(item2);
    //could be both null, discount for that
    if (rootPlayerObject == rootPlayerObject2 && !!rootPlayerObject) return true;
    return false;
}


/**
 * Blur the FastBreak notes box on the specified frame number.
 */
function blurFastBreakNotes(frameNumber = 1)
{
    window.app.config.globalProperties.$playEditorRef.value.$refs['frameNotesEditor' + frameNumber][0].editor.commands.blur()
}


/**
 * Bring the active playbook object to the front.
 */
function bringItemToFront(event)
{
    if (!activeItem) {
        return
    }

    /* If selected itm is a player symbol or knob, bring the entire player object forward. */
    if (activeItem.data.fdpbType == Factory.fdpbTypes.PLAYER_SYMBOL || activeItem.data.fdpbType == Factory.fdpbTypes.KNOB) {
        var playerObject = getParentPlayerObjectFromChild(activeItem)
        if (playerObject) {
            playerObject.bringToFront()
        } else {
            addSentryBreadcrumb('No player object to bring forward.', 'warning')
        }
    }

    /* If the selected item is part of a multiselection or group, get the parent item */
    else if (isObjectPartOfAGroup(activeItem)) {
        var parentObject = getParentGroupObject(activeItem)
        if (parentObject) {
            parentObject.bringToFront()
        } else {
            addSentryBreadcrumb('No group parent object to bring forward.', 'warning')
        }
    }

    /* Bring any other kinds of active items to the front. */
    else {
        activeItem.bringToFront()
    }

    pushMainLayerToUndoStack()
    showAllPlayerRouteCorners()
    updateAllPlayerRoutesOnLayer()
}


/**
 * When user changes the sports field...
 */
function changeSportsFieldOnAllFrames(imgUrl)
{
    // Set the background SVG to null (it will be reset once the new image is loaded)
    backgroundSvg = null

    // Force redraw of watermarks as well
    watermarkSvg = null

    for (var i = 0; i < paper.projects.length; i++) {
        var frameNumber = i + 1
        loadFieldBackground(imgUrl, frameNumber)
    }
}


/**
 * When user selects a new zoom level from the UI...
 */
function changeZoomLevel(selectedZoomLevel = 1)
{
    view.zoom = selectedZoomLevel * paper.containerZoom

    // Make sure the zoom doesn't take the play out of bounds.
    constrainPlayWithinBounds()

    // We also need to resize and reposition the watermark accordingly.
    watermarkSvg = null // Set to null so we can force a redraw of the watermark
    loadWatermark()
}


/**
 * Removes all children from the specified layer.
 */
function clearLayer(layer = null)
{
    if (layer) {
        layer.removeChildren()
    }
}


/**
 * Clear these layers before exporting the play.
 */
function clearLayersForExport(frameNumber = 1, showWatermark = false)
{
    // Should we show or hide the watermark layer?
    if (showWatermark) {
        showItem(getLayerByName('WATERMARK_LAYER', frameNumber))
    } else {
        hideItem(getLayerByName('WATERMARK_LAYER', frameNumber))
    }

    clearLayer(getLayerByName('HIGHLIGHT_LAYER'), frameNumber)
    clearLayer(getLayerByName('PERSISTENT_SELECTION_LAYER', frameNumber))
    clearLayer(getLayerByName('SELECTION_BOX_LAYER', frameNumber))
    //toolLayer.visible = false;//leave LOS ON!

    // Update the view on each frame/project.
    paper.projects[frameNumber - 1].view.update()
}


/**
 * Make sure the specified object doesn't go out of bounds.
 */
function constrainItemWithinBounds(item)
{
    var itemBounds = item.bounds

    //window.engineDebug(viewBounds)
    var nudge = new Point(0, 0);
    if (itemBounds.right > viewBoundsOnLoad.right) nudge.x = viewBoundsOnLoad.right - itemBounds.right;
    if (itemBounds.left < 0) nudge.x = 0 - itemBounds.left;
    if (itemBounds.bottom > viewBoundsOnLoad.bottom) nudge.y = viewBoundsOnLoad.bottom - itemBounds.bottom;
    if (itemBounds.top < 0) nudge.y = 0 - itemBounds.top;
    item.position = item.position + nudge;
}


/**
 * Make sure no part of the play is ever out of bounds.
 */
function constrainPlayWithinBounds()
{
    var left = (view.visiblePlayArea.left / view.zoom) + view.bounds.left
    var top = (view.visiblePlayArea.top / view.zoom) + view.bounds.top
    var right = (view.visiblePlayArea.left / view.zoom) + view.viewSize.width
    var bottom = (view.visiblePlayArea.top / view.zoom) + view.viewSize.height

    // Snap to left edge if necessary.
    if (left < 0) {
        view.translate(new Point(left, 0))
    }

    // Snap to right edge if necessary.
    if (view.bounds.right > right) {
        view.translate(new Point(-(right - view.bounds.right), 0))
    }

    // Snap to top edge if necessary.
    if (top < 0) {
        view.translate(new Point(0, top))
    }

    // Snap to bottom edge if necessary.
    if (view.bounds.bottom > bottom) {
        view.translate(new Point(0, -(bottom - view.bounds.bottom)))
    }
}


/**
 * Convert the specified dashes array into line segments.
 */
function convertDashesArrayToLineSegments(dashArray, path)
{
    var pos = 0;
    var segments = []
    while (pos < path.length) {
        for (var i = 0; i < dashArray.length; i++) {
            if (i % 2 == 0) {
                segments.push([pos, pos + dashArray[i]])
            }
            pos += dashArray[i];
            pos == Math.min(pos, path.length)
        }
    }
    return segments;
}


/**
 * Convert the given group into a multi-selection and select it if specified.
 */
function convertGroupToMultiSelection(multiSelectGroup, selectMultiSelectGroup = false)
{
    multiSelectGroup.data.fdpbType = Factory.fdpbTypes.MULTISELECTION

    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.addChild(multiSelectGroup)

    makeItemSelectable(multiSelectGroup)

    // Select the multi-selection item if applicable.
    if (selectMultiSelectGroup) {
        selectItem(multiSelectGroup)
    }
}


/**
 * Convert the specified group to a multi-selection and update the active item selection.
 */
function convertGroupToMultiSelectionAndUpdateSelection(groupObject)
{
    if (groupObject.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        groupObject.data.fdpbType = Factory.fdpbTypes.MULTISELECTION
        groupObject.opacity = 1
        updateActiveItemSelection()
    }
}


/**
 * Convert the items to a multi-selection group using the given items.
 */
function convertItemsToMultiSelectionGroup(selectedItems, selectItems = false)
{
    var selectionGroup = new Group()
    for (var i = 0; i < selectedItems.length; i++) {
        selectionGroup.addChild(selectedItems[i])
    }

    // Now convert the group to a multi-selection object.
    convertGroupToMultiSelection(selectionGroup, selectItems)
}


/**
 * Convert the specified line segments into a dashes array.
 */
function convertLineSegementsToDashesArray(lineSegments)
{
    dashArray = []
    if (lineSegments.length > 0 && lineSegments[0][0] != 0) {

        //this means 1st part is a gap, so I think add a dash of zero
        dashArray.push(0);
        //then space of the initial length
        dashArray.push(lineSegments[0][0]);
    }
    for (var i = 0; i < lineSegments.length; i++) {;
        dashArray.push(lineSegments[i][1] - lineSegments[i][0])
        if (i < lineSegments.length - 1) {
            dashArray.push(lineSegments[i + 1][0] - lineSegments[i][1])
        }
    }
    //window.engineDebug(dashArray)
    return dashArray;
}


/**
 * Convert a multi-selection object to a group object.
 */
function convertMultiSelectionToGroup(multiSelectionObject)
{
    if (multiSelectionObject.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
        multiSelectionObject.data.fdpbType = Factory.fdpbTypes.FDPB_GROUP
        updateActiveItemSelection()
    }
}


/**
 * Copy the active item or player object.
 */
function copyActiveItemOrPlayerObject()
{
    setLineOfScrimmageDataPropertiesOnMainLayer()
    setDataPropertiesOnAllPlayerObjects()

    if (activePlayerObject) {
        clipboard = activePlayerObject.clone({ insert: false, deep: true });

    } else if (activeItem) {
        clipboard = activeItem.clone({ insert: false, deep: true });
        clipboard.data = duplicateObjectViaJson(activeItem.data);
    }
    disbandMultiSelectionObject();
    deselectAllCanvasObjects()

    window.engineDebug("copyActiveItemOrPlayerObject", clipboard);
}


/**
 * Create a dashes array.
 */
function createDashesArray(curve, displayPath, customStyle)
{
    //var lineSegments = [[0,displayPath.length]]
    var lineSegments = [
        [0, 2000]
    ]
    if (customStyle.strokeStyle == "Dashed" || customStyle.strokeStyle == "Dotted") {
        lineSegments = convertDashesArrayToLineSegments(customStyle.customDashArray, displayPath)
    }
    displayPath.dashArray = convertLineSegementsToDashesArray(lineSegments);
    //beginning

    if (curve.isFirst()) {
        if (!curve.path.data.isBranchingPath) {
            //window.engineDebug("!isBranchingPath");
            //leave gap for playersymbol
            var customCanvasObject = getParentPlayerObjectFromChild(curve.path);
            var playerSymbol = customCanvasObject.playerSymbol;
            var curveLoc = displayPath.getIntersections(playerSymbol.children[1].children[1])[0];
            if (curveLoc) {
                //window.engineDebug("making gap at symbol");

                //using .offset works for zig zag and not (.curveOffset doesn't work for zig zag)
                removeGapFromPath([0, curveLoc.offset], displayPath)
            }
        } else if (curve.rootKnob != null) {
            if (curve.rootKnob.curve.endSymbol) {
                window.engineDebug("root knob has symbol");
                //root knob has a symbol on it.
                removeGapFromPath([0, Factory.INTERACTION_RADIUS], displayPath)
            }

        }
    } else if (curve.previous.endSymbol) {
        //previous knob has symbol
        window.engineDebug("previous has symbol");
        removeGapFromPath([0, Factory.INTERACTION_RADIUS], displayPath)
    }
}


/**
 * Create dashes on the specified route.
 */
function createDashesOnRoute(route = null)
{
    if (!route) {
        addSentryMessage('No route to add dashes to.')
        return
    }

    if (!route.path) {
        addSentryMessage('No path attached to the route.')
        return
    }

    if (!route.path.curves) {
        addSentryMessage('No curves attached to the path.')
        return
    }

    if (!route.displayPathsGroup) {
        addSentryMessage('Route does not have a displayPathsGroup.')
        return
    }

    //get path from children
    for (var i = 0; i < route.path.curves.length; i++) {
        var displayPath = route.displayPathsGroup.children[i]
        var customStyle = route.data.customStyles[i]
        var curve = route.path.curves[i]
        createDashesArray(curve, displayPath, customStyle)
    }
}


/**
 * Create an empty player object.
 */
function createEmptyPlayerObject()
{
    // Generate the player object.
    var playerObject = new Group()
    addNamedChildGroupToItem(playerObject, "handlesGroup")
    addNamedChildGroupToItem(playerObject, "routesGroup")
    addNamedChildGroupToItem(playerObject, "knobsGroup")
    addNamedChildGroupToItem(playerObject, "endSymbolsGroup")
    addNamedChildGroupToItem(playerObject, "insertsGroup")

    playerObject.data.fdpbType = Factory.fdpbTypes.PLAYER_OBJECT
    playerObject.data.speed = 2

    return playerObject
}

/**
 * Create an empty presentation object.
 */
function createEmptyPresentationObject()
{
    // Generate the presentation object.
    var presentationObject = new Group()
    addNamedChildGroupToItem(presentationObject, "routesGroup")

    presentationObject.data.fdpbType = Factory.fdpbTypes.PRESENTATION_OBJECT

    return presentationObject
}


/**
 * Create a knob object. Set tangentMultiplier = 0 to make the curve straight.
 */
function createKnobObject(route = null, isCurveKnob = false, tangentMultiplier = 40)
{
    if (!route) {
        route = activeRoute
    }

    if (!route) {
        addSentryMessage('No route to add knob object to.')
        return
    }

    var knob = new Group();
    var curve = route.path.lastCurve;
    var segment = route.path.lastSegment;
    var pt = segment.point;
    var knobType = "SEGMENT"
    knob.curve = curve;

    if (isCurveKnob) {
        knobType = "CURVE";

        // pt = curve.point1 + new Point(40, -40)
        //adjust curve

        var tangent = curve.getTangentAtTime(0.5)
        var halfwaypoint = curve.getPointAtTime(.5)
        tangent = tangent.rotate(90)
        pt = halfwaypoint + tangent * tangentMultiplier
        while (!viewBoundsOnLoad.contains(pt)) {
            pt = halfwaypoint + tangent * -tangentMultiplier;
        }

        curve.handle1 = (pt - curve.point1) * CURVE_MULTIPLIER;
        curve.handle2 = (pt - curve.point2) * CURVE_MULTIPLIER;

        curve.knob = knob;
        addBezierIndicatorLinesToCurveKnob(knob, activePlayerObject);

    }

    var knobShape = drawKnobShape()

    knob.addChild(knobShape)
    knob.position = pt
    knob.name = "knob"
    //knob.segments = [segment]
    knob.route = route //need?
    knob.curve = curve
    knob.segment = segment
    segment.knob = knob
    knob.data.knobType = knobType
    knob.data.fdpbType = Factory.fdpbTypes.KNOB
    setDataPropertiesOnKnob(knob)
    makeItemSelectable(knob)

    return knob
}


/**
 * Create a new project layer with the specified name.
 */
function createOrReturnExistingLayer(layerName, frameNumber = 1)
{
    // Do we already have a layer with this name?
    var existingLayer = getLayerByName(layerName, frameNumber)

    // If not, create one now.
    if (!existingLayer) {
        var newLayer = new Layer()
        newLayer.name = layerName
        return newLayer
    }

    // Otherwise just return the existing layer.
    return existingLayer
}


/**
 * Create a new line insert of the specified insert type.
 */
function createLineInsert(insertType)
{
    if (!activeRoute) {
        addSentryMessage('No active route found when trying to create a line insert.')
        return
    }

    if (activeRoute.path.length < 20) return;

    pushMainLayerToUndoStack()
    var curve = activeRoute.path.firstCurve;
    if (selectedCurves.length > 0) {
        curve = selectedCurves[0];
    }
    var symbol = createSymbolGroup(insertType);
    symbol.data.fdpbType = Factory.fdpbTypes.INSERT_SYMBOL;
    symbol.curveOffset = curve.length / 2;
    symbol.curve = curve
    symbol.route = activeRoute;
    activePlayerObject.insertsGroup.addChild(symbol)

    setStylePropertiesOnSymbol(symbol)
    makeItemSelectable(symbol)
    redrawPlayerRoute(activePlayerObject);

    selectItem(symbol);
}


/**
 * Create the line of scrimmage to the tool layer on the canvas.
 */
function createLineOfScrimmage()
{
    lineOfScrimmage = new Path.Line({
        from: [0, view.center.y],
        to: [1000, view.center.y],
        strokeColor: Factory.colorDefs.LINE_OF_SCRIMMAGE,
        strokeWidth: 6,
        opacity: 1
    })
    lineOfScrimmage.position.y = view.center.y / 2;
    hideItem(lineOfScrimmage)

    lineOfScrimmage.data.fdpbType = Factory.fdpbTypes.LINE_OF_SCRIMMAGE;

    /**
     * When user selects the line of scrimmage tool.
     */
    lineOfScrimmage.onMouseDown = onMouseDownSelectable

    /**
     * When user hovers their mouse over the line of scrimmage, change the color of it.
     */
    lineOfScrimmage.onMouseEnter = function() {
        if (!currentlyDraggingItem && !userIsSelectingItems) {
            lineOfScrimmage.strokeColor = Factory.colorDefs.SELECTION
        }
    }

    /**
     * When user stops hovering over the line of scrimmage, change the color back to its original color.
     */
    lineOfScrimmage.onMouseLeave = function() {
        if (!currentlyDraggingItem) {
            lineOfScrimmage.strokeColor = Factory.colorDefs.LINE_OF_SCRIMMAGE
        }
    }


    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.data.LineOfScrimmagePosition = view.center.y / 2
    mainLayer.data.LineOfScrimmageVisible = false

    // window.app.config.globalProperties.$playEditorRef.value.lineOfScrimmage = false
    window.app.config.globalProperties.$pinia.state._value.counter.lineOfScrimmage = false

    // Add the line of scrimmage to the tool layer (why?)
    var toolLayer = getLayerByName('TOOL_LAYER')
    toolLayer.addChild(lineOfScrimmage);
}


/**
 * Create all of the layers for this project (in correct stacking order)
 */
function createAllProjectLayers(frameNumber = 1)
{
    // Now recreate the layers on the project if they don't already exist.
    createOrReturnExistingLayer("BG_LAYER", frameNumber)
    createOrReturnExistingLayer("WATERMARK_LAYER", frameNumber)
    createOrReturnExistingLayer("TOOL_LAYER", frameNumber)
    createOrReturnExistingLayer("HIGHLIGHT_LAYER", frameNumber)
    createOrReturnExistingLayer("PERSISTENT_SELECTION_LAYER", frameNumber)
    createOrReturnExistingLayer("GUIDE_LAYER", frameNumber)
    createOrReturnExistingLayer("MAIN_LAYER", frameNumber)

    // This layer contains all animation objects
    createOrReturnExistingLayer("PRESENTATION_LAYER", frameNumber)

    // Contains the dashed box when a user tries to select items.
    createOrReturnExistingLayer("SELECTION_BOX_LAYER", frameNumber)

    // Hide the watermark layer.
    hideItem(getLayerByName('WATERMARK_LAYER', frameNumber))

    // Add mouse events to the background layer.
    var backgroundLayer = getLayerByName('BG_LAYER', frameNumber)
    backgroundLayer.onMouseDown = onMouseDownBG
    backgroundLayer.onDoubleClick = onDoubleClickBG
}


/**
 * Create mouse area.
 */
function createMouseArea()
{
    var circle = new Path.Circle(new Point(0, 0), Factory.INTERACTION_RADIUS);
    circle.fillColor = new Color(1, 1, 1, .01)
    //circle.strokeColor = new Color(.5, .5,.5)
    circle.strokeWidth = 0
    return circle
}


/**
 * Create a highlight around a multiselection.
 */
function createMultiselectionHighlights(item)
{
    var multiHighlight = new Group();

    for (var i = 0; i < item.children.length; i++) {
        var selector = new Group();
        var subItem = item.children[i]
        if (subItem.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
            updateSelector(subItem.playerSymbol, 'highlight')
        } else {
            updateSelector(subItem, 'highlight')
        }
        selector.opacity = 1;
        //offest the sub selector offsets
        selector.position = selector.position - item.position;
        multiHighlight.addChild(selector)
    }
    // multiHighlight.pivot = item.position;
    return multiHighlight;
}


/**
 * Create player shading.
 */
function createPlayerShading(playerSymbol)
{
    // var shapeType = playerSymbol.data.customStyle.shapeType;
    var shadowStyle = playerSymbol.data.customStyle.shadowStyle
    var style = playerSymbol.data.customStyle
    var boolSize = 100
    var shadowShapeFull = drawPlayerShape(style)
    var centerWidth = 3
    var shadow

    if (shadowStyle == "LEFT") {
        var booleanShape = new Path.Rectangle({
            point: [0, -boolSize / 2],
            size: [boolSize, boolSize]
        });
        shadow = shadowShapeFull.subtract(booleanShape);
    }
    if (shadowStyle == "RIGHT") {
        var booleanShape = new Path.Rectangle({
            point: [-boolSize, -boolSize / 2],
            size: [boolSize, boolSize]
        })
        shadow = shadowShapeFull.subtract(booleanShape)
    }
    if (shadowStyle == "CENTER") {
        var leftbooleanShape = new Path.Rectangle({
            point: [centerWidth, -boolSize / 2],
            size: [boolSize, boolSize]
        })
        var tempShape = shadowShapeFull.subtract(leftbooleanShape)
        leftbooleanShape.remove()
        leftbooleanShape = null
        var booleanShape = new Path.Rectangle({
            point: [-boolSize - centerWidth, -boolSize / 2],
            size: [boolSize, boolSize]
        });
        shadow = tempShape.subtract(booleanShape);
        tempShape.remove()
        tempShape = null
    }
    booleanShape.remove()
    shadowShapeFull.remove()
    booleanShape = null
    shadowShapeFull = null
    shadow.strokeWidth = 0
    shadow.fillColor = new Color(0, 0, 0, .2)
    shadow.pivot = new Point(0, 0)
    return shadow;
}


/**
 * Create a new route to the specified player object and return the newly added route.
 */
function createRoute(playerObject = null, rootKnob = null)
{
    // Position the route path group and route path at the center of the player object.
    var routePathGroup = new Group()
    routePathGroup.position = playerObject.position

    var routePath = new Path()
    routePath.position = playerObject.position

    routePathGroup.addChild(routePath)
    routePathGroup.path = routePath

    // Now let's add a new sub-group to the route path group that will store the route path's paths?
    var displayPathsGroup = addNamedChildGroupToItem(routePathGroup, "displayPathsGroup")
    displayPathsGroup.onMouseDown = onMouseDownPath

    // Now let's add a new sub-group to the route path group that will store the route path's display corners.
    var displayCornersGroup = addNamedChildGroupToItem(routePathGroup, "displayCornersGroup")
    //    displayCornersGroup.visible = false;

    // Clear any custom styles on the route path group.
    routePathGroup.data.customStyles = []

    // If we have a branching knob to start the route off of, then use it. Otherwise, starte the route path directly off the player object.
    if (rootKnob) {
        routePath.add(rootKnob.position)
        routePath.data.isBranchingPath = true
    } else {
        routePath.add(playerObject.position)
        routePath.data.isBranchingPath = false
    }

    // Style the route path as desired.
    routePath.style = {
        strokeWidth: 0,
        strokeColor: null,
        fillColor: null,
    }

    // Now return the whole route path group
    return routePathGroup
}


/**
 * Create a corner on the route.
 */
function createRouteCorner(curveStyle)
{
    corner = new Group()
    styleRouteCorner(corner, curveStyle)
    return corner;
}


/**
 * Create a symbol.
 */
function createSymbolGroup(symbolType)
{
    var group = new Group();
    group.data.customStyle = {};
    group.data.length = Factory.SYMBOL_RADIUS * 2;
    group.data.symbolType = symbolType;

    var shape = drawSymbolShape(symbolType)
    group.addChild(shape)

    var mouseArea = createMouseArea();
    group.addChild(mouseArea);
    group.shape = shape;
    group.data.customStyle.symbolType = symbolType;
    group.data.customStyle.strokeCap = shape.data.strokeCap;
    return group;
}


/**
 * Create a default text box.
 */
function createTextBox(style)
{
    var mouseArea = new Group()
    var shapeGroup = new Group()
    var highlight = new Group()
    var textGroup = new Group()
    var textBox = new Group([mouseArea, shapeGroup, highlight, textGroup])

    textBox.data.customStyle = Object.assign({}, style)
    updateTextBox(textBox)

    textBox.pivot = new Point(0, 0)
    textGroup.pivot = new Point(0, 0)
    shapeGroup.pivot = new Point(0, 0)

    textBox.data.fdpbType = "TEXT_BOX"
    return textBox
}


/**
 * Deactivate the object's parent player object.
 */
function deactivateParentPlayerObject(childObject = null)
{
    setActivePlayerObject(childObject)

    // window.app.config.globalProperties.$playEditorRef.value.lineOfScrimmage = false
    window.app.config.globalProperties.$pinia.state._value.counter.lineOfScrimmage = false

    if (activePlayerObject) {
        hidePlayerObjectKnobs(activePlayerObject)
    }
}


/**
 * De-focus/blur the specified text box input.
 */
function defocusTextBoxInput(textElement = null)
{
    textElement.value = '' /* Clear the value */
    textElement.blur() /* Blur the input */
    editingText = false
}


/**
 * Delete the specified curve.
 */
function deleteCurve(curve)
{
    var path = curve.path
    var route = path.parent

    //if (curve != path.lastCurve) return; //not last segment

    // Delete the curve's end symbol if one exists.
    deleteEndSymbol(curve)

    var playerObject = getParentPlayerObjectFromChild(path);
    var inserts = playerObject.insertsGroup.children;
    for (var i = 0; i < inserts.length; i++) {
        var insert = inserts[i];
        if (insert.curve == curve) {
            insert.remove()
        }
    }

    var segment = curve.segment2;
    var curveIndex = curve.index;
    segment.knob.remove();

    if (curve.knob) {

        if (curve.knob.bezierLine1) {
            curve.knob.bezierLine1.remove()
        }

        if (curve.knob.bezierLine2) {
            curve.knob.bezierLine2.remove()
        }

        curve.knob.remove()
    }

    path.removeSegment(segment.index)

    // Empty the selected curves array
    resetSelectedCurvesArray()

    //activeRoute.data.customStyles.splice(curveIndex, 1);
    //route.data.customStyles.pop();
    //activeRoute.data = duplicateObjectViaJson(activeRoute.data);

    if (route && route.displayPathsGroup && route.displayPathsGroup.children[curveIndex]) {
        route.displayPathsGroup.children[curveIndex].remove()
    }

    if (route && route.displayCornersGroup && route.displayCornersGroup.children[curveIndex]) {
        route.displayCornersGroup.children[curveIndex].remove()
    }

    if (path.curves.length == 0) {
        //delate route
        route.remove();
        route = null;
    } else {
        redrawPlayerRoutePaths(activeRoute)
    }
}


/**
 * Delete the specified end symbol.
 */
function deleteEndSymbol(curve)
{
    if (!curve) {
        if (selectedCurves.length != 1) {
            addSentryMessage('Selected curves not equal to 1 when deleting end symbol.')
            return false
        }
        curve = selectedCurves[0]
    }

    var endSymbol = curve.endSymbol
    if (endSymbol) {
        endSymbol.knob.opacity = 1
        endSymbol.remove()
        endSymbol = null
        curve.endSymbol = null
        redrawPlayerRoute(activePlayerObject)
        return true
    }

    return false
}


/**
 * Delete the specified frame and make the active one the one before the deleted one.
 */
function deleteFrame(frameNumber = 1)
{
    addSentryBreadcrumb("Deleted frame #" + frameNumber)

    // Delete the frame canvas.
    $('#play-canvas-wrapper-' + (frameNumber)).remove()

    // Now we need to re-initialize the frame before the deleted one.
    initializeFrame(frameNumber - 1)

    // Delete the project (project index is 1 less than frame number).
    // We need to do this after initializing the previous frame, otherwise it won't work.
    paper.projects[frameNumber - 1].remove()
}


/**
 * Delete the active item.
 */
function deleteItem(itemToDelete = null)
{
    // If no item to delete is specified, then let's delete the active item.
    if (!itemToDelete) {
        itemToDelete = activeItem
    }

    // If there's still nothing to delete (meaning there's no specified or active item), then exit now.
    if (!itemToDelete) {
        return
    }

    // Save the current state so we can undo deletes properly.
    pushMainLayerToUndoStack()

    switch (itemToDelete.data.fdpbType) {

        // Line of scrimmage can't be deleted.
        case Factory.fdpbTypes.LINE_OF_SCRIMMAGE:
            return
            break

        // When a player symbol is deleted, delete the entire active player object.
        case Factory.fdpbTypes.PLAYER_SYMBOL:
            var playerObject = getParentPlayerObjectFromChild(itemToDelete)
            itemToDelete = playerObject
            break

        case Factory.fdpbTypes.KNOB:

            // Now delete the line segment attached to the knob
            deleteLineSegment()

            break
        default:
            //deleteCustomCanvasObject(itemToDelete)

    }

    // Remove the item from the DOM.
    itemToDelete.remove()

    // Reset our active variables.
    resetActiveItem()
    resetActivePlayerObject()
    resetSelectedCurvesArray()
    redrawPlayerRoute()
    updateAllPlayerRoutesOnLayer()
    updatePlayEditorSelectionArray()

    // Clear the selection and highlight layers.
    clearLayer(getLayerByName('HIGHLIGHT_LAYER'))
    clearLayer(getLayerByName('PERSISTENT_SELECTION_LAYER'))
}


/**
 * Delete the specified line segment.
 */
function deleteLineSegment(curve = null)
{
    if (!curve) {

        /* If there are no selected curves or there are more than 1 selected curve, exit now. */
        if (!selectedCurves) {
            addSentryMessage('No selected curves found when trying to delete a line segment.')
            return false
        }

        if (selectedCurves.length != 1) {
            addSentryMessage('More than 1 selected curve found when trying to delete a line segment.')
            return false
        }

        /* Otherwise, use the selected curve */
        curve = selectedCurves[0]
    }

    var knob = curve.segment2.knob
    var playerObject = getParentPlayerObjectFromChild(knob)
    var playerCurves = getAllPlayerObjectCurves(playerObject)

    /* Delete each player curve/line (if they exist). */
    if (playerCurves) {
        for (var c = 0; c < playerCurves.length; c++) {
            var playerCurve = playerCurves[c]

            /* Delete every curve except the one specified first. */
            if (playerCurve != curve) {
                if (playerCurve.point1 == knob.segment.point || playerCurve.point2 == knob.segment.point) {
                    deleteCurve(playerCurve)
                }
            }
        }
    }

    /* Now let's delete the specified line. */
    deleteCurve(curve)

    resetActiveItem()
    resetActivePlayerObject()

    redrawPlayerRoute()
    updateAllPlayerRoutesOnLayer()
}


/**
 * De-select everything on the canvas?
 */
function deselectAllCanvasObjects()
{
    // Clear the persistent selection layer
    var persistentSelectionLayer = getLayerByName('PERSISTENT_SELECTION_LAYER')
    clearLayer(persistentSelectionLayer)

    // Reset our selected curves
    resetSelectedCurvesArray()

    /* Hide all knobs on the active player object */
    if (activePlayerObject) {
        hidePlayerObjectKnobs(activePlayerObject)
    }

    // Reset all of our active items
    resetActivePlayerObject()
    resetActiveRoute()
    resetActiveItem()

    // Clear the PlayEditor UI selection array
    updatePlayEditorSelectionArray()
}


/**
 * Clear the selection layer and empty the selectedCurves array.
 */
function deselectAllCurves()
{
    clearLayer(getLayerByName('PERSISTENT_SELECTION_LAYER'))
    resetSelectedCurvesArray()
}



/**
 * Disable the onKeyDown handler.
 */
function disableOnKeyDownHandler()
{
    onKeyDownHandlerEnabled = false
}


/**
 * Disband all multi-selections except the one specified.
 */
function disbandAllMultiSelectionObjects(exceptThisOne)
{
    var mainLayer = getLayerByName('MAIN_LAYER')

    if (mainLayer) {
        var mainLayerChildren = mainLayer.children
        for (var i = 0; i < mainLayerChildren.length; i++) {
            if (exceptThisOne != mainLayerChildren[i]) {
                disbandMultiSelectionObject(mainLayerChildren[i]);
            }
        }
    }
}


/**
 * Disband the specified multi-selection object.
 */
function disbandMultiSelectionObject(objectToDisband = null)
{
    // If there is no object to disband or this is not a multi-selection, exit now.
    if (!objectToDisband || objectToDisband.data.fdpbType != Factory.fdpbTypes.MULTISELECTION) {
        return
    }

    // Add each multi-selection child as its own separate item.
    var objectParent = objectToDisband.parent
    while (objectToDisband.children.length > 0) {
        objectParent.addChild(objectToDisband.firstChild)
    }

    // Now remove teh multi-selection item.
    objectToDisband.remove()
    objectToDisband = null
}


/**
 * Drag the specified knob to the specified point.
 */
function dragKnobTo(knob, moveToPoint = null, tangentMultiplier = 40)
{
    var playerObject = getParentPlayerObjectFromChild(knob)
    var playerObjectCurves = getAllPlayerObjectCurves(playerObject)

    /* Segment knob is the one being dragged... */
    if (knob.data.knobType == 'SEGMENT') {

        /* If the player object has curves, move each curve with the knob... */
        if (playerObjectCurves) {

            for (var c = 0; c < playerObjectCurves.length; c++) {

                /* If any of the curve's handlers match the knob point, we need to move those too. */
                var curve = playerObjectCurves[c]

                if (curve.point1 == knob.segment.point) {
                    curve.point1 = moveToPoint
                }

                if (curve.point2 == knob.segment.point) {
                    curve.point2 = moveToPoint
                }
            }

        }

        /* Now move the selected knob segment to the new point. */
        knob.segment.point = moveToPoint

        /* If the selected curve has a curve knob attached to it, we want to keep the same curve angle when moving the segment knob. */
        if (knob.curve.hasHandles()) {
            knob.curve.handle1 = (knob.curve.knob.position - knob.curve.point1) * CURVE_MULTIPLIER
            knob.curve.handle2 = (knob.curve.knob.position - knob.curve.point2) * CURVE_MULTIPLIER
        }
    }

    /* Curve knob is the one being selected (changes the curve angle)... */
    else if (knob.data.knobType == 'CURVE') {
        // new position minus the curve's 1st point
        knob.curve.handle1 = (moveToPoint - knob.curve.point1) * CURVE_MULTIPLIER
        // new position minus the curve's 2nd point
        knob.curve.handle2 = (moveToPoint - knob.curve.point2) * CURVE_MULTIPLIER
    }

    /* Now reposition the knob itself. */
    knob.position = moveToPoint
}


/**
 * Drag the line insert to the specified point.
 */
function dragLineInsertTo(moveToPoint)
{
    var distanceTest = 1000;
    var routes = activePlayerObject.routesGroup.children;
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        var path = route.path;
        var curveLocation = path.getNearestLocation(moveToPoint);
        var distance = moveToPoint.getDistance(curveLocation.point);
        if (distance < distanceTest) {
            activeItem.curve = curveLocation.curve
            activeItem.curveOffset = curveLocation.curveOffset
            activeItem.route = route
            positionLineInsert(activeItem)
            setStylePropertiesOnSymbol(activeItem)
            distanceTest = distance
        }
    }
}


/**
 * Create an arrow shape.
 */
function drawArrowShape()
{
    var shape = new Group();
    var arrow = new Path();
    arrow.add(-7, 6);
    arrow.add(0, -8);
    arrow.add(7, 6);
    var stem = new Path();
    stem.add(0, 0);
    stem.add(0, -8);
    arrow.closed = false;
    shape.addChild(stem)
    shape.addChild(arrow);
    shape.pivot = new Point(0, 0);

    return shape;
}


/**
 * Create a ball shape.
 */
function drawBallShape()
{
    // Symbol needs to be proportionate to player size.
    var activePlayerWidth = getActivePlayerWidth()

    // T-Block size needs to be proportionate to player size.
    var activePlayerWidth = getActivePlayerWidth()

    switch (activePlayerWidth) {
        case 16:
            var radius = 3
        break
        case 30:
            var radius = 5 // can't change this because too many plays are drawn with this size
        break
        case 50:
            var radius = 5 // can't change this because too many plays are drawn with this size
        break
        case 80:
            var radius = 8
        break
        default:
            var radius = activePlayerWidth * .167
    }

    var shape = new Path.Circle(new Point(0, 0), radius);
    shape.data.filled = true;
    return shape
}


/**
 * Create an oval/ellipse shape.
 */
function drawEllipseShape(width, height)
{
    var rectangle = new Rectangle(new Point(0, 0) - new Point(width / 2, height / 2), new Size(width, height))
    var elipse = new Path.Ellipse(rectangle)
    return elipse
}


/**
 * Create an end symbol on the specified curve.
 */
function drawEndSymbolOnCurve(curve, endSymbolType = null)
{
    // If no end symbol type is specified, use the default one set in the global variables.
    if (!endSymbolType) {
        endSymbolType = defaultEndSymbolType
    }

    // Create the end symbol and add it to the active player object's end symbols group.
    endSymbolGroup = createSymbolGroup(endSymbolType)
    endSymbolGroup.data.fdpbType = Factory.fdpbTypes.END_SYMBOL
    activePlayerObject.endSymbolsGroup.addChild(endSymbolGroup)

    // Now add the end symbol to the curve, and add the curve/knob/route data to the end symbol group as well.
    curve.endSymbol = endSymbolGroup
    endSymbolGroup.curve = curve
    endSymbolGroup.knob = curve.segment2.knob
    endSymbolGroup.route = activeRoute
    endSymbolGroup.position = curve.segment2.knob.position

    setStylePropertiesOnSymbol(endSymbolGroup)
    setDataPropertiesOnEndSymbol(endSymbolGroup)
    makeItemSelectable(endSymbolGroup)
    endSymbolGroup.onDoubleClick = onDoubleClickEndSymbol
    return endSymbolGroup
}

/**
 * Create a handoff symbol.
 */
function drawHandOffShape(fakeHandoff = false)
{
    // Football handoff
    if (product == 'firstdown') {

        var shape = new Group()
        var heightGap = 8
        var width = 26
        var line1 = new Path()
        line1.add(-width * .5, -heightGap * .5)
        line1.add(width * .5, -heightGap * .5)
        line1.closed = false

        var line2 = new Path()
        line2.add(-width * .5, heightGap * .5)
        line2.add(width * .5, heightGap * .5)
        line2.closed = false
        shape.addChild(line1)
        shape.addChild(line2)

        // Diagonal cross line
        if (fakeHandoff) {
            var crossLineHeight = 22
            var crossLineWidth = 18
            var line3 = new Path()
            line3.add(-crossLineWidth * .5, crossLineHeight * .5)
            line3.add(crossLineWidth * .5, -crossLineHeight * .5)
            line3.closed = false
            shape.addChild(line3)
        }

        shape.data.length = 20

    }

    // Fastbreak handoff
    else if (product == 'fastbreak') {

        var shape = new Group()
        var heightGap = 8
        var width = 20

        // Two lines
        var line1 = new Path()
        line1.add(-width * .5, -heightGap * .5)
        line1.add(width * .5, -heightGap * .5)
        line1.closed = false

        var line2 = new Path()
        line2.add(-width * .5, heightGap * .5)
        line2.add(width * .5, heightGap * .5)
        line2.closed = false

        // Diagonal cross line
        if (fakeHandoff) {
            var crossLineHeight = 22
            var crossLineWidth = 18
            var line3 = new Path()
            line3.add(-crossLineWidth * .5, crossLineHeight * .5)
            line3.add(crossLineWidth * .5, -crossLineHeight * .5)
            line3.closed = false
            shape.addChild(line3)
        }

        // Straight cross line
        else {
            var line3 = new Path()
            line3.add(-10, 10)
            line3.add(10, 10)
            line3.rotate(90)
            line3.translate(0, -10)
            line3.closed = false
        }

        shape.addChild(line1)
        shape.addChild(line2)
        shape.addChild(line3)

        shape.data.length = 20

    }

    return shape;
}


/**
 * Create a knob shape.
 */
function drawKnobShape()
{
    var group = new Group();
    var mouseArea = createMouseArea();

    var circle = new Path.Circle(new Point(0, 0), 4);
    circle.fillColor = 'white'
    circle.strokeColor = 'black'
    circle.strokeWidth = 4

    group.addChild(mouseArea)
    group.addChild(circle)

    return group;
}


/**
 * Create a player rub symbol?
 */
function drawPlayersRubShape()
{
    var shape = new Group()
    var line = new Path()
    var line2 = new Path()
    shape.closed = false
    var width = 22
    var height = 14
    shape.data.length = 16 //over rides group length
    line.add(-width * .5, -height * .5)
    line.add(width * .5, height * .5)
    line2.add(-width * .5, height * .5)
    line2.add(width * .5, -height * .5)
    shape.addChild(line)
    shape.addChild(line2)

    return shape
}


/**
 * Create the player shape.
 */
function drawPlayerShape(style, layer='MAIN_LAYER')
{
    // Make sure we are drawing on the main layer.
    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.activate()

    var strokeWidth = style.strokeWidth;

    if (style.strokeColor == null) {
        strokeWidth = 0;
    }

    shapeType = style.shapeType

    var shape;
    switch (shapeType) {

        case Factory.shapeTypes.CIRCLE:
            shape = drawEllipseShape(style.playerShapeWidth + strokeWidth, style.playerShapeWidth + strokeWidth) // Use width value for height too since it's a circle
            break

        case Factory.shapeTypes.ELIPSE:
            shape = drawEllipseShape(style.playerShapeWidth + strokeWidth, style.playerShapeHeight + strokeWidth);
            shape.fillColor = style.fillColor
            break

        case Factory.shapeTypes.SQUARE:
            shape = drawRectangleShape(style.playerShapeWidth + strokeWidth, style.playerShapeWidth + strokeWidth) // Use width value for height too since it's a square
            break

        case Factory.shapeTypes.DIAMOND:
            var width = style.playerShapeWidth + 10 + strokeWidth; // Add 10px so that we can have more room for text inside
            var height = style.playerShapeHeight + 10 + strokeWidth; // Add 10px so that we can have more room for text inside

            shape = new Path()
            shape.add(new Point(0, height * .5))
            shape.add(new Point(width * .5, 0))
            shape.add(new Point(0, -height * .5))
            shape.add(new Point(-width * .5, 0))
            shape.closed = true;
            break

        case Factory.shapeTypes.TRIANGLE:
            var width = style.playerShapeWidth + 20 + strokeWidth; // Add 20px so that we can have more room for text inside
            var height = style.playerShapeHeight + 20 + strokeWidth; // Add 20px so that we can have more room for text inside

            shape = new Path()
            shape.add(new Point(-width / 2, height * .5));
            shape.add(new Point(width / 2, height * .5));
            shape.add(new Point(0, -height * .5));
            shape.closed = true;
            break

        case Factory.shapeTypes.RECTANGLE:
            shape = drawRectangleShape(style.playerShapeWidth + style.strokeWidth, style.playerShapeHeight + style.strokeWidth)
            break

        case Factory.shapeTypes.HEXAGON:
            var width = style.playerShapeWidth + 5 + strokeWidth;
            var height = style.playerShapeHeight + 10 + strokeWidth;

            shape = new Path()
            shape.add(new Point(-width / 2, 0))
            shape.add(new Point(-width / 4, -height / 2))
            shape.add(new Point(width / 4, -height / 2))
            shape.add(new Point(width / 2, 0))
            shape.add(new Point(width / 4, height / 2))
            shape.add(new Point(-width / 4, height / 2))
            shape.add(new Point(-width / 2, 0))
            shape.closed = true;
            break

        case Factory.shapeTypes.DEFENSIVE_PLAYER:
            shape = drawEllipseShape(style.playerShapeWidth + strokeWidth, style.playerShapeHeight + strokeWidth)
            break

        case Factory.shapeTypes.BASKETBALL_PLAYER:
            shape = drawEllipseShape(style.playerShapeWidth + strokeWidth, style.playerShapeHeight + strokeWidth)
            shape.fillColor = style.fillColor
            break

        case Factory.shapeTypes.BASKETBALL_DEFENSE_PLAYER_SHAPE:
            shape = drawEllipseShape(style.playerShapeWidth + strokeWidth, style.playerShapeHeight + strokeWidth)
            shape.fillColor = style.fillColor
            break

        default:
            shape = drawEllipseShape(30, 30)
    }
    shape.pivot = new Point(0, 0);

    return shape;
}


/**
 * Draw a player symbol with the specified style.
 */
function drawPlayerSymbol(customStyle)
{
    var shapeGroup = new Group()
    var textGroup = new Group()
    var mouseArea = createMouseArea()

    var playerSymbol = new Group([mouseArea, shapeGroup, textGroup])
    playerSymbol.data.fdpbType = "PLAYER_SYMBOL"
    playerSymbol.data.customStyle = Object.assign({}, customStyle)

    // Update the shape and text on the player symbol.
    updatePlayerSymbolShapeAndText(playerSymbol)

    return playerSymbol
}

/**
 * Draw a presentation symbol with the specified style.
 */
function drawPresentationSymbol(customStyle)
{
    var shapeGroup = new Group()

    var presentationSymbol = new Group([shapeGroup])
    presentationSymbol.data.fdpbType = "PRESENTATION_SYMBOL"
    presentationSymbol.data.customStyle = Object.assign({}, customStyle)

    // Update the shape and text on the player symbol.
    updatePresentationSymbolShape(presentationSymbol)

    return presentationSymbol
}


/**
 * Draw a rectangle shape.
 */
function drawRectangleShape(width = 0, height = 0)
{
    var rectangle = new Rectangle(new Point(0, 0) - new Point(width / 2, height / 2), new Size(width, height))
    var shape = new Path.Rectangle(rectangle)
    return shape
}


/**
 * Draw a stutter step symbol shape.
 */
function drawStutterStepShape()
{
    var shape = new Path()
    var width = 10
    var height = 6
    shape.closed = false
    var y = -height * 2
    shape.add(0, y)
    shape.add(-width * .5, y += height / 2)
    shape.add(width * .5, y += height)
    shape.add(-width * .5, y += height)
    shape.add(width * .5, y += height)
    shape.add(0, y += height / 2)
    return shape
}


/**
 * Draw a symbol shape of the specified symbol type.
 */
function drawSymbolShape(symbolType)
{
    var shape;
    switch (symbolType) {
        case Factory.symbolTypes.FAKE_HAND_OFF:
            shape = drawHandOffShape(true)
            break;
        case Factory.symbolTypes.HAND_OFF:
            shape = drawHandOffShape()
            break;
        case Factory.symbolTypes.STUTTER_STEP:
            shape = drawStutterStepShape()
            shape.data.strokeCap = 'round'
            break;
        case Factory.symbolTypes.TRIANGLE:
            shape = drawTriangleShape()
            shape.data.filled = true
            break;
        case Factory.symbolTypes.ARROW:
            shape = drawArrowShape()
            break;
        case Factory.symbolTypes.BALL:
            shape = drawBallShape()
            shape.data.filled = true
            break;
        case Factory.symbolTypes.T_BLOCK:
            shape = drawTBlockShape(90)
            break;
        case Factory.symbolTypes.T_BLOCKLEFT:
            shape = drawTBlockShape(-30)
            break;
        case Factory.symbolTypes.PLAYERS_RUB:
            shape = drawPlayersRubShape()
            break;
        case Factory.symbolTypes.T_BLOCKRIGHT:
            shape = drawTBlockShape(30)
            break;
        default:
    }

    shape.rotation = 90;
    if (!!!shape.data.filled) {
        shape.data.filled = false;
    }

    if (!!!shape.data.strokeCap) {
        shape.data.strokeCap = 'butt';
    }
    shape.name = 'shape';
    return shape;
}


/**
 * Create a T-block end symbol, angled at the specified angle.
 */
function drawTBlockShape(angle)
{
    var shape = new Group()

    // T-Block size needs to be proportionate to player size.
    var activePlayerWidth = getActivePlayerWidth()

    switch (activePlayerWidth) {
        case 16:
            var length = 14
        break
        case 30:
            var length = 28 // can't change this because too many plays are drawn with this size
        break
        case 50:
            var length = 28 // can't change this because too many plays are drawn with this size
        break
        case 80:
            var length = 46
        break
        default:
            var length = activePlayerWidth * .7
    }

    var line1 = new Path();
    line1.add(length * -.5, 0);
    line1.add(length * .5, 0);
    if (angle != 90) {
        line1.rotate(angle);
    }
    line1.closed = false;
    shape.addChild(line1);

    return shape;
}


/**
 * Create an arrow/triangle line ending.
 */
function drawTriangleShape()
{
    var shape = new Group()
    var arrow = new Path()

    // Symbol needs to be proportionate to player size.
    var activePlayerWidth = getActivePlayerWidth()

    switch (activePlayerWidth) {
        case 16:
            var line1 = 3
            var line2 = 3
            var line3 = 2
        break
        case 30:
            var line1 = 6
            var line2 = 5
            var line3 = 4
        break
        case 50:
            var line1 = 6
            var line2 = 5
            var line3 = 4
        break
        case 80:
            var line1 = 10
            var line2 = 9
            var line3 = 7
        break
        default:
            var line1 = activePlayerWidth * .2
            var line2 = activePlayerWidth * .167
            var line3 = activePlayerWidth * .133
    }


    arrow.add([0, -line1])
    arrow.add([-line2, line3])
    arrow.add([line2, line3])

    arrow.closed = true
    shape.addChild(arrow)
    shape.pivot = new Point(0, 0)
    shape.data.filled = true
    return shape

}


/**
 * Duplicate the active item.
 */
function duplicateActiveItem(e)
{
    setLineOfScrimmageDataPropertiesOnMainLayer()
    setDataPropertiesOnAllPlayerObjects()

    if (activePlayerObject) {
        newFdpbObject = activePlayerObject.clone()
        newFdpbObject.bringToFront()
        restoreDataPropertiesOnPlayerObject(newFdpbObject)
        placeItem(newFdpbObject)
        redrawMainLayer()
        selectItem(newFdpbObject.playerSymbol);
        return;
    }

    if (activeItem) {

        newFdpbObject = activeItem.clone();
        newFdpbObject.bringToFront();
        newFdpbObject.data = duplicateObjectViaJson(activeItem.data);
        window.engineDebug("newFdpbObject ", newFdpbObject);
        newFdpbObject.position.x = activeItem.position.x + 40;
        newFdpbObject.position.y = activeItem.position.y - 20;

        if (activeItem.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
            restoreDataPropertiesOnChildrenOf(newFdpbObject);
            disbandMultiSelectionObject(activeItem);
        }

        if (activeItem.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
            restoreDataPropertiesOnChildrenOf(newFdpbObject);
        }
        makeItemSelectable(newFdpbObject);
        redrawMainLayer()
        selectItem(newFdpbObject);
    }
}


/**
 * Duplicate the specified object using JSON.
 */
function duplicateObjectViaJson(ObjectToDuplicate)
{
    var objectJson = JSON.stringify(ObjectToDuplicate);
    var objectCopy = JSON.parse(objectJson);
    // window.engineDebug("duplicateObjectViaJson");
    //window.engineDebug(ObjectToDuplicate, objectCopy);
    return objectCopy;
}


/**
 * Enable the onKeyDown handler.
 */
function enableOnKeyDownHandler()
{
    onKeyDownHandlerEnabled = true
}


/**
 * Export the file and save it with the specified filename.
 */
function exportFile(data, filename)
{
    var link = document.createElement("a");
    link.download = filename;
    link.href = data;
    link.click();
    // link.remove();
    //link.parentNode.removeChild(link);
    restoreLayersAfterExport();
}


/**
 * Export the entire play to a JSON file.
 */
function exportPlayToJsonFile(event)
{
    clearLayersForExport();
    setLineOfScrimmageDataPropertiesOnMainLayer()
    setDataPropertiesOnAllPlayerObjects()

    var mainLayer = getLayerByName('MAIN_LAYER')
    var layerJson = mainLayer.exportJSON({
        asString: true
    });

    var dt = 'data:text/plain;charset=utf-8,' + encodeURIComponent(layerJson);;
    exportFile(dt, "FDPB_Image.JSON")
    //highlightAllMainLayerItems()
}


/**
 * Export the entire play to an SVG file.
 */
function exportPlayToSvgFile()
{
    clearLayersForExport();

    var mainLayer = getLayerByName('MAIN_LAYER')
    var svg = mainLayer.exportSVG({
        asString: true
    });
    var tag = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="980" height="640">'
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(tag + svg + '</svg>');
    //  var url = 'data:image/svg+xml;base64,' + encodeURIComponent('<svg>'+svg+'</svg>');
    exportFile(url, "FDPB_Image.svg")
}


/**
 * Flip a FDPB object.
 */
function flipFDPBObject(fdpbObject, isVerticalFlip, pivotPoint)
{
    switch (fdpbObject.data.fdpbType) {
        case Factory.fdpbTypes.PLAYER_OBJECT:
            flipPlayerObject(fdpbObject, isVerticalFlip, pivotPoint)
            break;
        case Factory.fdpbTypes.SVG_SYMBOL:
            if (!!!pivotPoint) pivotPoint = fdpbObject.bounds.center;
            window.engineDebug(fdpbObject.data.customStyle.symbolName);
            if (fdpbObject.data.customStyle.symbolName && fdpbObject.data.customStyle.symbolName.toLowerCase().indexOf("arrow") >= 0) {
                flipCustomCanvasObject(fdpbObject, isVerticalFlip, pivotPoint);
            } else {
                flipLocation(fdpbObject, isVerticalFlip, pivotPoint);
            }
            //window.engineDebug(fdpbObject.position)
            //this seems to fix bug:
            fdpbObject.position = fdpbObject.position;
            //---
            // var p = fdpbObject.parent;
            // p.addChild(fdpbObject);

            break;
        case Factory.fdpbTypes.FDPB_GROUP:
        case Factory.fdpbTypes.MULTISELECTION:
            if (!!!pivotPoint) pivotPoint = fdpbObject.bounds.center;
            fdpbObject.children.forEach(function(child) {
                flipFDPBObject(child, isVerticalFlip, pivotPoint)
            });
            break;
        default:
            if (!!!pivotPoint) pivotPoint = fdpbObject.bounds.center; //for textboxes
            flipLocation(fdpbObject, isVerticalFlip, pivotPoint)
    }
}


/**
 * Flip an item's location.
 */
function flipLocation(item, isVerticalFlip, pivotPoint)
{
    var hFlip = -1;
    var vFlip = 1;
    if (isVerticalFlip) {
        hFlip = 1;
        vFlip = -1;
    }

    var newPos = (item.position - pivotPoint).multiply(new Point(hFlip, vFlip))
    item.position = pivotPoint + newPos;
}


/**
 * When user flips a specified object.
 */
function flipObject(event)
{
    // First clear the selection layer (it gets wonky when flipping).
    clearLayer(getLayerByName('PERSISTENT_SELECTION_LAYER'))

    /* Which item are we flipping? */
    var itemToFlip

    /* If there's an active item, flip that. */
    if (activeItem) {
        itemToFlip = activeItem
    }

    /* If there's an active player object, flip that. */
    if (activePlayerObject) {
        itemToFlip = activePlayerObject
    }

    /* No item to flip found. */
    if (!itemToFlip) {
        return
    }

    pushMainLayerToUndoStack()
    flipFDPBObject(itemToFlip)

    constrainItemWithinBounds(itemToFlip)
    updateAllPlayerRoutesOnLayer()
    selectItem(itemToFlip)
}


/**
 * When user flips the entire play.
 */
function flipPlay(event)
{
    // Clear the persistent selection layer
    clearLayer(getLayerByName('PERSISTENT_SELECTION_LAYER'))

    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.activate()

    pushMainLayerToUndoStack()

    var isVertical = false;
    if (event.target.id == 'vertical') isVertical = true;

    var pbObjects = mainLayer.children;
    for (var i = 0; i < pbObjects.length; i++) {
        flipFDPBObject(pbObjects[i], isVertical, viewBoundsOnLoad.center)
    }

    redrawMainLayer()

    // Update all project views.
    updateAllProjectViews()
}


/**
 * Flip a playbook object. Not sure what the difference is?
 */
function flipCustomCanvasObject(objectToFlip = null, isVerticalFlip, pivotPoint)
{
    var hFlip = -1;
    var vFlip = 1;
    if (isVerticalFlip) {
        hFlip = 1;
        vFlip = -1;
    }
    if (!!!pivotPoint) {
        pivotPoint = objectToFlip.playerSymbol.position
    }
    objectToFlip.scale(hFlip, vFlip, pivotPoint);
}


/**
 * Flip a player object.
 */
function flipPlayerObject(playerObject, isVerticalFlip, pivotPoint)
{
    // If the player object has no symbol, exit now.
    if (!playerObject.playerSymbol) {
        addSentryMessage('No player symbol found when trying to a flip player object.')
        return
    }

    var hFlip = -1;
    var vFlip = 1;
    if (isVerticalFlip) {
        hFlip = 1;
        vFlip = -1;
    }
    if (!!!pivotPoint) {
        pivotPoint = playerObject.playerSymbol.position
    }

    playerObject.routesGroup.scale(hFlip, vFlip, pivotPoint);
    playerObject.knobsGroup.scale(hFlip, vFlip, pivotPoint);
    playerObject.endSymbolsGroup.scale(hFlip, vFlip, pivotPoint);
    playerObject.insertsGroup.scale(hFlip, vFlip, pivotPoint);

    if (!isVerticalFlip) {
        if (playerObject.playerSymbol.data.customStyle.shadowStyle == "LEFT") {
            playerObject.playerSymbol.data.customStyle.shadowStyle = "RIGHT"
        } else if (playerObject.playerSymbol.data.customStyle.shadowStyle == "RIGHT") {
            playerObject.playerSymbol.data.customStyle.shadowStyle = "LEFT"
        }
    }
    updatePlayerSymbolShapeAndText(playerObject.playerSymbol);
    flipLocation(playerObject.playerSymbol, isVerticalFlip, pivotPoint)

    var inserts = playerObject.insertsGroup.children;
    for (var j = 0; j < inserts.length; j++) {
        var insert = inserts[j];
        var angle = insert.data.lastAngle - 90;
        if (isVerticalFlip) angle = insert.data.lastAngle + 90;
        angle = -angle + 90;
        insert.data.lastAngle = angle;
    }
    var endSymbols = playerObject.endSymbolsGroup.children;
    for (var j = 0; j < endSymbols.length; j++) {
        var symbol = endSymbols[j];
        var angle = symbol.data.lastAngle - 90;
        if (isVerticalFlip) angle = symbol.data.lastAngle + 90;
        angle = -angle + 90;
        symbol.data.lastAngle = angle;
    }
    playerObject.pivot = playerObject.playerSymbol.position
    positionBezierLinesOnPlayerObject(playerObject)
}


/**
 * Convert the specified frame to JSON.
 */
this.generateFrameJson = function(frameNumber = 1)
{
    addSentryBreadcrumb("Generating JSON for frame #" + frameNumber + "...")

    // First activate the specified frame.
    activateFrame(frameNumber)

    clearLayersForExport(frameNumber, false) // Don't show watermark in JSON

    setLineOfScrimmageDataPropertiesOnMainLayer()
    setDataPropertiesOnAllPlayerObjects()

    // Save this zoom level to our JSON data so we can access it later.
    var mainLayer = getLayerByName('MAIN_LAYER', frameNumber)
    // mainLayer.data.savedAtZoomLevel = window.app.config.globalProperties.$playEditorRef.value.selectedZoomLevel
    mainLayer.data.savedAtZoomLevel = window.app.config.globalProperties.$pinia.state._value.counter.selectedZoomLevel
    mainLayer.data.savedAtCenterX = view.center.x // What position are we saving this play?
    mainLayer.data.savedAtCenterY = view.center.y // What position are we saving this play?

    var frameJson = mainLayer.exportJSON({
        asString: true
    })

    restoreLayersAfterExport(frameNumber)

    return frameJson;
};

/**
 * Bind the basic events with an item.
 */

function bindEventsWithItem(item){
    if(item.data.fdpbType === 'TEXT_BOX' || 
       item.data.fdpbType === 'PLAYER_SYMBOL' ||
       item.data.fdpbType === 'KNOB' ||
       item.data.fdpbType === 'END_SYMBOL' ||
       item.data.fdpbType === 'SVG_SYMBOL'){
        item.onMouseDown = onMouseDownSelectable
        item.onMouseEnter = onMouseEnterSelectable
        item.onMouseLeave = onMouseLeaveSelectable
        return;
    }

    if(item.children && item.children.length){
        for (let i = 0; i < item.children.length; i++) {
            const innerItem = item.children[i];
            bindEventsWithItem(innerItem);
        }
    }
    return;
}

/**
 * unBind the basic events with an item.
 */

function unBindEventsWithItem(item){
    if(item.data.fdpbType === 'TEXT_BOX' || 
       item.data.fdpbType === 'PLAYER_SYMBOL' ||
       item.data.fdpbType === 'KNOB' ||
       item.data.fdpbType === 'END_SYMBOL' ||
       item.data.fdpbType === 'SVG_SYMBOL'){

        item.onMouseDown = null;
        item.onMouseEnter = null;
        item.onMouseLeave = null;
        return;
    }

    if(item.children && item.children.length){
        for (let i = 0; i < item.children.length; i++) {
            const innerItem = item.children[i];
            unBindEventsWithItem(innerItem);
        }
    }
    return;
}


/**
 * Change the editable mode of the view (Editing/Tutorial).
 */
function changeEditableMode(value){
    const mainLayer = getLayerByName("MAIN_LAYER")
    // deselectAllCanvasObjects();
    if(!value){
        // for (let i = 0; i < mainLayer.children.length; i++) {
        //     const item = mainLayer.children[i];
        //     bindEventsWithItem(item)
        // }
        // clearLayer(getLayerByName('PRESENTATION_LAYER'));
    }else{
        // for (let i = 0; i < mainLayer.children.length; i++) {
        //     const item = mainLayer.children[i];
        //     unBindEventsWithItem(item)
        // }
    }
}


/**
 * Generate PNG Data URL for the specified frame.
 */
function generateFramePngDataUrl(frameNumber = 1, showWatermark = false, isFlipped = false)
{
    addSentryBreadcrumb("Generating PNG Data for frame #" + frameNumber + " (showWatermark = " + (showWatermark ? "true" : "false") + "; isFlipped = " + (isFlipped ? "true" : "false") + ").")

    // First let's activate our frame
    activateFrame(frameNumber)

    // Get the main layer on this frame
    var mainLayer = getLayerByName('MAIN_LAYER', frameNumber)

    // Remove any container zoom before we export to PNG (only relevant for FirstDown since FastBreak doesn't have zooming)
    if (product == 'firstdown') {
        view.zoom = view.zoom / paper.containerZoom
    }

    // Hide the line of scrimmage if applicable.
    if (lineOfScrimmage) {
        hideItem(lineOfScrimmage)
    }

    // Deselect all canvas objects.
    deselectAllCanvasObjects()

    // Flip the play
    if (isFlipped) {
        pushMainLayerToUndoStack()
        var isVertical = false;
        var pbObjects = mainLayer.children;
        for (var i = 0; i < pbObjects.length; i++) {
            flipFDPBObject(pbObjects[i], isVertical, viewBoundsOnLoad.center)
        }
        redrawMainLayer()

        // Update the view on each frame/project.
        paper.projects[frameNumber - 1].view.update()
    }

    // Clear all of of our layers before exporting...
    clearLayersForExport(frameNumber, showWatermark)

    mainLayer.data.FLIPPED = isFlipped;
    var pngDataUrl = paper.view.element.toDataURL('image/png');

    // Restore container zoom after exporting to PNG.
    if (product == 'firstdown') {
        view.zoom = view.zoom * paper.containerZoom
    }

    restoreLayersAfterExport(frameNumber)

    // Unflip the play?
    if (isFlipped) {
        pushMainLayerToUndoStack()
        var isVertical = false;
        var pbObjects = mainLayer.children;
        for (var i = 0; i < pbObjects.length; i++) {
            flipFDPBObject(pbObjects[i], isVertical, viewBoundsOnLoad.center)
        }
        redrawMainLayer()

        // Update the view on each frame/project.
        paper.projects[frameNumber - 1].view.update()
    }

    if (lineOfScrimmage) {
        // lineOfScrimmage.visible = window.app.config.globalProperties.$playEditorRef.value.lineOfScrimmage
        lineOfScrimmage.visible = window.app.config.globalProperties.$pinia.state._value.counter.lineOfScrimmage
    }

    return pngDataUrl
};


/**
 * We can assume the active item is the one the user wants to save as a play template, so we can just return the current active item's JSON.
 */
function generatePlayTemplateJson()
{
    addSentryBreadcrumb('Generating play template JSON.')

    // Make sure player objects all have the correct properties before exporting.
    setDataPropertiesOnAllPlayerObjects()

    // If there's an active player object, export that...
    if (activePlayerObject) {
        return activePlayerObject.exportJSON({
            asString: true
        })
    }

    // Otherwise, if there's an active item, export that...
    else if (activeItem) {
        return activeItem.exportJSON({
            asString: true
        })
    }
}


/**
 * Generate the PNG data for the play template.
 */
function generatePlayTemplatePngData()
{
    addSentryBreadcrumb('Generating play template PNG data.')

    // Hide every layer except for the template layer before exporting
    hideLayersBeforeTemplateExport()

    var templateLayer = new Layer()
    templateLayer.name = 'TEMPLATE_LAYER'
    templateLayer.activate()
    templateLayer.importJSON(generatePlayTemplateJson())

    showItem(templateLayer)

    // Necessary in order to show text in the thumbnail.
    restoreDataPropertiesOnChildrenOf(templateLayer)

    //highlightAllMainLayerItems()

    redrawChildObjects(templateLayer)

    // Update all player routes before creating the image.
    updateAllPlayerRoutesOnLayer(templateLayer)

    // Update all project views.
    updateAllProjectViews()

    // Grab the PNG data from the template layer
    var pngData = view.element.toDataURL('image/png')

    // Now hide the template layer and restore the other layers
    restoreLayersAfterTemplateExport()

    hideItem(templateLayer)

    // Update all project views.
    updateAllProjectViews()

    // Now remove the template layer since we don't need it anymore
    templateLayer.remove()

    // Activate the main layer again
    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.activate()

    return pngData
}


/**
 * Get the active player width, if available.
 */
function getActivePlayerWidth()
{
    // If there's an active player, use that...
    if (activePlayerObject) {
        return activePlayerObject.playerSymbol.data.customStyle.playerShapeWidth ? activePlayerObject.playerSymbol.data.customStyle.playerShapeWidth : 30
    }

    // If multiple players are selected, use the player width from the 1st player object.
    else if (activeItem && activeItem.data.fdpbType == 'MULTISELECTION') {
        return activeItem.children[0].playerSymbol.data.customStyle.playerShapeWidth ? activeItem.children[0].playerSymbol.data.customStyle.playerShapeWidth : 30
    }

    // Otherwise just return the default player width
    return 30
}


/**
 * Get all of the player objects on the main layer.
 */
function getAllPlayerObjectsOnMainLayer()
{
    var mainLayer = getLayerByName('MAIN_LAYER')
    return mainLayer.getItems({ data: { fdpbType: Factory.fdpbTypes.PLAYER_OBJECT } });
}


/**
 * Get all of the curved lines attached to a player object.
 */
function getAllPlayerObjectCurves(playerObject)
{
    // If this isn't a player object, exit now.
    if (!playerObject || playerObject.data.fdpbType != Factory.fdpbTypes.PLAYER_OBJECT) {
        return
    }

    //select all paths routes curves
    var playerCurves = []
    var routes = playerObject.routesGroup.children

    for (var i = 0; i < routes.length; i++) {
        var curves = routes[i].path.curves
        playerCurves = playerCurves.concat(curves)
    }

    return playerCurves
}


/**
 * Get all of the items within our selection box.
 */
function getItemsWithinSelectionBox()
{
    /* If no selection box, exit now. */
    if (!selectionBox) {
        addSentryBreadcrumb('No selection box found.', 'warning')
        addSentryMessage('No selection box found when trying to get items within selection box.')
        return
    }

    var selectedItems = []

    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.activate()

    var mainLayerChildren = mainLayer.children;

    for (var i = 0; i < mainLayerChildren.length; i++) {

        mainLayerChild = mainLayerChildren[i]

        if (mainLayerChild.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) continue
        if (mainLayerChild.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) continue

        if (selectionBox.intersects(mainLayerChild)) {

            if (mainLayerChild.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {

                if (selectionBox.intersects(mainLayerChild.playerSymbol)) {
                    if (!selectedItems.includes(mainLayerChild)) selectedItems.push(mainLayerChild);
                }

                if (mainLayerChild.playerSymbol) {
                    if (mainLayerChild.playerSymbol.isInside(selectionBox.bounds)) {
                        if (!selectedItems.includes(mainLayerChild)) selectedItems.push(mainLayerChild);
                    }
                }

                if (mainLayerChild.routesGroup) {
                    for (var j = 0; j < mainLayerChild.routesGroup.children.length; j++) {
                        var path = mainLayerChild.routesGroup.children[j].path;
                        if (selectionBox.intersects(path)) {
                            if (!selectedItems.includes(mainLayerChild)) selectedItems.push(mainLayerChild);
                        }
                    }
                }

                if (mainLayerChild.endSymbolsGroup) {
                    for (var j = 0; j < mainLayerChild.endSymbolsGroup.children.length; j++) {
                        var sym = mainLayerChild.endSymbolsGroup.children[j];
                        if (selectionBox.intersects(sym)) {
                            if (!selectedItems.includes(mainLayerChild)) selectedItems.push(mainLayerChild);
                        }
                        if (sym.isInside(selectionBox.bounds)) {
                            if (!selectedItems.includes(mainLayerChild)) selectedItems.push(mainLayerChild);
                        }
                    }
                }

            } else {
                if (!selectedItems.includes(mainLayerChild)) {
                    selectedItems.push(mainLayerChild)
                }
            }

        }

        if (mainLayerChild.isInside(selectionBox.bounds)) {
            if (!selectedItems.includes(mainLayerChild)) selectedItems.push(mainLayerChild)
        }

    }

    return selectedItems
}


/**
 * Return the layer from the specified projust index with the specified layer name.
 */
function getLayerByName(layerName, frameNumber = null)
{
    // If no frame number is passed through, then let's assume we want the layer on the active project.
    if (!frameNumber) {
        return paper.project.getItem({
            name: layerName
        })
    }

    // If a specific frame number is passed through, then let's get the layer on that associated project.
    else {
        return paper.projects[frameNumber - 1].getItem({
            name: layerName
        })
    }
}


/**
 * Get the parent group object of the specified child object.
 */
function getParentGroupObject(childObject)
{
    if (!!!childObject) return null;
    if (childObject.name == "MAIN_LAYER") return null;
    // window.engineDebug(childObject);
    if (!!childObject.data.fdpbType) {
        if (childObject.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) return childObject;
        if (childObject.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) return childObject;
    }
    return getParentGroupObject(childObject.parent);
}


/**
 * Return the parent player object based on the specified child.
 */
function getParentPlayerObjectFromChild(child)
{
    if (!child) {
        return null
    }

    if (child.data.fdpbType) {
        /* If the child is already a player object, return the player object. */
        if (child.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
            return child
        }

        /* If the child is a player symbol and the player symbol doesn't have a player object, we need to give it one. */
        if (child.data.fdpbType == Factory.fdpbTypes.PLAYER_SYMBOL) {
            if (child.parent && !child.parent.data.fdpbType) {
                var playerObject = createEmptyPlayerObject()
                playerObject.playerSymbol = child
                child.parent = playerObject
            }
        }
    }

    return getParentPlayerObjectFromChild(child.parent)
}


/**
 * Return the specified route's corner.
 */
function getRouteCorner(route = null, index)
{
    if (!route || !route.displayCornersGroup || index >= route.displayCornersGroup.children) {
        return null
    }

    return route.displayCornersGroup.children[index]
}


/**
 * Return the specified route's path.
 */
function getRoutePath(route = null, index)
{
    if (!route || !route.displayPathsGroup) {
        addSentryMessage('No display paths group found on route.')
        return null
    }

    if (index >= route.displayPathsGroup.children.length) {
        addSentryMessage('Index is greater than the number of route paths.')
        return null
    }

    return route.displayPathsGroup.children[index]
}


/**
 * Return the updated selector for the specified item. To specify a new stroke color or stroke width, pass those parameters through as well.
 */
function getUpdatedSelectorShape(itemThatNeedsSelector = null, selectorType = null, clearSelectorLayer = true)
{
    // If no item passed through, nothing to update, exit now.
    if (!itemThatNeedsSelector) {
        addSentryBreadcrumb('Item that needs selector not found.', 'warning')
        addSentryMessage('No item found when trying to get updated selector shape.')
        return
    }

    if (selectorType == 'highlight') {
        var selectorLayer = getLayerByName('HIGHLIGHT_LAYER')
    } else if (selectorType == 'persistent_selector') {
        var selectorLayer = getLayerByName('PERSISTENT_SELECTION_LAYER')
    }

    // Activate the selector layer.
    selectorLayer.activate()

    // Clear the persistent selection layer if necessary.
    if (clearSelectorLayer) {
        clearLayer(selectorLayer)
    }

    // If the item that we're trying to select is a player object, it won't work. We need to select the player symbol instead.
    if (itemThatNeedsSelector.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
        itemThatNeedsSelector = itemThatNeedsSelector.playerSymbol

        // If the player object has no symbol for some reason, exit now.
        if (!itemThatNeedsSelector) {
            addSentryBreadcrumb('Player object has no player symbol.', 'warning')
            addSentryMessage('Selected player object has no player symbol.')
            return
        }
    }

    // Use the selected item to redraw the base shape with the specified attributes that we'll then replicate and add a selector shape to.
    var selectorShape = itemThatNeedsSelector.clone(false) // False so that we don't actually insert the new shape

    // What kind of item are we selecting?
    if (itemThatNeedsSelector.data.fdpbType == Factory.fdpbTypes.KNOB) {

        selectorShape.fillColor = Factory.colorDefs.SELECTION
        selectorShape.strokeColor = null
        selectorShape.opacity = selectorType == 'highlight' ? 0.4 : 0.75
        selectorShape.strokeWidth = 0

        /* Hide segment knobs if end symbols appear over them. */
        if (itemThatNeedsSelector.data.knobType == 'SEGMENT' && itemThatNeedsSelector.curve && itemThatNeedsSelector.curve.endSymbol) {
            itemThatNeedsSelector.opacity = 0
        }

    }

    else {
        // Player selector shapes should be filled in the selection color so that if the player symbol have a transparent fill, we'll see the green. Otherwise, we'll see the fill plus the stroke around the shape.
        selectorShape.fillColor = itemThatNeedsSelector.data.fdpbType == Factory.fdpbTypes.PLAYER_SYMBOL ? Factory.colorDefs.SELECTION : null // Selectors should only be outlines!
        selectorShape.strokeColor = Factory.colorDefs.SELECTION
        selectorShape.strokeWidth = itemThatNeedsSelector.data.customStyle ? (itemThatNeedsSelector.data.customStyle.strokeWidth + 8) : 8
        selectorShape.opacity = selectorType == 'highlight' ? 0.4 : 0.75
    }

    // The highlight group will consist of both the original shape AND the highlight shape.
    var selectorShapeGroup = new Group()
    selectorShapeGroup.addChild(selectorShape)

    return selectorShapeGroup
}


/**
 * Give the ball to the specified player objectt. This just means make a circle around that player and only that player.
 */
function giveBallToPlayer(playerObjectToGiveBallTo = null)
{
    // If we didn't specify a player to give the ball to, use the active player object.
    if (!playerObjectToGiveBallTo) {
        if (activePlayerObject) {
            playerObjectToGiveBallTo = activePlayerObject
        }
    }

    // If we still don't have a player to give the ball to, exit now.
    if (!playerObjectToGiveBallTo) {
        return
    }

    // First we need to clear all other player symbol circles (since only one can have the ball at a time)
    var allPlayerObjects = getAllPlayerObjectsOnMainLayer()
    for (var i = 0; i < allPlayerObjects.length; i++) {
        applyPlayerStyle(allPlayerObjects[i], "strokeWidth", null)
        applyPlayerStyle(allPlayerObjects[i], "strokeColor", null)
        applyPlayerStyle(allPlayerObjects[i], "playerHasBall", false)
    }

    // applyPlayerStyle() from above will select all of the players, which we don't want, so let's clear the selection layer first.
    clearLayer(getLayerByName('PERSISTENT_SELECTION_LAYER'))

    // Now let's give the ball to the specified player.
    applyPlayerStyle(playerObjectToGiveBallTo, "strokeWidth", 2)
    applyPlayerStyle(playerObjectToGiveBallTo, "strokeColor", 'black')
    applyPlayerStyle(playerObjectToGiveBallTo, "playerHasBall", true)
}


/**
 * Give the ball to the player closest to the specified point.
 */
function giveBallToPlayerClosestToPoint(point = null, playerObjects = [], isHandoff = false)
{
    var closestDistanceToBall = null
    var closestPlayerToBall

    for (var i = 0; i < playerObjects.length; i++) {

        // How far is this player object from the point where we should move the ball to?
        var distanceFromBall = playerObjects[i].position.getDistance(point)

        // If this is NOT a handoff, then we DO want to give the ball to the player closest to the ball (even if the distance is 0).
        // If this IS a handoff, then we DO NOT want to give the ball to a player with a distance of 0 from the ball because then the ball will end up going to the player who's supposed to be handing off instead of the one being handed off to.
        if (!isHandoff || (isHandoff && distanceFromBall > 0)) {

            // If we don't have a closest distance yet, add the first iteration by default so we have something to compare to.
            if (closestDistanceToBall == null) {
                closestDistanceToBall = distanceFromBall
                closestPlayerToBall = playerObjects[i]
            }

            // Otherwise, if this player is closer to the ball than the current closest player, then make it the new closest distance.
            else if (distanceFromBall < closestDistanceToBall) {
                closestDistanceToBall = distanceFromBall
                closestPlayerToBall = playerObjects[i]
            }
        }

    }

    // Now we can give the ball to the closest player.
    if (closestPlayerToBall) {
        giveBallToPlayer(closestPlayerToBall)
    }
}


/**
 * Group the active item.
 */
function groupActiveItem()
{
    /* If there is no active item to group, return */
    if (!activeItem) {
        return
    }

    convertMultiSelectionToGroup(activeItem);
}


/**
 * Hide the specified item from view.
 */
function hideItem(item)
{
    if (item) {
        item.visible = false
    }
}


/**
 * Hide all layers before exporting the template PNG, so that only the template layer is showing on the canvas.
 */
function hideLayersBeforeTemplateExport()
{
    window.engineDebug('hideLayersBeforeTemplateExport')

    hideItem(getLayerByName('BG_LAYER'))
    hideItem(getLayerByName('GUIDE_LAYER'))
    hideItem(getLayerByName('MAIN_LAYER'))
    hideItem(getLayerByName('SELECTION_BOX_LAYER'))
    hideItem(getLayerByName('PERSISTENT_SELECTION_LAYER'))
    hideItem(getLayerByName('TOOL_LAYER'))
    hideItem(getLayerByName('HIGHLIGHT_LAYER'))
    hideItem(getLayerByName('WATERMARK_LAYER'))

    // Update all project views.
    updateAllProjectViews()
}


/**
 * Hide all of the player object knobs currently showing on the canvas, if any.
 */
function hideAllPlayerObjectKnobsOnCanvas()
{
    var mainLayer = getLayerByName('MAIN_LAYER')
    var updateAllPlayerRoutesOnLayer
}


/**
 * Hide all knobs associated with the specified player object.
 */
function hidePlayerObjectKnobs(playerObject)
{
    // If no player object, exit now.
    if (!playerObject) {
        addSentryBreadcrumb('No player object found to hide knobs on.', 'warning')
        addSentryMessage('No player object found when trying to hide knobs on it.')
        return
    }

    if (playerObject.knobsGroup) {
        playerObject.knobsGroup.children.forEach(function(child) {
            child.lastChild.lastChild.visible = false
        })
    }

    if (playerObject.handlesGroup) {
        playerObject.handlesGroup.visible = false
    }
}


/**
 * Highlight the items within the selection box.
 */
function highlightItemsWithinSelectionBox()
{
    var highlightLayer = getLayerByName('HIGHLIGHT_LAYER')

    // Clear the highlight layer before anything.
    clearLayer(highlightLayer)

    // Reset the selected curves array.
    resetSelectedCurvesArray()

    var selectedItems = getItemsWithinSelectionBox()

    // Highlight each item within the selection box.
    for (var i = 0; i < selectedItems.length; i++) {
        updateSelector(selectedItems[i], 'highlight', false)
    }
}


/**
 * Is the specified object part of a group?
 */
function isObjectPartOfAGroup(object = null)
{
    if (!object) {
        return false
    }

    /* Object IS a multiselection. */
    if (object.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
        return false
    }

    /* Object IS a group. */
    if (object.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        return false
    }

    //!! converts to bolean basically
    return !!getParentGroupObject(object.parent)
}


/**
 * Validate if the item fits.
 */
function itemFits(item)
{
    window.engineDebug('itemFits', item)

    var mainLayer = getLayerByName('MAIN_LAYER')
    var mainLayerChildren = mainLayer.children;

    for (var i = 0; i < mainLayerChildren.length; i++) {

        var mainLayerChild = mainLayerChildren[i];

        if (areItemsInSameCustomCanvasObject(item, mainLayerChild)) continue;
        window.engineDebug(item.data.fdpbType, mainLayerChild.data.fdpbType);

        if (item.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) item = item.playerSymbol;
        if (mainLayerChild.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) mainLayerChild = mainLayerChild.playerSymbol;

        if (item.intersects(mainLayerChild)) {
            return false;
        }

        if (mainLayerChild.hitTest(item.position)) {
            return false;
        }

        if (item.isInside(mainLayerChild.bounds)) {
            return false;
        }
        if (mainLayerChild.isInside(item.bounds)) {
            return false;
        }

    }

    return true;
}


/**
 * Load the field background (must be SVG format)
 */
function loadFieldBackground(bgUrl = null, frameNumber = 1)
{
    console.log("BG URL",bgUrl)
    addSentryBreadcrumb("Loading field background for frame #" + frameNumber + ".")

    // We only need to import the background image if it hasn't already been imported.
    if (!backgroundSvg) {

        // Make sure we activate the specified frame first.
        activateFrame(frameNumber)

        var backgroundLayer = getLayerByName('BG_LAYER', frameNumber)
        var mainLayer = getLayerByName('MAIN_LAYER', frameNumber)

        // Clear the background layer first.
        clearLayer(backgroundLayer)

        // Activate the background layer so that we can add our SVG to it.
        backgroundLayer.activate()

        // Remove any existing background images first.
        backgroundLayer.removeChildren()

        backgroundLayer.importSVG(bgUrl, {
            onLoad: onFieldBackgroundLoad,
        })
    }

    // Now we can load the watermark.
    loadWatermark(frameNumber)
}

/**
 * Try to load the play JSON data for the specified frame.
 */
this.loadFrameJson = function(playJson, frameNumber = 1)
{
    addSentryBreadcrumb("Loading frame JSON for frame #" + frameNumber + ".")

    try {
        replaceJson('play', playJson, frameNumber)
    } catch (error) {
        //console.log('loadFrameJson error', error)
    }
};


/**
 * Load the watermark onto the background.
 */
function loadWatermark(frameNumber = 1)
{
    addSentryBreadcrumb("Loading watermark for frame #" + frameNumber + ".")

    // We only need to import the watermark image if it hasn't already been imported, unless the zoom level has been changed.
    if (!watermarkSvg) {

        // Get our watermark layer for this frame.
        var watermarkLayer = getLayerByName('WATERMARK_LAYER', frameNumber)

        // Activate the watermark layer so that we can add our SVG to it.
        watermarkLayer.activate()

        // Clear the watermark layer first.
        clearLayer(watermarkLayer)

        // Load FirstDown watermark
        if (product == 'firstdown') {
            watermarkLayer.importSVG('./imgs/fdpb-field-watermark.svg', {
                onLoad: onWatermarkLoad
            });
        }

        // Load FastBreak watermark
        else if (product == 'fastbreak') {
            watermarkLayer.importSVG('./imgs/fastbreak-playbook-sm-watermark.svg', {
                onLoad: onWatermarkLoad
            });
        }
    }
}


/**
 * Add mouse event listeners to make the item selectable.
 */
function makeItemSelectable(item = null)
{
    if (!item) {
        addSentryMessage('No item to make selectable found.')
        return
    }

    item.onMouseDown = onMouseDownSelectable
    item.onMouseEnter = onMouseEnterSelectable
    item.onMouseLeave = onMouseLeaveSelectable
}


/**
 * Mark the play as "dirty" (modified)
 */
function makePlayDirty()
{
    // window.app.config.globalProperties.$playEditorRef.value.isDirty = true
    window.app.config.globalProperties.$pinia.state._value.counter.isDirty = true
}


/**
 * Move the active item to the supplied point.
 */
function moveActiveItemTo(newPosition = null)
{
    // If there is no new position to drag the item to, exit now.
    if (!newPosition) {
        addSentryMessage('No new position found when trying to move the active item.')
        return
    }

    var highlightLayer = getLayerByName('HIGHLIGHT_LAYER')
    var mainLayer = getLayerByName('MAIN_LAYER')
    var persistentSelectionLayer = getLayerByName('PERSISTENT_SELECTION_LAYER')

    // Clear the highlight layer when an item is being moved, since it's technically selected at that point.
    clearLayer(highlightLayer)

    // Clear the selection layer as well (we'll re-select the item once it's done being moved).
    clearLayer(persistentSelectionLayer)

    switch (activeItem.data.fdpbType) {

        case Factory.fdpbTypes.INSERT_SYMBOL:

            // Drag the line insert to the new point.
            dragLineInsertTo(newPosition)

            // Move the selector(s) to the new point.
            for (var i = 0; i < persistentSelectionLayer.children.length; i++) {
                persistentSelectionLayer.children[i].position = activeItem.position
            }
            break

        case Factory.fdpbTypes.KNOB:

            dragKnobTo(activeItem, newPosition + dragOffset)

            // Create a new selector for the knob and position it at the new point.
            var newSelector = getUpdatedSelectorShape(activeItem, 'persistent_selector', true)
            newSelector.position = activeItem.position
            persistentSelectionLayer.addChild(newSelector)

            break

        case Factory.fdpbTypes.LINE_OF_SCRIMMAGE:

            lineOfScrimmage.position.y = newPosition.y + dragOffset.y;
            lineOfScrimmage.position.y = Math.max(0, lineOfScrimmage.position.y);
            lineOfScrimmage.position.y = Math.min(viewBoundsOnLoad.bottom, lineOfScrimmage.position.y);
            mainLayer.data.LineOfScrimmagePosition = lineOfScrimmage.position.y;
            break

        case Factory.fdpbTypes.PLAYER_SYMBOL:

            // If there is no active player object for some reason, make one now.
            if (!activePlayerObject) {
                setActivePlayerObject(activeItem)
            }

            // Move the active player object to the new point.
            activePlayerObject.position = newPosition + dragOffset

            // Make sure the player object stays within the canvas bounds.
            constrainItemWithinBounds(activePlayerObject)

            snapItemToGrid(activeItem, true)

            break

        case Factory.fdpbTypes.MULTISELECTION:

            // Move the multiselection to the new point.
            activeItem.position = newPosition + dragOffset

            // Clear the persistent selection layer first.
            clearLayer(persistentSelectionLayer)

            // Now get an updated selector for each of the multiselection children and move them to the new positions.
            for (var i = 0; i < activeItem.children.length; i++) {
                var newSelector = getUpdatedSelectorShape(activeItem.children[i], 'persistent_selector', false)
                newSelector.position = activeItem.children[i].position
                persistentSelectionLayer.addChild(newSelector)
            }

            break
        default:
            // Everything else
            // Move the active item to the new point..
            activeItem.position = newPosition + dragOffset

            constrainItemWithinBounds(activeItem)
            snapItemToGrid(activeItem, true)
            selectAllCurvesInSelectedCurvesArray()

            // Generate a new selector and move it to the new point.
            var newSelector = getUpdatedSelectorShape(activeItem, 'persistent_selector', true)
            newSelector.position = activeItem.position
            persistentSelectionLayer.addChild(newSelector)
    }

    //maybe not needed for no path dragging?
    showAllPlayerRouteCorners()
    redrawPlayerRoute(activePlayerObject)
    updateAllPlayerRoutesOnLayer()

    // Select the item again
    updateSelector(activeItem, 'persistent_selector')

    // Mark the play as dirty if it's not already, because an object was moved
    makePlayDirty()
}


/**
 * Move the active item by the offset index amount.
 */
function moveObject(offsetIndexPoint)
{
    /* If no active item, exit now. */
    if (!activeItem) {
        return
    }

    pushMainLayerToUndoStack()
    dragOffset = new Point(0, 0)
    moveActiveItemTo(activeItem.position + offsetIndexPoint * 5)
}


/**
 * Handler after the field background has been imported.
 */
function onFieldBackgroundLoad(svgItem, svgData)
{
    backgroundSvg = svgItem

    // For basketball courts, make sure the SVG fits within the view bounds.
    if (product == 'fastbreak') {
        // Fit the court within the view dimensions
        backgroundSvg.fitBounds(view.bounds)
    }

    // For football plays, since they can be zoomed in, if the play has a saved center, set the center accordingly and make sure to constrain it within bounds.
    if (product == 'firstdown') {
        var mainLayer = getLayerByName('MAIN_LAYER')
        if (mainLayer.data.savedAtCenterX && mainLayer.data.savedAtCenterY) {
            backgroundSvg.center = new Point(mainLayer.data.savedAtCenterX, mainLayer.data.savedAtCenterY)
        } else {
            backgroundSvg.center = view.center
        }
    }
}


/**
 * When user double-clicks on the background.
 */
function onDoubleClickBG(event)
{
    // If we clicked on our current project, then perform the relevant tasks..
    if (paper.project.index == event.target.project.index) {

        addSentryBreadcrumb('User double-clicked on canvas background.', 'info', 'User Action')

        if (product == 'firstdown') {
            // If user double-clicks at 100% zoom, automatically set the zoom level to 2. Otherwise, set it back to 1. NOTE: The Zoom functionality only applies to football for now!
            if (window.app.config.globalProperties.$pinia.state._value.counter.selectedZoomLevel == 1) {
                window.app.config.globalProperties.$pinia.state._value.counter.selectedZoomLevel = 2
            } else {
                window.app.config.globalProperties.$pinia.state._value.counter.selectedZoomLevel = 1
            }
        }
    }

    // If we clicked on any other project, let's activate that one now!
    else {
        initializeFrame(event.target.project.index + 1)
    }
}


/**
 * When user double-clicks on an end symbol.
 */
function onDoubleClickEndSymbol(event)
{
    if (paper.project.index == event.target.project.index) {

        addSentryBreadcrumb('User double-clicked on an end symbol.', 'info', 'User Action')

        selectActiveRoute()

    } else {
        initializeFrame(event.target.project.index + 1)
    }

}


/**
 * When user double-clicks a player symbol.
 */
function onDoubleClickPlayerSymbol(event)
{
    if (paper.project.index == event.target.project.index) {

        addSentryBreadcrumb('User double-clicked on a player symbol.', 'info', 'User Action')

        // When a basketball player is double-clicked, give them the ball (meaning make a circle around them).
        if (product == 'fastbreak') {

            // Which player object was clicked on?
            var playerObjectClickedOn = event.target
            giveBallToPlayer(playerObjectClickedOn)
        }

    } else {
        initializeFrame(event.target.project.index + 1)
    }
}


/**
 * OnFrame event handler... not sure what this is for.
 */

function onFrame(event)
{
    // if (!!!selectionBox) return;
    //window.engineDebug("onFrame")

    if(!!selectionBox){
        selectionBox.dashOffset = selectionBox.dashOffset + 1;
    }

    if (animations.some(animation => animation.playing)) {
        updatePlayers(event);
    }
}

// Function to update player positions along their paths
function updatePlayers(event) {
    animations.forEach(function(animation) {
        if (animation.playing) {
            // Update animation progress based on direction, speed, and elapsed time
            if(animation.direction > 0){
                animation.progress += (animation.speed * event.delta * 20);
            }else{
                animation.progress -= (animation.speed * event.delta * 20);
            }
      
            if (animation.progress > 0 && animation.progress > animation.path.length) {
                animation.progress = animation.path.length;
                animation.playing = false;
            } else if(animation.progress < 0 && animation.progress > (-1 * animation.path.length)){
                animation.progress = 0;
                animation.playing = false;
            }
    

            // Get the point on the path corresponding to the progress
            var point = animation.path.getPointAt(animation.progress);
      
            console.log("Point",point)
            // Update the player position to the point on the path
            
            // Get the start point of the path
            var startPoint = animation.path.firstSegment.point;
            console.log("Start Point>>",startPoint)
            // Check if the player's position matches the start point of the path
            if (point && point.equals(startPoint)) {
                animation.progress = 0;
                animation.playing = false; // Stop the animation
                return;
            }else if(!point){
                animation.progress = 0;
                animation.playing = false; // Stop the animation
                return;
            }
            animation.player.position = point;
          }          
      });
}

function createPresentationobject(object,route){
    // // Unselect everything first.
    deselectAllCanvasObjects()

    // Generate an empty player object first.
    var presentationObject = createEmptyPresentationObject()

    // Draw a default player symbol based on Factory specs.
    var presentationSymbol = drawPresentationSymbol(playerStyle)

    // Add the player symbol to the player object.
    presentationObject.addChild(presentationSymbol)
    presentationObject.pivot = new Point(0, 0)
    presentationSymbol.pivot = new Point(0, 0)
    presentationSymbol.data.fdpbType = Factory.fdpbTypes.PLAYER_SYMBOL;

    presentationObject.presentationSymbol = presentationSymbol
    presentationObject.position = object.position;


    // var routePathGroup = new Group()
    // routePathGroup.position = presentationObject.position
    // routePathGroup.addChild(route.path)
    // routePathGroup.path = route.path
    // presentationObject.routesGroup.appendBottom(routePathGroup)

    // Add the player object to the presentation layer.
    var presentationLayer = getLayerByName('PRESENTATION_LAYER')
    presentationLayer.addChild(presentationObject)

    var animation = {
        player: presentationObject,
        path: route.path, // Assuming each player object has a path property
        progress: 0, // Animation progress
        direction: 1, // Direction of animation (1 for forward, -1 for backward)
        speed: object.data?.speed ? parseInt(object.data.speed) : 2, // Animation speed
        playing: false // Flag to indicate if animation is playing
    };
    animations.push(animation);

    return presentationObject;
}

function createPresentationObjects(playerObjects) {
    const presentationLayer = getLayerByName('PRESENTATION_LAYER')
    var presentationObjects = presentationLayer.getItems({ data: { fdpbType: Factory.fdpbTypes.PRESENTATION_OBJECT } }) 

    console.log("Presentation objects",presentationObjects)
    if(presentationObjects.length < 1){
        for(var i = 0; i < playerObjects.length; i++){
            var playerObject = playerObjects[i]
            // Only do this if the player object has a routes group attached to it...
            if (playerObject.routesGroup) {
                var routes = playerObject.routesGroup.children
                    var currentRoute = routes[0]
                    //update style of route. If no route exists or no paths exist on the route, skip this iteration.
                    if (!currentRoute || !currentRoute.path) {
                        continue
                    }
                    createPresentationobject(playerObject,currentRoute)
            }
        }
    }
}

function clearOldAnimations(){
    animations.forEach((animation)=>{
        console.log("animation",animation)
        if(animation.player){
            animation.player.remove();
        }if(animation.path){
            animation.path.remove();
        }
    })
    animations = [];

    // Reset our active variables.
    resetActiveItem()
    resetActivePlayerObject()
    resetSelectedCurvesArray()
    redrawPlayerRoute()
    updateAllPlayerRoutesOnLayer()
    updatePlayEditorSelectionArray()

    clearLayer(getLayerByName('PRESENTATION'));
}

function hideAnimations(){
    animations.forEach((animation)=>{
        if(animation.player){
            animation.player.visible = false;
            animation.player.position = animation.path.getPointAt(0);
        }if(animation.path){
            animation.path.visible = false;
        }if(animation.playing){
            animation.playing = false;
        }if(animation.progress){
            animation.progress = 0;
        }
    })
}

function showAnimations(){
    animations.forEach((animation)=>{
        if(animation.player){
            animation.player.visible = true;
        }if(animation.path){
            animation.path.visible = true;
        }
    })
}

function setupAnimations(value){
    // clearOldAnimations();
    if(value){
        //Setup or show animations
        if(animations.length){
            //show animations
            showAnimations();
        }else{
            //Setup animations
            const mainLayer = getLayerByName('MAIN_LAYER')
            var playerObjects = mainLayer.getItems({ data: { fdpbType: Factory.fdpbTypes.PLAYER_OBJECT } })
            createPresentationObjects(playerObjects);
        }
    }else{
        //Hide animations
        hideAnimations()
    }
}



function playAnimations() {
    animations.forEach(animation => {
        animation.playing = true;
    });
    // animations[0].playing = true;
}

function pauseAnimations() {
    animations.forEach(function(animation) {
      animation.playing = false;
    });
  }
  
  function stopAnimations() {
    animations.forEach(function(animation) {
      animation.playing = false;
      animation.progress = 0; // Reset progress to the beginning
      animation.player.position = animation.path.getPointAt(0);
    });
  }
  
  function forwardAnimations() {
    animations.forEach(function(animation) {
      animation.direction = 1;
      animation.playing = true;
    });
    // animations[0].direction = 1;
    // animations[0].playing = true;
  }
  
  function backwardAnimations() {
    animations.forEach(function(animation) {
        animation.direction = -1;
        animation.playing = true;
    });
    // animations[0].direction = -1;
    // animations[0].playing = true;

  }
  


/**
 * When user presses a key...
 */
function onKeyDown(event) {

    // window.engineDebug(" document.activeElement ", document.activeElement.id );
    //if (document.activeElement != document.getElementById("play-canvas-frame-1")) return;
    //window.engineDebug(event.key)
    // || event.key=="backspace"
    addSentryBreadcrumb('User pressed the "' + event.key + '" key on the keyboard.', 'info', 'User Action')

    //if in text fieled dont do text commands
    if (editingText) return

    // Disable keydown events on ProseMirror text boxes
    var targetClass = event.event.target.className
    if (targetClass.includes('ProseMirror')) {
        return
    }

    // If key down handler is disabled, exit now.
    if (!onKeyDownHandlerEnabled) return

    if (event.key == "delete" || event.key == "backspace") {
        if (activeItem) {
            deleteItem(activeItem)
        }
    }

    if (event.key == "right") moveObject(new Point(1, 0));
    if (event.key == "left") moveObject(new Point(-1, 0));
    if (event.key == "up") moveObject(new Point(0, -1));
    if (event.key == "down") moveObject(new Point(0, 1));
    if (event.modifiers.command) {

        if (event.key == "c") copyActiveItemOrPlayerObject()
        if (event.key == "v") pasteCopiedActiveItemOrPlayerObject()

        if (event.key == "d") {
            // cant really be d
            //   duplicateActiveItem();
        }
        if (event.key == "z") {
            undo();
            if (event.modifiers.shift) {
                redo();
            }
        }
        if (event.key == "y") {
            redo();
        }
    }
}


/**
 * When user presses their mouse down on the background...
 */
function onMouseDownBG(event)
{
    addSentryBreadcrumb('User clicked once on canvas background.', 'info', 'User Action')

    var highlightLayer = getLayerByName('HIGHLIGHT_LAYER')
    var persistentSelectionLayer = getLayerByName('PERSISTENT_SELECTION_LAYER')

    // If we clicked on our current project, then perform the relevant tasks..
    if (paper.project.index == event.target.project.index) {

        // Reset line style, player style, and text style to factory defaults.
        resetStylesToFactoryDefaults()

        // Deselect all objects on the canvas.
        deselectAllCanvasObjects()

        // Disband all multi-selection objects on the main layer.
        disbandAllMultiSelectionObjects()

        // Clear the highlight layer.
        clearLayer(highlightLayer)

        // Now clear the persistent selection layer.
        clearLayer(persistentSelectionLayer)

        // For FirstDown plays, defocus the regular text box editor in the right hand tabs.
        if (product == 'firstdown') {
            defocusTextBoxInput(document.getElementById("textBoxEditor"))
        }

        else if (product == 'fastbreak') {
            blurFastBreakNotes(paper.project.index + 1)
        }

        // Start creating a new selection box in case the user starts dragging their mouse (see onMouseDrag event handler)
        startSelectionBoxAtPoint = event.point
        userIsSelectingItems = true
    }

    // If we clicked on an inactive project...
    else {
        // @TODO - Do nothing for now...
    }

}


/**
 * When user presses their mouse down on an end symbol...
 */
function onMouseDownEndSymbol(event)
{
    addSentryBreadcrumb('User clicked once on an end symbol.', 'info', 'User Action')

    if (product == 'fastbreak') {
        blurFastBreakNotes(paper.project.index + 1)
    }

    // window.engineDebug(event.target);
    var knob = event.target.knob;
    selectItem(knob)
}


/**
 * When user presses their mouse down on a path...
 */
function onMouseDownPath(event)
{
    // If we clicked on our current project, then perform the relevant tasks..
    if (paper.project.index == event.target.project.index) {

        addSentryBreadcrumb('User clicked once on a path.', 'info', 'User Action')

        if (product == 'fastbreak') {
            blurFastBreakNotes(paper.project.index + 1)
        }

        if (event.currentTarget) {
            var route = event.currentTarget.parent
        }

        if (route) {
            var path = route.path
        }

        if (path) {
            var curveLoc = path.getNearestLocation(event.point)
        }

        if (curveLoc) {
            var curve = curveLoc.curve
        }

        if (curve) {
            var knob = curve.segment2.knob
        }

        if (knob) {
            selectItem(knob)
        }
    }

    // If we clicked on an inactive project...
    else {
        // @TODO - Do nothing for now...
    }
}


/**
 * When user presses their mouse down on a selectable item...
 */
function onMouseDownSelectable(event)
{
    event.stopPropagation()

    // If we selected an item in our current project, then perform the relevant tasks..
    if (paper.project.index == event.target.project.index) {

        addSentryBreadcrumb('User clicked on a selectable item.', 'info', 'User Action')

        if (product == 'fastbreak') {
            blurFastBreakNotes(paper.project.index + 1)
        }

        var item = event.currentTarget
        console.log("Item>>",item)

        if (isObjectPartOfAGroup(item)) {
            item = getParentGroupObject(item)
        }

        dragOffset = item.position - event.point
        currentlyDraggingItem = true

        if (item.data.fdpbType == Factory.fdpbTypes.END_SYMBOL) {
            item = item.knob
        }

        if (event.modifiers.shift) //trying to add select multiples
        {
            if (activeItem) {
                //something is already selected
                selectAdditionalItem(item);
                dragOffset = activeItem.position - event.point;
                return;
            }
        }

        // Now we can "persistently" select the item (so that the highlight stays "stuck" to the object).
        selectItem(item)

        //defocusTextBoxInput(document.getElementById("textBoxEditor"))
    }

    // If we clicked on an inactive project...
    else {
        // @TODO - Do nothing for now...
    }
}


/**
 * When user drags their mouse over the canvas...
 */
function onMouseDrag(event)
{
    var selectionBoxLayer = getLayerByName('SELECTION_BOX_LAYER')

    // If we selected an item in our current project, then perform the relevant tasks..
    if (paper.project.index == event.tool.view._project.index) {

        if (userIsSelectingItems) {

            clearLayer(selectionBoxLayer)

            // Make a new marquis/selection box.
            selectionBox = new Path.Rectangle(startSelectionBoxAtPoint, event.point)
            selectionBox.strokeColor = "#808080"
            selectionBox.fillColor = null
            selectionBox.strokeWidth = 1
            selectionBox.dashArray = [5, 5]
            selectionBoxLayer.addChild(selectionBox)

            // Now highlight all of the items within the selection box.
            highlightItemsWithinSelectionBox()
        }

        if (!activeItem || !currentlyDraggingItem) {
            return
        }

        if (!startDrag) {
            //just to know when to save undostate
            pushMainLayerToUndoStack();
            startDrag = true;
        }

        moveActiveItemTo(event.point)
    }

    // If we clicked on an inactive project...
    else {
        // @TODO - Do nothing for now...
    }
}


/**
 * When user moves their mouse into a selectable item...
 */
function onMouseEnterSelectable(event)
{
    var mainLayer = getLayerByName('MAIN_LAYER')
    var highlightLayer = getLayerByName('HIGHLIGHT_LAYER')

    // If we selected an item in our current project, then perform the relevant tasks..
    if (paper.project.index == event.target.project.index) {

        // If the user is currently selecting items or dragging an item, don't do anything...
        if (userIsSelectingItems || currentlyDraggingItem) {
            return
        }

        // The DOM element that was entered...
        var itemToHighlight = event.currentTarget

        // If we're selecting a player object on the main layer, then show the player object knobs as well.
        if (itemToHighlight.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT && itemToHighlight.parent == mainLayer) {
            //not in a group so show knobs
            showPlayerObjectKnobs(itemToHighlight)
        }

        // If user is selecting an end symbol...
        else if (itemToHighlight.data.fdpbType == Factory.fdpbTypes.END_SYMBOL) {
            itemToHighlight = itemToHighlight.knob
        }

        // If user is selecting a knob...
        else if (itemToHighlight.data.fdpbType == Factory.fdpbTypes.KNOB) {
            if (itemToHighlight.data.knobType == "SEGMENT") {
                if (selectedCurves.length > 0) {
                    //if is the knob of  selected curve,
                    //do not show rollover cuz already selected
                    if (itemToHighlight.curve == selectedCurves[0]) return;
                }
            }
        }

        // If user is selecting a multi-selection...
        else if (itemToHighlight.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
            // @TODO
        }

        // Highlight the item (true to clear the highlight layer first)
        updateSelector(itemToHighlight, 'highlight', true)
    }

    // If we clicked on an inactive project...
    else {
        // @TODO - Do nothing for now...
    }
}


/**
 * When user moves their mouse outside of a selectable item...
 */
function onMouseLeaveSelectable(event)
{
    var mainLayer = getLayerByName('MAIN_LAYER')
    var highlightLayer = getLayerByName('HIGHLIGHT_LAYER')

    // If we selected an item in our current project, then perform the relevant tasks..
    if (paper.project.index == event.target.project.index) {

        var target = event.currentTarget

        /* If we're selecting a player object on the main layer, then show the player object knobs as well. */
        if (target && target.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT && target.parent == mainLayer) {
            hidePlayerObjectKnobs(target)
        }

        // Clear all highlights
        clearLayer(highlightLayer)
    }

    // If we clicked on an inactive project...
    else {
        // @TODO - Do nothing for now...
    }
}


/**
 * When the user moves their mouse over the play canvas...
 */
function onMouseMove(event)
{

}


/**
 * When user releases their mouse after pressing it somewhere on the canvas...
 */
function onMouseUp(event)
{
    //window.engineDebug("onMouseUp")
    var mainLayer = getLayerByName('MAIN_LAYER')
    var selectionBoxLayer = getLayerByName('SELECTION_BOX_LAYER')

    // If we selected an item in our current project, then perform the relevant tasks..
    if (paper.project.index == event.tool.view._project.index) {

        currentlyDraggingItem = false
        startDrag = false

        /**
         * Reset the line of scrimmage color.
         */
        if (lineOfScrimmage) {
            lineOfScrimmage.strokeColor = Factory.colorDefs.LINE_OF_SCRIMMAGE;
        }

        var guideLayer = getLayerByName('GUIDE_LAYER')
        clearLayer(guideLayer)

        if (userIsSelectingItems) {

            // If we have selected items on the highlight layer when we lift the mouse up, then let's turn the highlight layer into a multiselect and select the multiselect.
            if (!startSelectionBoxAtPoint.equals(event.point)) {

                // Get all of our selected items.
                var selectedItems = getItemsWithinSelectionBox()

                // No selected items, just return.
                if (!selectedItems) {
                    return
                }

                // If we only have 1 item selected, then just select it on its own.
                else if (selectedItems.length == 1) {
                    selectItem(selectedItems[0])
                }

                // If we have more than 1 item selected, then we need to convert it to a multi-selection group and then select it.
                else if (selectedItems.length > 1) {

                    //convertItemsToMultiSelectionGroup(selectedItems, true) // True to select items too
                    var selectionGroup = new Group()
                    for (var i = 0; i < selectedItems.length; i++) {
                        selectionGroup.addChild(selectedItems[i])
                    }

                    // Now convert the group to a multi-selection object.
                    //convertGroupToMultiSelection(selectionGroup, true) // True to select items too
                    selectionGroup.data.fdpbType = Factory.fdpbTypes.MULTISELECTION
                    mainLayer.addChild(selectionGroup)

                    makeItemSelectable(selectionGroup)

                    // Select the multi-selection item if applicable.
                    selectItem(selectionGroup)
                }
            }

            // Now we can get rid of the selection box.
            clearLayer(selectionBoxLayer)

            userIsSelectingItems = false
        }
    }

    // If we clicked on an inactive project...
    else {
        // @TODO - Do nothing for now...
    }
}


/**
 * Deprecated?
 */
function onResize() {
    return;
}


/**
 * Event handler once the symbol has been loaded to the canvas.
 */
function onSymbolLoad(symbol, data)
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    var symbolName = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue

    window.engineDebug(symbolName)

    deselectAllCanvasObjects()

    var svgSymbolGroup = new Group()
    var mouseArea = createMouseArea()
    svgSymbolGroup.position = viewBoundsOnLoad.center
    symbol.position = viewBoundsOnLoad.center
    mouseArea.position = viewBoundsOnLoad.center

    svgSymbolGroup.addChild(mouseArea)
    svgSymbolGroup.addChild(symbol)
    svgSymbolGroup.data.fdpbType = Factory.fdpbTypes.SVG_SYMBOL
    svgSymbolGroup.data.customStyle = {}
    svgSymbolGroup.data.customStyle.symbolName = symbolName

    placeItem(svgSymbolGroup)

    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.addChild(svgSymbolGroup)
    makeItemSelectable(svgSymbolGroup)
    selectItem(svgSymbolGroup)
}


/**
 * Handler after the watermark has been imported.
 */
function onWatermarkLoad(watermark)
{
    watermarkSvg = watermark

    // Scale the watermark according to the zoom level
    var selectedZoomLevel = window.app.config.globalProperties.$pinia.state._value.counter.selectedZoomLevel
    watermarkSvg.scale(1 / selectedZoomLevel)

    // Make the watermark a very light
    watermarkSvg.opacity = .1

    // If it's a FastBreak play, resize the watermark appropriately.
    if (product == 'fastbreak') {
        // Make sure the watermark fits properly within the frame.
        watermarkSvg.fitBounds(view.bounds)
        watermarkSvg.scale(.2)
        watermarkSvg.position = new Point(90 * (1 / selectedZoomLevel), 360);
    }

    // Reposition the watermark; move it over to the right from center because the TM throws the alignment off
    if (product == 'firstdown') {
        var pos = view.center.add(16 * (1 / selectedZoomLevel),0);
        watermarkSvg.position = pos;
    }
}


/**
 * Pan the play in the given direction.
 */
this.panPlay = function(direction)
{
    // How many pixels should the play shift by when we pan?
    var shiftByPixels = 10

    var left = (view.visiblePlayArea.left / view.zoom) + view.bounds.left
    var top = (view.visiblePlayArea.top / view.zoom) + view.bounds.top
    var right = (view.visiblePlayArea.left / view.zoom) + view.viewSize.width
    var bottom = (view.visiblePlayArea.top / view.zoom) + view.viewSize.height

    switch (direction) {
        // Pan left
        case 'left':

            // If this shift doesn't put the play out of bounds, move the full amount. Otherwise, move to the left edge of the field.
            if (left - shiftByPixels > 0) {
                view.translate(new Point(shiftByPixels, 0))
            } else {
                view.translate(new Point(left, 0))
            }

            break

        // Pan right
        case 'right':

            // If this shift doesn't put the play out of bounds, move the full amount. Otherwise, move to the right edge of the field.
            if (view.bounds.right + shiftByPixels < right) {
                view.translate(new Point(-shiftByPixels, 0))
            } else {
                view.translate(new Point(-(right - view.bounds.right), 0))
            }

            break

        // Pan up
        case 'up':

            // If this shift doesn't put the play out of bounds, move the full amount. Otherwise, move to the top edge of the field.
            if (top - shiftByPixels > 0) {
                view.translate(new Point(0, shiftByPixels))
            } else {
                view.translate(new Point(0, top))
            }

            break

        // Pan down
        case 'down':

            // If this shift doesn't put the play out of bounds, move the full amount. Otherwise, move to the bottom edge of the field.
            if (view.bounds.bottom + shiftByPixels < bottom) {
                view.translate(new Point(0, -shiftByPixels))
            } else {
                view.translate(new Point(0, -(bottom - view.bounds.bottom)))
            }

            break

        default:
            // code goes here
    }
}


/**
 * Paste the copied active item to the canvas.
 */
function pasteCopiedActiveItemOrPlayerObject()
{
    defocusTextBoxInput(document.getElementById("textBoxEditor"))
    window.engineDebug("pasteCopiedActiveItemOrPlayerObject", clipboard);
    if (!!!clipboard) return
    pushMainLayerToUndoStack()
    deselectAllCanvasObjects()
    var fdpbObject = clipboard.clone({ insert: false, deep: true })

    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.addChild(fdpbObject)

    if (fdpbObject.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
        restoreDataPropertiesOnPlayerObject(fdpbObject)
        selectItem(fdpbObject.playerSymbol)
    } else {
        fdpbObject.data = duplicateObjectViaJson(fdpbObject.data);
        restoreDataPropertiesOnChildrenOf(fdpbObject);
        makeItemSelectable(fdpbObject);
        selectItem(fdpbObject);
        // fdpbObject.selected = true;
    }

    fdpbObject.position = viewBoundsOnLoad.center;
    redrawMainLayer()
    //updateActiveItemSelection()
}


/**
 * Place the given item.
 */
function placeItem(item, placeAtPoint = null, preventOverlapping = true)
{
    var xMargin = 50; // Define the left/right margin where items shouldn't be placed within
    var yMargin = 50; // Definte the top/bottom margin where items shouldn't be placed within

    var shiftX = 50; // Shift the X coordinate of the new item by this many pixels.
    var shiftY = 50; // Shift the Y coordinate of the new item by this many pixels.

    // If the item is a player object and we haven't specified where to place them, we need to shift the X coordinate by the width of the player + the player symbol stroke widths + the distance between players specified in the custom style.
    if (!placeAtPoint && item.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
        var defaultDistanceBetweenPlayers = item.playerSymbol.data.customStyle.defaultDistanceBetweenPlayers ? item.playerSymbol.data.customStyle.defaultDistanceBetweenPlayers : 4
        var playerShapeWidth = item.playerSymbol.data.customStyle.playerShapeWidth ? item.playerSymbol.data.customStyle.playerShapeWidth : 30
        shiftX = playerShapeWidth + (item.playerSymbol.data.customStyle.strokeWidth * 2) + defaultDistanceBetweenPlayers
    }

    // What's the item's original position?
    var originalPosition = item.position

    // What's the item's new position?
    var newPosition = originalPosition // start at the original position

    // If we want to prevent overlapping on another object, do this...
    if (preventOverlapping) {

        while (true) {

            // If the item fits, then we can stop the loop
            if (itemFits(item)) {
                break;
            }

            // Move the item over to the right.
            newPosition.x = newPosition.x + shiftX

            // If the new position is outside the acceptable right margin, move it down instead, starting at the left margin x coordinate.
            if (newPosition.x > viewBoundsOnLoad.right - xMargin) {
                newPosition.x = xMargin
                newPosition.y = newPosition.y + shiftY
            }

            // If the new position is outside the acceptable bottom margin, move it to the middle instead.
            if (newPosition.y > viewBoundsOnLoad.bottom - yMargin) {
                newPosition.y = view.size / 2;
                break;
            }

        }

    }

    item.position = newPosition;
}


/**
 * Place a player within the play drawing. Set preventOverlapping = true to allow players to overlap.
 */
function placePlayer(item, placeAtPoint = null, preventOverlapping = true)
{
    // If there is no specified point to place the player at, then place them in the center.
    var playerPositionX = placeAtPoint ? placeAtPoint.x : view.center.x
    var playerPositionY = placeAtPoint ? placeAtPoint.y : view.center.y - (150 * paper.containerZoom)
    item.position = new Point(playerPositionX, playerPositionY)
    placeItem(item, placeAtPoint, preventOverlapping) // false to allow overlapping of player symbols
    //setPosition(item)
}


/**
 * Place the specified play JSON data as a group.
 */
function placePlayJsonAsGroup(playJson)
{
    pushMainLayerToUndoStack()
    var importLayer = new Layer();
    var importGroup = new Group();

    importLayer.importJSON(playJson);
    //copy import layer childeren to a a group, de group in process
    while (importLayer.children.length > 0) {
        convertGroupToMultiSelectionAndUpdateSelection(importLayer.firstChild);
        disbandMultiSelectionObject(importLayer.firstChild);
        importGroup.addChild(importLayer.firstChild);
    }

    restoreDataPropertiesOnChildrenOf(importGroup)

    convertGroupToMultiSelection(importGroup, true)
    convertMultiSelectionToGroup(importGroup)
    redrawMainLayer()
    // importGroup.opacity = .3;
}


/**
 * Place the JSON file on the canvas.
 */
function placePlayJsonFileOnCanvas(event)
{
    processJsonFile(placePlayJsonAsGroup, 'placeJSON_id');
}


/**
 * Place the play template JSON on the play canvas.
 */
function placePlayTemplateOnCanvas(playTemplateJson = null)
{
    window.engineDebug('placePlayTemplateOnCanvas')

    // Save the undo state so that undo works properly.
    pushMainLayerToUndoStack()

    // Create a temporary template layer and import our template JSON onto it.
    var templateLayer = createOrReturnExistingLayer("TEMPLATE_LAYER")
    templateLayer.activate()
    templateLayer.importJSON(playTemplateJson)

    // Restore properties on all sub-objects in the template layer.
    restoreDataPropertiesOnChildrenOf(templateLayer)

    // Activate the main layer so we can draw on it.
    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.activate()

    // Now add the template children to the main layer and make them selected.
    for (var i = 0; i < templateLayer.children.length; i++) {
        var templateChild = templateLayer.children[i]
        mainLayer.addChild(templateChild)
        makeItemSelectable(templateChild)
        selectItem(templateChild)
    }

    // Now delete the template layer since we don't need it anymore.
    templateLayer.remove()

    // Re-draw the main layer.
    redrawMainLayer()

    // Mark the play as dirty.
    makePlayDirty()
}


/**
 * Position the end symbols on the specified player object.
 */
function positionEndSymbolsOnPlayerObject(playerObject = null)
{
    /* No player object, exit now. */
    if (!playerObject || playerObject.data.fdpbType != Factory.fdpbTypes.PLAYER_OBJECT) {
        return
    }

    /* The routes on the player object. */
    var routes = playerObject.routesGroup.children

    for (var k = 0; k < routes.length; k++) {
        var path = routes[k].path;
        for (var i = 0; i < path.curves.length; i++) {
            var curve = path.curves[i]

            /* If curve has no end symbol, skip to next iteration. */
            if (!curve.endSymbol) {
                continue
            }

            curve.endSymbol.position = curve.point2
            var tangent = curve.getTangentAtTime(1)
            var angle = tangent.angle //+ 90;
            setRotationOfItem(curve.endSymbol, angle)
        }
    }
}


/**
 * Position the knob lines on a player object.
 */
function positionBezierLinesOnPlayerObject(playerObject = null)
{
    // If no player object, return
    if (!playerObject) {
        return
    }

    var knobs = playerObject.knobsGroup.children;
    for (var i = 0; i < knobs.length; i++) {
        var knob = knobs[i];
        if (knob) {
            if (knob.data.knobType == "CURVE") {
                if (knob.bezierLine1) {
                    knob.bezierLine1.firstCurve.point1 = knob.curve.point1
                    knob.bezierLine1.firstCurve.point2 = knob.position
                }
                if (knob.bezierLine2) {
                    knob.bezierLine2.firstCurve.point1 = knob.curve.point2
                    knob.bezierLine2.firstCurve.point2 = knob.position
                }
            }
        }
    }
}


/**
 * Position a single line insert on the specified symbol object.
 */
function positionLineInsert(symbol)
{
    var curveOffset = symbol.curveOffset;
    var newCurveOffset = curveOffset;
    var path = symbol.route.path;
    var curve = symbol.curve;
    var minDistance = 26 / 2 + 5; //6 is knob radius with line

    newCurveOffset = Math.max(curveOffset, minDistance)
    newCurveOffset = Math.min(newCurveOffset, curve.length - minDistance)
    var newPos = curve.getPointAt(newCurveOffset)
    var offset = path.getOffsetOf(newPos)
    symbol.curveOffset = newCurveOffset
    symbol.position = newPos
    var tangent = path.getTangentAt(offset)

    if (!tangent.angle) {
        addSentryMessage('No tangent angle to position line insert with.')
        return
    }

    var angle = tangent.angle //+ 90;
    setRotationOfItem(symbol, angle)
}


/**
 * Position the line inserts on the specified player object.
 */
function positionLineInsertsOnPlayerObject(playerObject)
{
    window.engineDebug('positionLineInsertsOnPlayerObject', playerObject)
    var inserts = playerObject.insertsGroup.children;
    for (var i = 0; i < inserts.length; i++) {
        positionLineInsert(inserts[i]);
    }
}


/**
 * Process the specified JSON file using the specified processing function.
 */
function processJsonFile(processingFunction, fileInputID)
{
    /*
    loadImage_id
    placeJSON_id
    selectJSON_id
     */
    var files = document.getElementById(fileInputID).files;


    window.engineDebug(files);
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();
    fr.onload = function(e) {
        window.engineDebug(e);
        var result = JSON.parse(e.target.result);
        window.engineDebug(result);
        //var formatted = JSON.stringify(result, null, 2);
        processingFunction(result);
        document.getElementById(fileInputID).value = "";
    }

    fr.readAsText(files.item(0));
}


/**
 * Reverse the last undo action.
 */
function redo()
{
    var mainLayer = getLayerByName('MAIN_LAYER')

    if (redoStack[paper.project.index].length == 0) return;
    var layerState = redoStack[paper.project.index].pop();
    var mainLayerIndex = mainLayer.index
    var mainLayerReference = mainLayer;
    window.engineDebug(mainLayerIndex)
    mainLayer.remove();
    paper.project.insertLayer(mainLayerIndex, layerState)
    mainLayer = layerState;
    undoStack[paper.project.index].push(mainLayerReference)
    restoreDataPropertiesOnAllMainLayerObjects()
}


/**
 * Redraw the child objects of the specified parent object.
 */
function redrawChildObjects(parentObject = null)
{
    if (!parentObject) {
        addSentryMessage('No parent object to redraw.')
        return
    }

    var childObjects = parentObject.children
    for (var i = 0; i < childObjects.length; i++) {
        var childObject = childObjects[i]
        // window.engineDebug(i);
        if (childObject.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
            redrawPlayerObject(childObject)
        }
        if (childObject.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
            redrawChildObjects(childObject)
        }
        if (childObject.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
            redrawChildObjects(childObject)
        }
    }
}


/**
 * Re-draw the main layer of the play
 */
function redrawMainLayer()
{
    var mainLayer = getLayerByName('MAIN_LAYER')
    //highlightAllMainLayerItems()
    redrawChildObjects(mainLayer)
    updateAllPlayerRoutesOnLayer()
}


/**
 * Re-draw the specified player object.
 */
function redrawPlayerObject(playerObject = null)
{
    if (!playerObject) {
        addSentryMessage('No player object found when trying to redraw player object.')
        return
    }

    if (!playerObject.playerSymbol) {
        addSentryMessage('No player symbol found when trying to redraw player object.')
        return
    }

    setStylePropertiesOnPlayerObjectSymbols(playerObject)
    var routes = playerObject.routesGroup.children
    for (var j = 0; j < routes.length; j++) {
        redrawPlayerRoutePaths(routes[j])
    }
}


/**
 * Re-draw the player route on the specified player object.
 */
function redrawPlayerRoute(playerObject = null)
{
    /* If no player object to work with, exit now. */
    if (!playerObject || playerObject.data.fdpbType != Factory.fdpbTypes.PLAYER_OBJECT) {
        return
    }

    /* Position the bezier lines on the player object. */
    positionBezierLinesOnPlayerObject(playerObject)

    /* Position the end symbols on the player object. */
    positionEndSymbolsOnPlayerObject(playerObject)

    /* Redraw all player routes. */
    var routes = playerObject.routesGroup.children
    for (var j = 0; j < routes.length; j++) {
        redrawPlayerRoutePaths(routes[j])
    }

    /* Select all curves on the player route? */
    selectAllCurvesInSelectedCurvesArray()

    /* Position line inserts on the player object. */
    positionLineInsertsOnPlayerObject(playerObject)
}


/**
 * Re-draw the player route paths on the specified route.
 */
function redrawPlayerRoutePaths(route)
{
    for (var i = 0; i < route.path.curves.length; i++) {

        var displayPath = getRoutePath(route, i)
        displayPath.removeSegments()
        var referenceCurve = route.path.curves[i]
        //is this the right place for this
        var customStyle = route.data.customStyles[i]

        displayPath.style = Object.assign({}, customStyle)
        if (customStyle.strokeStyle == "Zig Zag") {
            var zig = 1;
            var l = 5;
            var w = 4;
            var nextDistance = l / 2;
            var nextPoint;
            displayPath.add(referenceCurve.point1)
            while (nextDistance < referenceCurve.length) {
                var pointOnPath = referenceCurve.getPointAt(nextDistance);
                nextPoint = pointOnPath + referenceCurve.getNormalAt(nextDistance) * zig * w / 2;

                displayPath.add(nextPoint)
                zig = -zig;
                nextDistance += l;
            }
            displayPath.add(referenceCurve.point2)

        } else {
            displayPath.add(referenceCurve.point1)
            displayPath.add(referenceCurve.point2)
            var displayCurve = displayPath.firstCurve;

            // displayCurve.point1 =  referenceCurve.point1;
            // displayCurve.point2 =  referenceCurve.point2;
            if (referenceCurve.hasHandles()) {
                displayCurve.handle1 = referenceCurve.handle1;
                displayCurve.handle2 = referenceCurve.handle2;
            }
        }

        //
        var displayCorner = getRouteCorner(route, i);

        //displayCorner.style = Object.assign({}, customStyle);
        // displayCorner.style.strokeCap = 'round'
        styleRouteCorner(displayCorner, customStyle);
        displayCorner.position = referenceCurve.point2;

        showItem(displayCorner)
    }
}


/**
 * Remove all line insert gaps from player object.
 */
function removeAllLineInsertGapsFromPlayerObject(playerObject)
{
    if (playerObject.insertsGroup) {
        var inserts = playerObject.insertsGroup.children;
        for (var i = 0; i < inserts.length; i++) {
            var insert = inserts[i];
            var route = insert.route;
            var displayPath = getRoutePath(route, insert.curve.index);
            removeGapFromLineInsert(insert, displayPath)
        }
    }
}


/**
 * Remove any gaps from the specified line insert path.
 */
function removeGapFromLineInsert(insert, displayPath)
{
    var gapSize = 26 //insert.length;
    if (insert.data.length) gapSize = insert.data.length;
    if (insert.shape.data.length) gapSize = insert.shape.data.length;
    var curveOffset = insert.curveOffset
    if (displayPath && displayPath.curves.length > 1) {
        //Zig
        curveOffset = displayPath.getNearestLocation(insert.position).offset;
        gapSize *= 1.225;
    }

    // displayPath.getPointAt(actualOffset+gapSize/2)
    // gapSize = actualOffset+gapSize/2
    //var gap = [actualOffset- gapSize/2, actualOffset+ gapSize/2]
    var gap = [curveOffset - gapSize / 2, curveOffset + gapSize / 2]
    removeGapFromPath(gap, displayPath)
}


/**
 * Remove the specified gap from the specified line segments.
 */
function removeGapFromLineSegments(gap, segments)
{
    window.engineDebug('removeGapFromLineSegments', gap, segments)
    var startGap = gap[0];
    var endGap = gap[1];
    for (var i = segments.length - 1; i >= 0; i--) {
        var segment = segments[i]
        var startSegment = segment[0];
        var endSegment = segment[1];

        if (startGap > startSegment && endGap < endSegment) {
            // gap is entirely withing segment
            var newSegment1 = [startSegment, startGap];
            var newSegment2 = [endGap, endSegment];
            segments[i] = newSegment1; //replace 1st segment
            segments.splice(i + 1, 0, newSegment2);
            //we are done return
            return;
        }
        if (startSegment >= startGap && endSegment <= endGap) {
            // segment has been cut completely
            segments.splice(i, 1);
        }

    }
    for (var i = segments.length - 1; i >= 0; i--) {
        var segment = segments[i]
        var startSegment = segment[0];
        var endSegment = segment[1];
        if (startGap > startSegment && startGap < endSegment) {
            segments[i][1] = startGap;
        }
        if (endGap > startSegment && endGap < endSegment) {
            segments[i][0] = endGap;
        }
    }
}


/**
 * Remove gap from the specified path.
 */
function removeGapFromPath(gap, displayPath)
{
    var lineSegments = convertDashesArrayToLineSegments(displayPath.dashArray, displayPath)
    removeGapFromLineSegments(gap, lineSegments)
    displayPath.dashArray = convertLineSegementsToDashesArray(lineSegments);
}


/**
 * Reorder the basketball player objects on the diagram according to which lines are attached to them so that the smartMove logic works correctly.
 */
function reorderBasketballPlayerObjects(playerObjects)
{
    var reorderedPlayerObjects = []

    // Player objects should be in this order (but note, the object created below will put them in alphabetical order)
    var playerObjectsByLastCurveType = {
        'Solid' : [], // Run lines
        'Zig Zag': [], // Dribble lines
        'Dotted' : [], // Pass lines
    }

    for (var i = 0; i < playerObjects.length; i++) {

        if (playerObjects[i].routesGroup.children.length) {

            // We need to iterate through each route attached to this player object.
            var routes = playerObjects[i].routesGroup.children

            for (var r = 0; r < routes.length; r++) {

                // Get the route path
                var routePath = routes[r].path

                // Get the style of the last curve on this path
                var lastCurveStrokeStyle = routes[r].data.customStyles[routePath.lastCurve.index].strokeStyle

                // Now push the player object onto the appropriate array.
                playerObjectsByLastCurveType[lastCurveStrokeStyle].push(playerObjects[i])
            }
        }
    }

    // Add players to the reordered player objects accordingly.
    // NOTE: Player objects MUST be added in this order (Solid, Zig Zag, Dotted aka Run, Dribble, Pass)!
    for (var j = 0; j < playerObjectsByLastCurveType['Solid'].length; j++) {
        reorderedPlayerObjects.push(playerObjectsByLastCurveType['Solid'][j])
    }

    for (var k = 0; k < playerObjectsByLastCurveType['Zig Zag'].length; k++) {
        reorderedPlayerObjects.push(playerObjectsByLastCurveType['Zig Zag'][k])
    }

    for (var l = 0; l < playerObjectsByLastCurveType['Dotted'].length; l++) {
        reorderedPlayerObjects.push(playerObjectsByLastCurveType['Dotted'][l])
    }

    return reorderedPlayerObjects
}


/**
 * Replace the frame with the specified JSON data.
 */
function replaceJson(jsonType = 'play', passedThroughJson = null, frameNumber = 1)
{
    // If no JSON is passed through, exit now because there's ntohing to import.
    if (!passedThroughJson) {
        return
    }

    // Store the actual JSON to import in this variable.
    var jsonToImport

    // If this is play json...
    if (jsonType == 'play') {

        // Play JSON needs to be unserialized and parsed through...
        var unserializedPlayJson = JSON.parse(passedThroughJson)
        if (!unserializedPlayJson) {
            return
        }

        // If this is a 3.0 Firstdown play (meaning it has no frame numbers), then import the play as it was passed through.
        // If this is a 4.0 play (meaning it has frames), then import JUST the specified frame number's JSON.
        jsonToImport = (product == 'firstdown' && unserializedPlayJson[0] == 'Layer') ? passedThroughJson : unserializedPlayJson[frameNumber]
    }

    else if (jsonType == 'frame') {
        // If this is a 4.0 frame, then import the JSON as is.
        jsonToImport = passedThroughJson
    }

    // First make sure the frame is activated.
    activateFrame(frameNumber)

    // Now import the JSON to the main layer of the play.
    var mainLayer = getLayerByName('MAIN_LAYER', frameNumber)
    mainLayer.importJSON(jsonToImport)

    // Re-draw line of scrimmage if it's selected in PlayEditor.
    if (typeof mainLayer.data.lineOfScrimagePosition != 'undefined') {
        mainLayer.data.LineOfScrimmagePosition = mainLayer.data.lineOfScrimagePosition;
    } else if (typeof mainLayer.data.LineOfScrimmagePosition == 'undefined') {
        mainLayer.data.LineOfScrimmagePosition = view.center.y / 2;
    }
    if (typeof mainLayer.data.LineOfScrimmageVisible == 'undefined') {
        mainLayer.data.LineOfScrimmageVisible = false;
    }

    // If the play has a saved zoom level, set the view zoom level accordingly.
    if (mainLayer.data.savedAtZoomLevel) {
        window.app.config.globalProperties.$pinia.state._value.counter.selectedZoomLevel = mainLayer.data.savedAtZoomLevel; // Select the saved zoom level in the PlayEngine UI
        changeZoomLevel(mainLayer.data.savedAtZoomLevel)
    }

    // If the play has a saved center, set the center accordingly and make sure to constrain it within bounds.
    if (mainLayer.data.savedAtCenterX && mainLayer.data.savedAtCenterY) {
        view.center = new Point(mainLayer.data.savedAtCenterX, mainLayer.data.savedAtCenterY)
    }

    // Restore the state props
    restoreDataPropertiesOnAllMainLayerObjects()

    // Hide all player object knobs by updating all player object routes.
    var playerObjects = getAllPlayerObjectsOnMainLayer()
    for (var i = 0; i < playerObjects.length; i++) {
        hidePlayerObjectKnobs(playerObjects[i])
    }

    window.app.config.globalProperties.$pinia.state._value.counter.lineOfScrimmage = mainLayer.data.LineOfScrimmageVisible;
}


/**
 * Set the active item to null.
 */
function resetActiveItem()
{
    setActiveItem(null)
}


/**
 * Set the active player object to null.
 */
function resetActivePlayerObject()
{
    setActivePlayerObject()
}


/**
 * Set the active route to null.
 */
function resetActiveRoute()
{
    setActiveRoute(null)
}


/**
 * Reset the play editor tabs to their defaults.
 */
function resetPlayEditorTabs()
{
    /* default styles are defined in  fdpb-symbolfactory-x.xx.js
        and can be accessed here
        window.globals.pbtFactory.lineStyle);
        window.globals.pbtFactory.playerStyle);
        window.globals.pbtFactory.textStyle);
    */
    window.engineDebug("resetPlayEditorTabs");
    window.app.config.globalProperties.$pinia.state._value.counter.resetTabs();
}



/**
 * Empties the selectedCurves array.
 */
function resetSelectedCurvesArray()
{
    selectedCurves = []

    // Update all selected curve line indicators.
    selectAllCurvesInSelectedCurvesArray()
}


/**
 * Reset line style, player style, and text style to factory defaults.
 */
function resetStylesToFactoryDefaults(updateUi = false)
{
    lineStyle = Object.assign({}, product == 'firstdown' ? Factory.lineStyle : Factory.defaultBasketballLineStyle)
    playerStyle = Object.assign({}, product == 'firstdown' ? Factory.playerStyle : Factory.defaultBasketballPlayerStyle)
    textStyle = Object.assign({}, Factory.textStyle)
    defaultEndSymbolType = 'TRIANGLE'

    // Should we update the UI?
    // @TODO - Is this the right logic or should it be !updateUi?
    if (updateUi) {
        resetPlayEditorTabs()
    }
}


/**
 * Restore these layers after exporting the play.
 */
function restoreLayersAfterExport(frameNumber = 1)
{
    showItem(getLayerByName('TOOL_LAYER', frameNumber))
    createOrReturnExistingLayer('HIGHLIGHT_LAYER', frameNumber)
    createOrReturnExistingLayer('PERSISTENT_SELECTION_LAYER', frameNumber)
    createOrReturnExistingLayer('SELECTION_BOX_LAYER', frameNumber)

    hideItem(getLayerByName('WATERMARK_LAYER', frameNumber)) //always hide watermark in engine

    // Update the view on this frame number.
    paper.projects[frameNumber - 1].view.update()
}


/**
 * Show all the necessary layers again after exporting the template PNG so that the play can be edited properly again.
 */
function restoreLayersAfterTemplateExport()
{
    window.engineDebug('restoreLayersAfterTemplateExport')

    showItem(getLayerByName('BG_LAYER'))
    showItem(getLayerByName('GUIDE_LAYER'))
    showItem(getLayerByName('MAIN_LAYER'))
    showItem(getLayerByName('SELECTION_BOX_LAYER'))
    showItem(getLayerByName('PERSISTENT_SELECTION_LAYER'))
    showItem(getLayerByName('TOOL_LAYER'))
    showItem(getLayerByName('HIGHLIGHT_LAYER'))

    hideItem(getLayerByName('WATERMARK_LAYER'))

    // Update all project views.
    updateAllProjectViews()
}


/**
 * Restore the necessary properties of all child objects of the specified parent object.
 */
function restoreDataPropertiesOnChildrenOf(parentObject)
{
    window.engineDebug('restoreDataPropertiesOnChildrenOf', parentObject)
    var objects = parentObject.children;
    for (var i = 0; i < objects.length; i++) {
        restoreDataPropertiesOnObject(objects[i])
    }
}


/**
 * Restore the necessary properties on all relevant main layer objects.
 */
function restoreDataPropertiesOnAllMainLayerObjects()
{
    var mainLayer = getLayerByName('MAIN_LAYER')

    // De-select everything first.
    deselectAllCanvasObjects()

    // Show line of scrimmage if it's selected in PlayEditor.
    if (lineOfScrimmage) {
        lineOfScrimmage.position.y = mainLayer.data.LineOfScrimmagePosition
        lineOfScrimmage.visible = mainLayer.data.LineOfScrimmageVisible
    }

    // Restore properties on all sub-objects in the main layer.
    restoreDataPropertiesOnChildrenOf(mainLayer)

    // Highlight all necessary main layer objects.
    //highlightAllMainLayerItems()

    // Re-draw the main layer.
    redrawMainLayer()
}


/**
 * Restore a single object (recursive).
 */
function restoreDataPropertiesOnObject(objectToRestore)
{
    // If the object doesn't have a datatype, there's nothing to restore.
    if (!objectToRestore.data.fdpbType) {
        return;
    }

    // If the object IS a player object...
    if (objectToRestore.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
        restoreDataPropertiesOnPlayerObject(objectToRestore)
    }

    // If the object is a defense basketball player
    else if (objectToRestore.data.fdpbType == Factory.fdpbTypes.BASKETBALL_DEFENSE_PLAYER_OBJECT) {
        restoreDataPropertiesOnBasketballDefensePlayerObject(objectToRestore)
    }

    // If the object is NOT a player object...
    else {

        // If it's a group of objects, restore each child object separately (recursive)...
        if (objectToRestore.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP || objectToRestore.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
            var objectsToRestore = objectToRestore.children;
            for (var i = 0; i < objectsToRestore.length; i++) {
                restoreDataPropertiesOnObject(objectsToRestore[i])
            }
        }

        // If it's a single object...
        else {

            // If this is a text_box object, we need to force the text re-draw for some reason.
            if (objectToRestore.data.fdpbType == Factory.fdpbTypes.TEXT_BOX) {
                updateTextBox(objectToRestore);; //to force text redraw
            }

            // Make the restored object selectable.
            makeItemSelectable(objectToRestore)
        }
    }
}


/**
 * Restore the data properties on a basketball defense player object.
 */
function restoreDataPropertiesOnBasketballDefensePlayerObject(basketballDefensePlayerObject)
{
    addSentryBreadcrumb('Restoring data properties on a basketball defensive player object.')

    // Restore the player symbol properties.
    var basketballDefensePlayerSymbol = basketballDefensePlayerObject.getItem({
        data: {
            fdpbType: Factory.fdpbTypes.BASKETBALL_DEFENSE_PLAYER_SYMBOL
        }
    });
    basketballDefensePlayerObject.playerSymbol = basketballDefensePlayerSymbol

    // Force re-draw the player symbol.
    updatePlayerSymbolShapeAndText(basketballDefensePlayerSymbol)

    // Make the player symbol selectable.
    makeItemSelectable(basketballDefensePlayerSymbol)
}


/**
 * Restore the necessary properties on the specified player object.
 */
function restoreDataPropertiesOnPlayerObject(playerObject = null)
{
    if (!playerObject) {
        addSentryMessage('No player object to restore properties on.')
        return
    }

    // Add the routesGroup item to the playerObject as a named child.
    var routesGroup = playerObject.getItem({
        data: {
            groupName: 'routesGroup'
        }
    });
    routesGroup.name = 'routesGroup' // Make sure the group is named properly
    playerObject.routesGroup = routesGroup

    // Add the handlesGroup item to the playerObject as a named child.
    var handlesGroup = playerObject.getItem({
        data: {
            groupName: 'handlesGroup'
        }
    });
    handlesGroup.name = 'handlesGroup'
    playerObject.handlesGroup = handlesGroup // Make sure the group is named properly
    handlesGroup.removeChildren()

    // Add the knobsGroup item to the playerObject as a named child.
    var knobsGroup = playerObject.getItem({
        data: {
            groupName: 'knobsGroup'
        }
    });
    knobsGroup.name = 'knobsGroup' // Make sure the group is named properly
    playerObject.knobsGroup = knobsGroup

    // Add the insertsGroup item to the playerObject as a named child.
    var insertsGroup = playerObject.getItem({
        data: {
            groupName: 'insertsGroup'
        }
    });
    insertsGroup.name = 'insertsGroup' // Make sure the group is named properly
    playerObject.insertsGroup = insertsGroup

    // Add the endSymbolsGroup item to the playerObject as a named child.
    var endSymbolsGroup = playerObject.getItem({
        data: {
            groupName: 'endSymbolsGroup'
        }
    });
    endSymbolsGroup.name = 'endSymbolsGroup' // Make sure the group is named properly
    playerObject.endSymbolsGroup = endSymbolsGroup

    // Add the playerSymbol item to the playerObject as a named child.
    var playerSymbol = playerObject.getItem({
        data: {
            fdpbType: Factory.fdpbTypes.PLAYER_SYMBOL
        }
    });

    // If player symbol is empty somehow, remove it from the canvas.
    if (!playerSymbol) {
        //addSentryBreadcrumb('Player symbol is empty. Deleting it now...', 'warning')
        addSentryMessage('No player symbol found when restoring data properties on the object. Deleting player object now.')
        deleteItem(playerObject)
        return
    }

    playerObject.playerSymbol = playerSymbol

    // Force re-draw the player symbol.
    updatePlayerSymbolShapeAndText(playerSymbol)

    // Make the player symbol selectable.
    makeItemSelectable(playerSymbol)

    // Add handlers to player symbol.
    playerSymbol.onDoubleClick = onDoubleClickPlayerSymbol;
    for (var j = 0; j < routesGroup.children.length; j++) {
        var route = routesGroup.children[j];
        route.path = route.firstChild;
    }

    // Restore knob properties.
    restoreKnobPropertiesOnPlayerObject(playerObject)

    // Restore end symbol properties.
    restoreEndSymbolPropertiesOnPlayerObject(playerObject)

    // Restore insert group properties.
    restoreInsertGroupPropertiesOnPlayerObject(playerObject)

    // Restore routes group properties.
    restoreRoutesGroupPropertiesOnPlayerObject(playerObject)
}

/**
 * Restore the end symbol properties on the player object.
 */
function restoreEndSymbolPropertiesOnPlayerObject(playerObject = null)
{
    for (var k = 0; k < playerObject.endSymbolsGroup.children.length; k++) {

        var endSymbol = playerObject.endSymbolsGroup.children[k]

        /* Hack fix for missing indices */
        if (!endSymbol.data.routeIndex) {
            endSymbol.data.routeIndex = 0
        }

        var route = playerObject.routesGroup.children[endSymbol.data.routeIndex]

        /* Hack fix for missing indices */
        if (!endSymbol.data.curveIndex) {
            endSymbol.data.curveIndex = 0
        }

        var curve = route.path.curves[endSymbol.data.curveIndex]

        curve.endSymbol = endSymbol
        endSymbol.curve = curve
        endSymbol.route = route

        /* Add the curve's segment knob to the route. If the knob doesn't exist for some reason, create a new one now. */
        if (!curve.segment2.knob) {
            var segmentKnob = createKnobObject(route)
            playerObject.knobsGroup.addChild(segmentKnob)
        } else {
            var segmentKnob = curve.segment2.knob
        }

        var shape = endSymbol.getItem({
            name: /^shape/
        })
        endSymbol.shape = shape
        endSymbol.knob = segmentKnob
        endSymbol.onDoubleClick = onDoubleClickEndSymbol
        makeItemSelectable(endSymbol)
    }
}


/**
 * Restore the insert group properties on the player object.
 */
function restoreInsertGroupPropertiesOnPlayerObject(playerObject = null)
{
    for (var k = 0; k < playerObject.insertsGroup.children.length; k++) {
        var insert = playerObject.insertsGroup.children[k]

        /* Hack fix for missing indices */
        if (!insert.data.routeIndex) {
            insert.data.routeIndex = 0
        }

        var route = playerObject.routesGroup.children[insert.data.routeIndex]

        /* Hack fix for missing indices */
        if (!insert.data.curveIndex) {
            insert.data.curveIndex = 0
        }

        var curve = route.path.curves[insert.data.curveIndex]
        insert.curve = curve;
        var shape = insert.getItem({
            name: /^shape/
        });
        insert.shape = shape;
        insert.curveOffset = insert.data.curveOffset
        insert.curve = curve
        insert.route = route;

        makeItemSelectable(insert);
    }
}


/**
 * Restore the knob properties on a player object.
 */
function restoreKnobPropertiesOnPlayerObject(playerObject = null)
{
    for (var p = 0; p < playerObject.knobsGroup.children.length; p++) {

        var knob = playerObject.knobsGroup.children[p]

        /* Hack fix for missing indices */
        if (!knob.data.routeIndex) {
            knob.data.routeIndex = 0
        }

        var route = playerObject.routesGroup.children[knob.data.routeIndex]

        /* Hack fix for missing indices */
        if (!knob.data.segmentIndex) {
            knob.data.segmentIndex = 0
        }

        var segment = route.path.segments[knob.data.segmentIndex]

        makeItemSelectable(knob)

        segment.knob = knob
        knob.segment = segment

        var curve = route.path.curves[knob.data.curveIndex]
        knob.curve = curve
        knob.route = route

        if (knob.data.knobType == 'CURVE') {
            if (curve) {
                curve.knob = knob
                addBezierIndicatorLinesToCurveKnob(knob, playerObject)
            }
        }

    }
}


/**
 * Restore the routes group properties on the player object.
 */
function restoreRoutesGroupPropertiesOnPlayerObject(playerObject = null)
{
    for (var j = 0; j < playerObject.routesGroup.children.length; j++) {

        var route = playerObject.routesGroup.children[j];

        var displayPathsGroup = route.getItem({
            data: {
                groupName: 'displayPathsGroup'
            }
        });
        displayPathsGroup.onMouseDown = onMouseDownPath;
        if (!displayPathsGroup) {
            throw (route)
        }
        route.displayPathsGroup = displayPathsGroup

        displayPathsGroup.removeChildren();
        for (var k = 0; k < route.path.curves.length; k++) {
            var curve = route.path.curves[k]
            var displayPath = new Path.Line(curve.point1, curve.point2);
            route.displayPathsGroup.addChild(displayPath);
        }

        var displayCornersGroup = route.getItem({
            data: {
                groupName: 'displayCornersGroup'
            }
        });
        route.displayCornersGroup = displayCornersGroup
        displayCornersGroup.removeChildren();
        for (var k = 0; k < route.path.curves.length; k++) {
            var curve = route.path.curves[k]

            //var lineStyle = curve.data.customStyle;
            //var displayCorner = createRouteCorner(lineStyle);
            var displayCorner = new Group();
            /// displayCorner.position = curve.point2;
            //var displayCorner = new Path.Line(curve.point2, curve.point2);
            //var displayCorner = new Path.Circle(curve.point2,2);

            route.displayCornersGroup.addChild(displayCorner);
        }
        //style it
        redrawPlayerRoutePaths(route);
    }

}

/**
 * Push the current main layer to our undo stack.
 */
function pushMainLayerToUndoStack()
{
    // @TODO - I think we can probably remove this, don't think it's necessary anymore.
    setLineOfScrimmageDataPropertiesOnMainLayer()

    setDataPropertiesOnAllPlayerObjects()

    var mainLayer = getLayerByName('MAIN_LAYER')
    var undoable = mainLayer.clone(false, true) // Clone the main layer and all of its children, but don't insert it into the scene graph

    // Add the cloned layer to the undo stack
    undoStack[paper.project.index].push(undoable)

    // If the stack has more than 100 items, remove the first element from the stack, since it's the oldest and least relevant.
    if (undoStack[paper.project.index].length > 100) {
        undoStack[paper.project.index].shift()
    }

    // Clear the redo stack
    redoStack[paper.project.index] = []
}


/**
 * Select the active route.
 */
function selectActiveRoute()
{
    if (!activeRoute) {
        if (activeItem && activeItem.route) {
            setActiveRoute(activeItem.route)
        }
    }

    console.log("Selected curves",selectedCurves)

    //knob has already been selected by a singleClick so
    if (activeRoute) {
        selectedCurves = activeRoute.path.curves
        selectAllCurvesInSelectedCurvesArray()
    }

    else {
        addSentryMessage('No active route found when trying to select the active route.')
    }
}


/**
 * Select an additional item. Not sure why this is necessary.
 */
function selectAdditionalItem(itemToSelect)
{
    var rootPlayerObject = getParentPlayerObjectFromChild(itemToSelect)
    if (rootPlayerObject) itemToSelect = rootPlayerObject;

    if (itemToSelect.parent.name != "MAIN_LAYER") {
        window.engineDebug("parent not main layer", itemToSelect.parent.name);
        //new object is part oof a group so dont add
        return;

    }
    if (itemToSelect.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
        window.engineDebug("new object is a multiselection so dont add", itemToSelect.data.fdpbType);
        //new object is a multiselection so dont add
        return;
    }

    if (itemToSelect.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        //new object is a group so dont add
        return;
    }

    if (activeItem.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
        window.engineDebug(">>> adding to MULTISELECTION")
        activeItem.addChild(itemToSelect)
        selectAllCurvesInMultiSelect(activeItem)
        //updateActiveItemSelection()
        // selectItem(activeItem);  DOES NOTHING CUZ ALREADY SELECTED
    } else {
        window.engineDebug("creating MULTISELECTION");
        convertItemsToMultiSelectionGroup([itemToSelect, activeItem], true);
    }

    updateSelector(itemToSelect, 'persistent_selector')
}


/**
 * Select all of curves on player objects within a multiselection object.
 */
function selectAllCurvesInMultiSelect(item)
{
    resetSelectedCurvesArray()

    for (var i = 0; i < item.children.length; i++) {
        var subItem = item.children[i]
        if (subItem.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
            // Get all of the player object's curves and add them to the selected curves array.
            var playerObjectCurves = getAllPlayerObjectCurves(subItem)
            selectedCurves = selectedCurves.concat(playerObjectCurves)
        }
    }
}


/**
 * Select all of the curves (straight/curved lines) associated with the specified player object.
 */
function selectAllPlayerObjectCurves(playerObject)
{
    // Why is the selection showing up when saving the play?
    resetSelectedCurvesArray()
    selectedCurves = getAllPlayerObjectCurves(playerObject)

    // Update all selected curve lines
    selectAllCurvesInSelectedCurvesArray()

    // Show all knobs associated with this player object.
    showPlayerObjectKnobs(playerObject)
}


/**
 * Process everything that needs to happen when an item is selected.
 */
function selectItem(itemToSelect = null)
{
    console.log("Item to select>>",itemToSelect)
    // If the item is already selected or there is no item to select, we can exit now.
    if (activeItem == itemToSelect) {
        return
    }

    // If the active item is a multi-selection and the user is selecting an item within the multi-selection, we need to reset the itemToSelect to the entire multi-selection.
    if (activeItem) {
        if (activeItem.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
            if (itemToSelect.isDescendant(activeItem)) {
                //selected item is pat of a multiselection
                window.engineDebug("- part of a multiselection")
                itemToSelect = activeItem
            }
        }
    }

    // If there is no item to select by now, we can exit.
    if (!itemToSelect) {
        addSentryBreadcrumb('No item to select found.', 'warning')
        addSentryMessage('No item found when trying to select a selectable item.')
        return
    }

    // Deselect all curves on the canvas.
    deselectAllCurves()

    /* Hide any player object knobs currently showing. */
    if (activePlayerObject) {
        hidePlayerObjectKnobs(activePlayerObject)
    }

    /* Clear the highlight layer. */
    clearLayer(getLayerByName('HIGHLIGHT_LAYER'))

    /* Disband all multi-selections except the item to select. */
    disbandAllMultiSelectionObjects(itemToSelect)

    /* Set the active item. */
    setActiveItem(itemToSelect)

    /* Set the active route. */
    setActiveRoute(activeItem.route) // will be null if item to select is not a route based item, which is correct

    switch (activeItem.data.fdpbType) {

        case Factory.fdpbTypes.PLAYER_SYMBOL:

            setActivePlayerObject(activeItem) // Set the active player object to the one attached to the symbol

            // Show all curve knobs on the player's route.
            showPlayerObjectKnobs(activePlayerObject)

            //playerStyle = Object.assign({}, activeItem.data.customStyle); //style

            break

        case Factory.fdpbTypes.TEXT_BOX:

            textStyle = Object.assign({}, activeItem.data.customStyle) //style
            textBox = document.getElementById('textBoxEditor')
            textBox.value = activeItem.data.customStyle.text

            break

        case Factory.fdpbTypes.KNOB:

            /* If the selected knob doesn't have a curve attached to it, let's delete the knob and do nothing else. */
            if (!activeItem.curve) {
                deleteItem(activeItem)
                return
            }

            else {

                if (activeItem.curve.path) {
                    selectedCurves = [activeItem.curve]
                    console.log("Curve path",activeItem.curve.path)

                    var selectedCurve = selectedCurves[0]
                    var route = selectedCurve.path.parent
                    console.log("Route>>",route)
                    var customStyle = Object.assign({}, route.data.customStyles[selectedCurve.index]) //style
                    lineStyle = Object.assign({}, customStyle)

                    selectAllCurvesInSelectedCurvesArray()
                }

            }

            break

        case Factory.fdpbTypes.LINE_OF_SCRIMMAGE:

            lineOfScrimmage.strokeColor = Factory.colorDefs.SELECTION
            break

        case Factory.fdpbTypes.MULTISELECTION:

            // Update every selector in the multiselection.
            for (var i = 0; i < activeItem.children.length; i++) {
                updateSelector(activeItem.children[i], 'persistent_selector', false) // False bc we don't want to clear persistent selection layer
            }

            //resetStylesToFactoryDefaults()
            break

        case Factory.fdpbTypes.FDPB_GROUP:

            // Update every selector in the group.
            for (var i = 0; i < activeItem.children.length; i++) {
                updateSelector(activeItem.children[i], 'persistent_selector', false) // False bc we don't want to clear persistent selection layer
            }

            //resetStylesToFactoryDefaults()
            break
        default:
    }

    // Now update the selector shape for the active item.
    updateSelector(activeItem, 'persistent_selector')

    // Activate the parent player object if necessary (will do nothing if it's not a parent player object?)
    activateParentPlayerObject(activeItem)

    setSmartGuidesOnItem(itemToSelect)

    // Now open the PlayEditor tab that best corresponds to the selected item.
    updatePlayEditorSelectionArray(activeItem)

    return
}


/**
 * Send the active playbook object to the back.
 */
function sendItemToBack(event)
{
    /* No active item to send back. */
    if (!activeItem) {
        return
    }

    /* If selected itm is a player symbol or knob, send the entire player object backward. */
    if (activeItem.data.fdpbType == Factory.fdpbTypes.PLAYER_SYMBOL || activeItem.data.fdpbType == Factory.fdpbTypes.KNOB) {
        var playerObject = getParentPlayerObjectFromChild(activeItem)
        if (playerObject) {
            playerObject.sendToBack()
        } else {
            addSentryBreadcrumb('No player object to send backward.', 'warning')
        }
    }

    /* If the selected item is part of a multiselection or group, get the parent item */
    else if (isObjectPartOfAGroup(activeItem)) {
        var parentObject = getParentGroupObject(activeItem)
        if (parentObject) {
            parentObject.sendToBack()
        } else {
            addSentryBreadcrumb('No group parent object to send backward.', 'warning')
        }
    }

    /* Send any other kinds of active items to the back. */
    else {
        activeItem.sendToBack()
    }

    pushMainLayerToUndoStack()
    showAllPlayerRouteCorners()
    updateAllPlayerRoutesOnLayer()
}


/**
 * Set the active item based on the given value.
 */
function setActiveItem(itemToMakeActive = null)
{
    activeItem = itemToMakeActive

    // Update the activeItem in PlayEditor
    // window.app.config.globalProperties.$playEditorRef.value.activeItem = activeItem
    window.app.config.globalProperties.$pinia.state._value.counter.activeItem = activeItem;
}


/**
 * Set the active player object based on the passed through child object.
 */
function setActivePlayerObject(childObject = null)
{
    if (childObject) {
        activePlayerObject = getParentPlayerObjectFromChild(childObject)
    } else {
        activePlayerObject = null
    }

    // Update the activePlayerObject in PlayEditor
    // window.app.config.globalProperties.$playEditorRef.value.activePlayerObject = activePlayerObject
    // window.app.config.globalProperties.$playEditorRef.value.activePlayerObject = activePlayerObject;
    window.app.config.globalProperties.$pinia.state._value.counter.activePlayerObject = activePlayerObject;
}


/**
 * Set the active route to the given value.
 */
function setActiveRoute(route = null)
{
    activeRoute = route
}


/**
 * Re-write data properties to all player objects.
 */
function setDataPropertiesOnAllPlayerObjects()
{
    //writes data to all player objects
    var playerObjects = getAllPlayerObjectsOnMainLayer()

    for (var i = 0; i < playerObjects.length; i++) {
        var playerObject = playerObjects[i]
        if (playerObject.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
            setDataPropertiesOnPlayerObject(playerObject)
        } else {
            // window.engineDebug(playerObject.data.fdpbType);
        }
    }
}


/**
 * Add necessary data properties to the specified player object.
 */
function setDataPropertiesOnPlayerObject(playerObject)
{
    // If player object has no player symbol, exit now.
    if (!playerObject.playerSymbol) {
        addSentryMessage('No player symbol found when setting data properties on player object.')
        return
    }

    var knobsGroup = playerObject.knobsGroup
    var insertsGroup = playerObject.insertsGroup
    var endSymbolsGroup = playerObject.endSymbolsGroup
    var routesGroup = playerObject.routesGroup

    // window.engineDebug("routesGroup.children.length " + routesGroup.children.length)
    // window.engineDebug(playerObject)

    for (var j = 0; j < routesGroup.children.length; j++) {
        //need to define all paths before knobs
        var route = routesGroup.children[j]
        //copy to remove references
        //route.data.customStyles = route.data.customStyles.slice(0);
        route.data = duplicateObjectViaJson(route.data)
    }
    //  window.engineDebug("knobsGroup.children.length " + knobsGroup.children.length)
    for (var p = 0; p < knobsGroup.children.length; p++) {
        var knob = knobsGroup.children[p]
        setDataPropertiesOnKnob(knob)
    }
    for (var k = 0; k < endSymbolsGroup.children.length; k++) {
        var endSymbol = endSymbolsGroup.children[k]
        setDataPropertiesOnEndSymbol(endSymbol)
    }

    for (var k = 0; k < insertsGroup.children.length; k++) {
        var insert = insertsGroup.children[k]
        setDataPropertiesOnLineInsert(insert)
    }
}


/**
 * Add necessary data properties to the specified end symbol object.
 */
function setDataPropertiesOnEndSymbol(endSymbol)
{
    if (endSymbol.data && endSymbol.route) {
        endSymbol.data.routeIndex = endSymbol.route.index
    } else {
        endSymbol.data.routeIndex = 0
    }

    if (endSymbol.data && endSymbol.curve) {
        endSymbol.data.curveIndex = endSymbol.curve.index
    } else {
        endSymbol.data.curveIndex = 0
    }
}


/**
 * Add necessary data properties to the specified line insert object.
 */
function setDataPropertiesOnLineInsert(insert)
{
    window.engineDebug('setDataPropertiesOnLineInsert', insert)
    insert.data.curveOffset = insert.curveOffset
    insert.data.curveIndex = insert.curve.index
    insert.data.routeIndex = insert.route.index
}


/**
 * Add necessary data properties to the specifed knob object.
 */
function setDataPropertiesOnKnob(knob)
{
    if (knob.curve) {
        knob.data.curveIndex = knob.curve.index
    }

    if (knob.route) {
        knob.data.routeIndex = knob.route.index
    }

    if (knob.segment) {
        knob.data.segmentIndex = knob.segment.index;
    }
}


/**
 * Add line of scrimmage properties to our main layer data.
 */
function setLineOfScrimmageDataPropertiesOnMainLayer()
{
    if (product == 'firstdown' && lineOfScrimmage) {
        var mainLayer = getLayerByName('MAIN_LAYER')
        mainLayer.data.LineOfScrimmagePosition = lineOfScrimmage.position.y
        mainLayer.data.LineOfScrimmageVisible = lineOfScrimmage.visible
    }
}



/**
 * Set the rotation of the specified item to the specified angle.
 */
function setRotationOfItem(item, angle)
{
    //because paper.js doesnt have absoluet rotation;
    if (!!!item.data.lastAngle) item.data.lastAngle = 0;
    var lastAngle = item.data.lastAngle;
    item.data.lastAngle = angle;
    item.rotation = angle - lastAngle;
}


/**
 * Set the product this script is being used on.
 */
function setProduct(productName = 'firstdown')
{
    product = productName
}


/**
 * Set the smart guides on the specified item.
 */
function setSmartGuidesOnItem(item)
{
    smartGuideLocs = []

    var mainLayer = getLayerByName('MAIN_LAYER')
    var mainLayerChildren = mainLayer.children;
    for (var i = 0; i < mainLayerChildren.length; i++) {
        var mainLayerChild = mainLayerChildren[i]
        if (item == mainLayerChild) continue;
        smartGuideLocs.push(mainLayerChild.position)
    }
}


/**
 * Show all player route corners.
 */
function showAllPlayerRouteCorners()
{
    var playerObjects = getAllPlayerObjectsOnMainLayer()
    for (var i = 0; i < playerObjects.length; i++) {
        playerObject = playerObjects[i];
        if (playerObject.routesGroup) {
            var routes = playerObject.routesGroup.children;
            for (var j = 0; j < routes.length; j++) {
                showRouteCorners(routes[j]);
            }
        }
    }
}


/**
 * Make the specified item visible on the canvas.
 */
function showItem(item)
{
    item.visible = true
}


/**
 * Show all knobs associated with the specified player object.
 */
function showPlayerObjectKnobs(playerObject)
{
    // If no player object, exit now.
    if (!playerObject) {
        addSentryBreadcrumb('No player object found to show knobs on.', 'warning')
        addSentryMessage('No player object found when trying to show player object knobs.')
        return
    }

    if (playerObject.knobsGroup) {
        playerObject.knobsGroup.children.forEach(function(child) {
            child.lastChild.lastChild.visible = true
        });
    }

    if (playerObject.handlesGroup) {
        playerObject.handlesGroup.visible = true
    }
}


/**
 * Show the route corners on the specified route.
 */
function showRouteCorners(route = null)
{
    if (!route) {
        addSentryMessage('No route to show route corners for.')
        return
    }

    if (!route.path) {
        addSentryMessage('No route path to show corners for.')
        return
    }

    if (!route.path.curves) {
        addSentryMessage('No route path curves to show corners for.')
        return
    }

    for (var i = 0; i < route.path.curves.length; i++) {
        getRouteCorner(route, i).visible = true;
    }
}


/**
 * Smart move the player objects to their next positions.
 */
function smartMovePlayers(playerObjects = [])
{
    var reorderedPlayerObjects = reorderBasketballPlayerObjects(playerObjects)

    for (var i = 0; i < reorderedPlayerObjects.length; i++) {

        if (reorderedPlayerObjects[i].routesGroup.children.length) {

            // We need to iterate through each route attached to this player object.
            var routes = reorderedPlayerObjects[i].routesGroup.children

            for (var r = 0; r < routes.length; r++) {

                // Get the route path
                var routePath = routes[r].path

                // Get the last point on the last curve of this path so that we know where to reposition the player if necesary.
                // Use the cloned point in case it moves, we don't want to follow it around or it will mess up the logic!
                var lastCurveEndPoint = routePath.lastCurve.point2.clone()

                // Get the style of the last curve's line to determine the kind of movement that needs to happen.
                var routeLineStyle = routes[r].data.customStyles[routePath.lastCurve.index].strokeStyle

                // Pass = Dotted
                if (routeLineStyle == 'Dotted') {
                    // A player who's passing does not move, so need to move the player here.
                    // But the ball should always end up at the end of the pass line after.
                    giveBallToPlayerClosestToPoint(lastCurveEndPoint, reorderedPlayerObjects)
                }

                // Run = Solid
                else if (routeLineStyle == 'Solid') {
                    // A player who's running never should never have the ball, so we don't need to move the ball here, just the player.
                    placePlayer(reorderedPlayerObjects[i], lastCurveEndPoint, false)
                }

                // Dribble = Zig Zag
                else if (routeLineStyle == 'Zig Zag') {

                    // A player who's dribbling should get moved to the end of the route, AND the ball should end up there as well (since dribblers always have the ball).
                    placePlayer(reorderedPlayerObjects[i], lastCurveEndPoint, false)

                    // If this is a handoff, we need to set the 3rd parameter in giveBallToPlayerClosestToPoint() to true.
                    if (routePath.lastCurve.endSymbol) {
                        thisCurveEndSymbol = routePath.lastCurve.endSymbol.data.symbolType
                        if (thisCurveEndSymbol == 'HAND_OFF') {
                            giveBallToPlayerClosestToPoint(lastCurveEndPoint, reorderedPlayerObjects, true)
                        }
                    }

                    // If this is NOT a handoff, we don't need to set the 3rd parameter to true.
                    else {
                        giveBallToPlayerClosestToPoint(lastCurveEndPoint, reorderedPlayerObjects)
                    }

                }

            }

            // Now we need to delete all routes associated with the player object so that a new movement can be added when the frame is built.
            reorderedPlayerObjects[i].routesGroup.removeChildren()
            reorderedPlayerObjects[i].knobsGroup.removeChildren()
            reorderedPlayerObjects[i].endSymbolsGroup.removeChildren()
            reorderedPlayerObjects[i].handlesGroup.removeChildren()
            reorderedPlayerObjects[i].insertsGroup.removeChildren()

        }

    }
}


/**
 * Snap the specified item to the grid.
 */
function snapItemToGrid(item, showGuides = false)
{
    var gridSize = 5;

    var guideLayer = getLayerByName('GUIDE_LAYER')
    clearLayer(guideLayer)

    if (item.data.fdpbType == Factory.fdpbTypes.PLAYER_SYMBOL) item = activePlayerObject;

    var itemCenter = item.position;
    var modX = itemCenter.x % gridSize
    var modY = itemCenter.y % gridSize
    var adjustment = new Point(0, 0)

    if (modX > gridSize / 2) adjustment.x = gridSize - modX;
    else adjustment.x = -modX;

    if (modY > gridSize / 2) adjustment.y = gridSize - modY;
    else adjustment.y = -modY;

    item.position = item.position + adjustment;
    itemLoc = item.position;

    // If we shouldn't show guides, exit now...
    if (!showGuides) {
        return
    }

    // If we should show guides...
    for (var i = 0; i < smartGuideLocs.length; i++) {

        if (smartGuideLocs[i].x == itemLoc.x) {
            var path = new Path.Line({
                from: [itemLoc.x, 0],
                to: [itemLoc.x, viewBoundsOnLoad.bottom],
                strokeColor: Factory.colorDefs.SELECTION,
                strokeWidth: .5
            });
            guideLayer.addChild(path);
            break;
        }
    }
    for (var i = 0; i < smartGuideLocs.length; i++) {

        if (smartGuideLocs[i].y == itemLoc.y) {
            var path = new Path.Line({
                from: [0, itemLoc.y],
                to: [viewBoundsOnLoad.right, itemLoc.y],
                strokeColor: Factory.colorDefs.SELECTION,
                strokeWidth: .5
            });
            guideLayer.addChild(path);
            break;
        }
    }
}


/**
 * Style the corner on a route.
 */
function styleRouteCorner(corner, curveStyle)
{
    window.engineDebug('styleRouteCorner')
    corner.removeChildren();

    var displayCorner = new Path.Circle(new Point(0, 0), curveStyle.strokeWidth / 2);
    displayCorner.style.fillColor = curveStyle.strokeColor;
    displayCorner.style.strokeWidth = 0;
    corner.addChild(displayCorner);
}


/**
 * Style all of the symbols on a player object.
 */
function setStylePropertiesOnPlayerObjectSymbols(playerObject = null)
{
    if (!playerObject) {
        addSentryMessage('No player object found when trying to set style properties on player object.')
        return
    }

    if (!playerObject.playerSymbol) {
        addSentryMessage('No player symbol found when trying to set style properties on player object.')
        return
    }

    var endSymbols = playerObject.endSymbolsGroup.children;
    var inserts = playerObject.insertsGroup.children;
    for (var i = 0; i < inserts.length; i++) {
        setStylePropertiesOnSymbol(inserts[i])
    }
    for (var i = 0; i < endSymbols.length; i++) {
        setStylePropertiesOnSymbol(endSymbols[i])
    }
}



/**
 * Style an endpoint or line insert symbol.
 */
function setStylePropertiesOnSymbol(symbol)
{
    if (!symbol) {
        addSentryMessage('No symbol to set style properties to.')
        return
    }

    if (!symbol.route) {
        addSentryMessage('No route attached to symbol.')
        return
    }

    if (!symbol.route.data) {
        addSentryMessage('No data attached to symbol\'s route.')
        return
    }

    if (!symbol.route.data.customStyles) {
        addSentryMessage('No custom styles found on the symbol\'s route.')
        return
    }

    if (!symbol.curve) {
        addSentryMessage('No curve attached to symbol.')
        return
    }

    var customStyle = symbol.route.data.customStyles[symbol.curve.index]

    if (!customStyle) {
        addSentryMessage('No custom style found when trying to set style properties on the symbol.')
        return
    }

    var shape = symbol.shape

    if (!shape) {
        addSentryMessage('No symbol shape found when trying to set style properties on the symbol.')
        return
    }

    shape.style.strokeColor = customStyle.strokeColor
    shape.style.strokeWidth = customStyle.strokeWidth
    //set in factory
    shape.style.strokeCap = shape.data.strokeCap
    if (shape.data.filled) {
        symbol.shape.style.fillColor = customStyle.strokeColor
    } else {
        symbol.shape.style.fillColor = null
    }
}


/**
 * Swap out a symbol.
 */
function swapSymbol(group, symbolType)
{
    group.symbolType = symbolType
    group.data.symbolType = symbolType

    group.shape.remove()
    group.shape = null

    var shape = drawSymbolShape(symbolType)
    shape.rotation = group.data.lastAngle
    shape.position = group.position

    group.addChild(shape)
    shape.sendToBack()

    group.shape = shape
    group.data.customStyle.symbolType = symbolType
    group.data.customStyle.strokeCap = shape.data.strokeCap

    return group
};


/**
 * Toggle the line of scrimmage.
 */
this.toggleLineOfScrimmage = function(value)
{
    var mainLayer = getLayerByName('MAIN_LAYER')
    mainLayer.data.LineOfScrimmageVisible = value
    lineOfScrimmage.visible = value
};


/**
 * Undo the last action taken.
 */
function undo()
{
    if (undoStack[paper.project.index].length == 0) return;

    setLineOfScrimmageDataPropertiesOnMainLayer()

    setDataPropertiesOnAllPlayerObjects()

    // Get the most recently added layer on the undoStock
    var layerState = undoStack[paper.project.index].pop()

    var mainLayer = getLayerByName('MAIN_LAYER')
    var mainLayerIndex = mainLayer.index

    var mainLayerReference = mainLayer
    mainLayer.remove()

    paper.project.insertLayer(mainLayerIndex, layerState)
    mainLayer = layerState

    redoStack[paper.project.index].push(mainLayerReference)

    restoreDataPropertiesOnAllMainLayerObjects()
}


/**
 * Ungroup the active item.
 */
function ungroupActiveItem()
{
    /* If there is no active item to ungroup, then exit now. */
    if (!activeItem) {
        return
    }

    convertGroupToMultiSelectionAndUpdateSelection(activeItem)
}


/**
 * Update all selectors on the active item.
 */
function updateActiveItemSelection()
{
    if (activeItem) {

        // If the active item is the line of scrimmage, we don't need to update the selector.
        if (activeItem.data.fdpbType == Factory.fdpbTypes.LINE_OF_SCRIMMAGE) {
            return
        }

        // Otherwise, just select the active item.
        selectItem(activeItem, 'persistent_selector')
    }

    //highlightMainLayerObjects()
    selectAllCurvesInSelectedCurvesArray()
}


/**
 * Update all player routes on the specified layer. If no layer is specified, we'll default to the main layer.
 */
function updateAllPlayerRoutesOnLayer(layerToUpdate = null)
{
    // If no layer is specified, update the main layer.
    if (!layerToUpdate) {
        layerToUpdate = getLayerByName('MAIN_LAYER')
    }

    var playerObjects = layerToUpdate.getItems({ data: { fdpbType: Factory.fdpbTypes.PLAYER_OBJECT } })

    for (var i = 0; i < playerObjects.length; i++) {

        var playerObject = playerObjects[i]

        // Only do this is the player object has a routes group attached to it...
        if (playerObject.routesGroup) {

            var routes = playerObject.routesGroup.children

            for (var j = 0; j < routes.length; j++) {

                var currentRoute = routes[j]

                //update style of route. If no route exists or no paths exist on the route, skip this iteration.
                if (!currentRoute || !currentRoute.path) {
                    continue
                }

                createDashesOnRoute(currentRoute)

                //test against all others
                for (var k = 0; k < playerObjects.length; k++) {

                    // What are we doing here?
                    var testPlayerObject = playerObjects[k]

                    if (testPlayerObject == playerObject) {
                        continue
                    }

                    if (testPlayerObject.isBelow(playerObject)) {
                        continue
                    }

                    // Make sure the test player object has a routes group
                    if (testPlayerObject.routesGroup) {

                        var testRoutes = testPlayerObject.routesGroup.children

                        for (var l = 0; l < testRoutes.length; l++) {
                            var testRoute = testRoutes[l]

                            if (!currentRoute.path) {
                                addSentryMessage('No path on the current route.')
                                continue
                            }

                            var intersectionLocations = currentRoute.path.getIntersections(testRoute.path);

                            for (var m = 0; m < intersectionLocations.length; m++) {
                                var curveLoc = intersectionLocations[m];
                                var offset = curveLoc.curveOffset;
                                var displayPath = getRoutePath(currentRoute, curveLoc.curve.index)
                                var gapSize = 16

                                if (displayPath && displayPath.curves.length > 1) {
                                    //Zig
                                    offset = displayPath.getNearestLocation(curveLoc.point).offset;
                                }
                                if (offset < gapSize / 2) {
                                    //at beginning of segment
                                    if (curveLoc.curve.index > 0) {
                                        var previousDisplayPath = getRoutePath(currentRoute, curveLoc.curve.index - 1);
                                        var extraGapSize = gapSize / 2 - offset;
                                        var gap = [previousDisplayPath.length - extraGapSize, previousDisplayPath.length];
                                        removeGapFromPath(gap, previousDisplayPath)
                                        getRouteCorner(currentRoute, curveLoc.curve.index - 1).visible = false;
                                    }
                                }
                                if (offset > displayPath.length - gapSize / 2) {
                                    //at end of segment
                                    var nextDisplayPath = getRoutePath(currentRoute, curveLoc.curve.index + 1);
                                    if (nextDisplayPath) {
                                        var extraGapSize = gapSize / 2 - (displayPath.length - offset)
                                        var gap = [0, extraGapSize];
                                        removeGapFromPath(gap, nextDisplayPath)
                                        var corner = getRouteCorner(currentRoute, curveLoc.curve.index)
                                        if (corner) corner.visible = false;
                                    }
                                }
                                //compensate for path being zigged?
                                var gap = [offset - gapSize / 2, offset + gapSize / 2]
                                removeGapFromPath(gap, displayPath)
                            }
                        }
                    }
                }
            }

        }

        removeAllLineInsertGapsFromPlayerObject(playerObject);
    }
}


/**
 * Update the view on all projects.
 */
function updateAllProjectViews()
{
    for (var i = 0; i < paper.projects.length; i++) {
        paper.projects[i].view.update()
    }
}


/**
 * Select all of the curves in our selected curves array and add them to the persistent selection layer.
 */
function selectAllCurvesInSelectedCurvesArray()
{
    //view.update();

    var mainLayer = getLayerByName('MAIN_LAYER')
    var persistentSelectionLayer = getLayerByName('PERSISTENT_SELECTION_LAYER')

    if (persistentSelectionLayer) {

        persistentSelectionLayer.activate()

        for (var i = 0; i < selectedCurves.length; i++) {

            var selectedCurve = selectedCurves[i]

            var lineIndicator = new Path.Line(new Point(0, 0), new Point(0, 0))
            lineIndicator.strokeColor = Factory.colorDefs.SELECTION
            lineIndicator.fillColor = null
            lineIndicator.strokeWidth = 12

            var lineIndicatorCurve = lineIndicator.firstCurve

            // Select the line's end knob as well
            var selectedKnob = selectedCurve.segment2.knob
            var knobSelector = getUpdatedSelectorShape(selectedKnob, 'persistent_selector', false)
            persistentSelectionLayer.addChild(knobSelector)

            //make gap at start of selection path if needed
            var displayPath = getRoutePath(selectedCurve.path.parent, selectedCurve.index)
            //window.engineDebug( "displayPath",displayPath);
            // window.engineDebug( "displayPath.dashArray ",displayPath.dashArray )
            if (displayPath.dashArray[0] == 0) {
                // window.engineDebug("displayPath.dashArray[0] ==0");
                var dashArray = [0]
                //copies display path gap
                dashArray.push(displayPath.dashArray[1])
                dashArray.push(2000)
                lineIndicator.dashArray = dashArray
            }

            lineIndicatorCurve.point1 = selectedCurve.point1
            lineIndicatorCurve.point2 = selectedCurve.point2

            if (selectedCurve.hasHandles()) {
                lineIndicatorCurve.handle1 = selectedCurve.handle1
                lineIndicatorCurve.handle2 = selectedCurve.handle2
                //has curve
                //var bezierKnobIndicator = createUIElement(Factory.uiElementTypes.CURVE_KNOB_SELECTOR)
                //bezierKnobIndicator.position = selectedCurve.knob.position
            } else {
                lineIndicatorCurve.handle1 = null
                lineIndicatorCurve.handle2 = null
            }
        }

    }

    if (mainLayer) {
        mainLayer.activate()
    }
}


/**
 * When user updates the line endpoint.
 */
function updateLineEndPoint(symbolName)
{
    if (selectedCurves.length == 0) return;
    pushMainLayerToUndoStack()
    if (symbolName == "NONE") {
        deleteEndSymbol()
        redrawPlayerRoute(activePlayerObject);
        updateAllPlayerRoutesOnLayer()
        return;
    }
    defaultEndSymbolType = symbolName
    for (var i = 0; i < selectedCurves.length; i++) {
        var selectedCurve = selectedCurves[i];
        if (selectedCurve.isLast() || selectedCurves.length == 1) {
            if (!!!selectedCurve.endSymbol) {
                var endSymbol = drawEndSymbolOnCurve(selectedCurve)
                //endSymbol.knob.visible = false;
                endSymbol.knob.opacity = 0; //for grouping bug
            } else {
                swapSymbol(selectedCurve.endSymbol, defaultEndSymbolType)
                setStylePropertiesOnSymbol(selectedCurve.endSymbol)
            }
        }
    }
    redrawPlayerRoute(activePlayerObject);
    updateAllPlayerRoutesOnLayer()
}


/**
 * When user updates the line insert.
 */
function updateLineInsertStyle(event)
{
    ///adds insert ot swaps insert

    var insertType = event.target.id;

    if (!!!activeItem) {
        createLineInsert(insertType)
    } else {

        if (activeItem.data.fdpbType == Factory.fdpbTypes.INSERT_SYMBOL) {
            pushMainLayerToUndoStack()
            swapSymbol(activeItem, insertType)
            setStylePropertiesOnSymbol(activeItem)
        } else {
            createLineInsert(insertType)
        }
    }
    updateAllPlayerRoutesOnLayer()
}


/**
 * Update the specified item within the play editor selection array (or add it if it doesn't exist).
 */
function updatePlayEditorSelectionArray(item = null)
{
    var selection = []

    if (item) {
        addStyledCurvesToArray(selectedCurves, selection);
        switch (item.data.fdpbType) {
            case Factory.fdpbTypes.FDPB_GROUP:
            case Factory.fdpbTypes.MULTISELECTION:

                for (var i = 0; i < item.children.length; i++) {
                    var subItem = item.children[i]
                    if (subItem.data.fdpbType == Factory.fdpbTypes.PLAYER_OBJECT) {
                        var allCurves = [], speed = null;

                        if (subItem.routesGroup) {
                            var routes = subItem.routesGroup.children;
                            for (var j = 0; j < routes.length; j++) {
                                var curves = routes[j].path.curves;
                                allCurves = selectedCurves.concat(curves)
                            }
                            addStyledCurvesToArray(allCurves, selection)
                        }

                        addStyledLineInsertToArray(subItem, selection)
                        addStyledEndSymbolToArray(subItem, selection)

                        if(subItem?.speed){
                            speed = subItem.speed;
                        }

                        if (subItem.playerSymbol) {
                            addStyledItemToArray(subItem.playerSymbol, selection, speed )
                        }
                    } else {
                        addStyledItemToArray(subItem, selection)
                    }

                }

                break;
            case Factory.fdpbTypes.KNOB:
                //knobs have no style so
                break;
            default:
                var speed = null;
                if(item.data.fdpbType === Factory.fdpbTypes.PLAYER_SYMBOL){
                    const activePlayerObject = getParentPlayerObjectFromChild(item)
                    if(activePlayerObject.data.fdpbType === Factory.fdpbTypes.PLAYER_OBJECT){
                        speed = activePlayerObject.data?.speed ? activePlayerObject.data.speed : null;
                    }
                }
                addStyledItemToArray(item, selection, speed)
        }
    }

    // Pass the selection to PlayEngine UI
    // window.app.config.globalProperties.$playEditorRef.value.selectionArray = selection;
    console.log("Selection",selection)
    window.app.config.globalProperties.$pinia.state._value.counter.selectionArray = selection;
}


/**
 * When user changes the player size.
 */
function updatePlayerSize(playerSizeObject)
{
    applyPlayerStyle(activeItem, "fontSize", playerSizeObject.fontSize)
    applyPlayerStyle(activeItem, "playerShapeWidth", playerSizeObject.playerShapeWidth)
    applyPlayerStyle(activeItem, "playerShapeHeight", playerSizeObject.playerShapeHeight)

    // If a single player is selected, re-draw proportional end points for just that player...
    if (activePlayerObject) {
        if (activePlayerObject.endSymbolsGroup.children.length > 0) {
            swapSymbol(activePlayerObject.endSymbolsGroup.children[0], activePlayerObject.endSymbolsGroup.children[0].data.symbolType)
            setStylePropertiesOnSymbol(activePlayerObject.endSymbolsGroup.children[0])
        }
    }

    else if (activeItem && activeItem.data.fdpbType == 'MULTISELECTION') {
        activeItem.children.forEach(function(child) {
            if (child.endSymbolsGroup.children.length > 0) {
                swapSymbol(child.endSymbolsGroup.children[0], child.endSymbolsGroup.children[0].data.symbolType)
                setStylePropertiesOnSymbol(child.endSymbolsGroup.children[0])
            }
        })
    }
}


/**
 * Update the player symbol.
 */
function updatePlayerSymbolShapeAndText(playerSymbol = null)
{
    if (!playerSymbol) {
        addSentryMessage('No player symbol passed through to update.')
        return
    }

    // First update the player symbol shape.
    updatePlayerSymbolShape(playerSymbol)

    // Now update the player symbol text.
    updatePlayerSymbolText(playerSymbol)
}


/**
 * Update the shape for the player symbol.
 */
function updatePlayerSymbolShape(playerSymbol = null, isDefaultPlayerSymbol = false)
{
    if (!playerSymbol) {
        addSentryMessage('No player symbol shape passed through to update.')
        return
    }

    if (!playerSymbol.children) {
        addSentryMessage('No player symbol children found when trying to update player symbol shape.')
        return
    }

    var shapeGroup = playerSymbol.children[1]
    shapeGroup.removeChildren()

    var originalPlayerStyle = playerSymbol.data.customStyle

    // Update our custom style with any missing properties.
    var newPlayerStyle = addPlayerShapeWidthAndHeightToV2Players(originalPlayerStyle)

    var fillShape = drawPlayerShape(newPlayerStyle)
    shapeGroup.addChild(fillShape)

    var shadowShape
    if (newPlayerStyle.shadowStyle != "NONE" && newPlayerStyle.shapeType != "NONE") {
        shadowShape = createPlayerShading(playerSymbol)
        shapeGroup.addChild(shadowShape)
    }

    var strokeShape = drawPlayerShape(newPlayerStyle)
    strokeShape.strokeJoin = 'miter'
    strokeShape.strokeWidth = newPlayerStyle.strokeWidth
    strokeShape.fillColor = newPlayerStyle.fillColor ? newPlayerStyle.fillColor : null
    strokeShape.strokeColor = newPlayerStyle.strokeColor

    if (newPlayerStyle.strokeStyle == 'Dashed') {
        strokeShape.strokeCap = 'butt'

        applyDashesCount(strokeShape, 4, 8);
        // strokeShape.dashOffset= strokeShape.dashArray[0];
    } else if (newPlayerStyle.strokeStyle == 'Dotted') {
        strokeShape.strokeCap = 'butt'

        // applyEquidistantDashes(strokeShape,8,8);
        applyDashesCount(strokeShape, 7, 10);
        // strokeShape.dashOffset= strokeShape.dashArray[0];
    } else {
        strokeShape.strokeCap = 'round'
        strokeShape.dashArray = null
    }

    shapeGroup.addChild(strokeShape)

    if (newPlayerStyle.strokeColor == "NONE") {
        strokeShape.visible = false
    }
    else {
        strokeShape.visible = true
    }

    // Position all of the shapes
    fillShape.position = playerSymbol.position
    strokeShape.position = playerSymbol.position

    if (shadowShape) {
        shadowShape.position = playerSymbol.position
        shadowShape.bringToFront() // Bring shadow shape to the front of the player.
    }
    //  playerSymbol.style = Object.assign({},playerSymbol.data.customStyle);
}

/**
 * Update the shape for the player symbol.
 */
function updatePresentationSymbolShape(presentationSymbol = null, isDefaultPlayerSymbol = false)
{
    if (!presentationSymbol) {
        addSentryMessage('No presentation symbol shape passed through to update.')
        return
    }

    if (!presentationSymbol.children) {
        addSentryMessage('No presentation symbol children found when trying to update presentation symbol shape.')
        return
    }

    var shapeGroup = presentationSymbol.children[0]
    shapeGroup.removeChildren()

    var originalPresentationStyle = presentationSymbol.data.customStyle

    // Update our custom style with any missing properties.
    var newPresentationStyle = addPlayerShapeWidthAndHeightToV2Players(originalPresentationStyle)

    var fillShape = drawPlayerShape(newPresentationStyle, 'PRESENTATION_LAYER')
    shapeGroup.addChild(fillShape)

    var strokeShape = drawPlayerShape(newPresentationStyle, 'PRESENTATION_LAYER')
    strokeShape.strokeJoin = 'miter'
    strokeShape.strokeWidth = newPresentationStyle.strokeWidth
    // strokeShape.fillColor = newPresentationStyle.fillColor ? newPresentationStyle.fillColor : null
    strokeShape.fillColor = '#ff0000'
    strokeShape.strokeColor = newPresentationStyle.strokeColor

    if (newPresentationStyle.strokeStyle == 'Dashed') {
        strokeShape.strokeCap = 'butt'

        applyDashesCount(strokeShape, 4, 8);
        // strokeShape.dashOffset= strokeShape.dashArray[0];
    } else if (newPresentationStyle.strokeStyle == 'Dotted') {
        strokeShape.strokeCap = 'butt'

        // applyEquidistantDashes(strokeShape,8,8);
        applyDashesCount(strokeShape, 7, 10);
        // strokeShape.dashOffset= strokeShape.dashArray[0];
    } else {
        strokeShape.strokeCap = 'round'
        strokeShape.dashArray = null
    }

    shapeGroup.addChild(strokeShape)

    if (newPresentationStyle.strokeColor == "NONE") {
        strokeShape.visible = false
    }
    else {
        strokeShape.visible = true
    }

    // Position all of the shapes
    fillShape.position = presentationSymbol.position
    strokeShape.position = presentationSymbol.position

    //  playerSymbol.style = Object.assign({},playerSymbol.data.customStyle);
}


/**
 * Update player symbol text.
 */
function updatePlayerSymbolText(playerSymbol = null)
{
    // If there is no player symbol, exit now.
    if (!playerSymbol) {
        addSentryMessage('No player symbol found when trying to update player symbol text.')
        return
    }

    var textGroup = playerSymbol.lastChild
    var style = playerSymbol.data.customStyle
    textGroup.removeChildren()
    var text = new PointText()

    text.strokeWidth = 0
    text.justification = 'center'
    text.fillColor = style.textColor
    text.content = style.text
    //for some reason empty text messes up strokebounds of parent, so make it a space/spaces
    if (text.content == '') text.content = " "
    text.fontFamily = style.fontFamily
    text.fontSize = style.fontSize
    text.fontWeight = style.fontWeight
    var h = text.bounds.height / 2 + 2
    //special case for triangle
    if (playerSymbol.data.customStyle.shapeType == Factory.shapeTypes.TRIANGLE) {
        if (style.fontSize < 20) {
            h = 30
        } else {
            h = 50
        }
    }
    text.pivot = new Point(0, -(h / 2))
    text.position = playerSymbol.position
    textGroup.addChild(text)
}


/**
 * Redraw the selector on the given item and add it to the relevant layer based on the selector type.
 */
function updateSelector(selectedItem = {}, selectorType = null, clearSelectorLayer = false)
{
    if (selectorType == 'highlight') {
        var selectorLayer = getLayerByName('HIGHLIGHT_LAYER')
    } else if (selectorType == 'persistent_selector') {
        var selectorLayer = getLayerByName('PERSISTENT_SELECTION_LAYER')
    }

    // Activate the selector layer
    selectorLayer.activate()

    // If our selected item is a multi-select, we need to get the updated selector shape for each child object.
    if (selectedItem.data.fdpbType == Factory.fdpbTypes.MULTISELECTION) {
        selectedItem.children.forEach(function(child) {
            var childSelectorShape = getUpdatedSelectorShape(child, selectorType, clearSelectorLayer)
            selectorLayer.addChild(childSelectorShape)
        });
    }

    // Otherwise, just get the updated selector shape for the selected item.
    else {
        var newSelector = getUpdatedSelectorShape(selectedItem, selectorType, clearSelectorLayer)
        selectorLayer.addChild(newSelector)
    }

    /*var strokeColor = Factory.colorDefs.SELECTION

    selector.removeChildren()
    selector.pivot = new Point(0, 0)

    var strokeWidth = 0
    var shape

    switch (selectedItem.data.fdpbType) {

        case 'MULTISELECTION':
            shape = createMultiselectionHighlights(selectedItem);
            break;
        case 'FDPB_GROUP':
            var bounds = selectedItem.strokeBounds;
            strokeWidth = 2;
            bounds.x -= selectedItem.position.x;
            bounds.y -= selectedItem.position.y;
            shape = new Path.Rectangle(bounds);
            shape.fillColor = null;
            strokeColor = Factory.colorDefs.SELECTION;
            shape.strokeColor = strokeColor;
            shape.strokeWidth = strokeWidth
            break;
        case 'KNOB':
            shape = new Path.Circle(new Point(0, 0), Factory.INTERACTION_RADIUS);
            shape.fillColor = Factory.colorDefs.SELECTION;
            shape.strokeWidth = strokeWidth
            break;
        default:
            shape = new Path.Circle(new Point(0, 0), Factory.INTERACTION_RADIUS);
            shape.fillColor = Factory.colorDefs.SELECTION;
            shape.strokeWidth = strokeWidth

    }

    if (shape) {
        shape.strokeJoin = 'miter'
        selector.addChild(shape);
    }

    selector.name = selectedItem.data.fdpbType + " Selector";
    selector.opacity = .5;
    if (selector.data.isRollover) {
        selector.opacity = .25;
    }
    selector.position = selectedItem.position*/
}


/**
 * Update a regular text box.
 */
function updateTextBox(textBox)
{
    var textGroup = textBox.lastChild
    var style = textBox.data.customStyle
    textGroup.removeChildren()
    var text = new PointText(new Point(0, 0))
    var highlight = textBox.children[2]
    text.strokeWidth = 0
    text.justification = 'center'
    text.fillColor = style.textColor
    text.content = style.text
    text.fontFamily = style.fontFamily
    text.fontSize = style.fontSize
    text.fontWeight = style.fontWeight
    text.style.fillColor = style.textColor
    text.style.color = style.textColor

    var h = style.fontSize - 4
    // text.pivot = new Point(0,-(h/2));
    text.position = textBox.position
    textGroup.addChild(text)

    var shapeGroup = textBox.children[1]
    shapeGroup.removeChildren()
    var rect = drawRectangleShape(text.bounds.width + 30, text.bounds.height + 20)
    shapeGroup.addChild(rect)
    rect.style = textBox.data.customStyle
    rect.position = textBox.position
    //
    var mouseGroup = textBox.firstChild
    var mouseRect = drawRectangleShape(text.bounds.width + 30, text.bounds.height + 20)
    mouseRect.strokeWidth = null
    mouseRect.fillColor = new Color(1, 0, 1, .01)
    mouseGroup.removeChildren()
    mouseGroup.addChild(mouseRect)
    mouseRect.position = textBox.position
}


/**
 * When user updates the fill color of the text box.
 */
function updateTextBoxFillColor(event)
{
    var fillColor = event.currentTarget.id
    if (fillColor == 'NONE') {
        fillColor = null
    }
    applyTextBoxStyle(activeItem, "fillColor", fillColor);
}


/**
 * Apply the text box font style to the given item.
 */
function applyTextBoxFontStyle(itemToApplyStyleTo = null, formatName = null)
{
    /* If no item to apply style to or style to apply, exit now. */
    if (!itemToApplyStyleTo || !formatName) {
        return
    }

    /* If normal style is selected, clear all other styles. */
    if (formatName == 'normal') {
        applyTextBoxStyle(itemToApplyStyleTo, 'underline', false)
        applyTextBoxStyle(itemToApplyStyleTo, 'bold', false)
        applyTextBoxStyle(itemToApplyStyleTo, 'italic', false)
    }

    /* If another style is selected, add/remove that format (set it to the opposite of what it currently is) */
    else {
        applyTextBoxStyle(itemToApplyStyleTo, formatName, !itemToApplyStyleTo.data.customStyle[formatName])
    }

    /* Now make sure we use the correct font. */
    var fontFamily = 'Rubik'

    if (itemToApplyStyleTo.data.customStyle['bold']) {
        fontFamily = fontFamily + " Bold"
    }
    if (itemToApplyStyleTo.data.customStyle['italic']) {
        fontFamily = fontFamily + " Italic"
    }
    if (itemToApplyStyleTo.data.customStyle['underline']) {
        fontFamily = fontFamily + " Underline"
    }

    applyTextBoxStyle(itemToApplyStyleTo, "fontFamily", fontFamily)
}


/**
 * When user updates the font style of the text box.
 */
function updateTextBoxFontStyle(formatName = null)
{
    /* If no active item, exit now. */
    if (!activeItem) {
        return
    }

    /* If active item is multiselect or group, we'll need to style each one individually. */
    if (activeItem.data.fdpbType == Factory.fdpbTypes.MULTISELECTION || activeItem.data.fdpbType == Factory.fdpbTypes.FDPB_GROUP) {
        for (var i = 0; i < activeItem.children.length; i++) {
            applyTextBoxFontStyle(activeItem.children[i], formatName)
        }
    }

    /* Otherwise, if the active item is a single text box, apply the font style just to that text box. */
    else if (activeItem.data.fdpbType == Factory.fdpbTypes.TEXT_BOX) {
        applyTextBoxFontStyle(activeItem, formatName)
    }

}


/**
 * Upload the JSON file to the canvas.
 */
function uploadPlayJsonFileToCanvas(event)
{
    processJsonFile(replaceJson, 'selectJSON_id');
}


/**
 * Tools
 */


/**
 * Set handlers.
 */

// General
this.addSentryBreadcrumb = addSentryBreadcrumb
this.onResize = onResize
this.groupActiveItem = groupActiveItem
this.lineOfScrimmage = lineOfScrimmage
this.selectedCurves = selectedCurves
this.ungroupActiveItem = ungroupActiveItem

this.initializeFrame = initializeFrame
this.addFrame = addFrame
this.deleteFrame = deleteFrame

// Background
this.changeSportsFieldOnAllFrames = changeSportsFieldOnAllFrames
this.loadFieldBackground = loadFieldBackground
this.backgroundSvg = backgroundSvg

// Player
this.addFiveBasketballPlayers = addFiveBasketballPlayers
this.applyPlayerStyle = applyPlayerStyle
this.updatePlayerSpeed = updatePlayerSpeed
this.addPlayer = addPlayer
this.playAnimations = playAnimations
this.setupAnimations = setupAnimations
this.pauseAnimations = pauseAnimations
this.stopAnimations = stopAnimations
this.forwardAnimations = forwardAnimations
this.backwardAnimations = backwardAnimations
this.addBasketballDefensePlayer = addBasketballDefensePlayer
this.addStraightLine = addStraightLine
this.addCurvedLine = addCurvedLine
this.addDribbleLine = addDribbleLine
this.addPassLine = addPassLine
this.addRunLine = addRunLine
this.addScreenLine = addScreenLine
this.giveBallToPlayer = giveBallToPlayer

// Line
this.applyLineStyle = applyLineStyle

// Text
this.applyTextBoxStyle = applyTextBoxStyle

this.flipObject = flipObject
this.updateLineInsertStyle = updateLineInsertStyle
this.updateLineEndPoint = updateLineEndPoint
this.updatePlayerSize = updatePlayerSize
this.addTextBox = addTextBox
this.removeTextBoxButtonHandler = deleteItem
this.updateTextBoxFontStyle = updateTextBoxFontStyle
this.updateTextBoxFillColor = updateTextBoxFillColor
this.flipPlay = flipPlay
this.bringItemToFront = bringItemToFront
this.sendItemToBack = sendItemToBack
this.addSymbol = addSymbol
this.deleteItem = deleteItem
this.undo = undo;
this.redo = redo;
this.duplicateActiveItem = duplicateActiveItem
this.showFile = replaceJson;
this.uploadPlayJsonFileToCanvas = uploadPlayJsonFileToCanvas
this.placePlayJsonFileOnCanvas = placePlayJsonFileOnCanvas
this.exportPlayToSvgFile = exportPlayToSvgFile
this.exportPlayToJsonFile = exportPlayToJsonFile;
this.uploadJson = uploadPlayJsonFileToCanvas
this.placeJson = placePlayJsonFileOnCanvas
this.placePlayJsonAsGroup = placePlayJsonAsGroup;
this.changeZoomLevel = changeZoomLevel;
this.placePlayTemplateOnCanvas = placePlayTemplateOnCanvas
this.generatePlayTemplateJson = generatePlayTemplateJson
this.generateFramePngDataUrl = generateFramePngDataUrl
this.generatePlayTemplatePngData = generatePlayTemplatePngData
this.enableOnKeyDownHandler = enableOnKeyDownHandler
this.changeEditableMode = changeEditableMode
this.disableOnKeyDownHandler = disableOnKeyDownHandler
this.setProduct = setProduct


if (!window.pbt) {
    window.pbt = {};
}

window.pbt.paperPlayEditor = this;
