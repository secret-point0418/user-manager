import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  Upgrade as UpgradeIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { ConfirmModal } from "../ConfirmModal";
import instance from "../../api/axios";
import { TResponseStatus, TUserInfo } from "../../types/common";
import { Toastr } from "../Toastr";
import { AxiosError } from "axios";
import { NO_CHANGES_LABEL, NO_USERS_LABEL } from "../../constants/common";
import isEqual from "lodash/isEqual";

interface IUserTable {
  rows: TUserInfo | undefined;
  setRows: (rows: TUserInfo) => void;
}

export const UserTable: React.FC<IUserTable> = ({ rows, setRows }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [responseMessage, setResponseMessgae] = useState("");
  const [responseStatus, setResponseStatus] =
    useState<TResponseStatus>("success");
  const [isToastrOpen, setIsToastrOpen] = useState(false);
  const [curId, setCurId] = useState("");
  const handleDelete = async () => {
    try {
      setIsDeleteModalOpen(false);
      const res = await instance.delete(`/user/${curId}`);
      setResponseMessgae(res.data);
      setResponseStatus("success");
      !!rows && setRows(rows.filter((row) => row.id !== curId) || []);
    } catch (error) {
      const err: any = error as AxiosError;
      setResponseStatus("error");
      setResponseMessgae(err.response?.data);
    } finally {
      setIsToastrOpen(true);
    }
  };

  const handleUpdate = async (
    id: GridRowId,
    name: string,
    email: string,
    phoneNumber: string,
    age: Number
  ) => {
    try {
      const curUserInfo = { ...rows?.find((row) => row.id === id) } || {};
      delete curUserInfo["id"];
      console.log(
        curUserInfo,
        rows,
        isEqual(curUserInfo, { name, email, phoneNumber, age })
      );
      if (isEqual(curUserInfo, { name, email, phoneNumber, age })) {
        setResponseMessgae(NO_CHANGES_LABEL);
        setResponseStatus("warning");
      } else {
        const res = await instance.put(`/user/${id}`, {
          name,
          email,
          phoneNumber,
          age,
        });
        setResponseMessgae(res.data);
        setResponseStatus("success");
      }
    } catch (error) {
      const err: any = error as AxiosError;
      setResponseStatus("error");
      setResponseMessgae(err.response?.data);
    } finally {
      setIsToastrOpen(true);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 130,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 210,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 120,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "udpate",
      headerName: "UPDATE",
      width: 120,
      headerAlign: "center",

      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          fullWidth
          onClick={() =>
            handleUpdate(
              params.id,
              params.row.name,
              params.row.email,
              params.row.phoneNumber,
              params.row.age
            )
          }
        >
          <UpgradeIcon />
          UPDATE
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "DELETE",
      headerAlign: "center",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          type="submit"
          color="error"
          fullWidth
          onClick={() => {
            setCurId(params.id as string);
            setIsDeleteModalOpen(!isDeleteModalOpen);
          }}
        >
          <DeleteIcon />
          DELETE
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ height: "375px", width: "100%" }}>
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onConfirm={handleDelete}
        />

        <DataGrid
          loading={!rows}
          localeText={{ noRowsLabel: NO_USERS_LABEL }}
          rows={rows || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      <Toastr
        message={responseMessage}
        isOpen={isToastrOpen}
        setIsOpen={setIsToastrOpen}
        status={responseStatus}
      />
    </Box>
  );
};
