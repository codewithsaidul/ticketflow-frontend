"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEventMutation } from "@/redux/api/eventApi/eventApi";
import { IApiErrorResponse } from "@/types";
import {
  EventCreationFormValues,
  eventCreationSchema,
} from "@/validation/event.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import toast from "react-hot-toast";

const CATEGORIES = ["Music", "Tech", "Sports", "Comedy", "Workshop", "Theater"];

export default function CreateEventPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeStr, setTimeStr] = useState<string>("10:30:00");

  const form = useForm<EventCreationFormValues>({
    resolver: zodResolver(
      eventCreationSchema
    ) as Resolver<EventCreationFormValues>,
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      category: "Music",
      rows: 1,
      cols: 1,
      basePrice: 50,
      minParticipants: 1,
      maxParticipants: undefined,
    },
  });

  // 2. Submission Logic (Handling FormData for Image)
  const onSubmit = async (data: EventCreationFormValues) => {
    if (!date) {
      toast.error("Please Provide the event date & time");
    }
    if (!imageFile) {
      toast.error("Please upload an event banner image.");
      return;
    }

    const toastId = toast.loading("Creating Event...");
    const formData = new FormData();

    formData.append("file", imageFile);

    const combinedDate = new Date(date as Date);
    const [hours, minutes] = timeStr.split(":");
    combinedDate.setHours(Number(hours), Number(minutes));

    const eventPayload = {
      ...data,
      date: combinedDate,
      mode: "ASSIGNED",
      seatLayout: {
        rows: data.rows,
        cols: data.cols,
        basePrice: data.basePrice,
      },
    };

    formData.append("data", JSON.stringify(eventPayload));

    try {
      const res = await createEvent(formData).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        form.reset();
        router.push("/dashboard/host/my-events");
      }
    } catch (error) {
      const err = error as IApiErrorResponse;
      console.log("🚀 ~ onSubmit ~ err:", err);
      toast.error(err?.data?.message || "Event creation failed.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-heading font-bold mb-4">Create New Event</h1>
      <p className="text-muted-foreground">
        Define the event details and seating configuration.
      </p>

      <Card className="shadow-lg border-primary/10">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* === ROW 1: BASIC INFO (TITLE & CATEGORY) === */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Arijit Singh Live" {...field} />
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
              </div>

              {/* === ROW 2: DATE AND LOCATION === */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4">
                  <div className="flex flex-col flex-1 gap-3">
                    <FormLabel htmlFor="date-picker" className="px-1">
                      Date
                    </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date-picker"
                          className="w-full justify-between font-normal"
                        >
                          {date ? date.toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                          }}
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
                        <Input placeholder="Army Stadium, Dhaka" {...field} />
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

              {/* === NEW ROW: PARTICIPANT LIMITS === */}
              <h2 className="text-xl font-bold pt-4 border-t">
                Participant Limits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Participants</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
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
                      <FormLabel>Maximum Participants (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 500"
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
              {/* === END NEW ROW === */}

              {/* === ROW 4: SEATING CONFIG (ROWS, COLS, PRICE) === */}
              <h2 className="text-xl font-bold pt-4 border-t">
                Seating Configuration (ASSIGNED Mode)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="rows"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Rows</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="5"
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
                  name="cols"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seats Per Row (Cols)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10"
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
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Price (৳)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1500"
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
              </div>

              {/* === ROW 5: IMAGE UPLOAD === */}
              <FormField
                control={form.control}
                name="imageFile"
                render={() => (
                  <FormItem>
                    <FormLabel>Event Banner Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a high-resolution banner for the event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-6 h-11 text-base font-bold shadow-lg shadow-primary/20 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Event"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
