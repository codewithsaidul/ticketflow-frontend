"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateEventMutation } from "@/redux/api/eventApi/eventApi";
import { IApiErrorResponse, IEvent } from "@/types";
import {
  EventCreationFormValues,
  eventCreationSchema,
} from "@/validation/event.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, ImagePlus, Loader2, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, startTransition, ChangeEvent } from "react";
import { useForm, type Resolver } from "react-hook-form";
import toast from "react-hot-toast";

const CATEGORIES = ["Music", "Tech", "Sports", "Comedy", "Workshop", "Theater"];

// 1. Define the statuses
const EVENT_STATUSES = [
  "active",
  "pending",
  "postponed",
  "cancelled",
  "finished",
];

interface IEventUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  event: IEvent | null;
}

const EventEditDialog = ({ open, onClose, event }: IEventUpdateDialogProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeStr, setTimeStr] = useState<string>("10:30:00");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<EventCreationFormValues>({
    resolver: zodResolver(
      eventCreationSchema
    ) as Resolver<EventCreationFormValues>,
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: "Music",
      status: "active",
      rows: 1,
      cols: 1,
      basePrice: 50,
      minParticipants: 1,
      maxParticipants: undefined,
    },
  });

  // --- Populate Form Data & Initialize Image Preview ---
  useEffect(() => {
    if (event && open) {
      form.reset({
        title: event.title,
        description: event.description,
        location: event.location,
        category: event.category,
        status: event.status || "active",
        rows: event.seatLayout?.rows || 1,
        cols: event.seatLayout?.cols || 1,
        basePrice: event.seatLayout?.basePrice || 0,
        minParticipants: event.minParticipants,
        maxParticipants: event.maxParticipants,
      });

      if (event.date) {
        const eventDateObj = new Date(event.date);
        startTransition(() => {
          setDate(eventDateObj);
          const timeString = eventDateObj.toTimeString().split(" ")[0];
          setTimeStr(timeString);
        });
      }

      startTransition(() => {
        setImageFile(null);
        setImagePreviewUrl(event.image || null);
      });
    }
  }, [event, open, form]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const onSubmit = async (data: EventCreationFormValues) => {
    if (!event?._id) return;
    if (!date) {
      toast.error("Please provide the event date.");
      return;
    }

    const toastId = toast.loading("Updating Event...");
    const formData = new FormData();

    if (imageFile) {
      formData.append("file", imageFile);
    }

    const combinedDate = new Date(date);
    const [hours, minutes] = timeStr.split(":");
    combinedDate.setHours(Number(hours), Number(minutes));

    const eventPayload = {
      ...data,
      date: combinedDate.toISOString(),
      seatLayout: {
        rows: data.rows,
        cols: data.cols,
        basePrice: data.basePrice,
      },
    };

    formData.append("data", JSON.stringify(eventPayload));

    try {
      const res = await updateEvent({
        eventId: event._id,
        data: formData,
      }).unwrap();

      if (res.success) {
        toast.success("Event updated successfully!", { id: toastId });
        setImageFile(null);
        if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(imagePreviewUrl);
        }
        onClose();
      }
    } catch (error) {
      const err = error as IApiErrorResponse;
      console.error("Update failed:", err);
      toast.error(err?.data?.message || "Event update failed.", {
        id: toastId,
      });
    }
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 shrink-0 border-b">
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>

        {/* Scrollable Form Area */}
        <ScrollArea className="flex-1 w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-6 py-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* === ROW 1: Title, Category, Status === */}
                {/* Changed to 3 columns to accommodate Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="cursor-pointer w-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem
                                key={cat}
                                value={cat}
                                className="cursor-pointer"
                              >
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 4. New Status Field */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="cursor-pointer w-full capitalize">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EVENT_STATUSES.map((status) => (
                              <SelectItem
                                key={status}
                                value={status}
                                className="cursor-pointer capitalize"
                              >
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* === ROW 2: Date, Time, Location === */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-3">
                      <FormLabel className="px-1">Date</FormLabel>
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-between font-normal ${
                              !date && "text-muted-foreground"
                            }`}
                          >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              setDate(newDate);
                              setIsCalendarOpen(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex flex-col flex-1 gap-3">
                      <FormLabel className="px-1">Time</FormLabel>
                      <Input
                        type="time"
                        step="1"
                        value={timeStr}
                        onChange={(e) => setTimeStr(e.target.value)}
                        className="bg-background appearance-none"
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue / Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Venue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* === ROW 3: DESCRIPTION === */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed event description..."
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* === ROW 4: PARTICIPANT LIMITS === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                  <FormField
                    control={form.control}
                    name="minParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* === ROW 5: SEATING CONFIG (READ ONLY) === */}
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-muted-foreground">
                      Seating Configuration
                    </h3>
                    <span className="text-xs text-amber-600 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Layout cannot be changed
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="rows"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Rows</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              type="number"
                              {...field}
                              className="bg-muted text-muted-foreground opacity-100"
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cols"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seats Per Row</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              type="number"
                              {...field}
                              className="bg-muted text-muted-foreground opacity-100"
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price (৳)</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              type="number"
                              {...field}
                              className="bg-muted text-muted-foreground opacity-100"
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* === ROW 6: IMAGE UPDATE === */}
                <div className="border-t pt-4 space-y-4">
                  <FormLabel>Event Banner Image</FormLabel>
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center group">
                    {imagePreviewUrl ? (
                      <>
                        <Image
                          src={imagePreviewUrl}
                          alt="Event banner preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <p className="text-white font-medium flex items-center gap-2">
                            <ImagePlus className="h-5 w-5" /> Change Image
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground pointer-events-none">
                        <ImagePlus className="h-10 w-10 mb-2 opacity-50" />
                        <p>No image uploaded</p>
                      </div>
                    )}

                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleImageChange}
                    />
                  </div>
                  <FormDescription>
                    Click the image area to choose a new banner. Leave unchanged
                    to keep current image.
                  </FormDescription>
                </div>

                {/* === ACTIONS === */}
                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Update Event"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditDialog;
