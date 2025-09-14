"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditResponses } from "./store";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function getFileIcon(url) {
  if (!url) return null;
  const ext = url.split('.').pop().toLowerCase();
  if (["pdf"].includes(ext)) return "📄";
  if (["doc", "docx"].includes(ext)) return "📝";
  if (["xls", "xlsx"].includes(ext)) return "📊";
  if (["txt"].includes(ext)) return "📃";
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) return "🖼️";
  if (["mp4", "mov", "avi", "webm"].includes(ext)) return "🎬";
  return "📁";
}

// Modal for image/video preview
function MediaModal({ open, onClose, type, src }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold focus:outline-none"
          aria-label="Close preview"
        >
          &times;
        </button>
        {type === "image" ? (
          <img src={src} alt="Preview" className="max-h-[70vh] max-w-full rounded-lg" />
        ) : (
          <video src={src} controls autoPlay className="max-h-[70vh] max-w-full rounded-lg bg-black" />
        )}
      </div>
    </div>
  );
}

export const ResponseList = ({ auditId }) => {
  const dispatch = useDispatch();
  const { responses, loading } = useSelector((state) => state.response);
  // Get today's date in yyyy-mm-dd format
  const todayStr = new Date().toISOString().slice(0, 10);
  const [filterDate, setFilterDate] = useState(todayStr);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'image' or 'video'
  const [modalSrc, setModalSrc] = useState("");

  useEffect(() => {
    dispatch(fetchAuditResponses(auditId, filterDate));
  }, [auditId, filterDate]);

  const openModal = (type, src) => {
    setModalType(type);
    setModalSrc(src);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setModalSrc("");
  };

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Audit Responses</h2>
      <div className="mb-6 flex gap-4 items-center">
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-60"
        />
      </div>
      <MediaModal open={modalOpen} onClose={closeModal} type={modalType} src={modalSrc} />
      {loading ? (
        <p>Loading...</p>
      ) : responses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <div className="space-y-6">
          {responses.map((res) => (
            <Card key={res._id} className="p-6 rounded-xl shadow border bg-white">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Text Info */}
                <div className="flex-1 min-w-[220px] space-y-2">
                  <div>
                    <span className="font-semibold text-blue-800">Question:</span> {res.questions}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-800">Response:</span> {res.auditresponse}
                  </div>
                  {res.score !== null && (
                    <div>
                      <span className="font-semibold text-blue-800">Score:</span> {res.score}
                    </div>
                  )}
                  {res.message && (
                    <div>
                      <span className="font-semibold text-blue-800">Message:</span> {res.message}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-blue-800">Created At:</span> {new Date(res.createdAt).toLocaleString()}
                  </div>
                </div>
                {/* Right: Media */}
                <div className="flex-1 min-w-[220px] space-y-4 border-l md:pl-6 md:border-l-gray-200">
                  {/* Files */}
                  <div>
                    <span className="font-semibold text-blue-800">Files:</span>
                    {res.files && res.files.length > 0 ? (
                      <ul className="ml-4 mt-1 space-y-1">
                        {res.files.map((f, idx) => (
                          <li key={f._id?.$oid || idx} className="flex items-center gap-2">
                            <span>{getFileIcon(f.file?.url)}</span>
                            <a
                              href={f.file?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-900"
                            >
                              {f.file?.url?.split("/").pop() || "File"}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="ml-2 text-gray-500">No files uploaded</span>
                    )}
                  </div>
                  {/* Photos */}
                  <div>
                    <span className="font-semibold text-blue-800">Photos:</span>
                    {res.photos && res.photos.length > 0 ? (
                      <div className="flex flex-wrap gap-3 mt-2 ml-2">
                        {res.photos.map((p, idx) => (
                          <button
                            key={p._id?.$oid || idx}
                            type="button"
                            onClick={() => openModal("image", p.photo?.url)}
                            className="block border rounded hover:shadow-lg focus:outline-none"
                            title="View full size"
                          >
                            <img
                              src={p.photo?.url}
                              alt="Photo"
                              className="w-16 h-16 object-cover rounded"
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="ml-2 text-gray-500">No photos uploaded</span>
                    )}
                  </div>
                  {/* Video */}
                  <div>
                    <span className="font-semibold text-blue-800">Video:</span>
                    {res.video && res.video.url ? (
                      <div className="mt-2 ml-2">
                        <button
                          type="button"
                          onClick={() => openModal("video", res.video.url)}
                          className="focus:outline-none"
                          title="Play video in large view"
                        >
                          <video
                            src={res.video.url}
                            controls
                            className="w-30 h-24 rounded shadow bg-black"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </button>
                      </div>
                    ) : (
                      <span className="ml-2 text-gray-500">No video uploaded</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
