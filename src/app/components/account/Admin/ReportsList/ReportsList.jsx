import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportDeleteButton from "./ReportDeleteButton";
import { selectToken } from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";

const ReportsList = () => {
  const handleReportDeleted = ({ reportId }) => {
    setReports((reports) => reports.filter((report) => report.id !== reportId));
  };

  const token = useSelector(selectToken);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:8000/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="md:col-span-3 p-4 overflow-scroll max-h-[100vh]">
      <h1 className="text-2xl mb-10 font-bold">
        Administration - Gestion des avis signalés
      </h1>
      <table className="w-full border-collapse text-customDarkGrey">
        <thead>
          <tr className="border-b border-t border-customDark">
            <th className="min-w-1/12 py-3 text-left">ID</th>
            <th className="min-w-1/3 p-2 text-left">Identité client</th>
            <th className="min-w-1/3 p-2 text-left">Titre</th>
            <th className="min-w-1/3 p-2 text-left">Avis</th>
            <th className="min-w-1/2 p-2 text-left">Publié&nbsp;le</th>
            <th className="min-w-1/2 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="p-2">{report.id}</td>
              <td className="p-2">{report.email}</td>
              <td className="p-2">{report.title}</td>
              <td className="p-2">{report.comment}</td>
              <td className="p-2">{report.createdAt}</td>
              <td className="p-2 flex justify-center">
                <ReportDeleteButton
                  key={report.id}
                  reportId={report.id}
                  onReportDeleted={handleReportDeleted}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsList;
