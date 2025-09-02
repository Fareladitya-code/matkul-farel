// src/pages/InputMataKuliah.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./InputMataKuliah.css";

// Definisikan state awal untuk form agar mudah di-reset
const initialFormState = {
  dosen: "",
  programStudi: "",
  semester: "",
  kelas: "",
  kodeMatkul: "",
  namaMatkul: "",
  hari: "",
  waktu: "",
  kodeRuang: "",
};

// Definisikan konstanta untuk field form
const formFields = [
  { name: "dosen", label: "Dosen Pengampu", type: "text", placeholder: "Contoh: Dr. John Doe" },
  { name: "programStudi", label: "Program Studi", type: "text", placeholder: "Contoh: Teknik Informatika" },
  { name: "semester", label: "Semester", type: "text", placeholder: "Contoh: 3" },
  { name: "kelas", label: "Kelas", type: "text", placeholder: "Contoh: Pagi A" },
  { name: "kodeMatkul", label: "Kode Matakuliah", type: "text", placeholder: "Contoh: IF123" },
  { name: "namaMatkul", label: "Nama Mata Kuliah", type: "text", placeholder: "Contoh: Pemrograman Web" },
  { name: "hari", label: "Hari", type: "text", placeholder: "Contoh: Senin" },
  { name: "waktu", label: "Waktu", type: "text", placeholder: "Contoh: 08:00 - 10:00" },
  { name: "kodeRuang", label: "Kode Ruang", type: "text", placeholder: "Contoh: R.301" },
];

export default function InputMataKuliah() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  // Ubah state message menjadi object untuk menampung tipe (success/error)
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi yang lebih baik
    const isFormIncomplete = Object.values(formData).some(value => value.trim() === "");
    if (isFormIncomplete) {
      setMessage({ text: "Semua field harus diisi!", type: "error" });
      return;
    }

    try {
      // Ambil data yang sudah ada dari localStorage
      const existingCourses = JSON.parse(localStorage.getItem("courses")) || [];
      // Tambahkan data baru dengan ID unik
      const newCourse = { ...formData, id: Date.now() };
      const newCourses = [...existingCourses, newCourse];
      // Simpan kembali ke localStorage
      localStorage.setItem("courses", JSON.stringify(newCourses));

      // Set pesan sukses
      setMessage({ text: "Data berhasil disimpan!", type: "success" });

      // Reset form ke state awal
      setFormData(initialFormState);

      // Arahkan ke halaman daftar kelas setelah 1.5 detik
      setTimeout(() => {
        navigate("/daftar-kelas"); // Menggunakan path yang konsisten
      }, 1500);

    } catch (error) {
      console.error("Gagal menyimpan data ke localStorage:", error);
      setMessage({ text: "Terjadi kesalahan saat menyimpan data.", type: "error" });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        if (json.length === 0) {
          setMessage({ text: "File Excel kosong atau format tidak sesuai.", type: "error" });
          return;
        }

        // Map Excel headers to our state keys
        const headerMapping = {
          'Dosen Pengampu': 'dosen',
          'Program Studi': 'programStudi',
          'Semester': 'semester',
          'Kelas': 'kelas',
          'Kode Matakuliah': 'kodeMatkul',
          'Nama Matakuliah': 'namaMatkul',
          'Hari': 'hari',
          'Waktu': 'waktu',
          'Kode Ruang': 'kodeRuang',
        };

        const newCourses = json.map(row => {
          const newCourse = {};
          for (const excelHeader in headerMapping) {
            const stateKey = headerMapping[excelHeader];
            newCourse[stateKey] = row[excelHeader] || "";
          }
          newCourse.id = Date.now() + Math.random(); // Simple unique ID
          return newCourse;
        });

        const existingCourses = JSON.parse(localStorage.getItem("courses")) || [];
        const combinedCourses = [...existingCourses, ...newCourses];
        localStorage.setItem("courses", JSON.stringify(combinedCourses));

        setMessage({ text: `${newCourses.length} data berhasil diimpor dari Excel!`, type: "success" });

        // Clear the file input value
        e.target.value = null;

        setTimeout(() => {
          navigate("/daftar-kelas");
        }, 1500);

      } catch (error) {
        console.error("Error processing Excel file:", error);
        setMessage({ text: "Gagal memproses file Excel. Pastikan format file benar.", type: "error" });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Input Data Kelas</h1>
      {message.text && (
        <div className={`form-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* File Upload Section */}
      <div className="file-upload-section">
        <h2 className="file-upload-title">Impor dari Excel</h2>
        <p className="file-upload-instructions">
          Pastikan file Excel Anda memiliki header: <strong>Dosen Pengampu, Program Studi, Semester, Kelas, Kode Matakuliah, Nama Matakuliah, Hari, Waktu, Kode Ruang</strong>.
        </p>
        <div className="file-input-wrapper">
          <label htmlFor="file-upload" className="file-input-label">
            Pilih File
          </label>
          <input id="file-upload" type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="file-input" />
        </div>
      </div>

      <div className="divider">
        <span>ATAU ISI MANUAL DI BAWAH</span>
      </div>

      {/* Manual Form Section */}
      <form onSubmit={handleSubmit} className="input-form">
        {formFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
            </label>
            <input type={field.type} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder || ""} className="form-input" />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Simpan Data Manual
        </button>
      </form>
    </div>
  );
}