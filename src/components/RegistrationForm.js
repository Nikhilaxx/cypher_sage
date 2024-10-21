import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const [skills, setSkills] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [profilePic, setProfilePic] = useState(null);
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    emergencyContact: Yup.string().required('Emergency contact is required'),
  });

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReview = () => {
    alert(JSON.stringify({ ...formData, skills, profilePic, role, experience }, null, 2));
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleReview}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center mb-6">Cricket Player Registration</h1>
          <div className="mb-4">
            <div className="flex justify-between">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`py-2 px-4 rounded ${currentStep === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => setCurrentStep(i + 1)}
                >
                  Step {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 mb-6">
              <div className="w-full h-1 bg-gray-200 rounded">
                <div
                  className={`h-full bg-blue-500 rounded ${currentStep === 1 ? 'w-1/4' : currentStep === 2 ? 'w-2/4' : currentStep === 3 ? 'w-3/4' : 'w-full'}`}
                />
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Step 1: Player Details</h2>
              <label className="mb-2 block">
                Name:
                <Field
                  type="text"
                  name="name"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  onChange={handleChange}
                />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
              </label>
              <label className="mb-2 block">
                Email:
                <Field
                  type="email"
                  name="email"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  onChange={handleChange}
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
              </label>
              <label className="mb-2 block">
                Phone:
                <Field
                  type="tel"
                  name="phone"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  onChange={handleChange}
                />
                <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
              </label>
              <label className="mb-2 block">
                Address:
                <Field
                  type="text"
                  name="address"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  onChange={handleChange}
                />
                <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
              </label>
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded mt-4"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Step 2: Skills & Profile Picture</h2>
              <div className="mb-4">
                <label>Upload Profile Picture:</label>
                <input
                  type="file"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  onChange={handleProfilePicChange}
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Skills:</h3>
                {skills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span className="text-gray-800">{skill}</span>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeSkill(skill)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <Field
                  type="text"
                  placeholder="Add a skill and press Enter"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(e.target.value);
                      e.target.value = ''; // Clear the input after adding
                    }
                  }}
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded mt-4"
                onClick={nextStep}
              >
                Next
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 p-2 rounded mt-4 ml-2"
                onClick={previousStep}
              >
                Previous
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Step 3: Role & Experience</h2>
              <label className="mb-2 block">
                Role:
                <Field as="select" name="role" className="border border-gray-300 p-2 rounded w-full mb-2" onChange={(e) => setRole(e.target.value)}>
                  <option value="" label="Select role" />
                  <option value="Batsman" label="Batsman" />
                  <option value="Bowler" label="Bowler" />
                  <option value="All-rounder" label="All-rounder" />
                </Field>
              </label>
              <label className="mb-2 block">
                Experience Level:
                <Field as="select" name="experience" className="border border-gray-300 p-2 rounded w-full mb-2" onChange={(e) => setExperience(e.target.value)}>
                  <option value="" label="Select experience" />
                  <option value="Beginner" label="Beginner" />
                  <option value="Intermediate" label="Intermediate" />
                  <option value="Advanced" label="Advanced" />
                </Field>
              </label>
              <label className="mb-2 block">
                Emergency Contact:
                <Field
                  type="tel"
                  name="emergencyContact"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  onChange={handleChange}
                />
                <ErrorMessage name="emergencyContact" component="div" className="text-red-600 text-sm" />
              </label>
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded mt-4"
                onClick={nextStep}
              >
                Next
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 p-2 rounded mt-4 ml-2"
                onClick={previousStep}
              >
                Previous
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Step 4: Review & Submit</h2>
              <div className="mb-4">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Role:</strong> {role}</p>
                <p><strong>Experience:</strong> {experience}</p>
                <p><strong>Emergency Contact:</strong> {formData.emergencyContact}</p>
                <p><strong>Skills:</strong> {skills.join(', ')}</p>
                <p><strong>Profile Picture:</strong> {profilePic ? profilePic.name : 'None'}</p>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded mt-4"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 p-2 rounded mt-4 ml-2"
                onClick={previousStep}
              >
                Previous
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
