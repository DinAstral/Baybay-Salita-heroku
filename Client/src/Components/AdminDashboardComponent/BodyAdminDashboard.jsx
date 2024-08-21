import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../ContentDasboard/Content.css";
import AdminContentHeader from "../ContentDasboard/AdminContentHeader";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  User,
  Chip,
} from "@nextui-org/react";
import { columns, users } from "./data";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { LineChart } from "@mui/x-charts/LineChart";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const BodyAdminDashboard = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 3;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will add Information for your students in your section.
    </Tooltip>
  );

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faEye} />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faPen} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="content">
      <AdminContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Dashboard
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                size="1x"
                className="help-icon"
              />
            </OverlayTrigger>
          </div>
        </div>
        <div className="flex flex-col w-[100%] h-full max-h-[800px] bg-[#fff] mt-2 p-5 rounded-md shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-md uppercase font-bold">Total User</p>
                <small className="text-default-500">12 Tracks</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                  width={270}
                />
              </CardBody>
            </Card>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-md uppercase font-bold">Total User</p>
                <small className="text-default-500">12 Tracks</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                  width={270}
                />
              </CardBody>
            </Card>
            <div className="w-full">
              <Card className="py-4 w-full">
                <CardBody className="overflow-visible py-2">
                  <Table
                    aria-label="Example table with custom cells"
                    bottomContent={
                      <div className="flex w-full justify-center"></div>
                    }
                    classNames={{
                      wrapper: "min-h-[222px]",
                    }}
                  >
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn
                          key={column.uid}
                          align={column.uid === "actions" ? "center" : "start"}
                        >
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={items}>
                      {(item) => (
                        <TableRow key={item.id}>
                          {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="flex">
            <Card className="py-4 w-full">
              <CardBody className="overflow-visible py-2">
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                  ]}
                  width={1250}
                  height={250}
                  margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                  grid={{ vertical: true, horizontal: true }}
                  className="pl-10"
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminDashboard;
