import * as yup from "yup";
const validProfile = yup.object({
  phonenumber: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  fullname: yup
    .string()
    .required("Họ và tên không được để trống")
    .max(50, "Họ và tên không được quá 50 kí tự"),
  bloodGroup: yup.number().min(1, "Nhóm máu chưa được chọn"),
  date_of_birth: yup.date().max(new Date(), "Ngày sinh không hợp lệ"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .max(150, "Độ dài email không được vượt quá 150 kí tự"),
  address: yup
    .string()
    .required("Địa chỉ không được để trống")
    .max(255, "Độ dài email không được vượt quá 255 kí tự"),
});

export default validProfile;
