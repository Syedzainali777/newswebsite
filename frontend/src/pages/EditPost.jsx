import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { postId } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({});
  const [updatePostError, setUpdatePostError] = useState(null);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          setUpdatePostError(data.message);
          return;
        }

        setFormData(data.posts[0]);
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!");
        toast({ title: "Please select an image!" });
        return;
      }

      setImageUploading(true);
      setImageUploadError(null);

      const uploadedFile = await uploadFile(file);
      const postImageUrl = getFilePreview(uploadedFile.$id);

      setFormData({ ...formData, image: postImageUrl });
      toast({ title: "Image Uploaded Successfully!" });

      setImageUploading(false);
    } catch (error) {
      setImageUploadError("Image upload failed");
      toast({ title: "Image upload failed!" });
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." });
        setUpdatePostError(data.message);
        return;
      }

      toast({ title: "Article Updated Successfully!" });
      navigate(`/post/${data.slug}`);
    } catch (error) {
      toast({ title: "Something went wrong! Please try again." });
      setUpdatePostError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-700 dark:text-gray-300">
        Edit Post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title and Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />

          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
            value={formData.category}
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="worldnews">World News</SelectItem>
                <SelectItem value="sportsnews">Sports News</SelectItem>
                <SelectItem value="localnews">Local News</SelectItem>
                <SelectItem value="entertainmentnews">
                  Entertainment News
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-slate-600 dark:border-gray-600 border-dotted p-3 bg-white dark:bg-gray-800">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-slate-700 dark:text-gray-300"
          />

          <Button
            type="button"
            className="bg-slate-700 dark:bg-gray-700 text-white"
            onClick={handleUploadImage}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Content Editor */}
        <ReactQuill
          theme="snow"
          placeholder="Write something here..."
          className="h-72 mb-12 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="h-12 bg-green-600 dark:bg-green-700 font-semibold max-sm:mt-5 text-md text-white"
        >
          Update Your Article
        </Button>

        {updatePostError && (
          <p className="text-red-600 mt-5">{updatePostError}</p>
        )}
      </form>
    </div>
  );
};

export default EditPost;
