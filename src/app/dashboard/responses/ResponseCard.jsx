"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResponseCard = ({ option, onSubmit, questionId, storeId }) => {
  const [textAnswer, setTextAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [media, setMedia] = useState({ photos: [], video: null, files: [] });
  const [submitting, setSubmitting] = useState(false);

  // Handle multiple/single file changes
  const handleMediaChange = (e, type) => {
    if (type === "photos" || type === "files") {
      setMedia((prev) => ({ ...prev, [type]: Array.from(e.target.files) }));
    } else {
      setMedia((prev) => ({ ...prev, [type]: e.target.files[0] }));
    }
  };

  // Validation for required fields and media
  const isTextValid = option.responseType !== "text" || textAnswer.trim().length > 0;
  const isRadioValid = option.responseType !== "radio" || !!selectedOption;
  const isPhotoValid = !option.isPhoto || (media.photos && media.photos.length > 0);
  const isFileValid = !option.isFile || (media.files && media.files.length > 0);
  const isVideoValid = !option.isVideo || !!media.video;

  const isFormValid = isTextValid && isRadioValid && isPhotoValid && isFileValid && isVideoValid;

  const handleSubmit = async () => {
    if (!isFormValid) {
      if (!isTextValid) toast.error("Please enter your answer.");
      else if (!isRadioValid) toast.error("Please select an option.");
      else if (!isPhotoValid) toast.error("Please upload at least one photo.");
      else if (!isFileValid) toast.error("Please upload at least one file.");
      else if (!isVideoValid) toast.error("Please upload a video.");
      return;
    }

    const formData = new FormData();
    formData.append("questions", option.question);
    formData.append("optionId", option._id);
    formData.append("responseType", option.responseType);
    formData.append(
      "auditresponse",
      option.responseType === "radio" ? selectedOption : textAnswer
    );
    formData.append("store", storeId);
    formData.append("auditQuestionId", questionId);

    // Append multiple photos
    if (media.photos && media.photos.length > 0) {
      media.photos.forEach((photo) => {
        formData.append("photos", photo);
      });
    }
    // Append multiple files
    if (media.files && media.files.length > 0) {
      media.files.forEach((file) => {
        formData.append("files", file);
      });
    }
    // Append single video
    if (media.video) {
      formData.append("video", media.video);
    }

    try {
      setSubmitting(true);
      await axios.post(
        `${process.env.SERVER_URL}/master/audit-response`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Response submitted successfully!");
      setTimeout(() => onSubmit(), 1200); // Give user time to see toast
    } catch (error) {
      toast.error("Error submitting response.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-7 rounded-2xl shadow-lg border space-y-6 w-full max-w-2xl mx-auto">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <h3 className="font-bold text-2xl text-blue-900 mb-2">{option.question}</h3>
      {option.message && (
        <p className="text-base italic text-gray-600 mb-2">{option.message}</p>
      )}

      {option.responseType === "radio" && (
        <div className="space-y-2">
          {option.responseOption.map((res) => (
            <label
              key={res._id}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded transition-colors duration-150 ${selectedOption === res.message ? "bg-blue-50" : "hover:bg-gray-50"}`}
            >
              <input
                type="radio"
                checked={selectedOption === res.message}
                onChange={() => setSelectedOption(res.message)}
                className="accent-blue-600"
              />
              <span
                className={
                  selectedOption === res.message
                    ? "font-medium text-blue-700"
                    : "text-gray-800"
                }
              >
                {res.message}
              </span>
            </label>
          ))}
        </div>
      )}

      {option.responseType === "text" && (
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
          rows="3"
          placeholder="Type your answer..."
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
        />
      )}

      <div className="space-y-4 mt-4">
        {option.isPhoto && (
          <div>
            <label className="block font-semibold mb-1 text-blue-800">
              Upload Photos <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleMediaChange(e, "photos")}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {media.photos && media.photos.length > 0 && (
              <ul className="text-xs text-gray-600 mt-2 list-disc list-inside">
                {media.photos.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        {option.isVideo && (
          <div>
            <label className="block font-semibold mb-1 text-blue-800">
              Upload Video <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleMediaChange(e, "video")}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {media.video && (
              <p className="text-xs text-gray-600 mt-2">Selected: {media.video.name}</p>
            )}
          </div>
        )}
        {option.isFile && (
          <div>
            <label className="block font-semibold mb-1 text-blue-800">
              Upload Files <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleMediaChange(e, "files")}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {media.files && media.files.length > 0 && (
              <ul className="text-xs text-gray-600 mt-2 list-disc list-inside">
                {media.files.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || !isFormValid}
        className={`mt-6 w-full transition-colors duration-200 ${
          submitting || !isFormValid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
        } text-white font-bold px-5 py-2 rounded shadow-lg`}
      >
        {submitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Submitting...
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};
