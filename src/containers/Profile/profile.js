import { useState, useEffect } from "react";
import "./profile.css";
import InputWithLabel from "./../../components/InputWithLabel";
import {
  Button,
  Form,
  message,
  Spin,
  Typography,
  Input,
  Modal,
  Space,
} from "antd";
import {
  LeftOutlined,
} from '@ant-design/icons'
import {
  languagesOfferedOptions,
  languagesSpokenOptions,
  rolesOptions,
} from "./profileConstants";
import { ADMIN_ROLE } from "../../configs/constants";
import HttpServices from "../../configs/https.service";
import {
  FETCH_USER_ENDPOINT,
  UPDATE_PROFILE_IMAGE_ENDPOINT,
  UPDATE_ROLE_ENDPOINT,
  UPDATE_USER_ENDPOINT,
} from "./../../configs/apiEndpoints";
import { get } from "lodash";
import SelectWithLabel from "../../components/SelectWithLabel";
import { useSearchParams, useNavigate } from "react-router-dom";

const { TextArea } = Input;

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const { Text } = Typography;

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await HttpServices.getRequest(
        FETCH_USER_ENDPOINT(email)
      );
      const user = get(response, ["data", "data"]);
      setUserDetails(user);
      setLoading(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    const userDetailsCopy = { ...userDetails };
    userDetailsCopy[key] = value;
    setUserDetails(userDetailsCopy);
  };

  const handleSubmit = async () => {
    try {
      const {
        _id: userId,
        email,
        langaugesLearning,
        langaugesLearnt,
        role,
        bio,
        nationality,
      } = userDetails;
      setBtnLoading(true);
      await HttpServices.patchRequest(UPDATE_USER_ENDPOINT(userId), {
        langaugesLearning,
        langaugesLearnt,
        nationality,
        bio,
      });
      if (localStorage.getItem("role") === ADMIN_ROLE) {
        await HttpServices.patchRequest(UPDATE_ROLE_ENDPOINT(email), {
          newRole: role,
        });
      }
      message.success("Successfully updated details");
    } catch (e) {
      console.error(e);
      message.error(get(e, ["response", "data", "message"]));
    } finally {
      setBtnLoading(false);
      handleCloseEditModal();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file size is within the allowed limit 
      if (file.size <= 512 * 1024 * 6) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          handleChange("profilePhoto", base64Image);
          if (userDetails.userName === localStorage.getItem("userName"))
            localStorage.setItem("profile", base64Image);
          updateprofilePhoto(base64Image);
          // Send base64Image to your backend API for storage
          // You can use fetch or any other method to send it to the server
        };
        reader.readAsDataURL(file);
      } else {
        // Display an error message or take appropriate action
        message.error(
          "Image size exceeds the allowed limit (3 MB). Please choose a smaller image."
        );
        // alert();
        // Clear the input field
        document.getElementById("imageInput").value = "";
      }
    }
  };

  const updateprofilePhoto = async (profilePhoto) => {
    try {
      await HttpServices.patchRequest(
        UPDATE_PROFILE_IMAGE_ENDPOINT(userDetails._id),
        {
          profilePhoto,
        }
      );
    } catch (e) {
      console.error("Error while updating profile photo", e);
    }
  };

  const isLoggedInUserOrAdmin = () =>
    localStorage.getItem("name") === userDetails.name ||
    localStorage.getItem("role") === ADMIN_ROLE;

  const getView = () => {
    const {
      name,
      profilePhoto,
      langaugesLearning,
      langaugesLearnt,
      userName,
      bio,
      nationality,
    } = userDetails;

    return (
      <div className="profile-container">
        <section className="profile-photo-container">
          <section
            className="img-container"
            onClick={
              isLoggedInUserOrAdmin()
                ? () => document.getElementById("imageInput").click()
                : null
            }
            style={{ backgroundImage: `url(${profilePhoto})` }}
          >
            {profilePhoto ? null : (
              <span className="upload-text">Click to Upload Image</span>
            )}
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </section>
          <div padding="20px"></div>
          <section className="details">
            {isLoggedInUserOrAdmin() ? (
              <Button onClick={handleOpenEditModal} type="primary">
                Edit Profile
              </Button>
            ) : null}
            <p>
              <Text className="name">{`${name} (@${userName})`}</Text>
            </p>
            <div style={{ textAlign: "left" }}>
              <Text>
                <b>Languages Spoken: </b>

                {`${[...(langaugesLearnt || [])].toString()}`}
              </Text>
            </div>
            <div>
              <Text>
                <b>Languages Learning: </b>
                {`${[...(langaugesLearning || [])].toString()}`}
              </Text>
            </div>
            <div>
              <Text>
                <b>Nationality: </b>
                {`Nationality:  ${nationality || ""}`}
              </Text>
            </div>
          </section>
        </section>
        <section className="center-screen"></section>
        <section className="profile-details">
          <Text>
            <b>Bio</b>
          </Text>
          <p>
            <Text type="primary">{bio}</Text>
          </p>
          <div className="back-btn">
        <Button onClick={() => navigate(`/home/room-list/Yekola`)}><LeftOutlined /> Back</Button>
          </div>
        </section>
      </div>
    );
  };

  const getEditModalView = () => {
    const { role, langaugesLearning, langaugesLearnt, bio, nationality } =
      userDetails;

    return (
      <Modal
        className="profile-details"
        title="Edit Details"
        width={600}
        open={showEditModal}
        onCancel={handleCloseEditModal}
        onOk={handleSubmit}
        okText="Submit"
        style={{
          top: 30,
        }}
      >
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <TextArea
            placeholder="Bio"
            value={bio}
            rows={4}
            showCount
            maxLength={200}
            onChange={(e) => handleChange("bio", e.target.value)}
          />
          <br />
          <InputWithLabel
            label="Nationality"
            value={nationality}
            showCount
            maxLength={50}
            placeholder="Enter Nationality"
            onInputChange={(e) => handleChange("nationality", e.target.value)}
          />

          {localStorage.getItem("role") === ADMIN_ROLE && (
            <SelectWithLabel
              selectedValue={role}
              disabled={localStorage.getItem("role") !== ADMIN_ROLE}
              options={rolesOptions}
              handleChange={(value) => handleChange("role", value)}
              label="Role"
            />
          )}
          <SelectWithLabel
            selectedValue={langaugesLearnt}
            options={languagesSpokenOptions}
            handleChange={(value) => handleChange("langaugesLearnt", value)}
            label="Languages Spoken"
            mode="multiple"
          />

          <SelectWithLabel
            selectedValue={langaugesLearning}
            options={languagesOfferedOptions}
            handleChange={(value) => handleChange("langaugesLearning", value)}
            label="Languages learning"
            mode="multiple"
          />
        </Form>
      </Modal>
    );
  };

  const handleOpenEditModal = () => setShowEditModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);

  return (
    <>
      {loading ? (
        <div className="complete-center">
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        getView()
      )}
      {getEditModalView()}
    </>
  );
};

export default Profile;
