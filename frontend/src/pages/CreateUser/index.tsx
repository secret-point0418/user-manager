import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import { UserForm } from "../../components/UserForm";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CREATE_USER_LABEL, USER_MANAGER_LABEL } from "../../constants/common";

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: "500px", padding: "1rem" }}>
      <CardHeader
        action={
          <IconButton color="info" onClick={() => navigate("/home")}>
            <ManageAccounts />
          </IconButton>
        }
        title={USER_MANAGER_LABEL}
        subheader={CREATE_USER_LABEL}
      />
      <UserForm />
    </Card>
  );
};

export default CreateUser;
