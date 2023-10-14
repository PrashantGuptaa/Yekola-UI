import { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import HttpServices from "../../configs/https.service";
import { SEARCH_USERS_ENDPOINT } from "../../configs/apiEndpoints";
import { get } from "lodash";
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';
import { debounceFn } from "../../utils/helperFuncs";

const UserSearch = () => {
  const [optionsData, setOptionsData] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const userSearchRef = useRef(null);

  const navigate = useNavigate();

  const handleSearch = (search) => {
    setSearchValue(search);
    debounceFn(fetchSearchResult, 300, userSearchRef);
  };

  const fetchSearchResult = async () => {
    try {
      if (!searchValue) {
        setOptionsData([]);
        setSearchValue([]);
        return;
      }
      const response = await HttpServices.getRequest(
        SEARCH_USERS_ENDPOINT(searchValue)
      );
      const result = get(response, ['data','data']);
      const data = result.map(({name, userName, _id: userId, email}) => ({
        value: email,
        label: `${name} (@${userName})`,
        key: userId
      }))
      setOptionsData(data);
    } catch (e) {
      console.error("error while searching", e);
    }
  };


  const handleChange = async (email) => {
    return navigate(`/profile?email=${email}`);

  };

  return (
    <>
      {localStorage.getItem("name") && (
        <Select
          showSearch
          value={searchValue}
          placeholder={"Search by name or email or user name"}
          className="search"
          defaultActiveFirstOption={false}
          suffixIcon={<SearchOutlined />}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          options={optionsData}
        />
      )}
    </>
  );
};

export default UserSearch;
