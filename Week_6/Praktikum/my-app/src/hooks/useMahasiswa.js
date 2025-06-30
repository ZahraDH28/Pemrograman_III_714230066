"use client"

import { useEffect, useState, useRef } from "react"

export const useMahasiswa = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchedRef = useRef(false)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Normally we would fetch from the API, but for demo purposes
      // I'll create mock data that includes minat and mata kuliah
      const mockData = [
        {
          _id: "1",
          npm: "2203101026",
          nama: "Dimas Prasetyo",
          prodi: "Teknik Sipil",
          fakultas: "Fakultas Teknik Sipil dan Perencanaan",
          minat: ["Struktur Bangunan", "Manajemen Konstruksi"],
          mataKuliah: [
            { kode: "TS101", nama: "Mekanika Teknik", nilai: 78 },
            { kode: "TS105", nama: "Struktur Beton", nilai: 83 },
            { kode: "TS110", nama: "Manajemen Konstruksi", nilai: 87 },
          ],
        },
        {
          _id: "2",
          npm: "2203101023",
          nama: "Siti Nurhaliza",
          prodi: "Teknik Informatika",
          fakultas: "Fakultas Teknik",
          minat: ["Kecerdasan Buatan", "Pengembangan Web", "UI/UX"],
          mataKuliah: [
            { kode: "IF301", nama: "Struktur Data", nilai: 85 },
            { kode: "IF305", nama: "Pemrograman Web", nilai: 90 },
            { kode: "IF309", nama: "Kecerdasan Buatan", nilai: 93 },
          ],
        },
        {
          _id: "3",
          npm: "2203101024",
          nama: "Rafi Akbar",
          prodi: "Sistem Informasi",
          fakultas: "Fakultas Teknik",
          minat: ["Manajemen Proyek", "Sistem Informasi Enterprise"],
          mataKuliah: [
            { kode: "SI201", nama: "Analisis Sistem", nilai: 82 },
            { kode: "SI205", nama: "Manajemen Proyek TI", nilai: 88 },
            { kode: "SI210", nama: "Perancangan SI", nilai: 91 },
          ],
        },
        {
          _id: "4",
          npm: "2203101025",
          nama: "Putri Melani",
          prodi: "Teknik Elektro",
          fakultas: "Fakultas Teknik",
          minat: ["Robotika", "Sistem Tertanam"],
          mataKuliah: [
            { kode: "EL301", nama: "Elektronika Dasar", nilai: 80 },
            { kode: "EL310", nama: "Sistem Digital", nilai: 85 },
            { kode: "EL315", nama: "Robotika", nilai: 80 },
          ],
        },
        {
          _id: "5",
          npm: "1234567890",
          nama: "Ferlan Yamal Wowo",
          prodi: "Teknik Informatika Update",
          fakultas: "Sekolah Vokasi Update",
          minat: ["AI", "Web", "Mining"],
          mataKuliah: [{ kode: "UT101", nama: "Dasar Testing Update", nilai: 100 }],
        },
      ]

      // Uncomment this for real API call
      // const response = await axios.get("http://127.0.0.1:8088/api/mahasiswa");
      // setUsers(response.data.data || []);

      // Using mock data instead
      setUsers(mockData)
      console.log("Fetched mahasiswa:", mockData)
    } catch (err) {
      console.error("Error fetching mahasiswa:", err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchData()
      fetchedRef.current = true
    }
  }, [])

  const retry = () => {
    fetchedRef.current = false
    fetchData()
  }

  return { users, loading, error, retry }
}
