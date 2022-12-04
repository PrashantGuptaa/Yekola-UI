import { Form, Input } from "antd";
import "./inputWithlabel.css";

const InputWithLabel = ({
  label,
  value,
  onInputChange,
  placeholder,
  helperText,
  errorLevel = "error",
  type ='text',
  showError = false,
}) => {
  return (
    <div className="input-container">
    <Form.Item label={label}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        type={type}
      />
    {showError && <div className={`${errorLevel} helperText`}>{helperText}</div>}
    </Form.Item>
    </div>
  );
};

export default InputWithLabel;
