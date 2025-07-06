"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuMapPin, LuBrainCircuit } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

import { Button, Input, FileInput } from "@/src/components/ui";
import { publicService } from "@/src/lib/services/PublicService";
import { Loader } from "@/src/components/loaders";
import type { AnalyzeFormData, GeoApiSuggestedLocation } from "./types";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AnalyzeFormData>({
    defaultValues: {
      preferred_location: "",
      expected_salary: "",
    },
    mode: "onChange",
  });

  const [searching, setSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [isEditingLocation, setIsEditingLocation] = useState<boolean>(false);
  const [locationSelected, setLocationSelected] = useState<boolean>(false);

  const locationValue = watch("preferred_location");

  const onSubmit = async (data: AnalyzeFormData) => {
    setAnalyzing(true);
    try {
      console.log(data);
      const res = await publicService.analyze(data);
      console.log(res);
      setSearchResults([]);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSearch = useDebouncedCallback(async (text: string) => {
    setSearching(true);
    try {
      const res = await publicService.getLocationSuggestions(text);
      const suggestions =
        res?.features?.map(
          (item: GeoApiSuggestedLocation) => item.properties.formatted
        ) ?? [];
      setSearchResults(suggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    } finally {
      setSearching(false);
    }
  }, 300);

  useEffect(() => {
    const trimmedValue = locationValue?.trim();

    if (locationSelected) return;

    if (!trimmedValue) {
      setSearchResults([]);
      return;
    }

    if (trimmedValue.length < 3) return;

    handleSearch(trimmedValue);
  }, [handleSearch, locationValue, locationSelected]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="mb-8 text-2xl sm:text-3xl font-semibold tracking-tight">
        Analyze your resume
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="relative">
          <Input
            label="Location"
            leftIcon={<LuMapPin size={18} className="text-gray-600" />}
            rightIcon={searching && <Loader className="text-gray-600" />}
            placeholder="Enter a preferred job location"
            errorMessage={errors.preferred_location?.message}
            {...register("preferred_location", {
              required: "Please enter a location",
              minLength: {
                value: 3,
                message: "Please enter at least 3 characters",
              },
            })}
            onChange={(e) => {
              const newValue = e.target.value;

              // If editing after selecting, clear the value and reset state
              if (locationSelected) {
                setValue("preferred_location", "", {
                  shouldValidate: true,
                });
                setLocationSelected(false);
              } else {
                setValue("preferred_location", newValue, {
                  shouldValidate: true,
                });
              }

              setIsEditingLocation(true);
            }}
          />

          {/* Suggestions Dropdown */}
          {isEditingLocation && searchResults.length > 0 && (
            <ul className="absolute z-10 mt-1 border bg-white border-gray-300 rounded h-32 overflow-y-scroll w-full">
              {searchResults.map((option) => (
                <li key={`option-${option}`}>
                  <button
                    onClick={() => {
                      setSearchResults([]);
                      setIsEditingLocation(false);
                      setLocationSelected(true);
                      setValue("preferred_location", option, {
                        shouldValidate: true,
                      });
                    }}
                    className="w-full hover:bg-gray-200 py-1 px-3 text-start cursor-pointer transition-colors duration-300 ease-in-out"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Input
          label="Salary"
          leftIcon={<span className="text-lg text-gray-600">₹</span>}
          placeholder="Enter an expected salary"
          errorMessage={errors.expected_salary?.message}
          {...register("expected_salary", {
            required: "Please enter an expected salary",
            pattern: {
              value: /^\d+$/,
              message: "Please enter a valid number",
            },
            minLength: {
              value: 3,
              message: "Please enter at least 3 digits",
            },
            maxLength: {
              value: 10,
              message: "Please enter at most 10 digits",
            },
          })}
        />

        <FileInput
          label="Resume"
          accept=".pdf"
          multiple={false}
          placeholder="Choose a .pdf file"
          className="mb-4"
          errorMessage={errors.resume_file?.message}
          {...register("resume_file", {
            required: "Please upload a resume",
          })}
        />

        <Button
          type="submit"
          loading={analyzing}
          disabled={searching || analyzing}
          leftIcon={<LuBrainCircuit size={18} />}
        >
          Analyze
        </Button>
      </form>
    </div>
  );
}
