import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { TextFieldController } from "../TextFieldController";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EMAIL_LABEL,
  NAME_LABEL,
  PHONE_NUMBER_LABEL,
} from "../../constants/common";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import PeopleIcon from "@mui/icons-material/People";
import { IUserBasicInfo, TResponseStatus } from "../../types/common";
import instance from "../../api/axios";
import { Toastr } from "../Toastr";
import { AxiosError } from "axios";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email must be a valid email address")
      .required("Email is a required field"),
    name: yup.string().required("Name is a required field"),
    phoneNumber: yup.string().required("Phone number is a required field"),
  })
  .required();

export const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [responseMessage, setResponseMessgae] = useState("");
  const [responseStatus, setResponseStatus] =
    useState<TResponseStatus>("success");
  const [isToastrOpen, setIsToastrOpen] = useState(false);
  const { control, handleSubmit, getValues, reset } = useForm<IUserBasicInfo>({
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const goToUsers = () => {
    navigate("/home");
  };

  const createUser = async () => {
    try {
      const res = await instance.post("/user", { ...getValues() });
      setResponseMessgae(res.data);
      setResponseStatus("success");
      reset();
    } catch (error) {
      const err: any = error as AxiosError;
      setResponseStatus("error");
      setResponseMessgae(err.response?.data);
    } finally {
      setIsToastrOpen(true);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(createUser)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextFieldController
            name="email"
            label={EMAIL_LABEL}
            control={control}
          />
          <TextFieldController
            name="name"
            label={NAME_LABEL}
            control={control}
          />
          <TextFieldController
            name="phoneNumber"
            label={PHONE_NUMBER_LABEL}
            control={control}
          />
          <Box sx={{ width: "100%", display: "flex", gap: "0.5rem" }}>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SendIcon />}
              fullWidth
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={goToUsers}
              endIcon={<PeopleIcon />}
              fullWidth
            >
              Users
            </Button>
          </Box>
        </Box>
      </form>
      <Toastr
        message={responseMessage}
        isOpen={isToastrOpen}
        setIsOpen={setIsToastrOpen}
        status={responseStatus}
      />
    </Box>
  );
};
