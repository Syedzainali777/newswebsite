import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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

const DashboardComments = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);

        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);

          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);

        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-3 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            <TableCaption className="text-gray-500 dark:text-gray-400">
              A list of your recent comments.
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-slate-700 dark:text-gray-300">
                  Date Updated
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  Comments
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  Number of Likes
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  PostId
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  UserId
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>

            {comments.map((comment) => (
              <TableBody
                className="divide-y divide-gray-300 dark:divide-gray-700"
                key={comment._id}
              >
                <TableRow>
                  <TableCell className="text-slate-600 dark:text-gray-400">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-slate-700 dark:text-gray-300">
                    {comment.content}
                  </TableCell>

                  <TableCell className="text-slate-700 dark:text-gray-300">
                    {comment.numberOfLikes}
                  </TableCell>

                  <TableCell className="text-slate-700 dark:text-gray-300">
                    {comment.postId}
                  </TableCell>

                  <TableCell className="text-slate-700 dark:text-gray-300">
                    {comment.userId}
                  </TableCell>

                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span
                          onClick={() => {
                            setCommentIdToDelete(comment._id);
                          }}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                        >
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
                            onClick={handleDeleteComment}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-blue-700 dark:text-blue-400 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-slate-700 dark:text-gray-300">
          You have no comments yet!
        </p>
      )}
    </div>
  );
};

export default DashboardComments;
