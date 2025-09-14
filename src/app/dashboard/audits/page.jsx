"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// import { DataTableDemo } from "@/components/Table/DataTable";

import {
  createAuditName,
  fetchAuditQuestions,
  updateCompanyLogo,
  deleteAuditQuestion,
  updateAuditQuestion,
  createOptions,
  fetchAuditOptions,
  deleteAuditOptions,
  updateAuditOptions,
  toggleIsPublished,
} from "./store"; // <-- make sure update and delete actions exist
import { fetchStoreName } from "../stores/store";
import { DataTableDemo } from "./Datatable";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { OptionsDataTable } from "./OptionsDatatable";
const responseTypeOptions = [
  { value: "text", label: "Text" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
];
const AuditPage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // <-- new
  const [companyName, setCompanyName] = useState("");
  const [auditName, setAuditName] = useState("");
  const [storeOption, setStoreOption] = useState({
    value: null,
    label: "Select Store",
  });
  const [loading, setLoading] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [editingCompanyId, setEditingCompanyId] = useState(null); // <-- new
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const { storesName } = useSelector((state) => state.store);
  const { auditQuestion, auditOptions } = useSelector((state) => state.audit);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [logoFile, setLogoFile] = useState(null);
  const [changingLogoCompanyId, setChangingLogoCompanyId] = useState(null);

  const [question, setQuestion] = useState("");
  const [score, setScore] = useState(0);
  const [responseType, setResponseType] = useState("");
  const [responseOptionText, setResponseOptionText] = useState(""); // comma separated
  const [isVideo, setIsVideo] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOptionEdit, setIsOptionEdit] = useState(false);
  const [optionId, setOptionId] = useState("");

  useEffect(() => {
    dispatch(fetchStoreName());
    dispatch(fetchAuditQuestions(page, limit));
  }, [page, limit, dispatch, loading]);

  const handleCreateOrUpdateAudit = async () => {
    if (!auditName.trim()) {
      return Swal.fire("Error", "Company name is required", "error");
    }

    try {
      if (isEditing && editingCompanyId) {
        await dispatch(
          updateAuditQuestion(editingCompanyId, {
            name: auditName,
            storeId: storeOption.value,
            isPublished: isPublished,
          })
        ); // corrected
        // await dispatch(updateCompanyLogo(editingCompanyId, logoFile));
        setLogoFile(null);
        setLoading((prev) => !prev);
        // Swal.fire("Success", "Company updated successfully", "success");
        toast.success("Company updated successfully");
        // Swal.fire("Success", "Logo updated successfully", "success");
      } else {
        await dispatch(
          createAuditName({ name: auditName, storeId: storeOption.value })
        );
        setLoading((prev) => !prev);
        // Swal.fire("  Success", "Company created successfully", "success");
        toast.success("Company created successfully");
      }
      // setCompanyName("");
      setAuditName("");
      setStoreOption({
        value: null,
        label: "Select Store",
      });
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingCompanyId(null);
      // dispatch(fetchCompanies(page, limit)); // refresh
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleEditCompany = (company) => {
    setAuditName(company.name);

    setIsAssigned(company.isAssigned);
    setIsPublished(company.isPublished);
    setEditingCompanyId(company._id);
    setIsEditing(true);
    setNewItemDrawerOpen(true);

    const matchedCompany = storesName.find(
      (store) =>
        store.value === company.store || store.value === company.store?._id
    );
    if (matchedCompany) {
      setStoreOption({
        label: matchedCompany.label,
        value: matchedCompany.value,
      });
      dispatch(fetchAuditOptions(company._id));
    } else {
      setStoreOption(null);
    }
  };

  const handleToggleIsPublished = async () => {
    try {
      await dispatch(toggleIsPublished(editingCompanyId));
      toast.success("Options updated successfully");
      setIsPublished((prev) => !prev);
      setLoading((prev) => !prev);
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleReset = () => {
    setQuestion(""),
      setScore(""),
      setResponseType(""),
      setResponseOptionText(""),
      setIsPhoto(false),
      setIsFile(false),
      setIsVideo(false),
      setMessage("");
    setOptionId("");
    setIsOptionEdit(false);
  };

  const handleEditOptions = (options) => {
    setQuestion(options.question);
    setResponseType(options.responseType);
    const responseMessages = options.responseOption
      ?.map((opt) => opt.message)
      .join(", ");

    // console.log("the response Message is ", responseMessages);
    setResponseOptionText(responseMessages);

    setIsPhoto(options.isPhoto);
    setIsVideo(options.isVideo);
    setScore(options.score);
    setIsFile(options.isFile);
    setMessage(options.message);
    setIsOptionEdit(true);
    setOptionId(options._id);
  };

  const handleDeleteCompany = async (companyId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the company permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteAuditQuestion(companyId));
        Swal.fire("Deleted!", "Company has been deleted.", "success");
        setIsEditing(false);
        setLogoFile(null);
        setLoading((prev) => !prev);
        // dispatch(fetchCompanies(page - 1, limit)); // refresh
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };

  const handleCreateOrUpdateOptions = async () => {
    if (!question.trim()) {
      toast.error("Question name is required");
      return;
    }

    if (!responseType.trim()) {
      toast.error("Response Type  is required");
      return;
    }

    const postData = {
      question,
      score,
      responseType,
      responseOption: responseOptionText,
      isVideo,
      isPhoto,
      isFile,
      message,
    };

    try {
      if (isOptionEdit && optionId) {
        await dispatch(
          updateAuditOptions(postData, editingCompanyId, optionId)
        );

        // setLogoFile(null);
        // setLoading((prev) => !prev);
        // Swal.fire("Success", "Company updated successfully", "success");
        toast.success("Options updated successfully");

        // Swal.fire("Success", "Logo updated successfully", "success");
      } else {
        await dispatch(
          createOptions({ auditId: editingCompanyId, optionsData: postData })
        );
        toast.success("Options created successfully");
      }
      handleReset();

      dispatch(fetchAuditOptions(editingCompanyId));

      // dispatch(fetchCompanies(page, limit)); // refresh
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  // console.lo g("Audit Options is ",auditOptions)
  // const handleCreateOrUpdateOptions = async () => {
  //   if (isSubmitting) return; // prevent double click
  //   setIsSubmitting(true);

  //   const postData = {
  //     question,
  //     score,
  //     responseType,
  //     responseOptionText,
  //     isVideo,
  //     isPhoto,
  //     isFile,
  //     message,
  //   };

  //   try {
  //     await dispatch(
  //       createOptions({ auditId: editingCompanyId, optionsData: postData })
  //     );
  //     dispatch(fetchAuditOptions(editingCompanyId));
  //     handleReset();
  //     toast.success("Options created successfully");
  //   } catch (err) {
  //     toast.error(err.message || "Something went wrong");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // console.log("The audit Options is ", auditOptions);
  return (
    <div className="w-full my-4 px-8 py-3 ">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-semibold">Audit Questions</span>

        <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-sky-700 hover:bg-sky-800"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              + Create Questions
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[60vw] max-w-[60vw] bg-white p-6 ">
            <SheetHeader>
              <SheetTitle>
                {isEditing ? "Edit Questions" : "Create Questions"}
              </SheetTitle>
              <SheetDescription>
                {isEditing
                  ? "Update audit questions"
                  : "Create a new audit questions"}
              </SheetDescription>
            </SheetHeader>

            <Tabs defaultValue="first" className="w-full p-4">
              {isEditing && (
                <div className="p-4">
                  <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded-xl shadow-sm w-fit ">
                    <TabsList className="flex gap-2">
                      <TabsTrigger
                        value="first"
                        className="px-5 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                      >
                        First
                      </TabsTrigger>
                      <TabsTrigger
                        value="second"
                        className="px-5 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                      >
                        Second
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
              )}

              <TabsContent value="first" className="w-full lg:w-1/2">
                <div className="bg-white dark:bg-gray-900 border rounded-2xl shadow-md p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">
                      Audit Name
                    </Label>
                    <Input
                      id="name"
                      value={auditName}
                      onChange={(e) => setAuditName(e.target.value)}
                      placeholder="Enter Audit name"
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="store" className="text-base font-semibold">
                      Select Store
                    </Label>
                    <Select
                      id="store"
                      value={storeOption}
                      onChange={setStoreOption}
                      options={storesName}
                      placeholder="Choose a store"
                    />
                  </div>

                  {isEditing && (
                    <div className="space-y-4 pt-2">
                      {/* Uncomment if needed
        <div className="flex items-center justify-between">
          <Label htmlFor="assigned" className="font-medium">
            Assigned
          </Label>
          <Switch
            id="assigned"
            checked={isAssigned}
            onCheckedChange={setIsAssigned}
          />
        </div>
        */}

                      <div className="flex items-center justify-between">
                        <Label htmlFor="published" className="font-medium">
                          Published
                        </Label>
                        <Switch
                          id="published"
                          checked={isPublished}
                          onCheckedChange={handleToggleIsPublished}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="second">
                <div className="flex flex-col lg:flex-row gap-6 p-4">
                  {/* Form Section */}
                  <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md border space-y-5">
                    <h2 className="text-xl font-semibold mb-2">
                      Audit Option Details
                    </h2>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="question">Question</Label>
                        <Input
                          id="question"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="Enter the audit question"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="score">Score</Label>
                        <Input
                          id="score"
                          type="number"
                          value={score}
                          onChange={(e) => setScore(Number(e.target.value))}
                          placeholder="Score (e.g. 10)"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="responseType">Response Type</Label>
                        <div className="mt-1">
                          <Select
                            id="responseType"
                            options={responseTypeOptions}
                            value={responseTypeOptions.find(
                              (opt) => opt.value === responseType
                            )}
                            onChange={(selected) =>
                              setResponseType(selected.value)
                            }
                            placeholder="Select response type"
                          />
                        </div>
                      </div>

                      {(responseType === "radio" ||
                        responseType === "checkbox") && (
                        <div>
                          <Label htmlFor="responseOption">
                            Response Options
                          </Label>
                          <Textarea
                            id="responseOption"
                            value={responseOptionText}
                            onChange={(e) =>
                              setResponseOptionText(e.target.value)
                            }
                            placeholder="Enter options separated by commas"
                            className="mt-1"
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Custom message (optional)"
                          className="mt-1"
                        />
                      </div>

                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="video"
                            checked={isVideo}
                            onCheckedChange={setIsVideo}
                          />
                          <Label htmlFor="video">Video</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="photo"
                            checked={isPhoto}
                            onCheckedChange={setIsPhoto}
                          />
                          <Label htmlFor="photo">Photo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="file"
                            checked={isFile}
                            onCheckedChange={setIsFile}
                          />
                          <Label htmlFor="file">File</Label>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleCreateOrUpdateOptions}
                          className="flex-1"
                        >
                          {isOptionEdit ? "Update Option" : "Create Option"}
                        </Button>

                        {isOptionEdit && (
                          <Button
                            variant="outline"
                            onClick={handleReset}
                            className="flex-1 border-gray-300"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md border flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">
                      Audit Options List
                    </h2>

                    <div className="flex-1 overflow-y-auto max-h-[500px] pr-2">
                      <OptionsDataTable
                        data={auditOptions || []}
                        onEditOptions={handleEditOptions}
                        onDelete={handleDeleteCompany}
                        companyId={editingCompanyId}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" onClick={handleCreateOrUpdateAudit}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <DataTableDemo
        data={auditQuestion?.auditQuestions || []}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
      />

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent className="ml-auto">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: companies?.totalPages || 1 }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={page === index + 1}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, companies?.totalPages || 1)
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AuditPage;
