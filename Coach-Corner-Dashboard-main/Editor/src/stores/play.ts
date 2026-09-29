import { ref, computed, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { looseIndexOf } from '@/helpers/general';
import type { toastType } from '@/helpers/types';
import {toast} from 'vue-sonner'
import axios from '../lib/AxiosClient';
import { fetchCookie } from '@/lib/utils';

declare global{
  interface Window {
    app: any;
    pbt:any;
    selectionArray: any;
  }
  interface paper {
    view: any;
    containerZoom: any
  }
}

declare const paper: typeof import('paper');

type ZoomLevel = {
  label: string,
  zoomLevel: number
}

type SportsField = {
  id: number,
  name: string,
  sportName: string,
  imgOrientation: boolean,
  width: number,
  height: number,
  active: boolean,
  img: string
}

type Play = {
  id: number,
  name: string,
  number_of_frames: number,
  play_notes: object[],
  is_locked: boolean
}

type Note = {
  id: number,
  title: string,
  body: string,
  status: string
}

type SportField = {
  id: number
}

type State = {
  scope: object,
  play: Play,
  user: any,
  product: any,
  enableAutoSave: number,
  autoSaveStarted: boolean,
  lastSavedAt: any,
  saving: boolean,
  restoring: boolean,
  isDirty: boolean,
  zoomIncrement: number,
  minZoomLevel: number,
  maxZoomLevel: number,
  zoomLevel: number,
  showEditableCanvas: boolean,
  nonEditablePngUrl: any,
  showNonEditablePng: boolean,
  activeItem: any,
  activePlayerObject: any,
  visibleFrames: number[],
  activeFrame: number,
  notes: Note[],
  frameNotes: object,
  frameNotesAreVisible: boolean,
  zoomLevels: ZoomLevel[],
  sports_fields: SportsField[],
  selectedZoomLevel: number,
  panning: boolean,
  updatingPlay: boolean,
  playIsPublished: number | null,
  showOriginal: boolean,
  editingPlayName: boolean,
  canvasDimensionRatio: any,
  canvasHeight: any,
  canvasWidth: any,
  selectedSportsField: SportField | null,
  selectedSportsFieldId: number,
  selectedSportsFieldLevel: any,
  selectedSportsFieldTags: [] | null,
  variation: any,
  selectionArray: any,
  keepaliveCanvas: boolean,
  hidpiCanvas: string,
  lineOfScrimmage: any,
  tabData: {
    player: {
      zone: boolean,
      labelText: string,
      playerSize: number,
      labelColor: number,
      playerShape: number,
      fillColor: number,
      fillShading: number,
      outlineThickness: number,
      outlineStyle: number,
      outlineColor: number,
      speed: number
    },
    line: {
        thickness: number,
        style: number,
        color: number,
        endpoint: number,
        inserts: number
    },
    text: {
        size: number,
        format: {
            none: boolean,
            bold: boolean,
            italic: boolean,
            underline: boolean
        },
        color: number,
        backgroundColor: number,
        borderColor: number
    },
    symbol: {
        shape: string
    },
    firstDownNotes: {
        title: string,
        body: string,
        formatting: string,
        halfscreen: boolean,
        fullscreen: boolean
    },
    add: object
  },
  tab: string,
  mode: string,
  enableTutorialMode: boolean,
  title: string | null
}


export const usePlayStore = defineStore('counter', {
  state: (): State =>{
    return {
      scope: {},
      play: {
        id: 0,
        name: '',
        number_of_frames: 1,
        play_notes: [],
        is_locked: false
      },
      user: null,
      product: {
        name: 'firstdown'
      },
      enableAutoSave: 1,
      autoSaveStarted: !1,
      lastSavedAt: null,
      saving: !1,
      restoring: !1,
      isDirty: !1,
      zoomIncrement: 10,
      minZoomLevel: 50,
      maxZoomLevel: 200,
      zoomLevel: 100,
      showEditableCanvas: !0,
      nonEditablePngUrl: null,
      showNonEditablePng: !1,
      activeItem: null,
      activePlayerObject: null,
      visibleFrames: [],
      activeFrame: 1,
      notes: [],
      frameNotes: {},
      frameNotesAreVisible: !0,
      zoomLevels: [{
          label: "100%",
          zoomLevel: 1
      }, {
          label: "135%",
          zoomLevel: 1.35
      }, {
          label: "150%",
          zoomLevel: 1.5
      }, {
          label: "200%",
          zoomLevel: 2
      }, {
          label: "250%",
          zoomLevel: 2.5
      }],
      sports_fields: [],
      selectedZoomLevel: 1,
      panning: !1,
      updatingPlay: !1,
      playIsPublished: null,
      showOriginal: !1,
      editingPlayName: !1,
      canvasDimensionRatio: null,
      canvasHeight: null,
      canvasWidth: null,
      selectedSportsField: null,
      selectedSportsFieldId: 1,
      selectedSportsFieldLevel: null,
      selectedSportsFieldTags: [],
      variation: null,
      selectionArray: window.selectionArray,
      keepaliveCanvas: !1,
      hidpiCanvas: "off",
      lineOfScrimmage: !1,
      tabData: {
          player: {
              zone: !1,
              labelText: "",
              playerSize: 1,
              labelColor: 1,
              playerShape: 1,
              fillColor: 4,
              fillShading: 0,
              outlineThickness: 2,
              outlineStyle: 1,
              outlineColor: 1,
              speed: 2
          },
          line: {
              thickness: 2,
              style: 1,
              color: 1,
              endpoint: 1,
              inserts: 0
          },
          text: {
              size: 2,
              format: {
                  none: !1,
                  bold: !1,
                  italic: !1,
                  underline: !1
              },
              color: 1,
              backgroundColor: 4,
              borderColor: 1
          },
          symbol: {
              shape: "icon-symbol-football"
          },
          firstDownNotes: {
              title: "",
              body: "",
              formatting: "",
              halfscreen: !1,
              fullscreen: !1
          },
          add: {}
      },
      tab: "home",
      mode: "editing",
      enableTutorialMode: !1,
      title: document.title
    }
  },

  actions: {
    updatePlay(play:any){
      this.play = play;
      this.play.play_notes = [];
      // this.play.play_notes = [
      //   {
      //     "id": 2780804,
      //     "play_id": 1427819,
      //     "title": "sample notes",
      //     "body": "<p>Enter notes here...</p><p>Enter notes here... these are my notes and i will write them later.</p>",
      //     "position": 0,
      //     "imported_at": null,
      //     "created_at": "2024-12-09T15:00:49.000000Z",
      //     "updated_at": "2024-12-09T15:00:49.000000Z",
      //     "deleted_at": null
      //   },
      //   {
      //     "id": 2780805,
      //     "play_id": 1427819,
      //     "title": "Coaching Notes",
      //     "body": "<p style=\"line-height: 1.5\"></p><p style=\"line-height: 1.5\">Enter notes here... these are my notes and i will write them later.</p><p style=\"line-height: 1.5\"></p><p style=\"line-height: 1.5\">Enter notes here... these are my notes and i will write them later.</p><p style=\"line-height: 1.5\"></p><p style=\"line-height: 1.5\">Enter notes here...</p><p style=\"line-height: 1.5\">Enter notes here... these are my notes and i will write them later.</p><p style=\"line-height: 1.5\">Enter notes here...</p>",
      //     "position": 1,
      //     "imported_at": null,
      //     "created_at": "2024-12-09T15:00:49.000000Z",
      //     "updated_at": "2024-12-09T15:00:49.000000Z",
      //     "deleted_at": null
      //   }
      // ];
      this.lastSavedAt = play?.updated_at;
      this.visibleFrames = play?.number_of_frames ? this.getFrameNumbersArray() : [1]
      this.playIsPublished = play.published
      this.selectedSportsField = play.sportField ? play.sportField : null
      this.selectedSportsFieldId = play.sportField ? play.sportField.id : null
      this.selectedSportsFieldLevel = play.sportField?.tags ? this.getSportsFieldLevel(play.sportField.tags) : null
      this.selectedSportsFieldTags = play.sportField?.tags ? play.sportField.tags : []
    },
    updateUser(user:any){
      this.user = user;
      this.enableAutoSave = user.auto_save_plays;
    },
    updateProduct(product:any){
      this.product = product;
      this.canvasWidth = "firstdown" == product.name ? 1e3 : "fastbreak" == product.name ? 475 : 1e3;
      this.tabData.player.playerSize = "firstdown" == product.name ? 2 : 1
      this.tabData.player.playerShape = "firstdown" == product.name ? 3 : 1
    },
    getFrameNumbersArray() {
      for (var e:any = [], t = this.play?.number_of_frames, n = 1; n <= t; n++)
          e.push(n);
      return e
    },
    getSportsFieldLevel(e:any) {
      for (var t = 0; t < e.length; t++) {
          if ("High School" == e[t].name)
              return "High School";
          if ("College" == e[t].name)
              return "College";
          if ("Professional" == e[t].name)
              return "Professional"
      }
    },
    removeItem(e:any) {
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User clicked the Remove button to remove the active item.", "info", "User Action"),
      // this.activeItem || this.$root.displayErrorMessage("Please select something first and try again."),
      this.activeItem || console.error("Please select something first and try again.")
      window.pbt.paperPlayEditor.deleteItem()
      this.isDirty = !0
    },
    async showTab(e:any) {
      var t = this
        , n = e;
      if("firstDownNotes" == this.tab && "firstDownNotes" !== n){
        await nextTick();
        t.showNonEditablePng = !1,
        t.showEditableCanvas = !0
      } else{
        "firstDownNotes" == n && this.collapseNotes()
      }
      this.tab = n
    },
    async collapseNotes() {
      var e = this;
      // this.$refs.firstDownNotesTabRef.notesEditorMode = "quarter-screen",
      this.tabData.firstDownNotes.fullscreen = !1,
      this.tabData.firstDownNotes.halfscreen = !1,
      await nextTick()
      e.nonEditablePngUrl = window.pbt.paperPlayEditor.generateFramePngDataUrl(1, !1, !1),
      e.showNonEditablePng = !0,
      e.showEditableCanvas = !1
    },
    activeItemHasPlayerObjects() {
      if (!this.activeItem && !this.activePlayerObject)
          return !1;
      if (this.activePlayerObject)
          return !0;
      if (this.activeItem && ("MULTISELECTION" == this.activeItem.data.fdpbType || "FDPB_GROUP" == this.activeItem.data.fdpbType))
          for (var e = 0; e < this.activeItem.children.length; e++)
              if ("PLAYER_OBJECT" == this.activeItem.children[e].data.fdpbType || "PLAYER_SYMBOL" == this.activeItem.children[e].data.fdpbType)
                  return !0;
      return !1
    },
    activeItemHasTextBox: function() {
      console.log("Active Item",this.activeItem)
      if (!this.activeItem)
          return !1;
      if (this.activeItem && "TEXT_BOX" == this.activeItem.data.fdpbType)
          return !0;
      if (this.activeItem && ("MULTISELECTION" == this.activeItem.data.fdpbType || "FDPB_GROUP" == this.activeItem.data.fdpbType))
          for (var e = 0; e < this.activeItem.children.length; e++)
              if ("TEXT_BOX" == this.activeItem.children[e].data.fdpbType)
                  return !0;
      return !1
    },
    disableOnKeyDownHandler: function() {
      window.pbt.paperPlayEditor.disableOnKeyDownHandler()
    },
    enableOnKeyDownHandler: function() {
      window.pbt.paperPlayEditor.enableOnKeyDownHandler()
    },
    addPlayer(t:any) {
      var e = t != undefined ? t : "Offense";
    //   window.pbt.paperPlayEditor.addSentryBreadcrumb("User added a(n) " + e + " player.", "info", "User Action"),
      "Offense" == e ? window.pbt.paperPlayEditor.addPlayer() : "Defense" == e && window.pbt.paperPlayEditor.addBasketballDefensePlayer("x1"),
      this.showTab("player"),
      this.isDirty = !0
    },
    addLine() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      if (this.activeItem && "BASKETBALL_DEFENSE_PLAYER_SYMBOL" == this.activeItem.data.fdpbType)
          // this.$root.displayErrorMessage("Lines cannot be added to defense players.");
          console.error("Lines cannot be added to defense players.");
      else if (this.activeItemHasPlayerObjects()) {
          switch (e) {
          case "curvedLine":
              window.pbt.paperPlayEditor.addCurvedLine();
              break;
          case "curvedDribbleLine":
              window.pbt.paperPlayEditor.addDribbleLine(!0);
              break;
          case "curvedPassLine":
              window.pbt.paperPlayEditor.addPassLine(!0);
              break;
          case "curvedRunLine":
              window.pbt.paperPlayEditor.addRunLine(!0);
              break;
          case "curvedScreenLine":
              window.pbt.paperPlayEditor.addScreenLine(!0);
              break;
          case "straightLine":
              window.pbt.paperPlayEditor.addStraightLine();
              break;
          case "straightDribbleLine":
              window.pbt.paperPlayEditor.addDribbleLine(!1);
              break;
          case "straightPassLine":
              window.pbt.paperPlayEditor.addPassLine(!1);
              break;
          case "straightRunLine":
              window.pbt.paperPlayEditor.addRunLine(!1);
              break;
          case "straightScreenLine":
              window.pbt.paperPlayEditor.addScreenLine(!1)
          }
          this.isDirty = !0
      } else
          // this.$root.displayErrorMessage("Please select at least one player or route you want to add the line to by clicking on that player/route first, then try adding the line again.")
          console.error("Please select at least one player or route you want to add the line to by clicking on that player/route first, then try adding the line again.")
    },
    flipObject(e:any) {
      // this.activeItem || this.$root.displayErrorMessage("Please select something first and try again."),
      this.activeItem || console.error('Please select something first and try again.'),
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User flipped the active item.", "info", "User Action"),
      window.pbt.paperPlayEditor.flipObject(e),
      this.isDirty = !0
    },
    duplicateItem: function(e:any) {
      // this.activeItem || this.$root.displayErrorMessage("Please select something first and try again."),
      this.activeItem || console.error("Please select something first and try again."),
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User duplicated the active item.", "info", "User Action"),
      window.pbt.paperPlayEditor.duplicateActiveItem(e),
      this.isDirty = !0
    },
    groupItem: function() {
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User grouped the active item.", "info", "User Action"),
      // this.activeItem || this.$root.displayErrorMessage("Please select something first and try again."),
      this.activeItem || console.error("Please select something first and try again."),
      window.pbt.paperPlayEditor.groupActiveItem(),
      this.isDirty = !0
    },
    ungroupItem: function() {
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User ungrouped the active item.", "info", "User Action"),
      // this.activeItem || this.$root.displayErrorMessage("Please select something first and try again."),
      this.activeItem || console.error('Please select something first and try again.'),
      window.pbt.paperPlayEditor.ungroupActiveItem(),
      this.isDirty = !0
    },
    addSymbol: function(e:any) {
      console.log("E",e),
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User added a(n) " + e + " symbol.", "info", "User Action"),
      window.pbt.paperPlayEditor.addSymbol(e)
    },
    addText: function() {
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User added text box.", "info", "User Action"),
      window.pbt.paperPlayEditor.addTextBox(),
      this.showTab("text"),
      this.isDirty = !0
    },
    onScrimmageUpdate: function(t:any){
      var n=this.lineOfScrimmage,
          s=!!t;
          if(Array.isArray(n)){
              var r = looseIndexOf(n,null);
              t ? r < 0 && (this.lineOfScrimmage = n.concat([null])) : r > -1 && (this.lineOfScrimmage = n.slice(0, r).concat(n.slice(r + 1)))
          }else{
              this.lineOfScrimmage = s
          }
          console.log("N",n,s,t)
          this.updateScrimmageLine();
    },
    updateScrimmageLine: function() {
      this.isDirty = !0,
      window.pbt.paperPlayEditor.toggleLineOfScrimmage(this.lineOfScrimmage) 
    },
    undo: function(e:any) {
      console.log("Undo"),
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User clicked the Undo button.", "info", "User Action"),
      window.pbt.paperPlayEditor.undo(e),
      this.isDirty = !0
    },
    redo: function(e:any) {
      console.log("Redo"),
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User clicked the redo button.", "info", "User Action"),
      window.pbt.paperPlayEditor.redo(e),
      this.isDirty = !0
    },
    flipHorizontal: function(e:any) {
        e.currentTarget.id = "horizontal",
        // window.pbt.paperPlayEditor.addSentryBreadcrumb("User flipped the play horizontally.", "info", "User Action"),
        window.pbt.paperPlayEditor.flipPlay(e),
        this.isDirty = !0
    },
    flipVertical: function(e:any) {
        e.currentTarget.id = "vertical",
        // window.pbt.paperPlayEditor.addSentryBreadcrumb("User flipped the play vertically.", "info", "User Action"),
        window.pbt.paperPlayEditor.flipPlay(e),
        this.isDirty = !0
    },
    bringToFront: function(e:any) {
        // window.pbt.paperPlayEditor.addSentryBreadcrumb("User brought item to front.", "info", "User Action"),
        window.pbt.paperPlayEditor.bringItemToFront(e),
        this.isDirty = !0
    },
    sendToBack: function(e:any) {
        // window.pbt.paperPlayEditor.addSentryBreadcrumb("User sent item to back.", "info", "User Action"),
        window.pbt.paperPlayEditor.sendItemToBack(e),
        this.isDirty = !0
    },
    
    changeZoomLevel: function() {
      // window.pbt.paperPlayEditor.addSentryBreadcrumb("User changed zoom level to " + this.selectedZoomLevel + ".", "info", "User Action"),
      this.isDirty = !0,
      window.pbt.paperPlayEditor.changeZoomLevel(this.selectedZoomLevel)
    },
    savePlayName: function() {
        var e = this;
        if("" != this.play.name){
          this.saving = !0
          // this.$root.showSavingChangesModal(),
          const team = fetchCookie('teamId');
          const teamId = team ? JSON.parse(team).id : '';
          const promise = axios.put("/api/plays/".concat(teamId,'/',this.play.id.toString(), "/edit"), {
              name: this.play.name,
              sportFieldId: this.selectedSportsFieldId
          }).then((function(t) {
                // e.lastSavedAt = t.data.play.updated_at,
                e.saving = !1,
                e.editingPlayName = !1,
                e.enableOnKeyDownHandler(),
                e.isDirty = !1
            }
          )).catch((function(t) {
                e.saving = !1,
                e.editingPlayName = !1,
                e.enableOnKeyDownHandler()
                e.setToaster("error","Something went wrong and the play could not be updated.")
            }
          ))
          toast.promise(promise, {
            loading: 'Please wait while we save your changes.'
          });
      }else{
        e.setToaster("error","Please enter a play name.")
      }
    },
    save: function() {
        var e = this
          , t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (this.play.name != "")
            if (!this.play.is_locked) {
                // if ("firstdown" == this.product.name) {
                    var n = this.notes;
                    if (n)
                        for (var o = 0; o < n.length; o++) {
                            if (!n[o].title && n[o].status != 'Deleted')
                                return void this.setToaster('error','One of the play notes has an empty title. Please update or delete it.');
                            if (!n[o].body && n[o].status != 'Deleted')
                                return void this.setToaster('error',"One of the play notes has an empty body. Please update or delete it.")
                        }
                // }
                this.saving = !0;
                var s = {}
                  , r = {}
                  , playPngs:any = [];
                for (o = 0; o < this.visibleFrames.length; o++) {
                    var i = o + 1;
                    s[i] = window.pbt.paperPlayEditor.generateFrameJson(i),
                    r[i] = {},
                    r[i].uf = window.pbt.paperPlayEditor.generateFramePngDataUrl(i, !1, !1),
                    r[i].ufw = window.pbt.paperPlayEditor.generateFramePngDataUrl(i, !0, !1),
                    r[i].f = window.pbt.paperPlayEditor.generateFramePngDataUrl(i, !1, !0),
                    r[i].fw = window.pbt.paperPlayEditor.generateFramePngDataUrl(i, !0, !0)
                }
                for (o = 0; o < this.visibleFrames.length; o++) {
                  playPngs = [
                    {
                      "id": 0,
                      "flag": "uf",
                      "imageUrl": "",
                      "base64": window.pbt.paperPlayEditor.generateFramePngDataUrl(o, !1, !1),
                      "status": "Updated"
                    },
                    {
                      "id": 0,
                      "flag": "ufw",
                      "imageUrl": "",
                      "base64": window.pbt.paperPlayEditor.generateFramePngDataUrl(o, !0, !1),
                      "status": "Updated"
                    },
                    {
                      "id": 0,
                      "flag": "f",
                      "imageUrl": "",
                      "base64": window.pbt.paperPlayEditor.generateFramePngDataUrl(o, !1, !0),
                      "status": "Updated"
                    },
                    {
                      "id": 0,
                      "flag": "fw",
                      "imageUrl": "",
                      "base64": window.pbt.paperPlayEditor.generateFramePngDataUrl(o, !0, !0),
                      "status": "Updated"
                    }
                  ]
                }
                // var a = this.$refs.playTagEditorComponentRef.tagCategorySetId
                //   , l = this.$refs.playTagEditorComponentRef.selectedTagCategoryValues;
                const team = fetchCookie('teamId');
                const teamId = team ? JSON.parse(team).id : '';
                const promise = axios.put("/api/plays/".concat(teamId,'/',this.play.id.toString(), "/edit"), {
                    name: this.play.name,
                    sportFieldId: this.selectedSportsField?.id,
                    play: JSON.stringify(s),
                    notes: this.notes,
                    playPngs
                    // videos: this.$refs.videoTabRef.videos,
                    // png_data: r,
                    // number_of_frames: this.visibleFrames.length,
                    // tag_category_set_id: a,
                    // tag_category_values: l
                }).then((function(n) {
                    // e.lastSavedAt = n.data.play.updated_at,
                    e.saving = !1,
                    e.editingPlayName = !1,
                    e.enableOnKeyDownHandler(),
                    e.isDirty = !1
                }
                )).catch((function(n) {
                    e.saving = !1,
                    e.editingPlayName = !1,
                    e.enableOnKeyDownHandler(),
                    e.setToaster("error","Something went wrong and the play could not be updated.")
                }
                ))
                t || toast.promise(promise, {
                  loading: 'Please wait while we save your changes.'
                });
            } else
                console.error('<p>This play is locked and changes to it cannot be saved.</p><p>Use the <a href="/play-finder" target="_blank"><strong><u>Find a Play</u></strong></a> feature to find plays that can be edited.</p>');
        else
            console.error("Please enter a play name.")
    },
    toggleAutoSave: function(status:any) {
        var e = this;
        e.enableAutoSave = status;
        // window.pbt.paperPlayEditor.addSentryBreadcrumb("User toggled their auto-save settings.", "info", "User Action");
        // this.$root.showSavingChangesModal(),
        // axios.put("/users/".concat(this.user.id, "/toggle-auto-save-plays")).then((function(t) {
        //     var n = t.data;
        //     e.enableAutoSave = n.enable_auto_save;
        //     // e.$root.hideSavingChangesModal()
        // }
        // )).catch((function(t) {
        //     // e.$root.hideSavingChangesModal(),
        //     console.error("Something went wrong. Please try again or contact customer service for further assistance.")
        // }
        // ))
    },
    setToaster: (type: toastType = "info", message: string) => {
      switch (type) {
        case "success":
          toast.success(message);
          return;
          break;
        case "error":
          toast.error(message);
          return;
        case "info":
          toast(message);
          return;
        case "loading":
          toast.loading(message);
          return;
        default:
          toast(message);
          break;
      }
      return true;
    }
  }
})
