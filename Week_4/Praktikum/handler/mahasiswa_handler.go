package handler

import (
	"inibackend/repository"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Homepage(c *fiber.Ctx) error {
	return c.SendString("Hello API sudah jalan")
}

func GetAllMahasiswa(c *fiber.Ctx) error {
	data, err := repository.GetAllMahasiswa(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Gagal mengambil data dari database",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data berhasil diambil",
		"data":    data,
		"status":  fiber.StatusOK,
	})
}
func GetAllMahasiswaByNPM(c *fiber.Ctx) error {
	npmStr := c.Params("npm") //ambil npm dari parameter url

	npm, err := strconv.Atoi(npmStr) //mengubah str jadi int
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "NPM harus berupa angka", //npm tidak valid
		})
	}

	mhs, err := repository.GetMahasiswaByNPM(c.Context(), npm)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if mhs == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Mahasiswa tidak ditemukan", //mahasiswa tidak ditemukan
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  fiber.StatusOK, //status 200
		"message": "Berhasil Mengambil Data Mahasiswa",
		"data":    mhs,
	})
}
