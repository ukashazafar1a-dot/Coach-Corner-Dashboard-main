<template>
        <PrimaryHeader />
        <SecondaryHeader @change-sports-field="changeSportsField"/>
        <div className="flex items-center justify-center w-full basis-auto overflow-auto flex-grow">
            <div id="play-editor-left-pane">
                <div id="play-canvas-wrapper-1" class="play-canvas-wrapper">
                    <!-- <div class="play-canvas-tutorial-overlay" v-if="mode='toturial'"></div> -->
                    <div id="pan-controls-wrapper" style="display: none">
                        <div id="pan-up-button" class="pan-button text-danger" data-original-title="" title="">
                            <i class="fad fa-chevron-circle-up fa-2x" aria-hidden="true"></i>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0 229.232 0 0 229.232 0 512zm961.008 0c0 247.024-201.969 448-449.009 448s-448-200.976-448-448 200.976-448 448-448 449.009 200.976 449.009 448zM479.663 287.68v360.448l-115.76-115.76c-12.496-12.496-32.752-12.496-45.248 0s-12.496 32.752 0 45.248l194.016 189.008 194-189.008c6.256-6.256 9.376-14.432 9.376-22.624s-3.12-16.368-9.376-22.624c-12.496-12.496-32.752-12.496-45.248 0l-117.744 117.76V287.68c0-17.68-14.336-32-32-32s-32.016 14.32-32.016 32z"></path></svg>
                        </div>
                        <div id="pan-left-button" class="pan-button text-danger" style="display: none;" data-original-title="" title=""><i class="fad fa-chevron-circle-left fa-2x" aria-hidden="true"></i></div>
                        <div id="pan-down-button" class="pan-button text-danger" style="display: none;" data-original-title="" title=""><i class="fad fa-chevron-circle-down fa-2x" aria-hidden="true"></i></div>
                        <div id="pan-right-button" class="pan-button text-danger" style="display: none;" data-original-title="" title=""><i class="fad fa-chevron-circle-right fa-2x" aria-hidden="true"></i></div>
                    </div>
                    <!----> 
                    <canvas oncontextmenu="return false;" id="play-canvas-frame-1" width="1000" data-orientation="landscape" tabindex="1" hidpi="off" class="landscape" height="750" style="-webkit-user-drag: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); left: -65px; top: -48.875px;" data-paper-scope="1"></canvas>
                    <!----> 
                    <div id="temporary-play-image" style="display: none;">
                        <div class="alert alert-warning mb-0"><i class="fas fa-exclamation-triangle mr-1" aria-hidden="true"></i>Play editing is locked while in Notes mode.
                        </div>
                        <img width="100%">
                    </div>
                </div>
            </div>
        </div>
        <div class="editor-bottom-bar w-full bg-tertiary p-3">
            <div class="flex items-center justify-center md:justify-between md:px-4">
            <div class="bottom-bar-actions flex justify-start gap-2">

                    <button
                    type="button" 
                    v-for="button in actionButtons" :key="button?.id"
                    :class="['bottom-bar-btn flex flex-col items-center gap-2 justify-center cursor-pointer border border-primary rounded', 
                        state.selectedAction?.val == button.val
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-primary']"
                    :data-selected="state.selectedAction?.val === button?.val"
                    @click="handleObjectChange(button)"
                    >
                    <component :is="button?.icon"/>
                    <span class="font-semibold">{{button?.name}}</span>
                    </button>


            </div>
            <div class="second-part hidden md:flex items-center justify-center w-full basis-5/12 gap-3 border-l border-[#B7C9DB] ">
                <div class="h-full w-full mt-6 ps-3 block">
                <div class="bg-themeSoftBg flex items-center gap-1 p-2 justify-between rounded">
                    <label
                    htmlFor="line-scrimmage"
                    class="p-0 m-0 cursor-pointer text-base text-primary"
                    >
                    Line of Scrimmage
                    </label>
                    <Switch id="line-scrimmage" :checked="Array.isArray(store.lineOfScrimmage) ? looseIndexOf(store.lineOfScrimmage,null) > -1 : store.lineOfScrimmage"
                        @update:checked="store.onScrimmageUpdate" class="m-0" />
                </div>
                </div>
                <div class="block w-full px-3 type-player">
                <span class="mb-2 text-gray-700 text-sm">Type of play</span>
                <div class="editor-secondary-header-field-background-select">
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </div>
            </div>
        </div>
        <Drawer v-model:open="state.open" >
            <DrawerContent class="">
                <div class="absolute -top-10 left-5 vaul-sticky-close px-3 pt-1">
                <DrawerClose class="px-5 pt-2 pb-1 flex items-center justify-center gap-2">
                    <div class="flex items-center justify-start gap-2">
                    <component :is="state.selectedAction?.icon"/>
                    <span class="capitalize">{{state.selectedAction?.name}}</span>
                    </div>
                    <IconChevronRight classes="rotate-90" />
                    <CloseIcon />
                </DrawerClose>
                </div>
                <DrawerHeader>
                <div class="drawer-content flex items-start flex-wrap xl:flex-nowrap justify-start w-full" :data-value="state.selectedAction.val">
                    <template v-if="state.selectedAction?.val== 'player'" >
                        <!-- <PlayerActions />
                        <PlayerSizeShape />
                        <TextShadeStyle />
                        <OutlineStyle />
                        <FillStoreColor /> -->
                        <PlayerTabComponent ref="playerTabRef" :player="store.tabData.player"/>
                    </template>
                    
                    <template v-else-if="state.selectedAction?.val== 'line'">
                        <!-- <PlayerActions />
                        <ThicknessStyle />
                        <LineColorEndPoint /> -->
                        <LineTabComponent ref="lineTabRef" :line="store.tabData.line"/>
                    </template>
                    <template v-else-if="state.selectedAction?.val == 'text'">
                        <!-- <TextBlockActions />
                        <TextBlockInput />
                        <TextFormatSize />
                        <TextBlockColor /> -->
                        <TextTabComponent ref="textTabRef" :text="store.tabData.text"/>
                    </template>
                    <template v-else-if="state.selectedAction?.val == 'symbol'">
                        <!-- <SymbolActionBlock /> -->
                         <SymbolTabComponent ref="symbolTabRef" :symbol="store.tabData.symbol"/>
                    </template>
                    <template v-else-if="state.selectedAction?.val == 'notes'">
                        <!-- <NotesBlock /> -->
                         <NotesTabComponent ref="notesTabRef" :notes-data="store.tabData.firstDownNotes"/>
                    </template>
                    <template v-else-if="state.selectedAction?.val == 'video'">
                        <VideoListBlock />
                        <AddVideoBlock />
                    </template>
                </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
</template>

<script setup lang="ts">
    /* eslint-disable */
    // @ts-nocheck
    import $ from 'jquery';
    import axios from '../../lib/AxiosClient';
    import paper from 'paper'
    import PrimaryHeader from '../PrimaryHeader.vue';
    import SecondaryHeader from '../SecondaryHeader.vue';
    import BottomActionsBar from '../BottomActionsBar.vue';
    import TextIcon from '../icons/TextIcon.vue';
    import PlayerIcon from '../icons/PlayerIcon.vue';
    import LineIcon from '../icons/LineIcon.vue';
    import SymbolIcon from '../icons/SymbolIcon.vue';
    import NotesIcon from '../icons/NotesIcon.vue';
    import VideoIcon from '../icons/VideoIcon.vue';
    import IconChevronRight from '../icons/IconChevronRight.vue';
    import CloseIcon from '../icons/CloseIcon.vue';
    import NotesBlock from "../NotesBlock.vue";
    import VideoListBlock from "../VideoListBlock.vue";
    import AddVideoBlock from "../AddVideoBlock.vue";
    import { ref, getCurrentInstance, reactive, onMounted, nextTick, watch,defineProps, useTemplateRef, shallowRef } from 'vue';
    import PlayerTabComponent from './PlayerTabComponent.vue';
    import LineTabComponent from './LineTabComponent.vue';
    import SymbolTabComponent from './SymbolTabComponent.vue';
    import TextTabComponent from './TextTabComponent.vue';
    import NotesTabComponent from './NotesTabComponent.vue';
    import { loadPaperScript } from '@/lib/paperScriptLoader';
    import paperScriptContent from '@/assets/paperScript.js?raw';

    import { Switch } from "@/components/ui/switch";

    import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    } from '@/components/ui/select';

    import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger,
    DrawerHeader,
    } from "@/components/ui/drawer";

    import { usePlayStore } from '@/stores/play';
    import { labelColors,outlineThicknesses,colors,outlineStyles,playerSizes,playerShapes,fillShadings,lineThicks,lineColors,lineEndpoints,lineInserts,lineStyles,shapes,textColors,fontSizes } from '@/lib/Objects';
import { looseIndexOf } from '@/helpers/general';
    const store = usePlayStore();
    const instance = getCurrentInstance();

    // const playerTabRef = ref(null)
    const playerTabRef = useTemplateRef('playerTabRef')
    const notesTabRef = useTemplateRef('notesTabRef')
    
    const actionButtons = shallowRef([
        {
            id: 1,
            name: "Player",
            val: "player",
            icon: PlayerIcon,
        },
        {
            id: 2,
            name: "Line",
            val: "line",
            icon: LineIcon,
        },
        {
            id: 3,
            name: "Text",
            val: "text",
            icon: TextIcon,
        },
        {
            id: 4,
            name: "Symbol",
            val: "symbol",
            icon: SymbolIcon,
        },
        {
            id: 5,
            name: "Notes",
            val: "notes",
            icon: NotesIcon,
        },
        {
            id: 6,
            name: "Video",
            val: "video",
            icon: VideoIcon,
        }
    ]);

    // const {audits,canUseVideo,jsonObject,playOrientation,playTemplateCategories,
    //     previousUrl,sportsFields,tagCategorySets,videoTypes} = defineProps({
    //     audits: {
    //         type: Array,
    //         required: !1
    //     },
    //     canUseVideo: {
    //         type: Boolean,
    //         required: !1,
    //         default: !1
    //     },
    //     jsonObject: {
    //         type: Object,
    //         required: !1
    //     },
    //     play: {
    //         type: Object,
    //         required: !1
    //     },
    //     playOrientation: {
    //         type: Number,
    //         required: !1,
    //         default: 0
    //     },
    //     playTemplateCategories: {
    //         type: Array,
    //         required: !1,
    //         default(){
    //           return []
    //         }
    //     },
    //     previousUrl: {
    //         type: String,
    //         required: !1
    //     },
    //     product: {
    //         type: Object,
    //         required: !0
    //     },
    //     sportsFields: {
    //         type: Array,
    //         required: !0
    //     },
    //     tagCategorySets: {
    //         type: Array,
    //         required: !1
    //     },
    //     user: {
    //         type: Object,
    //         required: !0
    //     },
    //     videoTypes: {
    //         type: Array,
    //         required: !0
    //     }
    // })



    const state = ref({
        open: false,
        selectedAction: {
            id: actionButtons.value[0].id,
            name: actionButtons.value[0].name,
            val:  actionButtons.value[0].val,
            icon: actionButtons.value[0].icon
        }
    })
    
    function handleObjectChange(newVal:any){
        const abc = actionButtons.value.find((btn:any)=>btn.name == newVal.name);
        state.value.open = !state.value.open;
        
        if(abc){
            store.showTab(abc?.val)
            state.value.selectedAction.id = abc.id;
            state.value.selectedAction.name = abc.name;
            state.value.selectedAction.val = abc.val;
            state.value.selectedAction.icon = abc.icon;
        }
    }

    function setCanvasDimensions() {
        store.canvasDimensionRatio = store.play.sportField.width / store.play.sportField.height;
        store.canvasHeight = store.canvasWidth / store.canvasDimensionRatio;
        console.log(store.canvasDimensionRatio,store.canvasHeight, store.canvasWidth)
        // this.rightPaneContentHeight = this.canvasHeight - 40 + "px"
    }

    function setProductOnPaperscript() {
        window.pbt && window.pbt.paperPlayEditor.setProduct(store.product.name)
    }

    function setVisiblePlayArea() {
        var e = $("#left-pane-tabs").width()
        , t = $("#play-editor-left-pane");
        if (t.css({
            maxWidth: e,
            maxHeight: "firstdown" == store.product.name ? e / store.canvasDimensionRatio : ""
        }),
        t.width() < store.canvasWidth) {
            console.log("IF")
            $("#play-canvas-frame-1").css({
                left: t.width() / 2 - store.canvasWidth / 2,
                top: t.height() / 2 - store.canvasHeight / 2
            });
            var n = store.scope.view.center.x - t.width() / 2
            , o = store.scope.view.center.y - t.height() / 2;
            store.scope.view.visiblePlayArea = new store.scope.Rectangle(new store.scope.Point(n,o),new store.scope.Size(t.width(),t.height()))
        } else{
            store.scope.view.visiblePlayArea = new store.scope.Rectangle(new store.scope.Point(0,0),new store.scope.Size(store.canvasWidth,store.canvasHeight));
        }
        store.scope.containerZoom = t.width() < store.canvasWidth ? t.width() / store.canvasWidth : 1,
        store.scope.view.zoom = store.scope.containerZoom
    }

    function changeSportsField() {
        var e = this;
        // window.pbt.paperPlayEditor.addSentryBreadcrumb("User changed sports field to field #" + this.selectedSportsFieldId + ".", "info", "User Action"),
        store.updatingPlay = !0,
        // /api/Sports/Fields/{fieldId}/Detail
        axios.get("/api/sports/fields/".concat(store.selectedSportsFieldId.toString(), "/detail")).then((function(t) {
            const sportsField = t.data.data;
            store.updatingPlay = !1,
            store.isDirty = !0,
            store.selectedSportsField = sportsField,
            // e.selectedSportsFieldLevel = e.getSportsFieldLevel(e.selectedSportsField.tags),
            // e.selectedSportsFieldTags = e.selectedSportsField.tags,
            setCanvasDimensions(),
            // e.resizeView(),
            setVisiblePlayArea(),
            window.pbt.paperPlayEditor.changeSportsFieldOnAllFrames(sportsField.img)
        }
        )).catch((function(t) {
            store.updatingPlay = !1
        }
        ))
    }

    async function loadPlayJson(e:any) {
        store.selectedSportsField = store.play.sportField,
        //   "firstdown" == this.product.name && (this.$refs.firstDownNotesTabRef.notes = this.play.play_notes),
        store.notes = store.play.notes,
        //  this.$refs.videoTabRef.videos = this.play.videos,
        await nextTick()

        for (var e:any = 0; e < store.visibleFrames.length; e++) {
            var n = e + 1;
            window.pbt.paperPlayEditor.initializeFrame(n),
            window.pbt.paperPlayEditor.loadFieldBackground(store.play.sportField.img, n),
            window.pbt.paperPlayEditor.loadFrameJson(store.play.playJson, n)
        }
    }

    function loadPlayNotes() {
        var e = store.notes;
        if (e)
            for (var t = 0; t < e.length; t++)
                store.frameNotes[e[t]?.position] = e[t].body;
        instance?.proxy?.$forceUpdate();
    }

    function loadPlay(){
        setProductOnPaperscript(),
        setVisiblePlayArea()
        store.play && (loadPlayJson(store.play.id),
        "fastbreak" == store.product.name && loadPlayNotes())
    }

    watch(
        ()=>store.selectionArray,
        (value:any,oldValue:any)=>{
            console.log("Notes Ref",instance?.refs,notesTabRef.value)
            store.showTab("player")
            store.isDirty = !0;
            var n = value.filter((function(e) {
                return "END_SYMBOL" == e.fdpbType
            }
            ));
            if (n.length) {
                var o = n[0].style.symbolType.toLowerCase()
                , s = lineEndpoints[store.product.name].filter((function(e) {
                    return e.text.toLowerCase() == o
                }
                ));
                store.tabData.line.endpoint = s.length ? s[0].id : 0,
                "line" !== store.tab && "templates" !== store.tab && store.showTab("line")
            }
            var r = value.filter((function(e) {
                return "INSERT_SYMBOL" == e.fdpbType
            }
            ));
            if (r.length) {
                var i = r[0].style.symbolType.toLowerCase()
                , a = lineInserts[store.product.name].filter((function(e) {
                    return e.text.toLowerCase() == i
                }
                ));
                store.tabData.line.inserts = a.length ? a[0].id : 0,
                "line" !== store.tab && "templates" !== store.tab && store.showTab("line")
            }
            var l = value.filter((function(e) {
                return "LINE_SEGMENT" == e.fdpbType
            }
            ));
            if (l.length) {
                var d = l[0].style.strokeWidth
                , c = lineThicks.filter((function(e) {
                    return e.width == d
                }
                ));
                store.tabData.line.thickness = c.length ? c[0].id : 2;
                var u = l[0].style.strokeStyle.toLowerCase()
                , p = lineStyles[store.product.name].filter((function(e) {
                    return e.text.toLowerCase() == u
                }
                ));
                store.tabData.line.style = p.length ? p[0].id : 1;
                var f = l[0].style.strokeColor.toLowerCase()
                , m = lineColors.filter((function(e) {
                    return e.hex.toLowerCase() == f
                }
                ));
                store.tabData.line.color = m.length ? m[0].id : 1,
                n.length || (store.tabData.line.endpoint = 0),
                r.length || (store.tabData.line.inserts = 0),
                "line" !== store.tab && "templates" !== store.tab && store.showTab("line")
            }
            var h = value.filter((function(e:any){
                return "BASKETBALL_DEFENSE_PLAYER_SYMBOL" == e.fdpbType
            }));
            if(h.length){
                var v = h[0].style
                , y = h[0].style.text;
                store.tabData.player.labelText = y;
                var g = h[0].style.textColor.toLowerCase()
                , b = labelColors.filter((function(e) {
                    return e.hex.toLowerCase() == g
                }
                ));
                store.tabData.player.labelColor = b.length ? b[0].id : 1;
                var _ = (h[0].style.fillColor || "").toLowerCase()
                , w = colors.filter((function(e) {
                    return e.hex.toLowerCase() == _
                }
                ));
                store.tabData.player.fillColor = w.length ? w[0].id : 0;
                var C = h[0].style.strokeWidth
                , x = outlineThicknesses.filter((function(e) {
                    return e.width == C
                }
                ));
                store.tabData.player.outlineThickness = x.length ? x[0].id : 2;
                var j = h[0].style.strokeStyle ? h[0].style.strokeStyle.toLowerCase() : null
                , S = outlineStyles.filter((function(e) {
                    return e.text.toLowerCase() == j
                }
                ));
                store.tabData.player.outlineStyle = S.length ? S[0].id : 1;
                var k = h[0].style.strokeColor ? h[0].style.strokeColor.toLowerCase() : null
                , T = colors.filter((function(e) {
                    return e.hex.toLowerCase() == k
                }
                ));
                store.tabData.player.outlineColor = T.length ? T[0].id : 0,
                store.showTab("player")
            }
            var P = value.filter((function(e:any) {
                return "PLAYER_SYMBOL" == e.fdpbType
            }));
            if(P.length){
                v = P[0].style;
                var O = P[0].style.text.toLowerCase();
                store.tabData.player.labelText = O.toUpperCase();
                var G = P[0].speed;
                store.tabData.player.speed = G;
                var M = v.playerShapeWidth
                ,N = playerSizes.filter((function(e) {
                    return e.playerShapeWidth == M
                }
                ));
                store.tabData.player.playerSize = N.length ? N[0].id : 2;
                var $ = P[0].style.textColor.toLowerCase()
                , A = labelColors.filter((function(e) {
                    return e.hex.toLowerCase() == $
                }
                ));
                store.tabData.player.labelColor = A.length ? A[0].id : 1;
                var E = (P[0].style.shapeType || "").toLowerCase()
                , D = playerShapes[store.product.name].filter((function(e) {
                    return e.type.toLowerCase() == E
                }
                ));
                store.tabData.player.playerShape = D.length ? D[0].id : 3;
                var R = (P[0].style.fillColor || "").toLowerCase()
                , F = colors.filter((function(e) {
                    return e.hex.toLowerCase() == R
                }
                ));
                store.tabData.player.fillColor = F.length ? F[0].id : 0;
                var I = P[0].style.shadowStyle.toLowerCase()
                , L = fillShadings.filter((function(e) {
                    return e.text.toLowerCase() == I
                }
                ));
                store.tabData.player.fillShading = L.length ? L[0].id : 0;
                var B = P[0].style.strokeWidth
                , V = outlineThicknesses.filter((function(e) {
                    return e.width == B
                }
                ));
                store.tabData.player.outlineThickness = V.length ? V[0].id : 2;
                var z = P[0].style.strokeStyle ? P[0].style.strokeStyle.toLowerCase() : null
                , G = outlineStyles.filter((function(e) {
                    return e.text.toLowerCase() == z
                }
                ));
                store.tabData.player.outlineStyle = G.length ? G[0].id : 1;
                var H = P[0].style.strokeColor ? P[0].style.strokeColor.toLowerCase() : null
                , q = colors.filter((function(e) {
                    return e.hex.toLowerCase() == H
                }
                ));
                store.tabData.player.outlineColor = q.length ? q[0].id : 0,
                "player" !== store.tab && "templates" !== store.tab && store.showTab("player")
                
            }
            var U = value.filter((function(e) {
                return "SVG_SYMBOL" == e.fdpbType
            }
            ));
            if (U.length) {
                var W = U[0].style.symbolName
                , K = shapes[store.product.name].filter((function(e) {
                    return e.identifier == W
                }
                ));
                store.tabData.symbol.shape = K.length ? K[0].identifier : "firstdown" == store.product.name ? "football" : "basketball",
                "symbol" !== store.tab && "templates" !== store.tab && store.showTab("symbol")
            }
            var J = value.filter((function(e) {
                return "TEXT_BOX" == e.fdpbType
            }
            ));
            if (J.length) {
                var Y = J[0].style.fontSize
                , X = fontSizes.filter((function(e) {
                    return e.size == Y
                }
                ));
                store.tabData.text.size = X.length ? X[0].id : 2;
                var Z = J[0].style.bold
                , Q = J[0].style.italic
                , ee = J[0].style.underline;
                store.tabData.text.format = {
                    none: !Z && !Q && !ee,
                    bold: Z,
                    italic: Q,
                    underline: ee
                };
                var te = (J[0].style.textColor || "").toLowerCase()
                , ne = textColors.filter((function(e) {
                    return e.hex.toLowerCase() == te
                }
                ));
                store.tabData.text.color = ne.length ? ne[0].id : 1;
                var oe = (J[0].style.fillColor || "").toLowerCase()
                , se = textColors.filter((function(e) {
                    return e.hex.toLowerCase() == oe
                }
                ));
                store.tabData.text.backgroundColor = se.length ? se[0].id : 0;
                var re = (J[0].style.strokeColor || "").toLowerCase()
                , ie = textColors.filter((function(e) {
                    return e.hex.toLowerCase() == re
                }
                ));
                store.tabData.text.borderColor = ie.length ? ie[0].id : 0,
                "text" !== store.tab && "templates" !== store.tab && store.showTab("text")
            }
        }
    )

    onMounted(()=>{
        
        const scope = loadPaperScript('play-canvas-frame-1',paperScriptContent)
        store.scope = scope;
        setCanvasDimensions();
        if(document.readyState === 'complete'){
            loadPlay();
        }else{
            $(window).on("load", loadPlay); 
        }
        console.log("Notes Ref",notesTabRef.value)
    })

</script>
