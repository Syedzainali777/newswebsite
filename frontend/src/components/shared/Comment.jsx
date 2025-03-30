import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);

        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b border-slate-300 dark:border-gray-700 text-sm gap-2 bg-white dark:bg-gray-800">
      {/* User Profile Picture */}
      <div className="flex-shrink-0 mr-0">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-semibold mr-1 text-sm truncate text-slate-700 dark:text-gray-300">
            {user ? `@${user.username}` : "Unknown"}
          </span>

          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              className="mb-2 bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />

            <div className="flex justify-end gap-2 text-sm">
              <Button
                type="button"
                className="bg-green-600 dark:bg-green-700 text-white"
                onClick={handleSave}
              >
                Save
              </Button>

              <Button
                type="button"
                className="hover:border-red-500 hover:text-red-500"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-slate-600 dark:text-gray-300 pb-2">
              {comment.content}
            </p>

            <div className="flex items-center pt-2 text-sm border-t border-slate-300 dark:border-gray-700 max-w-fit gap-2">
              {/* Like Button */}
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-600 dark:!text-blue-500"
                }`}
              >
                <AiFillLike className="text-lg" />
              </button>

              <p className="text-gray-400 dark:text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>

              {/* Edit and Delete Buttons */}
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500"
                    >
                      Edit
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span className="text-gray-400 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 cursor-pointer">
                          Delete
                        </span>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your comment and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 dark:bg-red-700 text-white"
                            onClick={() => onDelete(comment._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
