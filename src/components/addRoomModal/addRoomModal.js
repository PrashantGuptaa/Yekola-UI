import { Form, Modal, Typography } from "antd";
import InputWithLabel from "../InputWithLabel";
import { useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment 
 from 'moment';
 import {
    END_DATE_BEFORE_START_DATE_ERROR,
  EMPTY_FIELD_ERROR,
  RESERVED_CHARACTERS_ERROR,
} from "../../configs/constants";

const AddRoomModal = ({
  showCreateRoomModal,
  handleCreateRoomSubmit,
  handleCloseCreateRoomModal,
  isCreatingRoom,
}) => {
  const [roomDetails, setRoomDetails] = useState({
    startDateTime: dayjs(moment()),
    endDateTime: dayjs(moment())
  });

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const [form] = Form.useForm();

  const handleInputChange = (key, value) => {
    const obj = {
      ...roomDetails,
    };
    obj[key] = value;
    setRoomDetails(obj);
  };

  const checkForErrors = () => {
    const errorsMessage = {},
      showErrorMessages = {};
    const { name, description, startDateTime, endDateTime } = roomDetails;
    if (!name) {
      errorsMessage.name = EMPTY_FIELD_ERROR;
      showErrorMessages.name = true;
    }

    if (name &&( name.includes("_") ||  name.includes("-"))) {
      errorsMessage.name = RESERVED_CHARACTERS_ERROR;
      showErrorMessages.name = true;
    }

    if (!description) {
      errorsMessage.description = EMPTY_FIELD_ERROR;
      showErrorMessages.description = true;
    }
    if (!startDateTime) {
        errorsMessage.startDateTime = EMPTY_FIELD_ERROR;
    }

    if (!endDateTime) {
        errorsMessage.endDateTime = EMPTY_FIELD_ERROR;
    }

    const formattedStartDateTime = startDateTime.format();
    const formattedEndDateTime = endDateTime.format();


    // console.log("F-5",sd, ed , moment(ed).isSameOrBefore(sd, 'm') )
    if (formattedStartDateTime && formattedEndDateTime && moment(formattedEndDateTime).isSameOrBefore(formattedStartDateTime, 'm')) {
        errorsMessage.startDateTime = END_DATE_BEFORE_START_DATE_ERROR;
        errorsMessage.endDateTime = END_DATE_BEFORE_START_DATE_ERROR;
    }
    setErrors(errorsMessage);
    setShowErrors(showErrorMessages);
    if (Object.keys(errorsMessage).length) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (checkForErrors()) {
        return;
    }
    handleCreateRoomSubmit(roomDetails);
  };

  console.log("Room -details f-41", roomDetails);
  return (
    <Modal
      title={"Create Room"}
      open={showCreateRoomModal}
      onOk={handleSubmit}
      onCancel={handleCloseCreateRoomModal}
      okButtonProps={{ disabled: isCreatingRoom }}
      cancelButtonProps={{ disabled: isCreatingRoom }}
      okText="Submit"
      confirmLoading={isCreatingRoom}
      width={400}
    >
      <Form
        onFinish={handleSubmit}
        //   {...formItemLayout}
        layout="vertical"
        form={form}
      >
        <InputWithLabel
          label="Name"
          value={roomDetails.name}
          onInputChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter Room Name"
          helperText={errors.name}
          showError={showErrors.name}
        />
        <InputWithLabel
          label="Description"
          value={roomDetails.description}
          onInputChange={(e) =>
            handleInputChange("description", e.target.value)
          }
          placeholder="Enter Room Description"
          helperText={errors.description}
          showError={showErrors.description}
        />
        <div className="column" style={{ gap: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Start Date and Time"
              value={roomDetails.startDateTime}
              onChange={(newValue) => handleInputChange("startDateTime", newValue)}
              
            />
            <div className="error negative-top-margin">{errors.startDateTime}</div>

          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="End Date and Time"
              value={roomDetails.endDateTime}
              onChange={(newValue) => handleInputChange("endDateTime", newValue)}
            />
            <div className="error negative-top-margin">{errors.endDateTime}</div>
          </LocalizationProvider>
        </div>

        {/* <div className="date-time">
          <Space className="vertical">
            <Text>Start Date</Text>
            <DatePicker
              onChange={(dateValue) =>
                handleInputChange("startDateTime", dateValue)
              }
              value={roomDetails.date}
            />
          </Space>
          <Space className="vertical">
            <Text>End Date</Text>
            <DatePicker
              onChange={(dateValue) => handleInputChange("endDateTime", dateValue)}
              value={roomDetails.date}
            />
          </Space>
        </div>
        <div className="date-time">
          <Space className="vertical">
            <Text>Start Time</Text>
            <TimePicker
              onChange={(value, str) =>
                handleInputChange("startTime", value, str)
              }
              value={roomDetails.time}
              // disabledSeconds={true}
            />
          </Space>
          <Space className="vertical">
            <Text>End Time</Text>
            <TimePicker
              onChange={(value, str) =>
                handleInputChange("endTime", value, str)
              }
              value={roomDetails.time}
            />
          </Space>
        </div> */}
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
