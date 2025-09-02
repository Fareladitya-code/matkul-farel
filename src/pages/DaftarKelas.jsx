// src/pages/DaftarKelas.jsx
import { useState, useEffect, useMemo } from "react";
import "./DaftarKelas.css";

export default function DaftarKelas() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editedCourse, setEditedCourse] = useState(null);

  useEffect(() => {
    // Ambil data dari localStorage saat komponen pertama kali dimuat
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  const handleEdit = (course) => {
    setEditingCourseId(course.id);
    setEditedCourse({ ...course });
  };

  const handleCancel = () => {
    setEditingCourseId(null);
    setEditedCourse(null);
  };

  const handleSave = (id) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? editedCourse : course
    );
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setEditingCourseId(null);
    setEditedCourse(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
      const updatedCourses = courses.filter((course) => course.id !== id);
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const sortedCourses = useMemo(() => {
    const dayOrder = {
      senin: 1,
      selasa: 2,
      rabu: 3,
      kamis: 4,
      jumat: 5,
      sabtu: 6,
      minggu: 7,
    };

    return [...courses].sort((a, b) => {
      const dayA = a.hari ? dayOrder[a.hari.toLowerCase()] || 99 : 99;
      const dayB = b.hari ? dayOrder[b.hari.toLowerCase()] || 99 : 99;

      if (dayA !== dayB) {
        return dayA - dayB;
      }

      // Jika hari sama, urutkan berdasarkan waktu mulai
      const timeA = a.waktu ? a.waktu.split(" - ")[0] : "99:99";
      const timeB = b.waktu ? b.waktu.split(" - ")[0] : "99:99";

      return timeA.localeCompare(timeB);
    });
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!searchTerm) {
      return sortedCourses;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return sortedCourses.filter(
      (course) =>
        (course.namaMatkul && course.namaMatkul.toLowerCase().includes(lowercasedFilter)) ||
        (course.dosen && course.dosen.toLowerCase().includes(lowercasedFilter)) ||
        (course.programStudi && course.programStudi.toLowerCase().includes(lowercasedFilter)) ||
        (course.semester && course.semester.toString().toLowerCase().includes(lowercasedFilter)) ||
        (course.kelas && course.kelas.toLowerCase().includes(lowercasedFilter)) ||
        (course.kodeMatkul && course.kodeMatkul.toLowerCase().includes(lowercasedFilter)) ||
        (course.hari && course.hari.toLowerCase().includes(lowercasedFilter)) ||
        (course.waktu && course.waktu.toLowerCase().includes(lowercasedFilter)) ||
        (course.kodeRuang && course.kodeRuang.toLowerCase().includes(lowercasedFilter))
    );
  }, [searchTerm, sortedCourses]);

  return (
    <div className="daftar-kelas-container">
      <h1 className="daftar-kelas-title">Daftar Kelas</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari kelas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {filteredCourses.length > 0 ? (
        <div className="table-container">
          <table className="kelas-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Dosen Pengampu</th>
                <th>Program Studi</th>
                <th>Semester</th>
                <th>Kelas</th>
                <th>Kode</th>
                <th>Nama Matakuliah</th>
                <th>Hari</th>
                <th>Waktu</th>
                <th>Kode Ruang</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) =>
                editingCourseId === course.id ? (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>
                      <input type="text" name="dosen" value={editedCourse.dosen || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="programStudi" value={editedCourse.programStudi || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="semester" value={editedCourse.semester || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="kelas" value={editedCourse.kelas || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="kodeMatkul" value={editedCourse.kodeMatkul || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="namaMatkul" value={editedCourse.namaMatkul || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="hari" value={editedCourse.hari || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="waktu" value={editedCourse.waktu || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td>
                      <input type="text" name="kodeRuang" value={editedCourse.kodeRuang || ""} onChange={handleInputChange} className="edit-input full-width" />
                    </td>
                    <td className="action-cell">
                      <button onClick={() => handleSave(course.id)} className="action-button btn-save">
                        Simpan
                      </button>
                      <button onClick={handleCancel} className="action-button btn-cancel">
                        Batal
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="cell-text-secondary">{course.dosen}</div>
                    </td>
                    <td>
                      <div className="cell-text-secondary">{course.programStudi}</div>
                    </td>
                    <td>
                      <div className="cell-text-secondary">{course.semester}</div>
                    </td>
                    <td>
                      <div className="cell-text-secondary">{course.kelas}</div>
                    </td>
                    <td>
                      <div className="cell-text-secondary">{course.kodeMatkul}</div>
                    </td>
                    <td>
                      <div className="cell-text-main">{course.namaMatkul}</div>
                    </td>
                    <td>
                      <div className="cell-text-secondary">{course.hari}</div>
                    </td>
                    <td>
                      <div className="cell-text-secondary">{course.waktu}</div>
                    </td>
                    <td>
                      <div className="cell-text-secondary">{course.kodeRuang}</div>
                    </td>
                    <td className="action-cell">
                      <button onClick={() => handleEdit(course)} className="action-button btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="action-button btn-delete">
                        Hapus
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data-message">
          Tidak ada data kelas. Silakan input terlebih dahulu.
        </p>
      )}
    </div>
  );
}