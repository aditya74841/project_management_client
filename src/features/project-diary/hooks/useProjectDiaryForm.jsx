import { useState, useCallback } from "react";
import { useDiaryStore } from "@/store/diaryStore";
import {
    validateProjectDiaryForm,
    validateProjectDiaryField,
} from "@/lib/validations/projectDiaryValidation";

/**
 * useProjectDiaryForm Hook (Zen Prism Edition)
 * Manages the logic for capturing engineering perspectives.
 * Fully synchronized with the global diaryStore.
 */
export const useProjectDiaryForm = () => {
    const {
        createDiary,
        updateDiary,
        isSheetOpen,
        openCreateSheet,
        openEditSheet,
        editingDiary
    } = useDiaryStore();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "idea",
        priority: "medium",
        projectId: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    /**
     * Form Validation
     */
    const validateForm = useCallback(() => {
        const { isValid, errors: validationErrors } = validateProjectDiaryForm(formData);
        setErrors(validationErrors);
        return isValid;
    }, [formData]);

    /**
     * Field Change Handler
     */
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((p) => ({ ...p, [name]: value }));

            // Real-time validation
            const err = validateProjectDiaryField(name, value, formData);
            setErrors((prev) => ({ ...prev, [name]: err }));
        },
        [formData]
    );

    /**
     * Select Change Handler (for custom select components)
     */
    const handleSelectChange = useCallback(
        (name, value) => {
            setFormData((p) => ({ ...p, [name]: value }));
            const err = validateProjectDiaryField(name, value, { ...formData, [name]: value });
            setErrors((prev) => ({ ...prev, [name]: err }));
        },
        [formData]
    );

    /**
     * Field Blur Handler
     */
    const handleBlur = useCallback((e) => {
        setTouched((p) => ({ ...p, [e.target.name]: true }));
    }, []);

    /**
     * Submission Logic
     */
    const handleSubmit = useCallback(
        async (data, id) => {
            console.log("The data and Id is", data, id)
            // Mark all core fields as touched
            setTouched({ title: true, description: true, status: true, priority: true });

            if (!validateForm()) return false;

            const payload = {
                title: data.title.trim(),
                description: data.description?.trim() || "",
                status: data.status,
                priority: data.priority,
                ...(data.projectId ? { projectId: data.projectId } : {}),
            };

            // Call global store actions
            return id
                ? await updateDiary(id, payload)
                : await createDiary(payload.projectId || null, payload);
        },
        [validateForm, createDiary, updateDiary]
    );

    /**
     * Form State Reset
     */
    const resetForm = useCallback(() => {
        setFormData({ title: "", description: "", status: "idea", priority: "medium", projectId: "" });
        setErrors({});
        setTouched({});
    }, []);

    /**
     * Populate Form with existing entry
     */
    const populateForm = useCallback((diary) => {
        setFormData({
            title: diary.title || "",
            description: diary.description || "",
            status: diary.status || "idea",
            priority: diary.priority || "medium",
            projectId: diary.projectId || "",
        });
        setErrors({});
        setTouched({});
    }, []);

    const { isValid } = validateProjectDiaryForm(formData);

    return {
        formData,
        setFormData,
        errors,
        touched,
        isValid,
        handleChange,
        handleSelectChange,
        handleBlur,
        handleSubmit,
        resetForm,
        populateForm,
    };
};
