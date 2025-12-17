import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAnnouncementMutation } from "@/redux/features/settings/settingsApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminAnnouncement = () => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });

  const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();

  const handleSave = async () => {
    if (!announcement.title || !announcement.description) {
      toast.error("Please fill in both title and description");
      return;
    }

    try {
      const response = await createAnnouncement(announcement).unwrap();
      if (response.success) {
        toast.success(response.message || "Announcement created successfully!");

        setAnnouncement({ title: "", description: "" });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong while saving");
    }
  };
  return (
    <div className="space-y-7">
      {/* Announcement Form Section */}
      <div className="border border-gray-300 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-xl">Announcement Banner</h3>
        <div className="space-y-1.5">
          <Input
            placeholder="Title"
            className="border-red-600"
            value={announcement.title}
            onChange={(e) =>
              setAnnouncement({ ...announcement, title: e.target.value })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Textarea
            placeholder="Enter announcement here"
            className="border-red-600 min-h-[100px]"
            value={announcement.description}
            onChange={(e) =>
              setAnnouncement({
                ...announcement,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="btn-primary min-w-[150px]"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Announcement"
          )}
        </Button>
      </div>
      <div>
        <p className="text-gray-400 text-center">
          Manage automated messages and system-wide announcements.
        </p>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
