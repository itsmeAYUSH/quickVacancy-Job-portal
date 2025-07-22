import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Jobs.module.css";
import { motion } from "framer-motion";

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Remove: const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://quickvacancy-job-portal-1.onrender.com/api/jobs");
      if (response.status === 200 && response.data.jobs) {
        setJobs(response.data.jobs);
      } else {
        throw new Error("Failed to fetch jobs: No jobs found in response");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message || "An error occurred while fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // const handleEdit = (jobId) => {
  //   navigate(`/post-job/${jobId}`); // Navigate to PostJob with jobId
  // };

  if (loading) {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Loading jobs...</motion.div>;
  }

  if (error) {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Error fetching jobs: {error}</motion.div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={styles.jobContainer}>
        <div className={styles.tableContainer}>
          <h2 className={styles.title}>Manage Jobs</h2>
          <div className={styles.filterOptions}>
            Filter - All / Active / Expired
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: jobs.indexOf(job) * 0.1 }}
                >
                  <td>{job.title}</td>
                  <td>{job.status}</td>
                  <td>
                    <button className={styles.editButton}>Edit</button>
                    <button className={styles.closeButton}>Close</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
