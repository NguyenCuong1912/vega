import React from "react";
import CommonStyles from "../../../components/CommonStyles";
import {
  gender,
  bloodGroup,
  countries,
  KEY_STORE,
} from "../../../constants/constants";
import styles from "./index.module.css";
import { Field, Form, Formik } from "formik";
import validProfile from "./validate";
import moment from "moment";
import { toast } from "react-toastify";
export default function ModalProfile(props) {
  //! state
  const { toggle, setData, idProfile } = props;
  const typeId = typeof idProfile === "number";
  const dataLocal = localStorage.getItem(KEY_STORE.Profile);
  const dataEdit =
    dataLocal && typeId ? JSON.parse(dataLocal)[idProfile] : null;
  const initialValues = {
    phonenumber: dataEdit ? dataEdit.phonenumber : "",
    fullname: dataEdit ? dataEdit.fullname : "",
    gender: dataEdit ? dataEdit.gender : gender[0].value,
    bloodGroup: dataEdit ? dataEdit.bloodGroup : 0,
    date_of_birth: dataEdit
      ? dataEdit.date_of_birth
      : moment(new Date()).format("YYYY-MM-DD"),
    country: dataEdit ? dataEdit.country : countries[9].value,
    email: dataEdit ? dataEdit.email : "",
    address: dataEdit ? dataEdit.address : "",
  };
  //! function
  const handleSubmit = (values) => {
    const profiles = localStorage.getItem(KEY_STORE.Profile);
    if (!profiles) {
      localStorage.setItem(KEY_STORE.Profile, JSON.stringify([values]));
      toast.success(`${values.fullname} - ${values.phonenumber} được thêm mới`);
      setData([values]);
      toggle();
      return;
    } else {
      const dataLocal = JSON.parse(profiles);
      const checkExist = dataLocal.some(
        (item) => item.phonenumber === values.phonenumber
      );
      if (checkExist && !dataEdit) {
        toast.error("Số điện thoại đã được sử dụng");
        return;
      }
      if (!!dataEdit) {
        dataLocal[idProfile] = values;
        localStorage.setItem(KEY_STORE.Profile, JSON.stringify(dataLocal));
        setData(dataLocal);
        toast.success(
          `${values.fullname} - ${values.phonenumber} sửa thành công`
        );
        toggle();
        return;
      }
      const newData = [...dataLocal, values];
      localStorage.setItem(KEY_STORE.Profile, JSON.stringify(newData));
      setData(newData);
      toast.success(`${values.fullname} - ${values.phonenumber} được thêm mới`);
      toggle();
    }
  };
  //! render
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validProfile}
      enableReinitialize
    >
      {() => (
        <Form>
          <div className={styles.container}>
            <div className={styles.rowInput1}>
              <Field
                label="Số điện thoại"
                name="phonenumber"
                required
                disabled={!!dataEdit}
                fullWidth
                component={CommonStyles.Input}
              />
            </div>
            <div className={styles.rowInput2}>
              <Field
                label="Họ và tên"
                name="fullname"
                required
                fullWidth
                component={CommonStyles.Input}
              />
            </div>
            <div className={styles.rowInput3}>
              <Field
                label="Giới tính"
                name="gender"
                options={gender}
                required
                fullWidth
                component={CommonStyles.Select}
              />
              <Field
                label="Nhóm máu"
                name="bloodGroup"
                options={bloodGroup}
                required
                fullWidth
                component={CommonStyles.Select}
              />
            </div>

            <div className={styles.rowInput4}>
              <Field
                label="Ngày sinh"
                name="date_of_birth"
                required
                fullWidth
                component={CommonStyles.DatePicker}
              />
              <Field
                label="Quốc gia"
                name="country"
                options={countries}
                required
                fullWidth
                component={CommonStyles.Select}
              />
            </div>
            <div className={styles.rowInput5}>
              <Field
                label="Email"
                name="email"
                fullWidth
                component={CommonStyles.Input}
              />
            </div>
            <div className={styles.rowInput6}>
              <Field
                label="Địa chỉ"
                name="address"
                required
                fullWidth
                component={CommonStyles.Input}
              />
            </div>
          </div>
          <div className={styles.action}>
            <CommonStyles.Button variant="contained" type="submit">
              Hoàn thành
            </CommonStyles.Button>
            <CommonStyles.Button
              variant="outline"
              onClick={toggle}
              color="#ff8a80"
              outline
            >
              Hủy
            </CommonStyles.Button>
          </div>
          {/* <CommonStyles.FormikDebug /> */}
        </Form>
      )}
    </Formik>
  );
}
