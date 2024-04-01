import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const InvoiceInput = ({
  label,
  placeholder,
  error,
  helperText,
  name,
  onBlur,
  onChange,
  type,
  value,
  disabled,
  mb,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: boolean;
  name?: string;
  helperText?: string;
  value?: string;
  disabled?: boolean;
  mb?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FormControl error={error}>
      <FormLabel sx={{ m: 0, mb }}>{label ?? ""}</FormLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
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
