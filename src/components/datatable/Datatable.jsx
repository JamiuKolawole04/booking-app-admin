import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./datatable.scss";
// import { userColumns, userRows } from "../../datatablesource";
import axios from "../../utils/axios";
import useFetchUsers from "../../hooks/useFetchUsers";
import useFetchHotels from "../../hooks/useFetchHotels";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data, loading } = useFetchUsers();
  const { hotelData, loadingHotels } = useFetchHotels()

  const [list, setList] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {

    if (loading) {
      setList([])
    } else {

      return setList(data.users)
    }



  }, [data, loading]);

  useEffect(() => {
    if (loadingHotels) {
      setHotels([])
    } else {
      return setHotels(hotelData.hotels)
    }
  }, [loadingHotels, hotelData])




  const handleDelete = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `/${path}/${id}`,
        withCredentials: true
      })
      setList(data.users.filter((item) => item._id !== id));
      setHotels(hotelData.hotels.filter((item) => item._id !== id));


    } catch (err) {
      console.log(err);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={path.startsWith("u") ? list : hotels}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      // getRowId={() => {return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}}

      />
    </div>
  );
};

export default Datatable;
