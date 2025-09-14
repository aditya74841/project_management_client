// "use client";

// import * as React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Swal from "sweetalert2";
// import { deleteAuditOptions, fetchAuditOptions } from "./store";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

// export function OptionsDataTable({ data, onEditOptions, onDelete, companyId }) {
//   const [search, setSearch] = React.useState("");
//   const dispatch = useDispatch();
//   let filteredData = [];
//   // console.log("The data is ", data);
//   //  filteredData = data&&data[0].options.filter((item) =>
//   //   item.question.toLowerCase().includes(search.toLowerCase())
//   // );

//   filteredData =
//     Array.isArray(data) && data.length > 0 && Array.isArray(data[0].options)
//       ? data[0].options.filter((item) =>
//           item.question.toLowerCase().includes(search.toLowerCase())
//         )
//       : [];

//   const hasResponseOption =
//     filteredData.length > 0 &&
//     filteredData.some(
//       (item) =>
//         Array.isArray(item.responseOption) && item.responseOption.length > 0
//     );

//   const handleDeleteOptions = async (optionId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this option?"
//     );

//     if (confirmed) {
//       try {
//         await dispatch(deleteAuditOptions(companyId, optionId));
//         toast.success("Option deleted successfully");
//         dispatch(fetchAuditOptions(companyId));
//       } catch (err) {
//         toast.error(err.message || "Something went wrong while deleting");
//       }
//     }
//   };
//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-between py-4">
//         <Input
//           placeholder="Search questions..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-sm rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
//         <Table className="min-w-full text-sm text-gray-700">
//           <TableHeader>
//             <TableRow className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
//               <TableHead className="p-3">Name</TableHead>
//               <TableHead className="p-3">Score</TableHead>
//               <TableHead className="p-3">Response Type</TableHead>
//               {hasResponseOption && <TableHead className="p-3">Response Option</TableHead>}
//               <TableHead className="p-3">Is File</TableHead>
//               <TableHead className="p-3">Is Photo</TableHead>
//               <TableHead className="p-3">Is Video</TableHead>
//               <TableHead className="p-3">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((company) => (
//                 <TableRow
//                   key={company._id}
//                   className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
//                 >
//                   <TableCell className="p-3 font-medium">{company.question}</TableCell>
//                   <TableCell className="p-3">{company.score}</TableCell>
//                   <TableCell className="p-3">{company.responseType}</TableCell>
//                   {hasResponseOption && (
//                     <TableCell className="p-3">
//                       {company.responseOption?.map((opt) => opt.message).join(", ")}
//                     </TableCell>
//                   )}
//                   <TableCell className="p-3">{company.isFile ? "Yes" : "No"}</TableCell>
//                   <TableCell className="p-3">{company.isPhoto ? "Yes" : "No"}</TableCell>
//                   <TableCell className="p-3">{company.isVideo ? "Yes" : "No"}</TableCell>
//                   <TableCell className="p-3">
//                     <div className="flex gap-2">
//                       <Button
//                         className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//                         onClick={() => onEditOptions(company)}
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         className="bg-red-600 text-white hover:bg-red-700 transition-colors"
//                         onClick={() => handleDeleteOptions(company._id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={hasResponseOption ? 8 : 7} className="p-4 text-center text-gray-500">
//                   No data found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );

// }

"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteAuditOptions, fetchAuditOptions } from "./store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";

export function OptionsDataTable({ data, onEditOptions, onDelete, companyId }) {
  const [search, setSearch] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const filteredData =
    Array.isArray(data) && data.length > 0 && Array.isArray(data[0].options)
      ? data[0].options.filter((item) =>
          item.question.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  const handleDeleteOptions = async (optionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this option?"
    );
    if (confirmed) {
      try {
        await dispatch(deleteAuditOptions(companyId, optionId));
        toast.success("Option deleted successfully");
        dispatch(fetchAuditOptions(companyId));
      } catch (err) {
        toast.error(err.message || "Something went wrong while deleting");
      }
    }
  };

  const handleViewDetails = (option) => {
    setSelectedOption(option);
    setOpen(true);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="min-w-full text-sm text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
              <TableHead className="p-3">Question</TableHead>
              <TableHead className="p-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((option) => (
                <TableRow
                  key={option._id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <TableCell className="p-3 font-medium">
                    {option.question}
                  </TableCell>
                  <TableCell className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleViewDetails(option)}
                      >
                        View
                      </Button>
                      <Button
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => onEditOptions(option)}
                      >
                        Update
                      </Button>
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => handleDeleteOptions(option._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="p-4 text-center text-gray-500"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal for viewing option details */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg rounded-2xl border shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Option Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Here's everything you need to know about this option.
            </DialogDescription>
          </DialogHeader>

          {selectedOption && (
            <div className="mt-4 space-y-4 text-sm text-gray-700">
              <div className="space-y-1">
                <p className="font-medium text-gray-600">Question:</p>
                <p className="bg-gray-50 border rounded-md p-2">
                  {selectedOption.question}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Score:</p>
                  <p className="bg-gray-50 border rounded-md p-2">
                    {selectedOption.score}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Response Type:</p>
                  <p className="bg-gray-50 border rounded-md p-2">
                    {selectedOption.responseType}
                  </p>
                </div>
              </div>

              {Array.isArray(selectedOption.responseOption) &&
                selectedOption.responseOption.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-600">
                      Response Options:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedOption.responseOption.map((opt, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-sm"
                        >
                          {opt.message}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Is File:</p>
                  <p>{selectedOption.isFile ? "✅ Yes" : "❌ No"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Is Photo:</p>
                  <p>{selectedOption.isPhoto ? "✅ Yes" : "❌ No"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Is Video:</p>
                  <p>{selectedOption.isVideo ? "✅ Yes" : "❌ No"}</p>
                </div>
              </div>

              {selectedOption.message && (
                <div>
                  <p className="font-medium text-gray-600">Message:</p>
                  <p className="bg-gray-50 border rounded-md p-2">
                    {selectedOption.message}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
