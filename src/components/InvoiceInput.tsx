import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import React from "react";

const InvoiceInput = ({
  label,
  error,
  helperText,
  name,
  onBlur,
  onChange,
  type,
  value,
  disabled,
}: {
  label?: string;
  type?: string;
  error?: boolean;
  name?: string;
  helperText?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FormControl error={error}>
      <FormLabel sx={{ m: 0 }}>{label ?? ""}</FormLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {helperText && (
        <FormHelperText sx={{ fontSize: "0.75rem" }}>
          <InfoOutlined />
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InvoiceInput;
