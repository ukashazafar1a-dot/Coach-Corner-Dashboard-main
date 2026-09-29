"use client";
import TopBar from "@/components/TopBar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { GoCopy } from "react-icons/go";
import { MdDownload } from "react-icons/md";
import { PiNoteLight, PiPrinter } from "react-icons/pi";
import { TfiExchangeVertical } from "react-icons/tfi";
import ShareViaEmail from "./ShareViaEmail";
import SectionLoader from "@/components/loaders/SectionLoader";
import fetchClient from "@/hooks/fetchClient";
import useApp from "@/context/useApp";

const SinglePlayPage = () => {
  const [open, setOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { selectedTeam, setToaster } = useApp();
  const [play, setPlay] = useState<any | null>(null);

  const getPlay = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Plays/${selectedTeam?.id}/Play/Detail?teamId=${selectedTeam?.id}&groupId=0&playId=${params?.playId}`
      );
      if (res && res?.succeeded) {
        setPlay(res?.data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRefetch = async () => {
    await getPlay();
  };
  useEffect(() => {
    if (params?.playId) {
      getPlay();
    }
  }, []);
  console.log(play)
  return (
    <>
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          <div>
            <TopBar title={`Play ${params?.playId}`} />
            <div className="block py-6">
              <div className="flex items-center justify-between gap-2 flex-wrap px-4">
                <h3>My Play Name</h3>
                <div className="flex items-center justify-start md:justify-end gap-2 flex-wrap">
                  <button
                    className="btn btn--primary gap-1"
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    <PiNoteLight className="w-5 h-5 fill-white" />
                    <span>Notes</span>
                  </button>
                  <button className="btn btn--primary gap-1">
                    <CiEdit className="w-4 h-4 fill-white" />
                    <span>Edit</span>
                  </button>
                  <button className="btn btn--primary gap-1">
                    <GoCopy className="w-4 h-4 fill-white" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    className="btn btn--primary gap-1"
                    onClick={() => setOpen(!open)}
                  >
                    <TfiExchangeVertical className="w-4 h-4 fill-white" />
                    <span>Flip</span>
                  </button>
                  <ShareViaEmail />
                  <button className="btn btn--primary gap-1">
                    <MdDownload className="w-4 h-4 fill-white" />
                    <span>Download</span>
                  </button>
                  <button className="btn btn--primary gap-1">
                    <PiPrinter className="w-4 h-4 fill-white" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
              <div className="flex items-start justify-center gap-3 flex-col lg:flex-row py-6">
                <div className="flex items-center justify-center basis-full md:basis-7/12 flex-shrink-0 w-full lg:w-auto px-4 lg:px-0">
                  <Image
                    src={
                      open
                        ? "https://fdpb-3-plays.s3.amazonaws.com/plays/931372/04f9699528e2bf2db7fb1bfb588bad0d2539c465a436e7686818cd377155b6a4.png?ts=1731589604"
                        : "https://fdpb-3-plays.s3.amazonaws.com/plays/946109/a3253af930843c4c55e31c2ee8ea69f4481d2494b862522f21f118da9d1e7b2d.png?ts=1731590655"
                    }
                    width={600}
                    height={300}
                    alt="Play Image"
                    className="border"
                  />
                </div>
                {showNotes && (
                  <div className="basis-full  md:basis-5/12 flex-shrink-0 border-l w-full border-t bg-slate-50">
                    <div className="mb-3 p-3 prose-sm">
                      <h4 className="text-xl">
                        <strong>Coaching Points</strong>
                      </h4>{" "}
                      <hr />{" "}
                      <div>
                        <p>FORMATION: 3X1 (GUN) (PISTOL)</p>
                        <p>PLAY: 6OH1 F CORNER H FLAT</p>
                        <p>DROP: QUICK 7 STEP DROP TIMING</p>
                        <p>SUGGESTED READ:</p>
                        <p>MOF OPEN: Z-F-Y</p>
                        <p>MOF CLOSED: H-X-Y</p>
                        <p>X: CURL ROUTE</p>
                        <p>-CHEAT SPLIT INSIDE BY 2 YARDS.</p>
                        <p>-BEST RELEASE TO SELL VERTICAL THREAT.</p>
                        <p>
                          -EXPLODE TO 12 YARDS EATING UP THE DEFENDER’S CUSHION.
                        </p>
                        <p>
                          -PLANT OUTSIDE FOOT IN THE GROUND AND WORK DIRECTLY
                          BACK TO THE QB.
                        </p>
                        <p>-CONVERT ROUTE TO A BENCH ROUTE VS MOF OPEN.</p>
                        <p>
                          -BREAK THE ROUTE TO THE SIDELINE ON 4TH INSIDE STEP.
                        </p>
                        <p>Y: PROTECTION &amp; LEAK</p>
                        <p>-PROTECTION FIRST</p>
                        <p>-RELEASE OVER THE NEAR B GAP LATE.</p>
                        <p>
                          -SIT DOWN AT 2 YARDS AND GIVE THE QB YOUR NUMBERS.
                        </p>
                        <p>
                          -EXPECT THE BALL ON THE SHOULDER AWAY FROM THE NEAREST
                          DEFENDER.
                        </p>
                        <p>Z: HITCH ROUTE</p>
                        <p>-MAX SPLIT.</p>
                        <p>
                          -EXPLODE OFF OF THE BALL AND EAT UP THE CUSHION OF THE
                          DEFENDER.
                        </p>
                        <p>
                          -PLANT OUTSIDE FOOT AT 6 YARDS AND SHOW NUMBERS TO THE
                          QB.
                        </p>
                        <p>-WORK BACK TO THE BALL WHEN IT’S IN THE AIR.</p>
                        <p>-CONVERT TO A GO ROUTE VS PRESS COVERAGE</p>
                        <p>F: CORNER ROUTE</p>
                        <p>
                          -OUTSIDE RELEASE TO A VERTICAL STEM WITH OUTSIDE
                          LEVERAGE ON THE DEFENDER.
                        </p>
                        <p>-BREAK TO THE SIDELINE ON THE 4TH INSIDE STEP.</p>
                        <p>-FLATTEN THE ROUTE VS MOF CLOSED.</p>
                        <p>-KEEP THE ROUTE HIGH VS MOF OPEN.</p>
                        <p>H: FREE RELEASE FLAT ROUTE</p>
                        <p>-CHEAT OUT AND UP IN PRE-SNAP FORMATION</p>
                        <p>-RELEASE TO THE FLAT WITH URGENCY.</p>
                        <p>
                          -LOOK FOR THE BALL IMMEDIATELY AS YOU EXPAND THE CURL
                          AREA.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SinglePlayPage;
