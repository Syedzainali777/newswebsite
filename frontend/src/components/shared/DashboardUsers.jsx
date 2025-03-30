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
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const DashboardUsers = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);

        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);

          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);

        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-3 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            <TableCaption className="text-gray-500 dark:text-gray-400">
              A list of your recent subscribers.
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-slate-700 dark:text-gray-300">
                  Joined On
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  User Image
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  Username
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  Email
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  Admin
                </TableHead>
                <TableHead className="text-slate-700 dark:text-gray-300">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>

            {users.map((user) => (
              <TableBody
                className="divide-y divide-gray-300 dark:divide-gray-700"
                key={user._id}
              >
                <TableRow>
                  <TableCell className="text-slate-600 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 dark:bg-gray-700 rounded-full"
                    />
                  </TableCell>

                  <TableCell className="text-slate-700 dark:text-gray-300">
                    {user.username}
                  </TableCell>

                  <TableCell className="text-slate-700 dark:text-gray-300">
                    {user.email}
                  </TableCell>

                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-600 dark:text-green-500" />
                    ) : (
                      <RxCross2 className="text-red-600 dark:text-red-500" />
                    )}
                  </TableCell>

                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span
                          onClick={() => {
                            setUserIdToDelete(user._id);
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
                            delete your subscriber and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 dark:bg-red-700 text-white"
                            onClick={handleDeleteUser}
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
          You have no subscribers yet!
        </p>
      )}
    </div>
  );
};

export default DashboardUsers;
