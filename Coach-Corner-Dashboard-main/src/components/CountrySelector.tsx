import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuChevronsUpDown } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import countries, { country } from "@/lib/countries";

const CountrySelector = ({ onChange, count }: any) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [list, setList] = useState<country[]>(countries);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    if (value) {
      const result = list.filter((item) =>
        item.value?.toLowerCase().includes(value.trim().toLowerCase())
      );
      setList(result);
    } else {
      setList(countries);
    }
  };
  const handleOnChange = (value: country) => {
    setSelected(value?.value);
    setOpen(!open);
    if (onChange) {
      onChange(value?.value);
    }
  };
  const handleClear = () => {
    setSelected("");
    onChange("");
  };
  useEffect(() => {
    setSelected(count);
  }, [count]);

  return (
    <div>
      {loading ? (
        <Skeleton className="w-full h-[34px]" />
      ) : (
        <>
          <Popover open={open} onOpenChange={(value) => setOpen(value)}>
            <div className="org-slt-btn w-full flex items-center justify-between px-2 py-1 border rounded border-gray-300 min-h-[38px]">
              <PopoverTrigger
                onClick={() => setOpen(!open)}
                className="w-full text-left text-sm"
              >
                {selected ? (
                  selected
                ) : (
                  <span className="text-gray-500 text-sm">Select Country</span>
                )}
              </PopoverTrigger>
              {selected ? (
                <RxCross2
                  onClick={() => handleClear()}
                  className=" cursor-pointer"
                />
              ) : (
                <LuChevronsUpDown
                  onClick={() => setOpen(!open)}
                  className="ml-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
                />
              )}
            </div>
            <PopoverContent className="w-full h-auto max-w-xs min-w-80 py-2">
              <input
                type="text"
                name="name"
                className="input--field mb-2"
                placeholder="Search by name"
                autoComplete="off"
                value={value}
                onChange={(e) => handleInputChange(e)}
              />
              <hr className="py-1" />
              <div className="max-h-52 overflow-auto w-full h-full flex flex-col !pointer-events-auto">
                {list?.map((item) => {
                  if (!item?.value) return;
                  return (
                    <button
                      type="button"
                      className="px-1 py-1 text-sm text-gray-700 text-left"
                      onClick={() => handleOnChange(item)}
                      key={item?.label}
                    >
                      {item?.label}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
};

export default CountrySelector;
