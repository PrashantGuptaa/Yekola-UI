import { Form, Input } from "antd";
import "./inputWithlabel.css";

const InputWithLabel = ({
  label,
  value,
  onInputChange,
  placeholder,
  helperText,
  errorLevel = "error",
}) => {
  console.log("F-5", helperText);
  return (
    <div className="input-container">
    <Form.Item label={label}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
    <div className={`${errorLevel} helperText`}>{helperText}</div>
    </Form.Item>
    </div>
  );
};

export default InputWithLabel;
