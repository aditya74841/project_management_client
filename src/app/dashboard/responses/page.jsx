"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponseCard } from "./ResponseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditResponse } from "./store";
import { fetchAuditQuestions } from "../audits/store";
import { QuestioDatatable } from "./QuestionDatatable";
import { Button } from "@/components/ui/button";
import { ResponseList } from "./ResponseList";

const ResponsePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAuditId, setSelectedAuditId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [viewingResponsesForAuditId, setViewingResponsesForAuditId] =
    useState(null);
  const [responseDate, setResponseDate] = useState(""); // For filtering
  const dispatch = useDispatch();
  const { auditQuestion } = useSelector((state) => state.audit);
  const { response, loading, error } = useSelector((state) => state.response);

  const [storeId, setStoreId] = useState(null);

  const questions = response?.options || [];

  useEffect(() => {
    dispatch(fetchAuditQuestions(page, limit));
  }, [dispatch, page, limit]);

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleStartAudit = (auditId, storeId) => {
    setStoreId(storeId);
    setSelectedAuditId(auditId);
    setCurrentIndex(0);
    dispatch(fetchAuditResponse(auditId));
  };

  const handleBackToTable = () => {
    setSelectedAuditId(null);
    setCurrentIndex(0);
  };

  const isAuditDone = currentIndex >= questions.length;

  return (
    <div className=" w-full my-4 px-8 py-3">
      {/* className="max-w-2xl mx-auto px-4 py-8" */}

      {/* Table - only show if audit not started */}
      {!selectedAuditId && !viewingResponsesForAuditId && (
        <QuestioDatatable
          data={auditQuestion?.auditQuestions || []}
          onStartAudit={handleStartAudit}
          onViewResponses={setViewingResponsesForAuditId} // Pass the setter
        />
      )}
      {viewingResponsesForAuditId && (
        <>
          <div className="mb-4">
            <Button onClick={() => setViewingResponsesForAuditId(null)}>
              ← Back to Audit Table
            </Button>
          </div>
          <ResponseList auditId={viewingResponsesForAuditId} />
        </>
      )}
      {/* Loading state */}
      {loading && selectedAuditId && (
        <div className="text-center py-10 text-blue-600">Loading...</div>
      )}

      {/* Error state */}
        {/* {error && (
          <div className="text-center py-10 text-red-600">
            Error loading audit: {error}
          </div>
        )} */}

      {/* Question card or finish screen */}
      {selectedAuditId && !loading && questions.length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {response.name}
          </h1>

          <div className="relative h-full min-h-[300px]">
            <AnimatePresence mode="wait">
              {!isAuditDone ? (
                <motion.div
                  key={questions[currentIndex]._id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full"
                >
                  <ResponseCard
                    option={questions[currentIndex]}
                    onSubmit={goToNext}
                    questionId={selectedAuditId}
                    storeId={storeId}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="text-center p-6"
                >
                  <h2 className="text-2xl font-semibold text-green-700 mb-4">
                    🎉 All responses submitted!
                  </h2>
                  <Button onClick={handleBackToTable}>
                    Back to Audit Table
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* No questions found */}
      {selectedAuditId && !loading && questions.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No questions found for this audit.
          <div className="mt-4">
            <Button onClick={handleBackToTable}>Back to Audit Table</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsePage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ResponseCard } from "./ResponseCard";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAuditResponse } from "./store";
// import { fetchAuditQuestions } from "../audits/store";
// import { QuestioDatatable } from "./QuestionDatatable";

// const ResponsePage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const auditId = "68300d07e8fc0902863f51ef";
//   const dispatch = useDispatch();
//   const { auditQuestion } = useSelector((state) => state.audit);

//   const { response, loading, error } = useSelector((state) => state.response);
//   const questions = response?.options || [];

//   console.log("The audit questions is ", auditQuestion);

//   useEffect(() => {
//     dispatch(fetchAuditResponse(auditId));
//     dispatch(fetchAuditQuestions(page, limit));
//   }, [dispatch, auditId]);

//   const goToNext = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   if (loading) {
//     return <div className="text-center py-10 text-blue-600">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center py-10 text-red-600">
//         Error loading audit: {error}
//       </div>
//     );
//   }

//   if (!response || !questions.length) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No audit data available.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//            <QuestioDatatable
//         data={auditQuestion?.auditQuestions || []}
//         // onEdit={handleEditCompany}
//         // onDelete={handleDeleteCompany}
//       />
//       {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         {response.name}
//       </h1>

//       <div className="relative h-full min-h-[300px]">
//         <AnimatePresence mode="wait">
//           {currentIndex < questions.length ? (
//             <motion.div
//               key={questions[currentIndex]._id}
//               initial={{ x: 300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -300, opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="absolute w-full"
//             >
//               <ResponseCard
//                 option={questions[currentIndex]}
//                 onSubmit={goToNext}
//               />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="done"
//               initial={{ x: 300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -300, opacity: 0 }}
//               className="text-center p-6"
//             >
//               <h2 className="text-2xl font-semibold text-green-700">
//                 🎉 All responses submitted!
//               </h2>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div> */}
//     </div>
//   );
// };

// export default ResponsePage;
