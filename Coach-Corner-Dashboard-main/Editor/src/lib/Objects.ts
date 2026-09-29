export const outlineStyles = [{
    id: 1,
    label: "Solid",
    text: "Solid",
    className: "property-outline-solid-circle"
}, {
    id: 2,
    label: "Dashed",
    text: "Dashed",
    className: "property-outline-dashed-circle"
}, {
    id: 3,
    label: "Dotted",
    text: "Dotted",
    className: "property-outline-dotted-circle"
}];
export const outlineThicknesses = [{
    id: 1,
    label: "Thin",
    width: 2,
    className: "property-outline-thin-circle"
}, {
    id: 2,
    label: "Medium",
    width: 4,
    className: "property-outline-medium-circle"
}, {
    id: 3,
    label: "Thick",
    width: 6,
    className: "property-outline-thick-circle"
}];
export const fillShadings = [{
    id: 1,
    label: "Shade Left",
    text: "LEFT",
    className: "property-fill-shade-left-circle"
}, {
    id: 2,
    label: "Shade Center",
    text: "CENTER",
    className: "property-fill-shade-center-circle"
}, {
    id: 3,
    label: "Shade Right",
    text: "RIGHT",
    className: "property-fill-shade-right-circle"
}];
export const playerSizes = [{
    id: 1,
    label: "Proportionate",
    className: "player-size-icon-xs",
    fontSize: 9,
    playerShapeWidth: 16,
    playerShapeHeight: 12
}, {
    id: 2,
    label: "Small",
    className: "player-size-icon-sm",
    fontSize: 17,
    playerShapeWidth: 30,
    playerShapeHeight: 20
}, {
    id: 3,
    label: "Medium",
    className: "player-size-icon-md",
    fontSize: 31,
    playerShapeWidth: 50,
    playerShapeHeight: 33
}, {
    id: 4,
    label: "Large",
    className: "player-size-icon-lg",
    fontSize: 40,
    playerShapeWidth: 80,
    playerShapeHeight: 53
}];
export const playerShapes = {
    firstdown: [{
        id: 1,
        name: "Circle",
        type: "circle",
        iconClassName: "property-shape-circle"
    }, {
        id: 2,
        name: "Square",
        type: "square",
        iconClassName: "property-shape-square"
    }, {
        id: 3,
        name: "Oval",
        type: "elipse",
        iconClassName: "property-shape-oval"
    }, {
        id: 4,
        name: "Rectangle",
        type: "rectangle",
        iconClassName: "property-shape-rectangle"
    }, {
        id: 5,
        name: "Triangle",
        type: "triangle",
        iconClassName: "property-shape-triangle"
    }, {
        id: 6,
        name: "Hexagon",
        type: "hexagon",
        iconClassName: "property-shape-hexagon"
    }, {
        id: 7,
        name: "Diamond",
        type: "diamond",
        iconClassName: "property-shape-diamond"
    }, {
        id: 8,
        name: "Defensive Player",
        type: "defensive_player",
        iconClassName: "property-shape-defensive-player"
    }],
    fastbreak: [{
        id: 1,
        name: "Point Guard",
        type: "basketball_player",
        playerNumber: 1,
        iconClassName: "player-shape-1"
    }, {
        id: 2,
        name: "Shooting Guard",
        type: "basketball_player",
        playerNumber: 2,
        iconClassName: "player-shape-2"
    }, {
        id: 3,
        name: "Other Guard",
        type: "basketball_player",
        playerNumber: 3,
        iconClassName: "player-shape-3"
    }, {
        id: 4,
        name: "Power Forward",
        type: "basketball_player",
        playerNumber: 4,
        iconClassName: "player-shape-4"
    }, {
        id: 5,
        name: "Center",
        type: "basketball_player",
        playerNumber: 5,
        iconClassName: "player-shape-5"
    }]
}
export const labelColors = [{
    id: 1,
    name: "Black",
    hex: "#000000",
    border: !1
}, {
    id: 2,
    name: "White",
    hex: "#ffffff",
    border: !0
}];
export const colors = [{
    id: 1,
    name: "Black",
    hex: "#000000",
    border: !1
}, {
    id: 2,
    name: "Grey",
    hex: "#707070",
    border: !1
}, {
    id: 3,
    name: "Light Grey",
    hex: "#bdbdbd",
    border: !1
}, {
    id: 4,
    name: "White",
    hex: "#ffffff",
    border: !0
}, {
    id: 5,
    name: "Red",
    hex: "#ff161b",
    border: !1
}, {
    id: 6,
    name: "Green",
    hex: "#27c246",
    border: !1
}, {
    id: 7,
    name: "Blue",
    hex: "#0085ff",
    border: !1
}, {
    id: 8,
    name: "Light Blue",
    hex: "#a7e6ff",
    border: !1
}, {
    id: 9,
    name: "Yellow",
    hex: "#ffd019",
    border: !1
}, {
    id: 10,
    name: "Violet",
    hex: "#6b0aff",
    border: !1
}, {
    id: 11,
    name: "Orange",
    hex: "#f07c00",
    border: !1
}];

export const lineThicks = [{
    id: 1,
    label: "Thickest",
    width: 6,
    className: "property-line-thick"
}, {
    id: 2,
    label: "Thicker",
    width: 4,
    className: "property-line-medium"
}, {
    id: 3,
    label: "Thin",
    width: 2,
    className: "property-line-thin"
}]
export const lineStyles = {
    firstdown: [{
        id: 1,
        label: "Solid",
        text: "Solid",
        className: "property-line-solid-medium"
    }, {
        id: 2,
        label: "Dashed",
        text: "Dashed",
        className: "property-line-dashed-medium"
    }, {
        id: 3,
        label: "Dotted",
        text: "Dotted",
        className: "property-line-dotted-medium"
    }, {
        id: 4,
        label: "Zigzag",
        text: "Zig Zag",
        className: "property-line-zig-zag-medium"
    }],
    fastbreak: [{
        id: 1,
        label: "Run",
        text: "Solid",
        className: "property-line-solid-medium"
    }, {
        id: 3,
        label: "Pass",
        text: "Dotted",
        className: "property-line-dotted-medium"
    }, {
        id: 4,
        label: "Dribble",
        text: "Zig Zag",
        className: "property-line-zig-zag-medium"
    }]
}
export const lineColors = [{
    id: 1,
    name: "Black",
    hex: "#000000",
    border: !1
}, {
    id: 2,
    name: "Grey",
    hex: "#707070",
    border: !1
}, {
    id: 3,
    name: "Light Grey",
    hex: "#bdbdbd",
    border: !1
}, {
    id: 4,
    name: "Red",
    hex: "#ff161b",
    border: !1
}, {
    id: 5,
    name: "Green",
    hex: "#27c246",
    border: !1
}, {
    id: 6,
    name: "Blue",
    hex: "#0085ff",
    border: !1
}, {
    id: 7,
    name: "Light Blue",
    hex: "#a7e6ff",
    border: !1
}, {
    id: 8,
    name: "Yellow",
    hex: "#ffd019",
    border: !1
}, {
    id: 9,
    name: "Violet",
    hex: "#6b0aff",
    border: !1
}, {
    id: 10,
    name: "Orange",
    hex: "#f07c00",
    border: !1
}]
export const lineEndpoints = {
    firstdown: [{
        id: 1,
        label: "Triangle",
        text: "TRIANGLE",
        nobg: !1,
        className: "property-arrow-triangle-medium"
    }, {
        id: 2,
        label: "Ball",
        text: "BALL",
        nobg: !1,
        className: "property-stop-dot-medium"
    }, {
        id: 3,
        label: "30 T Block",
        text: "T_BLOCKLEFT",
        nobg: !0,
        className: "property-block-left-medium"
    }, {
        id: 4,
        label: "-30 T Block",
        text: "T_BLOCKRIGHT",
        nobg: !1,
        className: "property-block-right-medium"
    }, {
        id: 5,
        label: "90 T Block",
        text: "T_BLOCK",
        nobg: !1,
        className: "property-block-forward-medium"
    }],
    fastbreak: [{
        id: 1,
        label: "Triangle",
        text: "TRIANGLE",
        nobg: !1,
        className: "property-arrow-triangle-medium"
    }, {
        id: 3,
        label: "30 Screen",
        text: "T_BLOCKLEFT",
        nobg: !0,
        className: "property-block-left-medium"
    }, {
        id: 4,
        label: "-30 Screen",
        text: "T_BLOCKRIGHT",
        nobg: !1,
        className: "property-block-right-medium"
    }, {
        id: 5,
        label: "90 Screen",
        text: "T_BLOCK",
        nobg: !1,
        className: "property-block-forward-medium"
    }, {
        id: 6,
        label: "Handoff",
        text: "HAND_OFF",
        className: "basketball-handoff"
    }, {
        id: 7,
        label: "Fake Handoff",
        text: "FAKE_HAND_OFF",
        className: "basketball-fake-handoff"
    }]
}
export const lineInserts = {
    firstdown: [{
        id: 1,
        label: "Handoff",
        text: "HAND_OFF",
        className: "property-handoff-medium"
    }, {
        id: 2,
        label: "Fake Handoff",
        text: "FAKE_HAND_OFF",
        className: "property-fake-handoff-medium"
    }, {
        id: 3,
        label: "Stutter Step",
        text: "STUTTER_STEP",
        className: "property-stutter-medium"
    }, {
        id: 4,
        label: "Rub",
        text: "PLAYERS_RUB",
        className: "property-rub-medium"
    }]
}

export const shapes = {
    firstdown: [{
        id: 1,
        name: "Football",
        iconClass: "property-symbol-football",
        fileName: "icon-symbol-football",
        width: 30,
        height: 30
    }, {
        id: 15,
        name: "Cone",
        iconClass: "property-symbol-cone",
        fileName: "cone",
        width: 30,
        height: 30
    }, {
        id: 2,
        name: "Star",
        iconClass: "property-symbol-star",
        fileName: "icon-symbol-star",
        width: 30,
        height: 30
    }, {
        id: 3,
        name: "Asterisk",
        iconClass: "property-symbol-asterisk",
        fileName: "icon-symbol-asterisk",
        width: 30,
        height: 30
    }, {
        id: 4,
        name: "Exclamation",
        iconClass: "property-symbol-exclamation",
        fileName: "icon-symbol-exclamation",
        width: 30,
        height: 30
    }, {
        id: 5,
        name: "Dollar Sign",
        iconClass: "property-symbol-dollar",
        fileName: "icon-symbol-dollar",
        width: 30,
        height: 30
    }, {
        id: 6,
        name: "Flag",
        iconClass: "property-symbol-flag",
        fileName: "icon-symbol-flag",
        width: 30,
        height: 30
    }, {
        id: 7,
        name: "Arrow Up",
        iconClass: "property-symbol-arrow-up",
        fileName: "icon-symbol-arrow-up",
        width: 30,
        height: 30
    }, {
        id: 8,
        name: "Arrow Down",
        iconClass: "property-symbol-arrow-down",
        fileName: "icon-symbol-arrow-down",
        width: 30,
        height: 30
    }, {
        id: 9,
        name: "Arrow Left",
        iconClass: "property-symbol-arrow-left",
        fileName: "icon-symbol-arrow-left",
        width: 30,
        height: 30
    }, {
        id: 10,
        name: "Arrow Right",
        iconClass: "property-symbol-arrow-right",
        fileName: "icon-symbol-arrow-right",
        width: 30,
        height: 30
    }, {
        id: 11,
        name: "Arrow Up Left",
        iconClass: "property-symbol-arrow-up-left",
        fileName: "icon-symbol-arrow-up-left",
        width: 30,
        height: 30
    }, {
        id: 12,
        name: "Arrow Up Right",
        iconClass: "property-symbol-arrow-up-right",
        fileName: "icon-symbol-arrow-up-right",
        width: 30,
        height: 30
    }, {
        id: 13,
        name: "Arrow Down Right",
        iconClass: "property-symbol-arrow-down-right",
        fileName: "icon-symbol-arrow-down-right",
        width: 30,
        height: 30
    }, {
        id: 14,
        name: "Arrow Down Left",
        iconClass: "property-symbol-arrow-down-left",
        fileName: "icon-symbol-arrow-down-left",
        width: 30,
        height: 30
    }],
    fastbreak: [{
        id: 16,
        name: "Basketball",
        iconClass: "property-symbol-basketball",
        fileName: "basketball",
        width: 23,
        height: 23
    }, {
        id: 15,
        name: "Cone",
        iconClass: "property-symbol-cone",
        fileName: "cone",
        width: 22,
        height: 23
    }, {
        id: 2,
        name: "Star",
        iconClass: "property-symbol-star",
        fileName: "icon-symbol-star",
        width: 25,
        height: 25
    }, {
        id: 3,
        name: "Asterisk",
        iconClass: "property-symbol-asterisk",
        fileName: "icon-symbol-asterisk",
        width: 25,
        height: 25
    }, {
        id: 4,
        name: "Exclamation",
        iconClass: "property-symbol-exclamation",
        fileName: "icon-symbol-exclamation",
        width: 25,
        height: 25
    }, {
        id: 5,
        name: "Dollar Sign",
        iconClass: "property-symbol-dollar",
        fileName: "icon-symbol-dollar",
        width: 25,
        height: 25
    }, {
        id: 6,
        name: "Flag",
        iconClass: "property-symbol-flag",
        fileName: "icon-symbol-flag",
        width: 25,
        height: 25
    }, {
        id: 7,
        name: "Arrow Up",
        iconClass: "property-symbol-arrow-up",
        fileName: "icon-symbol-arrow-up",
        width: 25,
        height: 25
    }, {
        id: 8,
        name: "Arrow Down",
        iconClass: "property-symbol-arrow-down",
        fileName: "icon-symbol-arrow-down",
        width: 25,
        height: 25
    }, {
        id: 9,
        name: "Arrow Left",
        iconClass: "property-symbol-arrow-left",
        fileName: "icon-symbol-arrow-left",
        width: 25,
        height: 25
    }, {
        id: 10,
        name: "Arrow Right",
        iconClass: "property-symbol-arrow-right",
        fileName: "icon-symbol-arrow-right",
        width: 25,
        height: 25
    }, {
        id: 11,
        name: "Arrow Up Left",
        iconClass: "property-symbol-arrow-up-left",
        fileName: "icon-symbol-arrow-up-left",
        width: 20,
        height: 20
    }, {
        id: 12,
        name: "Arrow Up Right",
        iconClass: "property-symbol-arrow-up-right",
        fileName: "icon-symbol-arrow-up-right",
        width: 20,
        height: 20
    }, {
        id: 13,
        name: "Arrow Down Right",
        iconClass: "property-symbol-arrow-down-right",
        fileName: "icon-symbol-arrow-down-right",
        width: 20,
        height: 20
    }, {
        id: 14,
        name: "Arrow Down Left",
        iconClass: "property-symbol-arrow-down-left",
        fileName: "icon-symbol-arrow-down-left",
        width: 20,
        height: 20
    }]
}

export const fontSizes = [{
    id: 1,
    size: 15,
    label: "Small",
    className: "text-size-icon-sm"
}, {
    id: 2,
    size: 27,
    label: "Medium",
    className: "text-size-icon-md"
}, {
    id: 3,
    size: 40,
    label: "Large",
    className: "text-size-icon-lg"
}]
export const textColors = [{
    id: 1,
    name: "Black",
    hex: "#000000",
    border: !1
}, {
    id: 2,
    name: "Grey",
    hex: "#707070",
    border: !1
}, {
    id: 3,
    name: "Light Grey",
    hex: "#bdbdbd",
    border: !1
}, {
    id: 4,
    name: "White",
    hex: "#ffffff",
    border: !0
}, {
    id: 5,
    name: "Red",
    hex: "#ff161b",
    border: !1
}, {
    id: 6,
    name: "Green",
    hex: "#27c246",
    border: !1
}, {
    id: 7,
    name: "Blue",
    hex: "#0085ff",
    border: !1
}, {
    id: 8,
    name: "Light Blue",
    hex: "#a7e6ff",
    border: !1
}, {
    id: 9,
    name: "Yellow",
    hex: "#ffd019",
    border: !1
}, {
    id: 10,
    name: "Violet",
    hex: "#6b0aff",
    border: !1
}, {
    id: 11,
    name: "Orange",
    hex: "#f07c00",
    border: !1
}]