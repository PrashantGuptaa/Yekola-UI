import { Form, Input, Space } from "antd";
import "./inputWithlabel.css";
import { useState } from "react";

const InputWithLabel = ({
  label,
  value,
  onInputChange,
  placeholder,
  helperText,
  errorLevel = "error",
  type = "text",
  showError = false,
  disabled = false,
  maxLength = null,
  showCount = false,
  prefix = null,
  suffix = null,
  visibilityToggle,
  suffixAddOn,
}) => {
  return (
    <div className="input-container">
      <Form.Item label={label}>
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Input
            placeholder={placeholder}
            value={value}
            onChange={onInputChange}
            type={type}
            disabled={disabled}
            maxLength={maxLength}
            showCount={showCount}
            prefix={prefix}
            suffix={suffix}
          />
          {suffixAddOn}
        </Space.Compact>
        {showError && (
          <div className={`${errorLevel} helperText`}>{helperText}</div>
        )}
      </Form.Item>
    </div>
  );
};

export default InputWithLabel;
