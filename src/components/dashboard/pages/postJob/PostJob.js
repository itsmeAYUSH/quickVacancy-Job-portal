import React, { useState } from "react";
import axios from "axios";
import styles from "./PostJob.module.css"; // Ensure the CSS module matches the updated layout

const PostJob = () => {
  const [job, setJob] = useState({
    title: "",
    openings: "",
    location: "",
    experience: "",
    salary: "",
    bonus: false,
    skills: "",
    description: "",
    timings: "",
    interviewDetails: "",
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    organizationSize: "",
    address: "",
    hiringFrequency: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!job.title) errors.push("Job title is required.");
    if (!job.openings || isNaN(job.openings) || job.openings <= 0) {
      errors.push("Number of openings must be a positive number.");
    }
    if (!job.salary || isNaN(job.salary)) {
      errors.push("Monthly salary must be a valid number.");
    }
    if (!job.organizationSize || isNaN(job.organizationSize)) {
      errors.push("Size of organization must be a valid number.");
    }
    if (!job.phone.match(/^\d{10}$/)) {
      errors.push("Phone number must be 10 digits.");
    }
    if (!job.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push("Email must be a valid email address.");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      setSuccess(null);
      return;
    }

    try {
      await axios.post("https://quickvacancy-job-portal-1.onrender.com/api/jobs", job);
      setSuccess("Job posted successfully!");
      setError(null);
      setJob({
        title: "",
        openings: "",
        location: "",
        experience: "",
        salary: "",
        bonus: false,
        skills: "",
        description: "",
        timings: "",
        interviewDetails: "",
        companyName: "",
        contactPerson: "",
        phone: "",
        email: "",
        organizationSize: "",
        address: "",
        hiringFrequency: "",
      });
    } catch (err) {
      setError("Error posting job. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className={styles.postJobContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Post a Job</h2>

        {/* Job Details Section */}
        <div className={styles.section}>
          <h3>Job Details</h3>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter the job title"
                value={job.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>No of Openings</label>
              <input
                type="number"
                name="openings"
                placeholder="Enter the number of openings"
                value={job.openings}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Job Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter the job location"
                value={job.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Years of Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="Enter years of experience"
                value={job.experience}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Monthly Salary</label>
              <input
                type="text"
                name="salary"
                placeholder="Enter the salary range"
                value={job.salary}
                onChange={handleChange}
                required
                pattern="^[0-9]+(\.[0-9]{1,2})?$"
                title="Please enter a valid salary amount."
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Bonus Offered</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="bonus"
                    value={true}
                    checked={job.bonus === true}
                    onChange={() => setJob({ ...job, bonus: true })}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="bonus"
                    value={false}
                    checked={job.bonus === false}
                    onChange={() => setJob({ ...job, bonus: false })}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="Type to search for skills"
              value={job.skills}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Job Description</label>
            <textarea
              name="description"
              placeholder="Enter the job description"
              value={job.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className={styles.section}>
          <h3>Additional Information</h3>
          <div className={styles.inputGroup}>
            <label>Job Timings</label>
            <input
              type="text"
              name="timings"
              placeholder="e.g., 9:30 AM - 6:30 PM | Monday to Saturday"
              value={job.timings}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Interview Details</label>
            <input
              type="text"
              name="interviewDetails"
              placeholder="e.g., 11:00 AM - 4:00 PM"
              value={job.interviewDetails}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Company Information Section */}
        <div className={styles.section}>
          <h3>About Your Company</h3>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={job.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Contact Person Name</label>
              <input
                type="text"
                name="contactPerson"
                placeholder="Enter contact person name"
                value={job.contactPerson}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={job.phone}
                onChange={handleChange}
                required
                pattern="^\d{10}$"
                title="Phone number must be 10 digits."
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={job.email}
                onChange={handleChange}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Email must be a valid email address."
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Contact Person Profile</label>
              <select
                name="hiringFrequency"
                value={job.hiringFrequency}
                onChange={handleChange}
              >
                <option value="">Select Profile</option>
                <option value="HR / Owner">HR / Owner</option>
                <option value="HR / Recruiter">HR / Recruiter</option>
                <option value="Manager">Manager</option>
                <option value="Chairman">Chairman</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Size of Organization</label>
              <input
                type="text"
                name="organizationSize"
                placeholder="Enter number of employees"
                value={job.organizationSize}
                onChange={handleChange}
                required
                pattern="^[0-9]+$"
                title="Size of organization must be a valid number."
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Job Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter job address"
                value={job.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>How often do you have a new job vacancy?</label>
              <select
                name="hiringFrequency"
                value={job.hiringFrequency}
                onChange={handleChange}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Post Job
        </button>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default PostJob;
