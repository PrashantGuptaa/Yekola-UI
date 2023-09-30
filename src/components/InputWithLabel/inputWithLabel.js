import { Form, Input } from "antd";
import "./inputWithlabel.css";

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
  showCount = false
}) => {
  return (
    <div className="input-container">
      {/* <span className="required">*</span> */}
      <Form.Item label={label}>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          showCount={showCount}
        />
        {showError && (
          <div className={`${errorLevel} helperText`}>{helperText}</div>
        )}
      </Form.Item>
    </div>
  );
};

export default InputWithLabel;
