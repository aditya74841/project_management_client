import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createProjectDiary } from "../../../../redux/slices/projectDiarySlice";
import {
    validateProjectDiaryForm,
    validateProjectDiaryField,
} from "@/lib/validations/projectDiaryValidation";

export const useProjectDiaryForm = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "idea",
        priority: "medium",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateForm = useCallback(() => {
        const { isValid, errors } = validateProjectDiaryForm(formData);
        setErrors(errors);
        return isValid;
    }, [formData]);

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((p) => ({ ...p, [name]: value }));
            const err = validateProjectDiaryField(name, value, formData);
            setErrors((prev) => ({ ...prev, [name]: err }));
        },
        [formData]
    );

    const handleSelectChange = useCallback(
        (name, value) => {
            setFormData((p) => ({ ...p, [name]: value }));
            const err = validateProjectDiaryField(name, value, formData);
            setErrors((prev) => ({ ...prev, [name]: err }));
        },
        [formData]
    );

    const handleBlur = useCallback((e) => {
        setTouched((p) => ({ ...p, [e.target.name]: true }));
    }, []);

    const handleSubmit = useCallback(
        async (data, id) => {
            setTouched({ title: true, description: true, status: true, priority: true });
            if (!validateForm()) return false;

            const payload = {
                title: data.title.trim(),
                description: data.description?.trim() || "",
                status: data.status,
                priority: data.priority,
            };

            try {
                // For now, only create is supported via this hook
                // Update operations are handled at the detail level
                if (!id) {
                    await dispatch(createProjectDiary(payload)).unwrap();
                }
                return true;
            } catch (err) {
                console.error("Form submission error:", err);
                return false;
            }
        },
        [dispatch, validateForm]
    );

    const resetForm = useCallback(() => {
        setFormData({ title: "", description: "", status: "idea", priority: "medium" });
        setErrors({});
        setTouched({});
    }, []);

    const populateForm = useCallback((diary) => {
        setFormData({
            title: diary.title || "",
            description: diary.description || "",
            status: diary.status || "idea",
            priority: diary.priority || "medium",
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
