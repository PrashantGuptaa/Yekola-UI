import { Form, Select } from "antd";

const SelectWithLabel = ({
  selectedValue,
  disabled,
  options,
  handleChange,
  label,
  mode
}) => {
  return (
    <Form.Item label={label}>
      <Select
        defaultValue={selectedValue}
        disabled={disabled}
        options={options}
        onChange={handleChange}
        mode={mode}
      />
    </Form.Item>
  );
};

export default SelectWithLabel;
