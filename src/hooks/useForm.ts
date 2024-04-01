/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from "react";

export type FieldValue = string | File | boolean;
type ObjectOfFormValuesWhereKeyNamesMatchedWithInputFieldNames = {
  [key: string]: {
    value: string | boolean;
    validate: (
      fieldValue: FieldValue,
      values: ObjectOfFormValuesWhereKeyNamesMatchedWithInputFieldNames,
    ) => boolean;
  };
};

export type AllFormValues =
  ObjectOfFormValuesWhereKeyNamesMatchedWithInputFieldNames;

export type FormValues = { [key: string]: string | boolean };
type FormErrors = { [key: string]: boolean };
type InputOnChangeFunction = (
  event: React.ChangeEvent<HTMLInputElement>,
) => void;
type InputOnBlurFunction = (event: React.FocusEvent<HTMLInputElement>) => void;
type ResetFormFunction = () => void;
type ResetFormValuesFunction = () => void;
type ResetFormErrorsFunction = () => void;
type ValidateFormFunction = () => boolean;

const useForm = (
  initialValues: ObjectOfFormValuesWhereKeyNamesMatchedWithInputFieldNames,
) => {
  const initialErrors: any = { ...initialValues };

  for (const fieldError in initialErrors) {
    initialErrors[fieldError] = false;
  }

  const [values, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState(initialErrors as FormErrors);
  const [event, setEvent] =
    useState<React.ChangeEvent<HTMLInputElement> | null>();

  const formValues: FormValues = {};

  for (const field in values) {
    formValues[field] = values[field].value;
  }

  const validateField = useCallback(
    (
      event:
        | React.FocusEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLInputElement>,
    ) => {
      setFieldErrors((prevState) => ({
        ...prevState,
        [event.target.name]: values[event.target.name].validate(
          event.target.value,
          values,
        ),
      }));
    },
    [values],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "radio" || event.target.type === "checkbox") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: {
          value: event.target.checked,
          validate: prevValues[event.target.name].validate,
        },
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: {
          value: event.target.value,
          validate: prevValues[event.target.name].validate,
        },
      }));
    }
    setEvent(event);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    validateField(event);
  };

  const resetForm = () => {
    setEvent(null);
    setFormValues(initialValues);
    setFieldErrors(initialErrors as FormErrors);
  };

  const validateForm = () => {
    const errors: boolean[] = [];
    for (const fieldName in values) {
      const fieldError = values[fieldName].validate(
        values[fieldName].value,
        values,
      );
      setFieldErrors((prevValues) => ({
        ...prevValues,
        [fieldName]: fieldError,
      }));
      errors.push(fieldError);
    }
    return !errors.some((error) => error);
  };

  useEffect(() => {
    if (event) {
      validateField(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, event]);

  const resetValues = () => {
    setEvent(null);
    setFormValues(initialValues);
  };

  const resetErrors = () => {
    setEvent(null);
    setFieldErrors(initialErrors as FormErrors);
  };

  return [
    formValues,
    fieldErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
    resetForm,
    resetValues,
    resetErrors,
  ] as [
    FormValues,
    FormErrors,
    InputOnChangeFunction,
    InputOnBlurFunction,
    ValidateFormFunction,
    ResetFormFunction,
    ResetFormValuesFunction,
    ResetFormErrorsFunction,
  ];
};

export default useForm;
