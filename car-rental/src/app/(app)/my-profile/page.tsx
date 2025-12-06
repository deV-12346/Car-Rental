"use client"
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  User as UserIcon,
  Phone,
  Mail,
  CalendarDays,
  Car,
  Clock,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ProfileUser = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  createdAt?: string;
};

type CarSummary = {
  _id: string;
  brand: string;
  carModel: number;
  images?: { url: string }[];
  pricePerDay: number;
};

type Booking = {
  _id: string;
  carId: CarSummary;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "Booked" | "Completed" | "Cancelled";
  createdAt: string;
};


export default function MyProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/user/my-profile");

        if (!res.data.success || !res.data.data) {
          setError(res.data.message || "Failed to fetch profile");
          return;
        }

        setUser(res.data.data.finduser);
        setBookings(res.data.data.bookings);
      } catch (err) {
        console.error("PROFILE FETCH ERROR:", err);
        setError("Something went wrong while loading your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      await axios.post("/api/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      window.location.reload();
    } catch (err) {
      console.error("IMAGE UPLOAD ERROR:", err);
      setError("Failed to upload profile image.");
    }
  };
  const stats = useMemo(() => {
    const total = bookings.length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    const active = bookings.filter((b) => b.status === "Booked").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
    return { total, completed, active, cancelled };
  }, [bookings]);

  const upcomingBookings = useMemo(
    () =>
      bookings
        .filter((b) => b.status === "Booked")
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        .slice(0, 3),
    [bookings]
  );

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
       <Loader2 className="animate-spin" size={20}/>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-2">
        <p className="text-red-500 text-sm">{error || "User not found."}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 via-slate-700 to-slate-950 text-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-slate-400">
              View and manage your account & bookings.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr,2fr]">
          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="relative w-28 h-28">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover border border-slate-700 shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center border border-slate-800 shadow-lg">
                    <UserIcon className="w-12 h-12 text-white" />
                  </div>
                )}

                <label className="absolute bottom-1 right-1 bg-slate-950/90 border border-slate-700 hover:border-slate-500 text-slate-100 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold cursor-pointer shadow-lg">
                  <span>+</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={uploadImage}
                  />
                </label>
              </div>

              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  {user.name}
                  <Badge
                    variant="outline"
                    className="border-emerald-500/60 text-emerald-400 text-[10px] uppercase tracking-wide"
                  >
                    Verified
                  </Badge>
                </CardTitle>
                <p className="text-xs text-slate-400">
                  Member since {joinedDate}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Separator className="bg-slate-800" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-slate-200">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <Separator className="bg-slate-800" />
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <p className="text-slate-400 mb-1">Total Bookings</p>
                  <p className="text-lg font-semibold">{stats.total}</p>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <p className="text-slate-400 mb-1">Active</p>
                  <p className="text-lg font-semibold text-emerald-400">
                    {stats.active}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <p className="text-slate-400 mb-1">Completed</p>
                  <p className="text-lg font-semibold text-sky-400">
                    {stats.completed}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <p className="text-slate-400 mb-1">Cancelled</p>
                  <p className="text-lg font-semibold text-rose-400">
                    {stats.cancelled}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-sky-400" />
                  Upcoming bookings
                </CardTitle>
                <Badge variant="outline" className="border-slate-700 text-slate-300">
                  {stats.active} active
                </Badge>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    You have no upcoming bookings right now.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {upcomingBookings.map((b) => (
                      <div
                        key={b._id}
                        className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:border-slate-600 transition"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                          {b.carId?.images?.[0]?.url ? (
                            <Image
                              src={b.carId.images[0].url}
                              alt={b.carId.brand}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car className="w-6 h-6 text-slate-500" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-100">
                            {b.carId?.brand} {b.carId?.carModel}
                          </p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(b.startDate).toLocaleDateString()} –{" "}
                            {new Date(b.endDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right text-xs">
                          <p className="text-slate-300 font-semibold">
                            ₹ {b.totalPrice}
                          </p>
                          <Badge className="mt-1 bg-amber-500/10 text-amber-300 border-amber-500/40 text-[10px]">
                            {b.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-400" />
                  Booking history
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-72 overflow-auto pr-1">
                {bookings.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    You don&apos;t have any bookings yet.
                  </p>
                ) : (
                  bookings.map((b) => (
                    <div
                      key={b._id}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs hover:border-slate-600 transition"
                    >
                      <div className="space-y-[2px]">
                        <p className="font-medium text-slate-100">
                          {b.carId?.brand} {b.carId?.carModel}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(b.startDate).toLocaleDateString()} –{" "}
                          {new Date(b.endDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right space-y-[2px]">
                        <p className="font-semibold text-slate-100">
                          ₹ {b.totalPrice}
                        </p>
                        <Badge
                          variant="outline"
                          className={`border-[0.5px] text-[10px] ${
                            b.status === "Completed"
                              ? "border-emerald-500/60 text-emerald-300"
                              : b.status === "Cancelled"
                              ? "border-rose-500/60 text-rose-300"
                              : "border-amber-500/60 text-amber-300"
                          }`}
                        >
                          {b.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}