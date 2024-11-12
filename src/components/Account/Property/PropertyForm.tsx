"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CommercialSubType,
  Currency,
  IndustrialSubType,
  PropertyType,
  Purpose,
  ResidentialSubType,
} from "@/interface/property";
import { nigerianStates } from "@/lib/utils";
import {
  defaultValues,
  PropertyFormValues,
  propertySchema,
} from "@/lib/validations/property";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { Controller, useForm, useWatch } from "react-hook-form";
import { createProperty } from "@/lib/property";
import { toast } from "@/hooks/use-toast";

export default function PropertyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<PropertyFormValues>({
    defaultValues: { ...defaultValues, images: [] },
    resolver: zodResolver(propertySchema),
  });

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [ownershipDocument, setOwnershipDocument] = useState<File | null>(null);

  const images = useWatch({
    control,
    name: "images",
    defaultValue: [],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("images", [...images, ...files], { shouldValidate: true });
  };

  const removeImage = (index: number) => {
    setValue(
      "images",
      images.filter((_: File, i: number) => i !== index),
      { shouldValidate: true },
    );
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOwnershipDocument(file);
      setValue("ownershipDocument", file);
    }
  };

  const propertyType = useWatch({
    control,
    name: "propertyType",
  });

  const onSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => formData.append(`images`, file));
        } else if (key === "ownershipDocument" && value instanceof File) {
          formData.append(key, value);
        } else if (key === "amenities" && typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, String(value));
        }
      }

      const result = await createProperty(formData);
      console.log(result);
      toast({
        title: "Property added Successfully",
        description: "Wait for admin approval.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add property",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-6 bg-white-A700 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor="purpose">Purpose</Label>
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full border-gray_shadow border bg-white-A700">
                  <SelectValue placeholder="Select Purpose" />
                </SelectTrigger>
                <SelectContent className="bg-white-A700">
                  {Object.values(Purpose).map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.purpose && (
            <span className="text-red-500">{errors.purpose.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full border-gray_shadow border bg-white-A700">
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-white-A700">
                  {Object.values(PropertyType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.propertyType && (
            <p className="text-red-500">{errors.propertyType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subType">Sub Type</Label>
          <Controller
            name="subType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full border-gray_shadow border bg-white-A700">
                  <SelectValue placeholder="Select Sub Type" />
                </SelectTrigger>
                <SelectContent className="bg-white-A700">
                  {propertyType === PropertyType.RESIDENTIAL &&
                    Object.values(ResidentialSubType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  {propertyType === PropertyType.COMMERCIAL &&
                    Object.values(CommercialSubType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  {propertyType === PropertyType.INDUSTRIAL &&
                    Object.values(IndustrialSubType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.subType && (
            <p className="text-red-500">{errors.subType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="currency">Currency</Label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full border-gray_shadow border bg-white-A700">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent className="bg-white-A700">
                  {Object.values(Currency).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.currency && (
            <p className="text-red-500">{errors.currency.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            {...register("bedrooms", { valueAsNumber: true })}
          />
          {errors.bedrooms && (
            <p className="text-red-500">{errors.bedrooms.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            {...register("bathrooms", { valueAsNumber: true })}
          />
          {errors.bathrooms && (
            <p className="text-red-500">{errors.bathrooms.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="toilets">Toilets</Label>
          <Input
            id="toilets"
            type="number"
            {...register("toilets", { valueAsNumber: true })}
          />
          {errors.toilets && (
            <p className="text-red-500">{errors.toilets.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="size">Size (sqft)</Label>
          <Input
            id="size"
            type="number"
            {...register("size", { valueAsNumber: true })}
          />
          {errors.size && <p className="text-red-500">{errors.size.message}</p>}
        </div>

        <div>
          <Label htmlFor="slots">Slots</Label>
          <Input
            id="slots"
            type="number"
            {...register("slots", { valueAsNumber: true })}
          />
          {errors.slots && (
            <p className="text-red-500">{errors.slots.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register("address")} />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="stateCapital">State Capital</Label>
          <Controller
            name="stateCapital"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full border-gray_shadow border bg-white-A700">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-white-A700">
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.stateCapital && (
            <p className="text-red-500">{errors.stateCapital.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="videoUrl">Video URL (optional)</Label>
          <Input id="videoUrl" {...register("videoUrl")} />
          {errors.videoUrl && (
            <p className="text-red-500">{errors.videoUrl.message}</p>
          )}
        </div>
      </div>

      <Card className="bg-gray-50_01">
        <CardContent className="pt-6">
          <Label className="mb-4 block text-lg font-semibold text-gray-900">
            Amenities
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(propertySchema.shape.amenities.shape).map(
              (amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Controller
                    name={
                      `amenities.${amenity}` as `amenities.${keyof typeof propertySchema.shape.amenities.shape}`
                    }
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={amenity}
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        className="border-gray-300"
                      />
                    )}
                  />
                  <Label htmlFor={amenity} className="text-sm text-gray-900">
                    {amenity.charAt(0).toUpperCase() +
                      amenity.slice(1).replace(/([A-Z])/g, " $1")}
                  </Label>
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="images">Property Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          ref={imageInputRef}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => imageInputRef.current?.click()}
          className="w-full"
        >
          Select Images
        </Button>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {images.map((file: File, index: number) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Property image ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-24 object-cover rounded"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="ownershipDocument">Ownership Document</Label>
        <Input
          id="ownershipDocument"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleDocumentUpload}
        />
        {errors.ownershipDocument && (
          <p className="text-red-500">{errors.ownershipDocument.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-red-100_01 hover:bg-red-200 text-gray-900"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Property"}
      </Button>
    </form>
  );
}
