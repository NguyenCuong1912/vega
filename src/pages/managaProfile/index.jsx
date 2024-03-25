import React, { useCallback, useEffect, useState } from "react";
import CommonStyles from "../../components/CommonStyles";
import Icons from "../../assets/icons/index";
import styles from "./style.module.css";
import useToggle from "../../hooks/useToggle";
import ModalProfile from "./ModalProfile";
import headerTable from "../../constants/headerTable";
import { KEY_STORE } from "../../constants/constants";
import { toast } from "react-toastify";
import { truncateString } from "../../helpers";
export default function ManageProfile() {
  //! state
  const { open, shouldRender, toggle } = useToggle();
  const {
    open: openConfirm,
    toggle: toggleConfirm,
    shouldRender: shouldRenderConfirm,
  } = useToggle();
  const [detail, setDetail] = useState(null);
  const [dataSearch, setDataSearch] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 5,
    phonenumber: "",
    fullname: "",
  });
  useEffect(() => {}, []);
  useEffect(() => {
    if (dataSearch.length > 0) {
      const results = dataSearch?.filter((item) => {
        if (filters.fullname && !filters.phonenumber) {
          return item.fullname
            .toLowerCase()
            .includes(filters.fullname.toLowerCase());
        }
        if (filters.phonenumber && !filters.fullname) {
          return Number(item.phonenumber) === Number(filters.phonenumber);
        }
        if (filters.phonenumber && filters.fullname) {
          return (
            item.fullname
              .toLowerCase()
              .includes(filters.fullname.toLowerCase()) &&
            Number(item.phonenumber) === Number(filters.phonenumber)
          );
        }
        if (!filters.phonenumber && !filters.fullname) {
          const profileLocal = localStorage.getItem(KEY_STORE.Profile);
          return JSON.parse(profileLocal);
        }
      });
      setProfiles(results);
      return;
    }
    const profileLocal = localStorage.getItem(KEY_STORE.Profile);
    if (profileLocal) {
      setProfiles(JSON.parse(profileLocal));
      setDataSearch(JSON.parse(profileLocal));
    }
  }, [filters]);

  //! functions
  const handleAdd = () => {
    setDetail(null);
    toggle();
  };
  const handleConfirm = (index) => {
    setDetail(index);
    toggleConfirm();
  };
  const handleDelete = () => {
    if (typeof detail === "number") {
      const profileLocal = JSON.parse(localStorage.getItem(KEY_STORE.Profile));
      const dataDelete = profileLocal[detail];
      profileLocal.splice(detail, 1);
      localStorage.setItem(KEY_STORE.Profile, JSON.stringify(profileLocal));
      setProfiles(profileLocal);
      toast.success(
        `${dataDelete.fullname} - ${dataDelete.phonenumber} xoá thành công`
      );
      toggleConfirm();
    }
  };
  const handleEdit = (index) => {
    setDetail(index);
    toggle();
  };
  const handleOnChangePage = (page) => {
    setFilters((prev) => ({ ...prev, page: page }));
  };
  const handleSearch = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  //! render

  const renderTable = useCallback(() => {
    if (!profiles) {
      return [];
    }
    return profiles?.map((item, index) => {
      return {
        stt: <CommonStyles.Typograpy>{index + 1}</CommonStyles.Typograpy>,
        profile: (
          <div>
            <CommonStyles.Typograpy className={styles.marginText}>
              SĐT: {item.phonenumber}
            </CommonStyles.Typograpy>
            <CommonStyles.Typograpy className={styles.marginText}>
              Tên: {item.fullname}
            </CommonStyles.Typograpy>
            <CommonStyles.Typograpy className={styles.marginText}>
              Giới tính: {item.gender}
            </CommonStyles.Typograpy>
          </div>
        ),
        date_of_birth: (
          <CommonStyles.Typograpy>{item.date_of_birth}</CommonStyles.Typograpy>
        ),
        address: (
          <CommonStyles.Typograpy>
            {truncateString(item.address, 50)}
          </CommonStyles.Typograpy>
        ),
        mainProfile: <CommonStyles.Typograpy>{""}</CommonStyles.Typograpy>,
        notify: <CommonStyles.Typograpy>{""}</CommonStyles.Typograpy>,
        action: (
          <div>
            <CommonStyles.ButtonAction
              key={index}
              handleDelete={() => {
                handleConfirm(index);
              }}
              handelEdit={() => {
                handleEdit(index);
              }}
            />
          </div>
        ),
      };
    });
  }, [profiles]);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.actionSearch}>
          <div className={styles.search}>
            <CommonStyles.Search
              name="phonenumber"
              placeholder="Nhập SĐT để tìm kiếm"
              search
              onChange={handleSearch}
            />
            <CommonStyles.Search
              name="fullname"
              placeholder="Nhập tên để tìm kiếm"
              search
              onChange={handleSearch}
            />
          </div>
          <div>
            <CommonStyles.Button
              onClick={() => {
                handleAdd();
              }}
              Icons={Icons.Plus}
              variant="contained"
            >
              Thêm mới hồ sơ
            </CommonStyles.Button>
          </div>
        </div>
        <div>
          <CommonStyles.Table
            headers={headerTable.profile}
            body={renderTable()}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <CommonStyles.Typograpy>
            Tổng số: {profiles?.length}
          </CommonStyles.Typograpy>
        </div>
        <CommonStyles.Pagination
          currentPage={filters.page}
          totalPages={Math.ceil(profiles?.length / filters.pageSize)}
          handleOnChangePage={handleOnChangePage}
        />
      </div>

      {shouldRender && (
        <CommonStyles.Modal
          open={open}
          toggle={toggle}
          title={
            typeof detail !== "number" ? "Tạo mới hồ sơ" : "Thông tin hồ sơ"
          }
          width={600}
        >
          <ModalProfile
            setData={setProfiles}
            idProfile={detail}
            toggle={toggle}
          />
        </CommonStyles.Modal>
      )}
      {shouldRenderConfirm && (
        <CommonStyles.Modal
          open={openConfirm}
          toggle={toggleConfirm}
          title="Thông báo"
        >
          <CommonStyles.Typograpy>
            {` Bạn có chắc muốn xoá hồ sơ ${profiles[detail].fullname} - ${profiles[detail].phonenumber} ?`}
          </CommonStyles.Typograpy>
          <div className={styles.action}>
            <CommonStyles.Button onClick={handleDelete} variant="contained">
              Xác nhận
            </CommonStyles.Button>
            <CommonStyles.Button
              variant="outline"
              onClick={toggleConfirm}
              color="#ff8a80"
              outline
            >
              Hủy
            </CommonStyles.Button>
          </div>
        </CommonStyles.Modal>
      )}
    </div>
  );
}
