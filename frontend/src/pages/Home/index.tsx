import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { UserTable } from "../../components/UserTable";
import instance from "../../api/axios";
import { TUserInfo } from "../../types/common";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<TUserInfo | undefined>();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await instance.get("/user/all");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <Card sx={{ width: "800px", padding: "1rem" }}>
      <CardHeader
        action={
          <IconButton
            aria-label="create a user"
            color="info"
            onClick={() => navigate("/")}
          >
            <PersonAddIcon />
          </IconButton>
        }
        title="User Manager"
        subheader="Double click a cell to edit and click update button"
      />
      <UserTable rows={users} setRows={setUsers} />
    </Card>
  );
};

export default Home;
