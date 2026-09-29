"use client";

import SubmitButton from "@/components/SubmitButton";
import useApp from "@/context/useApp";
import { fieldTypes, PlaySize } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import { allFieldTypes } from "@/lib/Editor";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  groupId: z.string().nullable(),
  sportFieldId: z.number().min(0, { message: "Sport field is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  orientation: z.boolean(),
  published: z.boolean(),
  isCommunityPlay: z.boolean(),
  play: z.string().nullable(),
});

type formType = z.infer<typeof schema>;
const CreatePlayFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
    getValues,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      groupId: null,
      orientation: false,
      published: true,
      isCommunityPlay: false,
      play: null,
      sportFieldId: undefined,
    },
  });
  const [playName, setPlayName] = useState("");
  const [playSize, setPlaySize] = useState<PlaySize>("Short");
  const [fieldType, setFieldType] = useState<fieldTypes>("High School Tackle");
  const [fieldPosition, setFieldPosition] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { setToaster, selectedTeam } = useApp();
  const router = useRouter();

  const handlePlayNameChange = (event: any) => {
    setPlayName(event.target.value);
  };

  const handlePlaySizeChange = (value: PlaySize) => {
    setPlaySize(value);
  };

  const handleFieldPositionChange = (event: any) => {
    setFieldPosition(event.target.value);
  };

  const onSubmit = async (data: formType) => {
    try {
      const res = await fetchClient(`/api/Plays/${selectedTeam?.id}/New`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Play created successfully");
        if (res?.data) {
          router.push(`/plays/${res?.data}`);
        }
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPositions = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Sports/Fields/Select?playSize=${playSize}&fieldType=${fieldType}`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setFieldPosition(data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPositions();
  }, [playSize, fieldType]);

  //console.log(getValues())
  return (
    <div className="py-10 px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto create-play-form"
      >
        <div className="mb-3">
          <label htmlFor="playName">Play Name:</label>
          <input type="text" {...register("name")} className="input--field" />
          {errors?.name && (
            <p className="py-2 text-sm text-red-500">{errors?.name?.message}</p>
          )}
        </div>
        <p className="font-medium mb-3">
          Play Size <span className="text-red-400">*</span>
        </p>
        <div className="mb-3 flex items-start justify-start gap-4 play-size-fields flex-wrap">
          <div
            onClick={() => handlePlaySizeChange("Short")}
            className={`p-2 border border-inputBorder rounded flex items-center justify-center flex-col text-center cursor-pointer ${
              playSize === "Short" ? "active" : ""
            }`}
          >
            <span className="text-sm mb-1">Short Field</span>
            <Image
              src={
                "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707907420/cc-site-assets/dashboard-assets/image_50_i2n22v.png"
              }
              alt="Short Field Image"
              width={100}
              height={100}
            />
          </div>
          <div
            onClick={() => handlePlaySizeChange("Long")}
            className={`p-2 border border-inputBorder rounded flex items-center justify-center flex-col text-center  cursor-pointer ${
              playSize === "Long" ? "active" : ""
            }`}
          >
            <span className="text-sm mb-1">Long Field</span>
            <Image
              src={
                "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726303674/image_51_e2xhmq.png"
              }
              alt="Long Field Image"
              width={100}
              height={200}
            />
          </div>
        </div>
        <p className="font-medium mb-3">
          Field Type <span className="text-red-400">*</span>
        </p>
        <div className="flex items-center justify-start gap-4 field-type-fields mb-4 flex-wrap">
          {allFieldTypes?.map((type) => {
            return (
              <div key={type?.value}>
                <input
                  type="radio"
                  id={type?.value}
                  value={type?.value}
                  checked={fieldType === type?.value}
                  onChange={() => setFieldType(type?.value)}
                  className="sr-only"
                />
                <label
                  htmlFor={type?.value}
                  className="px-3 py-1 border border-inputBorder text-inputBorder cursor-pointer rounded"
                >
                  {type?.label}
                </label>
              </div>
            );
          })}
        </div>
        <p className="font-medium mb-3">
          Field Position <span className="text-red-400">*</span>
        </p>
        <div className="flex items-start justify-start gap-4 mb-4  play-size-fields flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : fieldPosition && fieldPosition?.length > 0 ? (
            fieldPosition?.map((position: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => setValue("sportFieldId", position?.id)}
                >
                  <label
                    htmlFor="sportFieldId"
                    className={`p-2 border border-inputBorder rounded flex items-center justify-center flex-col text-center cursor-pointer ${
                      watch("sportFieldId") === position?.id
                        ? "bg-[#ECF2F9] border-primary"
                        : ""
                    }`}
                  >
                    <span className="text-sm mb-1">{position?.name}</span>
                    <Image
                      src={
                        "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707907420/cc-site-assets/dashboard-assets/image_50_i2n22v.png"
                      }
                      alt="Short Field Image"
                      width={100}
                      className="opacity-1"
                      height={100}
                    />
                  </label>
                </div>
              );
            })
          ) : (
            <p>No Field Position!</p>
          )}

          {/* <div>
            <input
              type="radio"
              id="backedUp"
              value="backedUp"
              checked={fieldPosition === "backedUp"}
              onChange={handleFieldPositionChange}
              className="sr-only"
            />
            <label
              htmlFor="backedUp"
              className="p-2 border border-inputBorder rounded flex items-center justify-center flex-col text-center cursor-pointer"
            >
              <span className="text-sm mb-1">Backed Up</span>
              <Image
                src={
                  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726304909/image_51_1_l9eyrw.png"
                }
                alt="Backed Up Image"
                width={100}
                height={100}
              />
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="redZone"
              value="redZone"
              checked={fieldPosition === "redZone"}
              onChange={handleFieldPositionChange}
              className="sr-only"
            />
            <label
              htmlFor="redZone"
              className="p-2 border border-inputBorder rounded flex items-center justify-center flex-col text-center cursor-pointer"
            >
              <span className="text-sm mb-1">Red Zone</span>
              <Image
                src={
                  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726304978/image_50_dojzhk.png"
                }
                alt="Red Zone Image"
                width={100}
                height={100}
              />
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="midField"
              value="midField"
              checked={fieldPosition === "midField"}
              onChange={handleFieldPositionChange}
              className="sr-only"
            />
            <label
              htmlFor="midField"
              className="p-2 border border-inputBorder rounded flex items-center justify-center flex-col text-center cursor-pointer"
            >
              <span className="text-sm mb-1">Mid-Field</span>
              <Image
                src={
                  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726305086/image_50_1_eypcft.png"
                }
                alt="Mid-Field Image"
                width={100}
                height={100}
              />
            </label>
          </div> */}
        </div>
        {errors?.sportFieldId && (
          <p className="py-2 text-sm text-red-500">
            {errors?.sportFieldId?.message}
          </p>
        )}
        <div className="flex items-center justify-end">
          <SubmitButton
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePlayFrom;
