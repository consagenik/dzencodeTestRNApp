import React from 'react';
import {Alert, View} from 'react-native';
import {Formik, FormikProps} from 'formik';

import styles from './AddCommentForm.styles';

import DBAddCommentRequest from '../../db/entities/DBAddCommentRequest';
import {formValidationSchema} from './formValidationSchema';

import {Button} from '../button';
import {InputField} from '../form/inputField';
import {ImagePicker} from '../form/imagePicker';

interface IForm {
  userName: string;
  avatar: {fileName: string; filePath: string} | undefined;
  homePage: string;
  email: string;
  text: string;
}

interface AddCommentFormProps {
  showCommentForm: (value: boolean) => void;
  handleAddComment: (value: DBAddCommentRequest) => void;
}

const initialValues: IForm = {
  userName: '',
  email: '',
  text: '',
  homePage: '',
  avatar: undefined,
};

const avatarFormats = ['.jpg', '.jpeg', '.gif', '.png'];

export default function AddCommentForm({
  showCommentForm,
  handleAddComment,
}: AddCommentFormProps) {
  function renderForm({
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
  }: FormikProps<IForm>) {
    return (
      <View>
        <ImagePicker
          label="Avatar"
          handleSelect={file => setFieldValue('avatar', file)}
          value={values.avatar}
          formats={avatarFormats}
          error={errors.avatar}
        />
        <InputField
          label="Name"
          placeholder="Write your name"
          handleChange={handleChange('userName')}
          handleBlur={handleBlur('userName')}
          value={values.userName}
          error={errors.userName}
        />
        <InputField
          type="email"
          label="Email"
          placeholder="Write your email"
          handleChange={handleChange('email')}
          handleBlur={handleBlur('email')}
          value={values.email}
          error={errors.email}
        />
        <InputField
          type="url"
          label="Home page"
          placeholder="Write your home page"
          handleChange={handleChange('homePage')}
          handleBlur={handleBlur('homePage')}
          value={values.homePage}
          error={errors.homePage}
        />
        <InputField
          label="Text"
          placeholder="Write your comment"
          handleChange={handleChange('text')}
          handleBlur={handleBlur('text')}
          value={values.text}
          error={errors.text}
          multiline
          numberOfLines={4}
        />

        <View style={styles.actionButtons}>
          <View style={styles.buttonWrapper}>
            <Button
              text="Cancel"
              handlePress={() => showCommentForm(false)}
              type="outline"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button text="Submit" handlePress={handleSubmit} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.addCommentForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          Alert.alert('Submitted', JSON.stringify(values));
          handleAddComment(values as DBAddCommentRequest);
        }}>
        {renderForm}
      </Formik>
    </View>
  );
}
