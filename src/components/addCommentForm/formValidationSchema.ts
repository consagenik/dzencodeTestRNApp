import * as Yup from 'yup';

export const formValidationSchema = Yup.object({
  avatar: Yup.object()
    .shape({
      fileName: Yup.string(),
      filePath: Yup.string(),
    })
    .required('Required'),
  userName: Yup.string().required('Required').trim('Not empty'),
  email: Yup.string().email('Invalid email address').required('Required'),
  homePage: Yup.string().nullable(),
  text: Yup.string().required('Required').trim('Not empty'),
});
